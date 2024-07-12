const User = require("../model/userModel");

const createUser = async(req, res) => {
    try{
        const {name, dob, email, address} = req.body;
        const user = new User({name, dob, email, address});
        await user.save();
        res.status(201).json(user);
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

const getUsers = async (req, res) => {
    console.log('hi')
    try{
        const users = await User.find();
        console.log('request success')
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const { name, dob, email, address} = req.body;
        const user = await User.findByIdAndUpdate(id, {name, dob, email, address}, {new : true});
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({ message: `User with id ${id} was deleted`, user });
        } else {
            res.status(404).json({ message: `User with id ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}