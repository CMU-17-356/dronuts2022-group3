import { OrderModel, OrderInterface} from '../../src/models/order';

jest.useFakeTimers()
describe('order test', function() {

    it('should take on assigned values', () => {
        const c = new OrderModel();
        c.total = 11.50

        expect(c.total).toEqual(11.50);
    });

    it('should be invalid if a field is empty', () => {
        const c = new OrderModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});