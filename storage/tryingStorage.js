const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucketName = storage.bucket('zamah-1301.appspot.com');

//const file = bucket.file('IO2019.jpeg');


async function listNotifications() {
    const [notifications] = await storage.bucket(bucketName).getNotifications();

    console.log('Notifications:');
    notifications.forEach(notification => {
        console.log(notification.id);
    });
}

listNotifications().catch(console.error);