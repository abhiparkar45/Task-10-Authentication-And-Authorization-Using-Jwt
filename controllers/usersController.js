const db = require('../models/index');
const Users = db.Users;
const bcrypt = require('bcrypt');

exports.newUser = async (req, res) => {
    const user = req.body
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const result = await Users.create(user);

    res.status(201).json({
        sucess: true,
        message: "User Registered SuccessFully !",
        data: result
    });
}

exports.getAllUsers = async (req, res) => {
    const users = await Users.findAll();

    res.status(200).json({
        success: true,
        data: users
    })
}

exports.getCurrentUser = async (req, res) => {
    const user = await Users.findOne({ 
        where: { id: req.user.id },
        attributes: {
            exclude: ['password']
        }
    });

    res.status(200).json({
        success: true,
        data: user
        // data: user
    })
}

exports.deleteUser = async (req, res) => {
    const user = await Users.findOne({ where: { id: req.params.id }});
    
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not Found !"
        });
    }
    const deletedUser = await Users.destroy({where:{id:req.params.id}});
    if(deletedUser){
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully !",
            deletedUser:user
        })
    }
}