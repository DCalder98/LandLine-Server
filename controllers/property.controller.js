import mongoose from "mongoose";
import Property from "../mongoDB/models/Property.js";
import User from "../mongoDB/models/User.js";
import * as dotenv from 'dotenv'
import { v2 as cloudinary} from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({}).limit(req.query._end)

        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getPropertyDetails = async (req, res) => {

}

const createProperty = async (req, res) => {


    try {
        
        const {
            title, 
            description, 
            propertyType, 
            location, 
            price, 
            photo, 
            email} = req.body
    
        // Start a new session
        const session = await mongoose.startSession()
    
        session.startTransaction()
    
        const user = await User.findOne({email}).session(session)
    
        if(!user) throw new Error('User not found')
    
        const photoURL = await cloudinary.uploader.upload(photo) 
    
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoURL.url,
            creator: user._id
        })
    
        user.allProperties.push(newProperty._id)
        await user.save({session})
        await session.commitTransaction()
    
        res.status(200).json({message: 'Property Created Successfully!'})
    } catch (error) {
        res.status(400).send({message: 'Upload Failed'});
    }
}

const updateProperty = async (req, res) => {

}

const deleteProperty = async (req, res) => {

}

export {
    getAllProperties,
    getPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty
}