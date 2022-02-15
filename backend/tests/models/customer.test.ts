import { CustomerModel, CustomerInterface} from '../../src/models/customer';

describe('customer test', function() {

    it('should take on assigned values', () => {
        const c = new CustomerModel();
        c.first_name = 'Riccardo';
        c.last_name = 'Santoni';

        expect(c.first_name).toEqual('Riccardo');
        expect(c.last_name).toEqual('Santoni');
    });

    // it('should be invalid if first name is empty', function(done) {
    //     var c = new Customer();
 
    //     c.validate(function(err) {
    //         chai.expect(err.errors.name).to.exist;
    //         done();
    //     });
    // });
});

// describe('meme test', function () {
//     it('should take on assigned values', () => {
//       const m = new MemeModel();
//       m.title = 'Test Name';
//       m.content = 'The Quick Brown Fox';
//       expect(m.title).toEqual('Test Name');
//       expect(m.content).toContain('Fox');
//     });
  
//     it('can be created correctly', async () => {
//       const memeURL =
//         'https://cdn.bulldogjob.com/system/photos/files/000/006/927/original/Node.js_meme.jpg';
//       // expect that two assertions will be made
//       expect.assertions(3);
//       // create new post model instance
//       const meme: MemeInterface = new MemeModel();
//       // set some test properties
//       meme.title = 'Heaviest Object';
//       meme.content = memeURL;
//       // save test post to in-memory db
//       await meme.save();
//       // find inserted post by title
//       const memeInDb: MemeInterface | null = await MemeModel.findOne({
//         title: 'Heaviest Object',
//       }).exec();
//       console.log('Meme found from memory-db', memeInDb);
//       // check that title is expected
//       expect(memeInDb).toBeDefined();
//       if (memeInDb) {
//         expect(memeInDb.title).toEqual('Heaviest Object');
//         // check that content is expected
//         expect(memeInDb.content).toEqual(memeURL);
//       }
//     });
//   });