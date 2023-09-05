import { Schema, model } from "mongoose";


const ChatSchema = new Schema({
    text: {
       type: String,
       required: true
    },
    status:{
        type: Boolean,
        default: true,
        required:true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model( 'chat', ChatSchema );