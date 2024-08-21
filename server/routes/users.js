const express = require('express')
const router = express.Router()


// controller
const { 
    listUsers, 
    readUsers,
    updateUsers,
    removeUsers,
    changeRole,
    changeStatus,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder
} = require('../controllers/users')

// middleware
const { auth,adminCheck } = require('../middleware/auth')

// END point http://localhost:8888/api/users
// Method GET
// Access Private
router.get("/users",auth, adminCheck, listUsers);

// END point http://localhost:8888/api/users/:id
// Method GET
// Access Private
router.get("/users/:id",readUsers);

// END point http://localhost:8888/api/users/:id
// Method PUT
// Access Private
router.put("/users/:id",auth, adminCheck,updateUsers);

// END point http://localhost:8888/api/users/:id
// Method DELETE
// Access Private
router.delete("/users/:id",removeUsers);

// END point http://localhost:8888/api/changeStatus
// Method POST
// Access Private
router.post("/change-status",auth, adminCheck,changeStatus);

// END point http://localhost:8888/api/changeRole
// Method POST
// Access Private
router.post("/change-role",auth, adminCheck,changeRole);

// END point http://localhost:8888/api/user/cart
// Method POST/GET
// Access Private
router.post("/user/cart",auth, userCart);
router.get("/user/cart",auth, getUserCart);
router.delete("/user/cart",auth, emptyCart);

router.post("/user/address",auth, saveAddress);
//order
router.post("/user/order",auth, saveOrder);
router.get("/user/orders",auth, getOrder);

//wishlist
router.post("/user/wishlist",auth, addToWishList);
router.get("/user/wishlist",auth, getWishList);
router.put("/user/wishlist/:productId" , auth, removeWishList)






module.exports = router;