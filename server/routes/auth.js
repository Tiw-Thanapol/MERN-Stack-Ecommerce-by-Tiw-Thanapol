const express = require('express')
const router = express.Router()


// controller
const { register,
        login,
        listUser,
        editUser,
        deleteUser,
        currentUser 
    } = require('../controllers/auth')

// middleware
const {auth,adminCheck} = require('../middleware/auth')


// END point http://localhost:3000/api/register
// Method POST
// Access Publish
router.post('/register',register);


// END point http://localhost:3000/api/login
// Method POST
// Access Publish
router.post('/login',login);


// END point http://localhost:3000/api/current-user
// Method POST
// Access Private
router.post('/current-user',auth,currentUser );

// END point http://localhost:3000/api/current-admin
// Method POST
// Access Private
router.post('/current-admin',auth,adminCheck,currentUser );



// END point http://localhost:3000/api/auth
// Method GET
// Access Publish
router.get('/auth',listUser)



// END point http://localhost:8888/api/auth
// Method PUT
// Access Publish
router.put('/auth',editUser)


// END point http://localhost:8888/api/auth
// Method DELETE
// Access Publish
router.delete('/auth',deleteUser)




module.exports = router