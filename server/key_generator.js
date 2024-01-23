import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";

const privateKeyList = [];
let i = 1;
while (i <= 3) {
    const key = secp256k1.utils.randomPrivateKey();
    const hex = toHex(key);
    privateKeyList.push(hex);
    i++;
}

console.log(privateKeyList);
export default privateKeyList;

// console.log(generatePrivateKey());