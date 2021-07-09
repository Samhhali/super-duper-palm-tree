const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const myBucket = storage.bucket('zamah-1301.appspot.com');

const notification = myBucket.notification('1');

if (notification.exists()) console.log('Notification is found!!');