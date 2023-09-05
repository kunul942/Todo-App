import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        uniqued: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        required: [true, 'role is required'],
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default:true
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}


export default model('User', UserSchema);