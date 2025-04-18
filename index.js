//import dotenv - loads .env file content into process.env by default
require('dotenv').config()
//import express
const express = require('express')
//import cors
const cors = require('cors')

const router = require('./routes/router')
require('./config/connection')
//create express server
const inventoryServer = express()

inventoryServer.use(cors())
inventoryServer.use(express.json())
inventoryServer.use(router)
//port only work - deployment
const PORT = 3000 || process.env.PORT

inventoryServer.listen(PORT,()=>{
    console.log(`SERVER START RUNNING AT PORT :${PORT}`);
})
//http://localhost:3000/- base url
inventoryServer.get('/',(req,res)=>{
    res.status(200).send(`SERVER START RUNNING SUCCESSFULLY`)
})
// inventoryServer.post('/',(req,res)=>{
//     res.status(200).send(`post request`)
// })