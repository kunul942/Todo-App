import { Request, Response } from 'express';

import { Socket } from "socket.io";

import Chat from "../models/Chat";
import { CustomRequest } from '../middlewares/validate-jwt';

export const getChat =async (req: Request, res: Response)=>{


    const getActiveChats = await Chat.find({ status: true }).populate({
        path:'user',
        select:['name','email','role']
    })
    const getAllChats = await Chat.find().populate({
        path:'user',
        select:['name','email','role']
    })

    //*ADMIN_ROLE the only user who can see even the deleted chats
    const chats:any = (( req as CustomRequest ).role === 'ADMIN_ROLE') ? getAllChats : getActiveChats  

    res.json({
        ok: true,
        msg: 'get chat',
        chats
    })

}

export const createChat = (socket: Socket)=>{

    socket.on('enviar-mensaje', async ( payload )=>{

        const data = {
            text: payload?.text,
            user: payload.user.uid
        }

        const chat = new Chat( data );
        
        const newData = {
            ...payload,
            _id: chat.id
        }

        chat.save();

        socket.emit('create-message-myself', newData)
        socket.broadcast.emit('create-message-people', newData)
    })

}


export const deleteChat = async( req: Request, res: Response ) =>{

    //* User different to ADMIN_ROLE cannot delete any message
    const role = ( req as CustomRequest ).role;
    if( role !== 'ADMIN_ROLE' ){
        return  res.status(401).json({
            ok: false,
            msg: 'you have no permission to do it'
        })
    }
    
    const { id } = req.params
    const chat = await Chat.findByIdAndUpdate(id, { status: false }, {new: true});

    console.log(chat)

    res.json({
        ok: true,
        msg: 'Message deleted succesfully',
        chat
    })

}


export const seed = async (req: Request, res: Response)=>{
    
    const chat = await Chat.deleteMany();
    // const chat = await Chat.updateMany({ status: false });

    console.log(chat)

    res.json({
        ok: true,
        msg: 'Message deleted succesfully',
        chat
    })

}

export const deleteFullChat = async (req: Request, res: Response)=>{
    
    const chat = await Chat.updateMany({ status: false });

    res.json({
        ok: true,
        msg: 'Message deleted succesfully',
        chat
    }) 

}


