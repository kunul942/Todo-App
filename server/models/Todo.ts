import { model, Schema } from "mongoose";


const TodoSchema = new Schema({
    desc:{
        type: String,
        required: true   
    },
    completed:{
        type: Boolean,
        required: true
    },
    status:{
        type: Boolean,
        default: true,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

TodoSchema.methods.toJSON = function(){
    const { __v, _id, ...todo } = this.toObject()
    todo.id = _id;
    return todo
}


export default model('Todo', TodoSchema);