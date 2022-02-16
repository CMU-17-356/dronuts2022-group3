import { LocationModel, LocationInterface} from '../../src/models/location';

jest.useFakeTimers()
describe('location test', function() {

    it('should take on assigned values', () => {
        const c = new LocationModel();
        c.street_address = '1537 Denniston St.';
        c.city = 'Pittsburgh';
        c.state = 'PA';
        c.zipcode = '15217'

        expect(c.street_address).toEqual('1537 Denniston St.');
        expect(c.city).toEqual('Pittsburgh');
        expect(c.state).toEqual('PA');
        expect(c.zipcode).toEqual('15217');
    });

    it('should be invalid if a field is empty', () => {
        const c = new LocationModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});