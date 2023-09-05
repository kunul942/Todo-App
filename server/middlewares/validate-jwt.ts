import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    uid: string;
    name: string;
    role: string;
}


export const validateJWT = ( req: Request,res:Response,next:NextFunction ) =>{

    //*x-token headers
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    
    //*validate token
    try {

        const { uid, name, role } = jwt.verify( token, process.env.SECRET_JWT_SEED || 'Esto_es_Una_Palabra_Secreta' ) as { uid: string, name: string, role: string};
        (req as CustomRequest).uid = uid;
        (req as CustomRequest).name = name;
        (req as CustomRequest).role = role;



    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg:'token is not valid'
        })
    }

    next();

}