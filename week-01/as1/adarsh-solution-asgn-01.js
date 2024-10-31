const crypto = require('crypto');

function findHashWithPrefix(prefix) {
    let input = "596138";
    let nounce = 0;
    // initilize input with the correct value.
    while (true) {
        const inputData = input + nounce;
        const hash = crypto.createHash('sha256').update(inputData).digest('hex');
        if(hash.startsWith(prefix)) {
            console.log(hash);
            return { input, hash, nounce, inputData };
    }
    nounce++;

}
}

const result = findHashWithPrefix('00000');
console.log(`Input: ${result.input}`);
console.log(`Output Hash: ${result.hash}`);

// console.log(`Output Nounce: ${result.nounce}`);