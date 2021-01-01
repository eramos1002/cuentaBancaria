import ibanValidator from '../../src/tools/iban-validator';

const assert = require("chai").assert;

describe("IBAN validator tests: ", () => {
    it("CAIXABANK", () => {
        assert.equal(ibanValidator.isValid('ES6621000418401234567891'), true);
    });

    it("SANTANDER", () => {
        assert.equal(ibanValidator.isValid('ES6000491500051234567892'), true);
    });

    it("ABANCA", () => {
        assert.equal(ibanValidator.isValid('ES9420805801101234567891'), true);
    });

    it("CREDITO BALEAR", () => {
        assert.equal(ibanValidator.isValid('ES9000246912501234567891'), true);
    });

    it("BANESTO", () => {
        assert.equal(ibanValidator.isValid('ES7100302053091234567895'), true);
    });

    it("SANTANDER", () => {
        assert.equal(ibanValidator.isValid('ES1000492352082414205416'), true);
    });

    it("IBERCAJA", () => {
        assert.equal(ibanValidator.isValid('ES1720852066623456789011'), true);
    });

    it("CAIXABANK (wrong)", () => {
        assert.equal(ibanValidator.isValid('ES66210004194012345 67892'), false);
    });
});
