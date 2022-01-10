const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      max_length: 280,
      min_length: 1
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: () => this.toLocaleDateString("en-US"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


module.exports = reactionSchema;
