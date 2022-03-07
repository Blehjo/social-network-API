const { Schema, model } = require('mongoose');

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: { 
        type: Schema.Types.ObjectId, 
        default: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
  },
  {
    toJSON: {
        getters: true,
        },
    id: false,
});


module.exports = reactionSchema;
