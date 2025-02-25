const express = require("express");
const cors = require("cors");
const App = express();
const port = 3003
const db=require("./models/index")

App.use(cors())
App.use(express.json());
App.use(express.urlencoded({ extended: true }));


const AnimalRoutes = require("./routes/Animals");
const CropRoutes = require("./routes/Crops");
App.use("/animals", AnimalRoutes);
App.use("/crops", CropRoutes);




App.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
module.exports=App