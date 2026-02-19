import dotenv from 'dotenv';
import app from "./app.js"
dotenv.config();

if (!process.env.PORT) {
  console.error("PORT is missing in .env");
  process.exit(1);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
