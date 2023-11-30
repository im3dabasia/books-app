const Client = require('ssh2-sftp-client');

require('dotenv').config()

class SFTPClient {
  constructor() {
    this.client = new Client();
  }

  async connect(options) {
    console.log(`Connecting to ${options.host}:${options.port}`);
    try {
      await this.client.connect(options);
    } catch (err) {
      console.log('Failed to connect:', err);
    }
  }

  async uploadFile(localFile, remoteFile) {
    console.log(`Uploading ${localFile} to ${remoteFile} ...`);
    try {
      await this.client.put(localFile, remoteFile);
    } catch (err) {
      console.error('Uploading failed:', err);
    }
  }
  
  async disconnect() {
    console.log("disconnecting")
    await this.client.end();
  }
}
module.exports = SFTPClient;


// (async () => {
//     const port =  22;
//     const host=process.env.host
//     const username=process.env.username
//     const password=process.env.password

//     //* Open the connection
//     const client = new SFTPClient();
//     await client.connect({ host, port, username, password });

//     await client.uploadFile("./local.txt", "./remote.txt");
  
//     //* Close the connection
//     await client.disconnect();
//   })();
