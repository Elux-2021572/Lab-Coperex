import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [15, "Name cannot exceed 15 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [15, "Surname cannot exceed 15 characters"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    role:{
        type: String,
        required: true,
        default:'ADMIN_ROLE'
    }, 
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)