const express = require('express')
const app = express()
const cors = require('cors')

// middleware
app.use(express.json()) //req.body
app.use(cors())

// request listener
app.listen(5000, () => {
    console.log('Server is live on port 5000')
})