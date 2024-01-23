import express, { json } from "express";
const app = express();
import cors from "cors";
const port = 3042;
import privateKeyList from "./key_generator.js";

app.use(cors());
app.use(json());

const balances = {};

balances[privateKeyList.at(0)] = 100;
balances[privateKeyList.at(1)] = 50;
balances[privateKeyList.at(2)] = 75;


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
