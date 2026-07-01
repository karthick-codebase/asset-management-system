const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",

  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Neon PostgreSQL connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });


module.exports = sequelize;