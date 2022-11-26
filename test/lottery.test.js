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
        .send({ from: accounts[0], gas: '1000000' });

})

describe('Lottery Contract', () => {
    it('deploy a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
        await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('10', 'ether') });
        await lottery.methods.enter().send({ from: accounts[2], value: web3.utils.toWei('10', 'ether') });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('require a minium amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.1', 'ether') });
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });


    it('only manager can call pick winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            })
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('send money to winner and clear player', async () => {
        try {
            await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
            const initialBalance = await web3.eth.getBalance(accounts[0]);
            await lottery.methods.pickWinner().send({
                from: accounts[0]
            })
            const finalBalance = await web3.eth.getBalance(accounts[0]);
            const difference = finalBalance - initialBalance;
            assert(difference > web3.utils.toWei('9.8', 'ether'));
        }
        catch (err) {
            assert(err);
        }
    });


})