import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      if (secp256k1.utils.isValidPrivateKey(recipient) && secp256k1.utils.isValidPrivateKey(address)) {
        const userPublicKey = secp256k1.getPublicKey(address);
        const recipientPublicKey = secp256k1.getPublicKey(recipient);
        const message = `${userPublicKey} sent Amount: ${parseInt(sendAmount)} to ${recipientPublicKey}`;
        const messageHash = keccak256(utf8ToBytes(message));
        const signature = secp256k1.sign(messageHash, address);
        const isVerified = secp256k1.verify(signature, messageHash, userPublicKey);

        if (isVerified) {
          const {
            data: { balance },
          } = await server.post(`send`, {
            sender: address,
            amount: parseInt(sendAmount),
            recipient,
          });
          setBalance(balance);
        } else {
          const error = {
            "response": {
              "data": {
                "message": "Unverified User",
              }
            }
          };
          throw new Error(JSON.stringify(error));
        }
      } else {
        const error = {
          "response": {
            "data": {
              "message": "Invalid Private Key",
            }
          }
        };
        throw new Error(JSON.stringify(error));
      }
    } catch (ex) {
      if (ex.message) {
        const message = JSON.parse(ex.message);
        alert(message.response.data.message);
      } else {
        alert("Invalid action");
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type the public address of Recipient"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
