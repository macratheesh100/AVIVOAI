
const express   = require('express');
const router    = express.Router();
const db        = require('../db');
const axios     = require('axios');
const _         = require('lodash')

// GET /insert - insert all the users data to the db for the first time
router.get('/', async (req, res) => {
  try {
    
      let usersData = await getUsersData();
      if (usersData == null) {
          throw new Error("Users data not available!")
          return
      }
    
      // Create table if already not exists
      // Users table
      await db.query('CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY, firstName VARCHAR(100), lastName VARCHAR(100), maidenName VARCHAR(100), age INT, gender ENUM("male", "female", "other"), email VARCHAR(150), phone VARCHAR(50), username VARCHAR(50), password VARCHAR(255), birthDate DATE, image VARCHAR(255), bloodGroup VARCHAR(5), height FLOAT, weight FLOAT, eyeColor VARCHAR(50), ip VARCHAR(45), macAddress VARCHAR(50), university VARCHAR(150), ein VARCHAR(20), ssn VARCHAR(20), userAgent TEXT, role VARCHAR(50))');
            
      // Create hair table
      await db.query('CREATE TABLE IF NOT EXISTS hair (userId INT PRIMARY KEY, color VARCHAR(50), type VARCHAR(50), FOREIGN KEY (userId) REFERENCES users(id))');

      // Create user_address table
      await db.query('CREATE TABLE IF NOT EXISTS user_address (userId INT PRIMARY KEY, address VARCHAR(255), city VARCHAR(100), state VARCHAR(100), stateCode VARCHAR(10), postalCode VARCHAR(20), country VARCHAR(100), latitude FLOAT, longitude FLOAT, FOREIGN KEY (userId) REFERENCES users(id))');

      // Create bank table
      await db.query('CREATE TABLE IF NOT EXISTS bank (userId INT PRIMARY KEY, cardExpire VARCHAR(10), cardNumber VARCHAR(30), cardType VARCHAR(50), currency VARCHAR(10), iban VARCHAR(50), FOREIGN KEY (userId) REFERENCES users(id))');

      // Create crypto table
      await db.query('CREATE TABLE IF NOT EXISTS crypto (userId INT PRIMARY KEY, coin VARCHAR(50), wallet VARCHAR(100), network VARCHAR(100), FOREIGN KEY (userId) REFERENCES users(id));');

      // Create company table
      await db.query('CREATE TABLE IF NOT EXISTS company (userId INT PRIMARY KEY, department VARCHAR(100), name VARCHAR(150), title VARCHAR(100), FOREIGN KEY (userId) REFERENCES users(id))');

      // Create company_address table
      await db.query('CREATE TABLE IF NOT EXISTS company_address (userId INT PRIMARY KEY, address VARCHAR(255), city VARCHAR(100), state VARCHAR(100), stateCode VARCHAR(10), postalCode VARCHAR(20), country VARCHAR(100), latitude FLOAT, longitude FLOAT, FOREIGN KEY (userId) REFERENCES users(id))');
      
      // Generate user insert query
      let usrQueryStr = `INSERT INTO users (id, firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, image, bloodGroup, height, weight, eyeColor, ip, macAddress, university, ein, ssn, userAgent, role) VALUES `;
      
      // Generate user hair insert query
      let hairQueryStr = `INSERT INTO hair (userId, color, type) VALUES `;
      
      // Generate user user_address insert query
      let usrAddQueryStr = `INSERT INTO user_address (userId, address, city, state, stateCode, postalCode, country, latitude, longitude ) VALUES `;

      // Generate user bank insert query
      let bankQueryStr = `INSERT INTO bank (userId, cardExpire, cardNumber, cardType, currency, iban) VALUES `;

      // Generate user crypto insert query
      let cryptoQueryStr = `INSERT INTO crypto (userId, coin, wallet, network) VALUES `;

      // Generate user company insert query
      let compyQueryStr = `INSERT INTO company (userId, department, name, title) VALUES `;

      // Generate user company address insert query
      let compAddQueryStr = `INSERT INTO company_address (userId, address, city, state, stateCode, postalCode, country, latitude, longitude) VALUES `;

      if (!_.isEmpty(usersData.users)) {
          
          for (user of usersData.users) {
              
              const birthDate = new Date(user.birthDate).toISOString().slice(0, 10);
              
              // Push user data
              usrQueryStr += `(${user.id}, '${user.firstName}', '${user.lastName}', '${user.maidenName}', ${user.age}, '${user.gender}', '${user.email}', '${user.phone}', '${user.username}', '${user.password}', '${birthDate}', '${user.image}', '${user.bloodGroup}', ${user.height}, ${user.weight}, '${user.eyeColor}', '${user.ip}', '${user.macAddress}', '${user.university}', '${user.ein}', '${user.ssn}', '${user.userAgent}', '${user.role}'),`;
              
              // Push hair
              hairQueryStr += `(${user.id}, '${user.hair.color}', '${user.hair.type}'),`;
              
              // push user_address
              usrAddQueryStr += `(${user.id}, '${user.address.address}', '${user.address.city}', '${user.address.state}', '${user.address.stateCode}', '${user.address.postalCode}', '${user.address.country}', ${user.address.coordinates.lat}, ${user.address.coordinates.lng}),`;
              
              // Push bank
              bankQueryStr += `(${user.id}, '${user.bank.cardExpire}', '${user.bank.cardNumber}', '${user.bank.cardType}', '${user.bank.currency}', '${user.bank.iban}'),`;
              
              // Push crypto
              cryptoQueryStr += `(${user.id}, '${user.crypto.coin}', '${user.crypto.wallet}', '${user.crypto.network}'),`;
              
              // Push company
              compyQueryStr += `(${user.id}, '${user.company.department}', '${user.company.name}', '${user.company.title}'),`;
              
              const cAddr = user.company.address;
              // Push company address
              compAddQueryStr += `(${user.id}, '${cAddr.address}', '${cAddr.city}', '${cAddr.state}', '${cAddr.stateCode}', '${cAddr.postalCode}', '${cAddr.country}', ${cAddr.coordinates.lat}, ${cAddr.coordinates.lng}),`;
          }
      } else {
          throw new Error("Zero user rows inserted!");
          return
      }
      
      usrQueryStr     = usrQueryStr.slice(0, usrQueryStr.length-1)
      hairQueryStr    = hairQueryStr.slice(0, hairQueryStr.length-1)
      usrAddQueryStr  = usrAddQueryStr.slice(0, usrAddQueryStr.length-1)
      bankQueryStr    = bankQueryStr.slice(0, bankQueryStr.length-1)
      cryptoQueryStr  = cryptoQueryStr.slice(0, cryptoQueryStr.length-1)
      compyQueryStr   = compyQueryStr.slice(0, compyQueryStr.length-1)
      compAddQueryStr = compAddQueryStr.slice(0, compAddQueryStr.length-1)

      // Insert all the demo users data
      let usrData      = await db.query(usrQueryStr);
      let hairData     = await db.query(hairQueryStr);
      let addData      = await db.query(usrAddQueryStr);
      let bankData     = await db.query(bankQueryStr);
      let cryptoData   = await db.query(cryptoQueryStr);
      let compData     = await db.query(compyQueryStr);
      let compAddData  = await db.query(compAddQueryStr);
      
      let dbResp = ""

      if (!_.isEmpty(usrData)) {
          dbResp += "User data affected rows: " + usrData[0].affectedRows
      }
      
      if (!_.isEmpty(hairData)) {
          dbResp += ", Hair data affected rows: " + hairData[0].affectedRows
      }
      
      if (!_.isEmpty(addData)) {
          dbResp += ", Address affected rows: " + addData[0].affectedRows
      }
      
      if (!_.isEmpty(bankData)) {
          dbResp += ", Bank data affected rows: " + bankData[0].affectedRows
      }
      
      if (!_.isEmpty(cryptoData)) {
          dbResp += ", Crypt data affected rows: " + cryptoData[0].affectedRows
      }
      
      if (!_.isEmpty(compData)) {
          dbResp += ", Company data affected rows: " + compData[0].affectedRows
      }
      
      if (!_.isEmpty(compAddData)) {
          dbResp += ", Company Address data affected rows: " + compAddData[0].affectedRows
      }
      
      res.json({ status: 'Success', info: dbResp});
  } catch (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
  }
});

async function getUsersData() {
    
    try {
        const API_URL = `https://dummyjson.com/users`;
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        };
        
        const response = await axios.get(API_URL, { headers });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.error('Error fetching Users Data:', error.response ? error.response.data : error.message);
    }
}

module.exports = router;
