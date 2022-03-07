const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String, 
        required: true, 
        trim: true, 
        minLength: 1, 
        maxLength: 280, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: 
    },
    username: {

    },
    reactions: [Reaction],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
