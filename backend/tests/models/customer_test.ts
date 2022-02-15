var expect = require('chai').expect;

var Customer = require('../../src/models/customer');

describe('customer', function() {
    it('should be invalid if first name is empty', function(done) {
        var c = new Customer();
 
        c.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});