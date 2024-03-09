import mongoose from 'mongoose'
import logger from '../utils/logger.js'


export default async function(config){
const url = `mongodb://${config.host}:${config.port}/${config.dbname}`
 try{
    await mongoose.connect(url)
    logger.info(`Connect to MongoDb at ${url}`)
 }catch(err){
  logger.error(`Error connecting to MongoDB at ${url} \n ${err}`)
 }

}
