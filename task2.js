import csvtojson from 'csvtojson';
import fs from 'fs';

const csvFile = './csv/nodejs-hw1-ex1.csv';
const txtFile = './txt/test.txt';

const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream(txtFile);

readStream.pipe(csvtojson())
    .on('error', (err) => console.error(err))
    .pipe(writeStream)
    .on('error', (err) => console.error(err));