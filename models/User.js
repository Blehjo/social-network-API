const { Schema, model } = require('mongoose');

function obfuscate(email) {
  const separatorIndex = email.indexOf('@');
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return email.slice(0, separatorIndex).replace(/./g, '*') +
      email.slice(separatorIndex);
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return email.slice(0, 2) +
    email.slice(2, separatorIndex).replace(/./g, '*') +
    email.slice(separatorIndex);
}

// Schema to create User model
const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      trim: true, 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /.+\@.+\..+/,
      get: obfuscate,
      set: v => v.toLowerCase(),
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
