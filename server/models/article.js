const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  territories: {
    type: Array,
    default: [],

  }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(title => title.length, 'Title cannot be blank');
ArticleSchema.path('content').validate(content => content.length, 'Content cannot be blank');
ArticleSchema.path('territories').validate(territories => territories.length, 'Territories cannot be blank');




mongoose.model('Article', ArticleSchema);
