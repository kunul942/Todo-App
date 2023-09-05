import { Request, Response } from 'express';
import Todo from '../models/Todo';
import { CustomRequest } from '../middlewares/validate-jwt';


export const getTodos = async ( req: Request, res: Response ) =>{

    let todos = await Todo.find({ status: true }).populate('user', ['name','email']);

    //* get todos depending on user authenticated
    const user = ( req as CustomRequest ).uid.toString();
    todos = todos.filter( (todo)=> todo.user._id.toString() === user );


    res.json({
        ok: true,
        msg:'Get Todos',
        todos
    })
}

export const getTodoById = async ( req: Request, res: Response ) =>{

    const { id } = req.params

    // get data from db
    const todo = await Todo.findById( id )
        .populate({
            path:'user',
            select:['name','email']
        })

    res.json({
        ok: true,
        msg:'Get Todos By Id',
        id: todo?.id,
        desc: todo?.desc,
        completed: todo?.completed,
        status: todo?.status,
        user: todo?.user
    })
}

export const createTodo = async(req: Request ,res: Response ) =>{
    
    const { desc, completed } = req.body

    try {

        const data = {
            desc, 
            completed,
            user: ( req as CustomRequest ).uid //user logged
        }

        const todo = new Todo( data )

        await todo.save()

        res.json({
            ok: true,
            msg: 'Todo saved succesfully',
            todo
        })

    } catch (error) {
        console.log( error, 'error en controllador creando TODO' );

        res.status(500).json({
            ok:false,
            msg: 'talk with admin'
        })
    }
}

export const updateTodo = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const uid = ( req as CustomRequest ).uid

    try {        
        let todo = await Todo.findById( id );

        //*usuario tratando de actualizar TODO de otra persona
        const todoString = todo?.user.toString();
        if( todoString !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You are not authorized to edit this TODO'
            })            
        }

        const body = req.body;
        const newTodo ={
            ...body,
            user: uid
        }

        const todoUpdated = await Todo.findByIdAndUpdate( id, newTodo, {new: true} );

        res.json({
            ok: true,
            msg: 'Todo updated succesfully',            
            id: todoUpdated?.id,
            desc: todoUpdated?.desc,
            completed: todoUpdated?.completed,
            status: todoUpdated?.status,
            user: todoUpdated?.user,
        })

    } catch (error) {
        console.log(error, 'error en UPDATE TODO');
        res.status(500).json({
            ok:false,
            msg: 'talk with admin'
        })
    }


}

export const deleteTodo = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    
    try {
        const query = { status: false }
        const todoDeleted = await Todo.findByIdAndUpdate( id, query )
        
        res.json({
            ok: true,
            msg: 'Todo has been deleted succesfully',
            todoDeleted,
        })

    } catch (error) {
        console.log(error, 'Error deleting TODO');
        res.status(500).json({
            ok: false,
            msg: 'talk with admin'
        })
    }

}

export const toggleTodo = async ( req: Request, res:Response ) =>{

    const { id } = req.params;
    try {
        
        // TODO: arreglar TOGGLE
        const toggleCompleted:any = await Todo.findById( id );
        const newToggle:any = !toggleCompleted.completed;

        const toggle = await Todo.findByIdAndUpdate( id, { completed: newToggle } ,{ new: true } );

        res.status(200).json({
            ok:true,
            msg: 'Toggle success',
            toggle
        })

    } catch (error) {
        console.log({ error }, 'ERES TU EL ERROR?'); 
        res.status(500).json({
            ok: false,
            msg: 'talk with admin',
        })
    }

}
