import express from 'express'
import initDatabase from './utils/Database.js'
import heroRoutes from './routes/heroRoutes.js'
import ConfigHelper from '../config/ConfigHelper.js'

const configHelper = new ConfigHelper()

initDatabase()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({ sucess: true, message: 'the application is alive' })
});

app.use('/heroes', heroRoutes);

app.listen(configHelper.PORT, () => {
    console.log(`The Application Is Running On The PORT ${configHelper.PORT}`)
})
