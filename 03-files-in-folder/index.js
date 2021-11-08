const fs = require('fs/promises');
const path = require('path');

const fullPath = path.join(__dirname, 'secret-folder');
// console.log(fullPath);

async function showInfo() {
    try {
    const files = await fs.readdir(fullPath, {withFileTypes: true});
    for (const file of files)
    if(file.isFile()) {
        const filePath = path.join(fullPath, file.name);
        const fileSize = await fs.stat(filePath);
        const fileSizeKb = `${fileSize.size / 1024}kb`;
        const result = `${file.name.slice(0, -path.extname(file.name).length)} - ${path.extname(file.name).slice(1)} - ${fileSizeKb}`;
        console.log(result);
    }
    } catch (err) {
    console.error(err);
}
}
showInfo();