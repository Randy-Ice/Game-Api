const mongoose = require('mongoose')
const express = require('express');
const logger = require('./Log/winston');
require('dotenv').config()
const port = process.env.PORT
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')

//register routes
const gamesRoutes = require('./Routes/gameRoutes.js')

//uncaught exceptions
process.on('uncaughtException', (ex) => {
    console.log(ex.message)
    logger.error(ex, ex.message)
})



//middleware
app.use(express.json())
app.use(helmet())
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled')
}



app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api/games', gamesRoutes)



mongoose.connect(process.env.MONGODB)
.then(() => {
    app.listen(port, () => {
    console.log(`listening on ${port}`)
    })
})
.catch((err) => {
    console.log(err.message)
    logger.error(err, err.message)
})

//fin