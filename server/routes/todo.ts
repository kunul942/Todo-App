/*
    /Todo Routes
    /api/todo

*/


import { Router } from 'express';
import { check } from 'express-validator';

import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo, toggleTodo } from '../controllers/todo';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

import { todoExistById, statusTodo } from '../helpers/db-validators';


const router = Router();

// todas las rutas tienen validateJWT 
router.use( validateJWT  )

//* Get all TODO
router.get('/', getTodos)

//* Get TODO by ID
router.get('/:id',[
    check('id', 'it is not a mongo id valid').isMongoId(),
    check('id').custom( todoExistById ),
    check('id').custom( statusTodo ),
    validateFields
], getTodoById)

//*Create TODO
router.post('/',[
    check('desc', 'todo description is required').not().isEmpty(),
    validateFields
], createTodo);

//*Update TODO
router.put('/:id',[
    check('desc', 'todo description is required').not().isEmpty(),
    check('id', 'it is not mongo id valid').isMongoId(),
    check('id').custom( todoExistById ),
    check('id').custom( statusTodo ),
    validateFields,
], updateTodo)

//*Update TOGGLE
router.put('/toggle/:id',[
    check('id', 'it is not mongo id valid').isMongoId(),
    check('id').custom( todoExistById ),
    check('id').custom( statusTodo ),
    validateFields
], toggleTodo)

//*Delete TODO
router.delete('/:id',[
    check('id', 'it is not mongo id valid').isMongoId(),
    check('id').custom( todoExistById ),
    check('id').custom( statusTodo ),
    validateFields
], deleteTodo)



export default router;