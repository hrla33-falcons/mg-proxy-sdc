DROP DATABASE IF EXISTS ikea;
CREATE DATABASE ikea;

\c ikea;

CREATE TABLE products (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    shortDes VARCHAR,
    midDes TEXT,
    cImg TEXT,
    oImg TEXT,
    price INTEGER,
    rating INTEGER,
    nRev INTEGER
)