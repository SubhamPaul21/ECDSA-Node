import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";

const privateKeyList = [];
let i = 1;
while (i <= 3) {
    const key = secp256k1.utils.randomPrivateKey();
    const hex = toHex(key);
    const publicKey = toHex(secp256k1.getPublicKey(hex));
    console.log("Private Key: ", hex);
    console.log("Public Key: ", publicKey);
    console.log("\n");
    privateKeyList.push(hex);
    i++;
}

// console.log(privateKeyList);
export default privateKeyList;

// console.log(generatePrivateKey());