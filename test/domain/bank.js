import Bank from '../../src/domain/bank';
const assert = require("chai").assert;

describe("Bank tests: ", () => {
    const bank = new Bank();
    it("Bank status is 'working'", () => {
        assert.equal(bank.testStatus(), "working");
    });
});
