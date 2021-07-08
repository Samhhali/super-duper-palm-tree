const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const myBucket = storage.bucket('my-bucket');

const notification = myBucket.notification('1');

if (notification.exists()) console.log('Notification is found!!');