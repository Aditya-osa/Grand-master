const https = require('https');

https.get('https://cdn.prod.website-files.com/6a93d02917cf3ce0ee7695c1/js/webflow.32dcb53d.1a2cfdac5fd4f945.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('timelineIds:["t-fed523d4"]');
    console.log(data.slice(idx - 300, idx + 200));
  });
});
