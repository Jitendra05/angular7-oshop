const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '..', 'dist','material-demo');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
});

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}.`);
});