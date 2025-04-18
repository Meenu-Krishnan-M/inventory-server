const express = require("express");
const adminController = require('../controllers/adminController')
const staffController = require('../controllers/staffController')
const productController = require('../controllers/productController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router();

router.post('/admin-login',adminController.adminLoginController)
router.post('/register-login',adminController.staffRegisterController)
router.post('/staff-login',staffController.staffLoginController)
router.post('/add-product',jwtMiddleware,productController.addProductController)
router.get('/all-product',jwtMiddleware,productController.getAllProductController)
router.get('/all-staffs',jwtMiddleware,adminController.getAllStaffController)
router.put('/update-product/:id/edit',jwtMiddleware,productController.editProductController)
router.delete('/delete-product/:id/remove',jwtMiddleware,productController.removeProductController)
router.put('/update-staff/:id/edit',jwtMiddleware,adminController.editStaffController)
router.delete('/delete-staff/:id/remove',jwtMiddleware,adminController.removeStaffController)
router.post('/sales',jwtMiddleware,productController.submitSale)
router.get('/out-of-stock', jwtMiddleware, productController.getOutOfStockProducts);
router.get('/total', jwtMiddleware,productController.getTotalProducts);


module.exports = router
