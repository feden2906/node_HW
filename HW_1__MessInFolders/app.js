const fs = require('fs');
const path = require('path');

function getAllFiles(rootPath, newFolder, num) {
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      return console.error(err)
    }
    files.forEach(file => {
      const newPath = path.join(rootPath, file);
      const [name, ext] = file.split('.');
      const endPath = path.join(__dirname, newFolder, `${name} копия ${num}.${ext}`)
      let newIndex = num++;
      fs.stat(newPath, (err, stats) => {
        stats.isDirectory()
            ? getAllFiles(newPath, newFolder, newIndex)
            : moveFile(file, newPath, endPath)
      })
    })
  })
}

function moveFile(file, oldPath, endPath) {
  if (path.extname(file) === '.txt') {
    fs.rename(oldPath, endPath, (err) => {
      if (err) {
        return console.log('file don`t move', err)
      }
    })
  }
}

getAllFiles(__dirname, 'newFolderForFiles', 1)
