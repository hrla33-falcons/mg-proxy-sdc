const express = require('express')
const app = express()
const port = 3007
const bodyParser = require('body-parser')
// const router = require('./router.js');
const controllers = require('./nControllers')
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// app.use('/', router);

app.use(express.static(__dirname + '/../client/dist/'))

app.get('/ikea/:id', controllers.getOne);
app.get('/loaderio-c8fbf10f5da68ff53c31c6fab83a7f53/', controllers.verify);
app.get('/loaderio-c8fbf10f5da68ff53c31c6fab83a7f53.html', controllers.verify);
app.post('/ikea', controllers.post);
app.put('/ikea/:id', controllers.update);
app.delete('/ikea/:id', controllers.delete)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

