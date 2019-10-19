const express = require('express');

const PORT = 8080;

const app = express();
app.use(express.static('./dist-server-renderer'));
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
