const crypto = require('crypto');

function findHashWithPrefix(prefix) {
    let input = 0;
    while (true) {
        // can you guess what we need to add ??
        let inputStr = "100xdevs2274885";  
        let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
        if (hash.startsWith(prefix)) {
            return { input: inputStr, hash: hash };
        }
        input++;
    }
}

// Find and print the input string and hash
const result = findHashWithPrefix('00000');
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);