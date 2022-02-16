import { PaymentModel, PaymentInterface} from '../../src/models/payment';

jest.useFakeTimers()
describe('payment test', function() {

    it('should take on assigned values', () => {
        const c = new PaymentModel();
        c.payment_id = 57
        c.order_total = 31.50

        expect(c.payment_id).toEqual(57);
        expect(c.order_total).toEqual(31.50);
    });

    it('should be invalid if a field is empty', () => {
        const c = new PaymentModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});
