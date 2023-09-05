/** 
 //* Rutas de usuario / Auth
 //* host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields'
import { validateJWT } from '../middlewares/validate-jwt';

import { createUser, loginUser, revalidateToken } from '../controllers/auth'

const router = Router();


//*Register
router.post(
    '/register',
    // * middlewares
    [
        check('name','name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'password should be at least 6 digits').isLength({min:6}),
        validateFields
    ]
    , createUser)  

//*Login
router.post(
    '/',
    [
        check('email', 'email is required').isEmail(),
        check('password', 'password should be at least 6 digits').isLength({min:6}),
        validateFields
    ], 
    loginUser)  

//*Token
router.get('/renew', validateJWT, revalidateToken)  

export default router