const fs = require('fs/promises');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
const pathDirCopy = path.join(__dirname, 'files-copy');     

async function copyDir() {
    try {
    await fs.rm(pathDirCopy, {force: true, recursive: true},(err) => {
        if (err) throw err;
    });    
    await fs.mkdir(pathDirCopy, {recursive: true},
    (err) => {
        if (err) console.log(err);
    });    
    const files = await fs.readdir(pathDir, {withFileTypes: true});
    Promise.all(files).
    then(arr => arr.map(item => {
        if(item.isFile()) {
            fs.copyFile(path.join(pathDir, item.name),
                 path.join(pathDirCopy, item.name));
        }
        }));
    } catch (err) {
    console.error(err);
}
}
  
 copyDir();

