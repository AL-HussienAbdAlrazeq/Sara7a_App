import mongoose from "mongoose";

 const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb://localhost:27017/Sara7a_App"
    )
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log("Connection Failed");
    });
};
export default dbConnection
