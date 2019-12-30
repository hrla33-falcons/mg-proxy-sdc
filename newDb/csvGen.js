const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

genProduct = () => {
let product = {};
product.name = faker.lorem.word();
product.shortDes = faker.lorem.sentence(6);
product.midDes = faker.lorem.paragraph(3);
product.cImg = faker.image.imageUrl();
product.oImg= faker.image.imageUrl();
product.price = Math.floor(Math.random() * 500);
product.rating = Math.floor(Math.random() * 6);
product.nRev = Math.floor(Math.random() * 75);
return product;
}

const csvWriter = createCsvWriter({
    path: '../newDb/report.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'shortDes', title: 'SHORTDES'},
        {id: 'midDes', title: 'MIDDES'},
        {id: 'cImg', title: 'CIMG'},
        {id: 'oImg', title: 'OIMG'},
        {id: 'price', title: 'PRICE'},
        {id: 'rating', title: 'RATING'},
        {id: 'nRev', title: 'NREV'},
        
    ]
});

genCSV = async () => {
    for (var j = 0; j < 1000; j++){
        let prodArr = [];
        let item
        for (var i = 0; i < 10000; i ++) {
            item = genProduct()
            prodArr.push(item)
        }
        await csvWriter.writeRecords(prodArr)
        .then(() => {
            console.log('Done with write number: ' + j)
        }).catch((e) => {
            console.log('ERROR: ' + e)
        })
    }
    console.timeEnd(genCSV)
}
console.time(genCSV)
genCSV();



