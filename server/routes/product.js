const express = require('express')
const router = express.Router()

// controllers
const { 
    create,
    list,
    remove,
    read,
    update,
    listBy,
    searchFilters
        } = require('../controllers/product')

// middleware
const { auth, adminCheck} = require('../middleware/auth')



// END point http://localhost:8888/api/product

router.post('/product' ,auth, adminCheck,create)
router.get('/product/:count' ,list)
router.delete('/product/:id', auth, adminCheck, remove)

//update
// END point http://localhost:8888/api/products
router.get('/products/:id' ,read)
router.put('/product/:id',auth, adminCheck, update)

router.post('/productby',listBy)

// Search
//END point http://localhost:8888/api/search/filters
router.post('/search/filters',searchFilters)





module.exports = router;