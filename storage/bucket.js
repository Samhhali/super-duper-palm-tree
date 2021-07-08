
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucketName = storage.bucket('zamah-1301.appspot.com');


//list all buckets in storage
async function listBuckets() {
    try {
        const results = await storage.getBuckets();

        const [buckets] = results;

        console.log('Buckets:');
        buckets.forEach(bucket => {
            console.log(bucket.name);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
}
listBuckets();
