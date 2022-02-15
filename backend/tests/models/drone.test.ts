import { DroneModel } from "../../src/models/drone";

jest.useFakeTimers()
describe('drone test', function(){
    it('should have a battery life value always assigned', ()=>{
        const d = new DroneModel();
        d.battery_life = 80;
        expect(d.battery_life).toEqual(80);
    });
    it('should be invalid if any field is unassigned', ()=>{
        const d = new DroneModel();
        d.validate(function(err){
            expect(err).toBeDefined;
        });
    });

});
