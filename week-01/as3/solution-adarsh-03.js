const crypto = require("crypto");

function findHashWithPrefix(prefix) {
    let nonce = 0;
    while (true) {
      let inputStr = `harkirat => Raman | Rs 100 Ram => Ankit | Rs 101935085 ${nonce}`; // change here to solve the assignment
      let hash = crypto.createHash("sha256").update(inputStr).digest("hex");
      if (hash.startsWith(prefix)) {
        return { input: inputStr, hash, nonce };
      }
      nonce++;
    }
  }

const result = findHashWithPrefix("00000");
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);
console.log(`Nounce: ${result.nonce}`);