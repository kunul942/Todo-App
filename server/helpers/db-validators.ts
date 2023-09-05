import { User, Todo, Chat } from '../models'


export const todoExistById =  async( id:string ) =>{

    const todoExist = await Todo.findById( id )
    if( !todoExist ){
        throw new Error(`Todo Id: ${ id }, does not exist`);
    }

}

export const statusTodo = async( id:string )=>{

    const todoStatus = await Todo.findById( id )
    if( !todoStatus?.status ){
        throw new Error('Todo has been deleted');
    }

}

export const chatExistById = async( id:string )=>{

    const chatExist = await Chat.findById( id );
    if( !chatExist ){
        throw new Error(`Message ID: ${ id }, does not exist`);
    }   
}

export const statusChat = async(id: string)=>{
    const chatStatus = await Chat.findById( id );
    if( !chatStatus?.status ){
        throw new Error('Chat has been deleted')
    }

}