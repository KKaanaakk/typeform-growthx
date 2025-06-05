const https = require('https');
const fs = require('fs');
const path = require('path');

const logoUrl = 'https://gxclub.co/logo/growthx-logo.png';
const outputPath = path.join(__dirname, '../public/images/growthx-logo.png');

https.get(logoUrl, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log('Logo downloaded successfully!');
      fileStream.close();
    });
  } else {
    console.error(`Failed to download logo: ${response.statusCode}`);
  }
}).on('error', (err) => {
  console.error(`Error downloading logo: ${err.message}`);
}); 