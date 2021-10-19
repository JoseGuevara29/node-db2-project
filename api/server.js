const express = require("express")

const server = express()

// DO YOUR MAGIC
server.use(express.json())

const carsRouter = require("./cars/cars-router")

server.use("/api/cars",carsRouter)

server.get("/", (res)=>{
res.status(200).json({api: "isup"})
})
module.exports = server
