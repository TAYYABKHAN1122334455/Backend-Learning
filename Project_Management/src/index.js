import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from "./db/db.js";
dotenv.config({ path: "./.env" });

if (!process.env.PORT) {
  console.error("PORT is missing in .env");
  process.exit(1);
}

const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
  app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
})
.catch((err)=>{
  console.error("MongoDB Disconnected ",err);
  process.exit(1);
})
