const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));


// конфігурація express щоб читав HBS
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', path.join(__dirname, 'static'));



app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  console.log(req.body)
})

app.get('/register', (req, res) => {
  res.render('register');
})




app.listen(5000, (err) => {
  if (err) {
    console.error('problem with server starting', err);
  }
  console.log('Server started')
})

