import {EmployeeModel, EmployeeInterface } from '../../src/models/employee';


jest.useFakeTimers()
describe('employee test', function(){
    it('should be invalid if empty', ()=>{
        const e = new EmployeeModel();
        e.first_name = 'John';
        e.last_name = 'Smith';
        e.email = 'employee@dronuts.com';

        e.validate(function(err: any){
            expect(err).toBeDefined;
        })
    });
    it('should be of type of email', () =>{
        const e = new EmployeeModel();
        e.email = 'employee@dronuts.com';
        
        expect(e.email).toContain('@');

    });
    it('should have assigned values', () => {
        const e = new EmployeeModel();
        e.first_name = 'John';
        e.last_name = 'Doe';

        expect(e.first_name).toEqual('John');
        expect(e.last_name).toEqual('Doe');

    });
});
