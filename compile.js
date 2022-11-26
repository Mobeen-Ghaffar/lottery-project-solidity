const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');



var input = {
    language: 'Solidity',
    sources: {
        'lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output);
// let ABI = output.contracts["lottery.sol"]["Lottery"].abi;
// let bytecode = output.contracts["lottery.sol"]["Lottery"].evm.bytecode.object;
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts["inbox.sol"].Inbox)
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["lottery.sol"].Lottery