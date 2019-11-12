const router = require('express').Router(); 
const auth = require('./authentication/auth')
const verifyToken = require('./authentication/verifyToken')
const contact = require('./contact/contact')


router.use('/auth',auth)
router.use('/contact',verifyToken,contact)



module.exports = router;