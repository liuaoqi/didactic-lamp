const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const JournalEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    entry: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      minlength: 1,
      trim: true,
      validate: {
          validator: validator.isEmail,   // custom validator
          message: 'Not valid email'}
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    region: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    rating: {
        type: String,
    },
    admin: { 
        type: Boolean
    },
    journalEntries: {
        type: [JournalEntrySchema]
    }
});

UserSchema.pre('save', function(next) {
	const user = this; 
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject("user not found")
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    reject(err)
                }
				if (result) {
					resolve(user)
				} else {
					reject("incorrect password")
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }