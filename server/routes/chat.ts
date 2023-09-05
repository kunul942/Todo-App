/** 
    //* Rutas de Chat
    //* host + /api/messages
*/

import { Router } from "express"
import { check } from "express-validator";

import { deleteChat, getChat, seed, deleteFullChat } from "../controllers"

import { validateJWT } from "../middlewares/validate-jwt";
import { chatExistById, statusChat } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate-fields";



const route = Router();


route.get('/', validateJWT ,getChat);

//**Borrar todos los chats de la DB*/
route.get('/', seed);

//*DELETE
route.delete('/:id',[
    validateJWT,
    check('id', 'it is not mongo id valid').isMongoId(),
    check('id').custom( chatExistById ),
    check('id').custom( statusChat ),
    validateFields
], deleteChat)

//*DELETE ALL MESSAGES
route.delete('/', deleteFullChat)

export default route;
