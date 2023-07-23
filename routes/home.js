const express = require('express')
const router = express.Router()

// just a hello world
router.get('/', (req, res) => {
    res.send('Hello World!');
})

module.exports = router;