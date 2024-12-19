// index.js
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
let s3Client;
function handleFile(event) {
  const file = event.target.files[0]; // Get the file from the input
  handleUpload(file.name, file);
}

async function handleUpload(fileName, file) {
  const uploadParams = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: fileName,
    Body: file,
  };
  try {
    const upload = new Upload({
      client: s3Client,
      params: uploadParams,
      partSize: 5 * 1024 * 1024, // Set part size to 5MB (default)
    });
    upload.on("httpUploadProgress", (progress) => {
      console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
      const percent = progress.loaded / progress.total;
      console.log("percent", percent);
      document.getElementById("upload-progress").value = percent;
    });

    // Start the upload
    upload
      .done()
      .then((data) => {
        document.getElementById("file-location").value = data.Location;
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  } catch (e) {
    console.log(e);
  }
}

async function testS3Client() {
  try {
    console.log("REACT_APP_BUCKET_NAME", process.env.REACT_APP_BUCKET_NAME);
    // Try to check the existence of a bucket to validate the credentials
    const data = await s3Client.send(
      new HeadBucketCommand({ Bucket: process.env.REACT_APP_BUCKET_NAME })
    );
    console.log("Successfully connected to AWS with valid credentials");
  } catch (error) {
    console.error("Error connecting to AWS:", error);
  }
}

// Ensure the DOM is loaded before attaching the event listener
document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "process.env.REACT_APP_ACCESS_KEY_ID1",
    process.env.REACT_APP_ACCESS_KEY_ID1
  );
  s3Client = new S3Client({
    region: "ap-south-1", // Your AWS region
    credentials: {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    },
  });
  testS3Client();
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", handleFile); // Attach the event listener here
  }
});

// Enable Hot Module Replacement (HMR) support
if (module.hot) {
  module.hot.accept(); // This allows HMR for this file
}
