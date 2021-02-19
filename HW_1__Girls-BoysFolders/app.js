const fs = require('fs');
const path = require('path');

function getAllFiles(pathName) {
  fs.readdir(pathName, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    files.forEach(item => {
      const newPath = path.join(pathName, item);
      fs.stat(newPath, (err, stats) => {
        if (err) {
          console.log(err)
          return
        }
        stats.isDirectory()
            ? getAllFiles(newPath)
            : checkGender(item, newPath)
      })
    })
  })
}

function checkGender(file, pathName) {
  if (path.extname(file) === '.json') {
    fs.readFile(pathName, (err, data) => {

      if (err) {
        console.log(err)
        return
      }
      const {name, gender} = JSON.parse(data);
      let newDirectory;

      if (gender === 'male') {
        newDirectory = path.join(__dirname, '18_00', path.basename(file));
      }
      if (gender === 'female') {
        newDirectory = path.join(__dirname, '20_00', path.basename(file));
      }
      moveStudent(pathName, newDirectory, name);
    })
  }
}

function moveStudent(oldPath, newPath, studentName) {
  if (oldPath === newPath) {
    console.log(`${studentName} have correct folder`)
    return
  }
  fs.rename(oldPath, newPath, err => {
    if (err) {
      console.log(err)
    }
  })
}

getAllFiles(__dirname)
