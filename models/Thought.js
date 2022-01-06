const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      unique: true,
    },
    username:
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reactions:
    [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction',
    }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema  
  .virtual('reactionCount')
  .get(function ()
  {
    return this.reactions.length
  })


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
