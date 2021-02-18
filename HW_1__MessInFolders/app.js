const fs = require('fs');
const path = require('path');


function getAllFiles(pathName, endPath) {
  fs.readdir(pathName, (err, files) => {
    if (err) {
      return console.log(err)
    }
    files.forEach(file => {

      const newPath = path.join(pathName, file);
      fs.stat(newPath, (err, stats) => {
        stats.isDirectory()
            ? getAllFiles(newPath)
            : moveFile(file, newPath, endPath)
      })
    })
  })
}

function moveFile(file, oldPath, newPath) {
  if (path.extname(file) === '.txt') {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return console.log('file don`t move', err)
      }
    })
  }
}

getAllFiles(__dirname)
