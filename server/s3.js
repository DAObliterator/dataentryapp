import fs from "fs";
import S3 from "aws-sdk/clients/s3.js";
import dotenv from "dotenv";
dotenv.config({path: "./config.env"});


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
export const uploadFile = (file) => {

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()

}

//downloads a file from s3
export const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}

