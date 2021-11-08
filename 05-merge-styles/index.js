const fsPr = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');

async function initBundle() {
    const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');
    const fileExists = await fsPr.access(pathBundle)
    .then(() => true)
    .catch(() => false);
    if (fileExists) {
    await fsPr.unlink(pathBundle); 
    }
    const bundle = fs.createWriteStream(pathBundle);
    return bundle;
}

async function mergeStyle() {
    const mybundle = await initBundle();
    const files = await fsPr.readdir(pathStyles, {withFileTypes: true});
    const cssFiles = files.filter(item => item.isFile() && path.extname(item.name)==='.css');
    cssFiles.map(file => {
        const readableStream = fs.createReadStream(path.join(pathStyles, file.name), 'utf-8');
        readableStream.pipe(mybundle);
        readableStream.on('error', error => console.log(error.message));
    });
}
mergeStyle();