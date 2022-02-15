import { StoreModel, StoreInterface} from '../../src/models/store';

describe('store test', function() {

    it('should take on assigned values', () => {
        const c = new StoreModel();
        c.name = 'Best Store Ever';

        expect(c.name).toEqual('Best Store Ever');
    });

    it('should be invalid if a field is empty', () => {
        const c = new StoreModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});