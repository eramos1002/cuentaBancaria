import Account from '../../src/domain/account';
import Bank from '../../src/domain/bank';
const assert = require("chai").assert;
const expect = require("chai").expect;

describe("Bank tests: ", () => {
    const bank = new Bank();
    it("Bank class", () => {
        assert.equal(bank.constructor.name, "Bank");
    });

    it("Add accounts", () => {
        bank.addAccount(new Account('ES6621000418401234567891', '75222966V'));
        bank.addAccount(new Account('ES6000491500051234567892', '57532691P'));
        bank.addAccount(new Account('ES9420805801101234567891', 'X5917909D'));
        bank.addAccount(new Account('ES9000246912501234567891', 'Z1182309E'));
        bank.addAccount(new Account('ES7100302053091234567895', '75222966V'));
        bank.addAccount(new Account('ES1000492352082414205416', '75222966V'));
        assert.equal(bank.getAccountsCount(), 6);
    });

    it("Add account with existing IBAN will fail", () => {
        expect(() => {
            bank.addAccount(new Account('ES6621000418401234567891', '57532691P'));
        }).to.throw(Error);
        
        assert.equal(bank.getAccountsCount(), 6);
    });
});
