import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRoute.js";
import { dataEntryRouter } from "./routes/dataEntryRoute.js";
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());
dotenv.config({ path: "./config.env"})
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
    "Access-Control-Allow-Credentials": true,
  })
);

//DATABASE CONNECTION
const DB = process.env.DATABASE_STRING.replace("<password>" , process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(() => {
  console.log("DATABASE CONNECTION WAS SUCCESSFULL!");
}).catch((error) => {
  console.log(`error happened when connecting to database ${error}`)
})

//EXPRESS-SESSION CONFIGURATION
/*app.use(
  session({
    name: "sessionId",
    cookie: {
      path: "/",
      secure: false,
      httpOnly: false,
      maxAge: 10 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: false, //saves session back to the session store even if the session was never modified
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB,
      collection: "sessions",
    }),
  })
);*/

app.use(
  session({
    secret: "keyboard cat",
  })
);

//ROUTES
app.use("/auth" , authRouter );
app.use("/data" , dataEntryRouter);


app.get("/" , (req,res) => {
    res.send("<h2>hello to the landing page</h2>");
})


const PORT = process.env.PORT;

app.listen(PORT , () => {
    console.log(`YOUR APP IS LISTENING ON PORT --- ${PORT}`)
} )