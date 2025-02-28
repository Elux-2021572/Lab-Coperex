import { Schema, model } from "mongoose";
import { defaultCategory } from '../../configs/defaultCategory.js';

const enterpriseSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [35, "Name cannot exceed 35 characters"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: defaultCategory
    },
    
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minLength: 8,
        maxLength: 11,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    impactLevel: {
        type: String,
        required: true,
        enum: ["HIGH", "MEDIUM", "LOW"],
        default: "MEDIUM"
    },
    yearFoundation: {
        type: Date,
        required: true,
        set: (value) => {
            return new Date(value.getFullYear(), value.getMonth(), value.getDate());
        }
    },
    
}, {
    timestamps: true, 
    versionKey: false
});

enterpriseSchema.virtual('yearsInService').get(function () {
    const currentYear = new Date().getFullYear();
    const foundationYear = this.yearFoundation.getFullYear();
    return currentYear - foundationYear;
});

export default model('Enterprise', enterpriseSchema);
