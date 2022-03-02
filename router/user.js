const router = require('express').Router();

router.get('/', async(req, res) => {
    res.send('I am from user');
})

module.exports = router;