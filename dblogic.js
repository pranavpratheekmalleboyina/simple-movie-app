import app from "./server.js"
import mongodb from "mongodb"
//import ReviewsDAO from "./dao/reviewsDAO.js"
import dotenv from "dotenv"
dotenv.config() //in order to load the .env file 

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME  //reading from the .env file
const mongo_password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@pranavcluster1.lnjpiih.mongodb.net/?retryWrites=true&w=majority&appName=PranavCluster1`

const port = 8000

MongoClient.connect(
    uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500
  }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(
    async client => {
    //await ReviewsDAO.injectDB(client)
    console.log(`Connected to the DB!`)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })