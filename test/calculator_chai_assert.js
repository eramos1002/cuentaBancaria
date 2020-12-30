//var manolo = require("../src/manolo");

import Manolo from '../src/manolo';

const assert = require("chai").assert;
//var calculator = require("../src/calculator");

const manolo = new Manolo();

describe("Calcultator tests using ASSERT interface from CHAI module: ", function() {
    describe("Check addTested Function: ", function() {
        it("Check the returned value using: assert.equal(value,'value'): ", function() {
            const result = manolo.manolo("text");
            assert.equal(result, "text tested");
        });
        it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
            const result = manolo.manolo("text");
            assert.typeOf(result, "string");
        });
        it("Check the returned value using: assert.lengthOf(value,'value'): ", function() {
            const result = manolo.manolo("text");
            assert.lengthOf(result, 11);
        });
    }); 
});
