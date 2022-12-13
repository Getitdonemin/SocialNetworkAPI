// Needs the user model 
const {Users} = require('../models');

// This will set up all users controller
const usersController = {
    
    // Creating a brand new user
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // Gather all users
    getAllUsers(req, res) {
        Users.find({})
        // makes a users thought
        .populate({path: 'thoughts', select: '-__v'})
        // makes a users friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a user by their ID
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // this will be in use when user is not found
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No users were found with this ID'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Updating a user by its ID
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user were found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user were found with this ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // deleting a current user by their ID
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No user were found with this ID'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // deleting a current friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user were found with this ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// Exporting users controller module
module.exports = usersController; 