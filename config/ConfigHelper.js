import { env } from 'process'

import loadEnv from '../src/utils/Utility.js'

export class ConfigHelper {
    constructor() {
        loadEnv()

        this.PORT = env.PORT
        this.MongoConnectionString = decodeURIComponent(env.MONGO_URI)

        this.validate()
    }

    validate() {
        if (!this.PORT || !this.MongoConnectionString) {
            throw new Error('Variáveis de ambiente ausentes. Verifique o arquivo .env.');
        }
    }

    getMongoConnection() {
        return this.MongoConnectionString
    }
}

export default ConfigHelper;