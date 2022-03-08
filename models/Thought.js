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
        get: (createDate) => Intl.DateTimeFormat('en-US').format(createDate)
    },
    username: [
      {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
      },
  ],
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
