import Bank from '../src/domain/bank';
const assert = require("chai").assert;

describe("Unit tests: ", () => {
    const bank = new Bank();
    it("Bank status is 'working'", () => {
        const result = bank.status();
        assert.equal(result, "working");
    });
});
