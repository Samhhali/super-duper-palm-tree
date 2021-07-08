const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

const storage = new Storage();
const bucket = storage.bucket('zamah-1301.appspot.com');
const file = bucket.file('IO2019.jpeg');

const localFilename = '/home/samah/Pictures/testing/IO2019.jpeg';

async function downloadFile() {
  const fileName = 'mems/IO2019.jpeg';
  const options = {
    destination: localFilename,
  };
  // Downloads the file
  await bucket.file(fileName).download(options);
  console.log(
    `gs://${bucket.name}/${fileName} downloaded to ${localFilename} !`
  );
}

//downloadFile().catch(console.error);
//delete file
//file.delete( ()=> { console.log('Deleted!!') });


async function uploadFile(){
  const file = bucket.file('mems/GDG.JPG');
  console.log('start upload');
  await bucket.file('mems').upload('/home/samah/Pictures/testing/GDG.JPG',{
    //destination: 'mems/'
  });
  console.log('end upload');

  // fs.createReadStream('/home/samah/Pictures/testing/GDG.JPG')
  // .pipe(file.createWriteStream())
  // .on('error', function (err) { console.log('// The file upload is [IN]complete'); })
  // .on('finish', function () {
  //   console.log('// The file upload is complete');
  // });

} 
uploadFile();
//-
// Lists files in the bucket
async function listFiles() {

    const [files] = await bucket.getFiles();

    console.log('Files:');
    files.forEach(file => {
        console.log(file.name);
    });
}

listFiles().catch(console.error);