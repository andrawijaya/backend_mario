import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { storage, fileFilter } from "./src/configs/multer.config.js";
import register from "./src/routes/register.route.js";
import product from "./src/routes/product.route.js";
import authentication from "./src/routes/authentication.route.js";
import refreshToken from "./src/routes/refreshToken.route.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost" }));
app.use(
    multer({
        storage: storage,
        fileFilter: fileFilter,
    }).single("gambar")
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(register);
app.use(authentication);
app.use(refreshToken);
app.use(product);

app.listen(process.env.APP_PORT || 3000, () => {
    console.info(`app running on port ${process.env.APP_PORT}`);
});

export default app;
