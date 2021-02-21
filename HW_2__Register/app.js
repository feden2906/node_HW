const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));


// конфігурація express щоб читав HBS
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', path.join(__dirname, 'static'));

const pathToDB = path.join(__dirname, 'users.json')


function getUsers() {
  return JSON.parse(fs.readFileSync(pathToDB));
}
function setUsers(users) {
  fs.writeFile(pathToDB, JSON.stringify(users), (err => {
    if (err) {
      console.error(err)
    }
  }))
}


app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', ({body: {email, password}}, res) => {
  const user = getUsers().some(user => user.email === email && user.password === password);
  if (user) {
    res.redirect('/users');
    return;
  }
  res.redirect('/register');
})


app.get('/register', (req, res) => {
  res.render('register');
})
app.post('/register', ({body}, res) => {
  const users = getUsers();
  const userExists = users.some(user => user.email === body.email);
  if (userExists) {
    res.render('register', {error: true})
    return
  }
  users.push(body);
  setUsers(users);
  res.redirect('/users');
})


app.get('/users', (req, res) => {
  const users = getUsers();
  res.render("users", {users});
})

app.post('/users', (req, res) => {

})


app.listen(5000, (err) => {
  if (err) {
    console.error('problem with server starting', err);
  }
  console.log('Server started')
})



