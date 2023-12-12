// sftpUtils.js
const SFTPClient = require('./sftp.cjs'); 

async function uploadFileToRemote(localPath, remotePath) {
  try {
    const port = 22;
    const host = process.env.host;
    const username = process.env.username;
    const password = process.env.password;

    // Open the connection
    const client = new SFTPClient();
    await client.connect({ host, port, username, password });

    // Upload the file
    const uploadStatus = await client.uploadFile(localPath, remotePath);

    // Close the connection
    await client.disconnect();

    return uploadStatus;
  } catch (error) {
    console.error('Error uploading file to remote:', error.message);
    return false;
  }
}

async function downloadFileFromRemote(remotePath, localPath) {
  try {
    const port = 22;
    const host = process.env.host;
    const username = process.env.username;
    const password = process.env.password;

    // Open the connection
    const client = new SFTPClient();
    await client.connect({ host, port, username, password });

    // Upload the file
    const uploadStatus = await client.downloadFile(remotePath, localPath);

    // Close the connection
    await client.disconnect();

    return uploadStatus;
  } catch (error) {
    console.error('Error uploading file to remote:', error.message);
    return false;
  }
}

module.exports = { uploadFileToRemote, downloadFileFromRemote };
