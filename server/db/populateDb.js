#! /usr/bin/env node
const { Client } = require('pg');
require('dotenv').config();
const { createSQL, insertSQL } = require('./seedSql');

const populateDb = async () => {
    console.log('PREPARING DB...');
    const client = new Client({
        connectionString: `${process.env.DB_URL}`,
    });
    console.log('DONE SETTING CONNECTION STRING');

    await client.connect();
    console.log('CONNECTED TO DB');

    await client.query(createSQL);
    console.log('CREATED TABLES');

    await client.query(insertSQL);
    console.log('INSERTED DATA INTO TABLES');

    await client.end();
    console.log('DB SET UP DONE');
};

// populateDb();

module.exports = populateDb;
