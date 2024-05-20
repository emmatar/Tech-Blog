// require associated model
const { Blog } = require('../models');

const blogData = [
  {
    title: 'Music Near Me',
    body: 'A mobile app that will send you notifications whenever a concert is playing in your area.',
    user_id: 2,
  },
  {
    title: 'The Ultimate Tech Quiz',
    body: 'A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!',
    user_id: 1,
  },
  {
    title: 'Roll Them Up',
    body: 'A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.',
    user_id: 3,
  },
];

const seedBlog = () => Blog.bulkCreate(blogData);
module.exports = seedBlog;