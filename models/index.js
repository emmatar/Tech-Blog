const User = require('./User');
const Blog = require('./BlogPost');
const Comment = require('./Comment');

//User has many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//Blog belong to one User
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
//User has many blogs
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

//Blog belong to one User
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

//User has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

//Comment belongs to one User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };
