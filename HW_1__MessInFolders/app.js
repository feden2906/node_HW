const fs = require('fs');
const path = require('path');


function getAllFiles(newFolder) {

  const pathName = __dirname;
  fs.readdir(pathName, (err, files) => {
    if (err) {
      return console.error(err)
    }
    files.forEach(file => {
      const newPath = path.join(pathName, file);
      const endPath = path.join(__dirname, newFolder, file)
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

getAllFiles('newFolderForFiles')
