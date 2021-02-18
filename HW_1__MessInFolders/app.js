const fs = require('fs');
const path = require('path');


function getAllFiles(rootPath, newFolder) {


  fs.readdir(rootPath, (err, files) => {
    if (err) {
      return console.error(err)
    }
    files.forEach(file => {
      const newPath = path.join(rootPath, file);
      const endPath = path.join(__dirname, newFolder, file)
      fs.stat(newPath, (err, stats) => {
        stats.isDirectory()
            ? getAllFiles(newPath, newFolder)
            : moveFile(file, newPath, endPath)
      })
    })
  })
}

function moveFile(file, oldPath, newPath) {
  if (path.extname(file) === '.txt') {
    console.log(newPath)
    // fs.rename(oldPath, newPath, (err) => {
    //   if (err) {
    //     return console.log('file don`t move', err)
    //   }
    // })
  }
}

getAllFiles(__dirname, 'newFolderForFiles')
