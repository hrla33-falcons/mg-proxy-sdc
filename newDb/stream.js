const fs = require('fs');
const {Pool, Client} = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
// const _progress = require('cli-progress');
const csvPath = path.join(__dirname, './report.csv');
var inputFile = path.join(__dirname, './report.csv');

var pool = new Pool({
    host: 'localhost',
    user: 'ikeaCustomer',
    port: 5432,
    database: 'ikeaproducts'
})
 
pool.connect(function(err, client, done) {
  var stream = client.query(copyFrom(`COPY products (name, shortDes, midDes, cImg, oImg, price, rating, nRev) FROM '${csvPath}' DELIMITER ',' CSV HEADER`), [1], (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
  });
  var fileStream = fs.createReadStream(inputFile);
  fileStream.on('end', () => {
      console.log('All the data in the file has been read');
      fileStream.close();
      console.timeEnd('seedDB');
      console.log(`Completed loading data into ${targetTable}`);
      pool.end();
  });
  fileStream.on('error', error => {
      console.log(`Error in reading file: ${error}`);
  });
  stream.on('error', (error) => {
      console.log(`Error in copy command: ${error}`);
  });
  stream.on('end', () => {
      console.timeEnd('seedDB');
      console.log(`Completed loading data into ${targetTable}`);
      pool.end();
  });
  console.log('beginning seeding DB');
  console.time('seedDB');
  fileStream.pipe(stream);
});

