const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");
const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log("Users created:", users);

    for (const blog of blogData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const createdBlog = await Blog.create({
        ...blog,
        user_id: randomUser.id,
      });
      console.log("Blog created:", createdBlog);
    }

    for (const comment of commentData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomBlog = await Blog.findOne({
        order: sequelize.random(),
      });
      const createdComment = await Comment.create({
        ...comment,
        user_id: randomUser.id,
        blog_id: randomBlog.id,
      });
      console.log("Comment created:", createdComment);
    }

    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
