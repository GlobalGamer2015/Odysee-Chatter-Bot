const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    return res.status(404).send('Page does not exist.');
})

module.exports = router