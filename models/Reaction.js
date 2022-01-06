const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

reactionSchema  
  .virtual('date')
  .get(function ()
  {
    const date = new Date(this.createdAt);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${month}/${day}/${year}`
  })


const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
