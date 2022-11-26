const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');

const contract = require('./compile');

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: "arrow inch zebra work royal quarter ugly pumpkin biology place pledge chase"
    },
    providerOrUrl: "https://goerli.infura.io/v3/386c1f8ff9504742af3be34c17fb91d8"
});

const web3 = new Web3(provider);



const deploy = async () => {
    let accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy contract`, accounts[0])
    const result = await new web3.eth.Contract(contract.abi)
        .deploy({ data: '0x' + contract.evm.bytecode.object }) // add 0x bytecode
        .send({ from: accounts[0] }); // remove 'gas'
    console.log(`contract deployed to `, result.options.address);

}
deploy();
// const result = await new web3.eth.Contract(contract.abi)
//     .deploy({ data: '0x' + contract.evm.bytecode.object, arguments: ['Hi there!'] }) // add 0x bytecode
//     .send({ from: accounts[0] }); // remove 'gas'

// console.log(result);
