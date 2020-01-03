const { Client } = require('pg');

var client = new Client ({
    host: 'localhost',
    user: 'ikeaCustomer',
    port: 5432,
    database: 'ikeaproducts'
})

client.connect();

const controllers = {
    getOne: (req, res) => {
        client.query((`SELECT * FROM products WHERE id=${Number(req.params.id)}`), (err, data) => {
            if (err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(data)
            }
        })
    },
    post: (req, res) => {
        var { name, shortdes, middes, cimg, oimg, price, rating, nrev } = req.body
        client.query((`INSERT INTO products (name, shortdes, middes, cimg, oimg, price, rating, nrev) VALUES ($$${name}$$, $$${shortdes}$$, $$${middes}$$, $$${cimg}$$, $$${oimg}$$, $$${price}$$, $$${rating}$$, $$${nrev}$$)`), (err, results) => {
            if (err) {
                res.status(400).send(err)
              } else {
                res.status(201).send('Added')
              }
        })
    },
    update: (req, res) => {
        var { name, shortDes, midDes, cImg, oImg, price, rating, nRev, id } = req.body
        client.query((`UPDATE products SET name="${name}", shortDes="${shortDes}", midDes="${midDes}", cImg="${cImg}", oImg="${oImg}", price="${price}", rating="${rating}", nRev="${nRev}" WHERE id="${id}"`), (err, results) => {
            if (err){
                res.status(400).send(err)
              } else {
                res.status(200).send('UPDATED')
              }
        })
    },
    delete: (req, res) => {
        client.query((`DELETE FROM products WHERE id=${req.params.id}`), (err, results) => {
            if (err) {
                res.status(400).send(err)
              } else {
                res.status(200).send('DELETED')
              }
        })
    }

}

module.exports = controllers;