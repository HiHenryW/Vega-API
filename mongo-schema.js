const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qaSchema = new Schema({
  product_id: String,
  questions: [
    {
      id: Number,
      body: String,
      date: Date,
      asker_name: String,
      helpfulness: Number,
      reported: Number,
      answers: [
        {
          id: Number,
          body: String,
          date: Date,
          answerer_name: String,
          helpfulness: Number,
          photos: [
            {
              id: Number,
              url: String,
            },
          ],
        },
      ],
    },
  ],
});
