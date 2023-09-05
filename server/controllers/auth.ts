import { Request, Response } from 'express';

import bcrypt from 'bcryptjs'
import User from '../models/User'

import { generateJWT } from '../helpers/jtw';
import { CustomRequest } from '../middlewares/validate-jwt';

export const createUser = async (req:Request, res: Response)=>{

    
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if( user ){
            return res.status(400).json({
                ok:false,
                msg: 'User with this email already exists'
            })
        }
        
        user = new User( req.body )
        
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password , salt );
        

        await user.save()

        //Generar JWT
        const token = await generateJWT( user.id, user?.name, user?.role || '' );

        res.status(201).json({
            ok:true,
            msg: `User saved succesfully`,
            uid: user.id,
            name: user.name,
            role: user.role,
            token
        })  
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Talk with admin'
        })
    }


}


export const loginUser = async ( req:Request, res: Response ) =>{

    const { email, password } = req.body
    
    try {
        // data de base de datos
        let user = await User.findOne({ email })
        if( !user ){
            return res.status(400).json({
                ok:false,
                msg:`User does not exist with email ${ email }`
            })
        }


        //confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user?.password || '' );
        if( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrect'
            })
        }

        // Generar JWT
        const token = await generateJWT( user.id, user?.name, user?.role || '' );

        res.json({
            ok: true,
            msg: "login success",
            uid: user.id,
            name: user.name,
            role: user.role,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Talk with admin'
        })
    }

}


export const revalidateToken = async ( req:Request, res: Response ) =>{

    const uid = (req as CustomRequest).uid
    const name = ( req as CustomRequest ).name
    const role = ( req as CustomRequest ).role


    const token = await generateJWT( uid, name, role );

    res.json({
        ok: true,
        name,
        uid,
        role,
        token
    })
}