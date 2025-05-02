
const express   = require('express');
const router    = express.Router();
const db        = require('../db');
const Joi       = require('@hapi/joi')

// GET /users - fetch all users
router.get('/', async (req, res) => {
    
    const validateRequest = (requestData) => {
        
        // Define the Schema for validation
        let requestSchema = Joi.object().keys({
            id: Joi.number().default(0)
        })
        
        return new Promise((resolve, reject) => {
            Joi.validate(requestData, requestSchema, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }
    
    try {
        
        /*
            if there is no input params then it takes 0 as default id and displays all the user info
         */
        
        let data = await validateRequest(req.query)
                
        let queryStr = `SELECT
              u.id,
              u.firstName,
              u.lastName,
              u.maidenName,
              u.age,
              u.gender,
              u.email,
              u.phone,
              u.username,
              u.password,
              u.birthDate,
              u.image,
              u.bloodGroup,
              u.height,
              u.weight,
              u.eyeColor,
              u.ip,
              u.macAddress,
              u.university,
              u.ein,
              u.ssn,
              u.userAgent,
              u.role,

              h.color AS hairColor,
              h.type AS hairType,

              ua.address AS userAddress,
              ua.city AS userCity,
              ua.state AS userState,
              ua.stateCode AS userStateCode,
              ua.postalCode AS userPostalCode,
              ua.country AS userCountry,
              ua.latitude AS userLat,
              ua.longitude AS userLng,

              b.cardExpire,
              b.cardNumber,
              b.cardType,
              b.currency,
              b.iban,

              c.coin,
              c.wallet,
              c.network,

              comp.department AS companyDepartment,
              comp.name AS companyName,
              comp.title AS companyTitle,

              ca.address AS companyAddress,
              ca.city AS companyCity,
              ca.state AS companyState,
              ca.stateCode AS companyStateCode,
              ca.postalCode AS companyPostalCode,
              ca.country AS companyCountry,
              ca.latitude AS companyLat,
              ca.longitude AS companyLng

            FROM users u
            LEFT JOIN hair h ON h.userId = u.id
            LEFT JOIN user_address ua ON ua.userId = u.id
            LEFT JOIN bank b ON b.userId = u.id
            LEFT JOIN crypto c ON c.userId = u.id
            LEFT JOIN company comp ON comp.userId = u.id
            LEFT JOIN company_address ca ON ca.userId = u.id`;
        
        if (data.id != 0) {
            queryStr += ` WHERE u.id = ?`;
        } else {
            data.id = null
        }
        
        const [rows] = await db.query(queryStr, data.id);
        
        const users = rows.map(row => ({
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            maidenName: row.maidenName,
            age: row.age,
            gender: row.gender,
            email: row.email,
            phone: row.phone,
            username: row.username,
            password: row.password,
            birthDate: row.birthDate,
            image: row.image,
            bloodGroup: row.bloodGroup,
            height: row.height,
            weight: row.weight,
            eyeColor: row.eyeColor,
            ip: row.ip,
            macAddress: row.macAddress,
            university: row.university,
            ein: row.ein,
            ssn: row.ssn,
            userAgent: row.userAgent,
            role: row.role,
            hair: {
              color: row.hairColor,
              type: row.hairType
            },
            address: {
              address: row.userAddress,
              city: row.userCity,
              state: row.userState,
              stateCode: row.userStateCode,
              postalCode: row.userPostalCode,
              country: row.userCountry,
              coordinates: {
                lat: row.userLat,
                lng: row.userLng
              }
            },
            bank: {
              cardExpire: row.cardExpire,
              cardNumber: row.cardNumber,
              cardType: row.cardType,
              currency: row.currency,
              iban: row.iban
            },
            crypto: {
              coin: row.coin,
              wallet: row.wallet,
              network: row.network
            },
            company: {
              department: row.companyDepartment,
              name: row.companyName,
              title: row.companyTitle,
              address: {
                address: row.companyAddress,
                city: row.companyCity,
                state: row.companyState,
                stateCode: row.companyStateCode,
                postalCode: row.companyPostalCode,
                country: row.companyCountry,
                coordinates: {
                  lat: row.companyLat,
                  lng: row.companyLng
                }
              }
            }
        }));
        
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
      }
});

module.exports = router;
