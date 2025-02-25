const { Sequelize, DataTypes } = require("sequelize")
const config = require("./config/config")
const connection = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect
    }
);
  connection
  .authenticate()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    throw err;
  });
  const db={}
  db.Sequelize=Sequelize
  db.connection=connection

  db.Animal=require("./Animal")(connection, DataTypes)
  db.Crop=require("./Crop")(connection, DataTypes)  
  db.AnimalDetails=require("./AnimalDetails")(connection, DataTypes)
  db.CropDetails=require("./CropDetails")(connection, DataTypes)

  db.Crop.hasOne(db.CropDetails, { foreignKey: 'cropId' });
  db.CropDetails.belongsTo(db.Crop, { foreignKey: 'cropId' });
  db.Animal.hasOne(db.AnimalDetails, { foreignKey: 'animalId' });
  db.AnimalDetails.belongsTo(db.Animal, { foreignKey: 'animalId' });

//    connection
//   .sync({ force: true })
//   .then(() => console.log("tables are created"))
//   .catch((err) => {
//     throw err;
//   });
  module.exports=db