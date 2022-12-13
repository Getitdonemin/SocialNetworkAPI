// Our model will need mongose so were going to import mongoose
const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Here we are using REGEX! The email component to validate a correct email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

// the 'friendcount' will get the sum of all friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// with our UsersSchema this will create our users model
const Users = model('Users', UsersSchema);

module.exports = Users;
//exporting user model