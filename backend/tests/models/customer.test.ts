import { CustomerModel, CustomerInterface} from '../../src/models/customer';

describe('customer test', function() {

    it('should take on assigned values', () => {
        const c = new CustomerModel();
        c.first_name = 'Riccardo';
        c.last_name = 'Santoni';

        expect(c.first_name).toEqual('Riccardo');
        expect(c.last_name).toEqual('Santoni');
    });

    it('should be invalid if a field is empty', () => {
        const c = new CustomerModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});