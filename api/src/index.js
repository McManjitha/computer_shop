const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")

const server = require("./config/server");
const db = require("./config/db");

const quoteRouter = require("./router/quoteRouter");
const adminRouter = require("./router/adminRouter");
const productRouter = require("./router/productRouter");
const categoryRouter = require("./router/categoryRouter");
const bannerRouter = require("./router/bannerRouter");
const attributeRouter = require("./router/attributeRouter");

const app = express();
dotenv.config();

const whitelist = ["http://localhost:19006", "http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());


app.use("/attribute", attributeRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/quote", quoteRouter);
app.use("/category", categoryRouter);
app.use("/banner", bannerRouter);

app.use("/public", express.static(__dirname + "/public"));

// app.use("/", (req, res) => {
//     res.send("API end point");
// });

app.listen(server.port, () => {
    console.log(`Server listening on ${server.port}`);
});

db();
