import { DonutModel, DonutInterface} from '../../src/models/donut';

jest.useFakeTimers()
describe('donut test', function() {

    it('should take on assigned values', () => {
        const c = new DonutModel();
        c.flavor = 'Apple Krumb';
        c.price = 4.0;

        expect(c.flavor).toEqual('Apple Krumb');
        expect(c.price).toEqual(4.0);
    });

    it('should be invalid if a field is empty', () => {
        const c = new DonutModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});