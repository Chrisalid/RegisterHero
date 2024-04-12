import { mongoose } from 'mongoose'
import ConfigHelper from '../../config/ConfigHelper.js'

const configHelper = new ConfigHelper()

export const initDatabase = () => {
    mongoose.connect(configHelper.getMongoConnection(), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('The connection with DataBase is already satisfied')
    }).catch(err => {
        console.error('Connection error: ', err);
        process.exit()
    })
}

export default initDatabase