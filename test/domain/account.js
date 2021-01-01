import Account from '../../src/domain/account';
const assert = require("chai").assert;
const expect = require("chai").expect;

describe("Account tests: ", () => {

    it("Account cant be created with undefined IBAN", () => {
        expect(() => {
            new Account();
        }).to.throw(Error);
    });

    it("Account cant be created with undefined document", () => {
        expect(() => {
            new Account('ES6000491500051234567892');
        }).to.throw(Error);
    });

    const account = new Account('ES60 0049 1500 0512 3456 7892', '48942854g');

    it("Account class", () => {
        assert.equal(account.constructor.name, "Account");
    });
    
    it("Account is created with status 'open', balance '0' and normalized input parameters 'iban' and 'document'", () => {
        assert.equal(account.iban, "ES6000491500051234567892");
        assert.equal(account.document, "48942854G");
        assert.equal(account.balance, 0);
        assert.equal(account.status, "open");
    });

    it("Deposit 20.95 will work", () => {
        account.deposit(20.95);
        assert.equal(account.balance, 20.95);
    });

    it("Deposit 0 will throw Error", () => {
        expect(() => {
            account.deposit(0);
        }).to.throw(Error);
    });

    it("Deposit -6 will throw Error", () => {
        expect(() => {
            account.deposit(-6);
        }).to.throw(Error);
    });

    it("Deposit nothing will throw Error", () => {
        expect(() => {
            account.deposit();
        }).to.throw(Error);
    });

    it("Account is closed", () => {
        account.close();
        assert.equal(account.status, "close");
    });

    it("Deposit 10 will throw Error because account is closed", () => {
        expect(() => {
            account.deposit(10);
        }).to.throw(Error);
    });

    it("Withdaw 10 will throw Error because account is closed", () => {
        expect(() => {
            account.withdrawal(10);
        }).to.throw(Error);
    });

    it("Account is open", () => {
        account.open();
        assert.equal(account.status, "open");
    });

    it("Withdaw 10 will work", () => {
        account.withdrawal(10);
        assert.equal(account.balance, 10.95);
    });
});
