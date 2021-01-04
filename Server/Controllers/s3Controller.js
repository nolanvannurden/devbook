const {
  AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY
  } = process.env;

const aws = require("aws-sdk");
aws.config = {
  region: 'us-west-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
};

const s3 = new aws.S3({ signatureVersion: "v4" });


module.exports = {

  getSignedRequest: (req, res) => {
    console.log("user requesting signed S3 action.");

    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];

    const s3Params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {

      if (err) {
        console.log("Error getting signed URL:", err);
        return res.end();
      }

      const returnData = {
        signedRequest: data,
        url: `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      };
  
      return res.status(200).send(returnData);
    });

  }
}