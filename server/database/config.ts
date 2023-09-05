import mongoose from 'mongoose';

export const dbConnection = async() =>{
    try {
        mongoose.connect( process.env.DB_CNN || 'mongodb+srv://user_todo_app:K5s7hmy12SEqaZiL@tododb.yyb7qzz.mongodb.net/todo_app')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB')      
    }
} 
