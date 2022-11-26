const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const contract = require('../compile');
let accounts;
let lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(contract.abi)
        .deploy({ data: '0x' + contract.evm.bytecode.object }) // add 0x bytecode
        .send({ from: accounts[1], gas: '1000000' });

})

describe('Lottery Contract', () => {
    it('deploy a contract', () => {
        assert.ok(lottery.options.address);
    })
})