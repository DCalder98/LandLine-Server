import User from "../mongoDB/models/User.js";

const getAllUsers = async (req, res) => {

}

const createUser = async (req,res) => {

    try {
        
        const {name, email, avatar} = req.body
    
        const userExists = await User.findOne({email})
    
        if (userExists) return res.status(200).json(userExists)
    
        const newUser = await User.create({
            name,
            email,
            avatar
        })
    
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserInfoByID = async (req, res) => {

}

export {
    getAllUsers,
    createUser,
    getUserInfoByID
}