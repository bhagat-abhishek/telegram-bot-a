import "dotenv/config";
import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;
const CB_URL = process.env.CB_URL;

app.get("/", async (req, res) => {
  console.log("get");

  res.json(req.body);
});

app.post("*", async (req, res) => {
  console.log(req.body);

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: req.body.message.chat.id,
    text: req.body,
  });

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: req.body.message.chat.id,
    text:  req.body.message.photo[3].file_id,
  });

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
    chat_id: req.body.message.chat.id,
    photo: req.body.message.photo[3].file_id,
  });

  res.send()

});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
