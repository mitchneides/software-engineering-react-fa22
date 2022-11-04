import {
  createTuit,
  deleteTuit, findTuitById,
  findAllTuits
} from "../services/tuits-service";
import {
    deleteUsersByUsername, createUser
} from "../services/users-service";


describe.only('deleteTuit', () => {
    // sample tuit to insert
    const sampleTuit = {
        _id: '111111111111111111111111',
        tuit: "Alice's test tuit",
        postedOn: '2022-11-04T00:00:00.000Z'
    };

  // sample user to author the tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // setup before running
    beforeAll(() => {
        // tracks promises to fulfill before returning
        let promises = [];
        // remove any/all tuits to make sure we create it in the test
        promises.push(deleteTuit(sampleTuit._id));
        // remove user
        promises.push(deleteUsersByUsername(ripley.username));
        // Return once all promises fulfilled
        return Promise.all(promises)
    })

    // clean up after test runs
    afterAll (() => {
        // tracks promises to fulfill before returning
        let promises = [];
        // remove any/all tuits to make sure we create it in the test
        promises.push(deleteTuit(sampleTuit._id));
        // remove user
        promises.push(deleteUsersByUsername(ripley.username));
        // Return once all promises fulfilled
        return Promise.all(promises)
    })

    // run test
    test('can create a new tuit with REST API', async () => {
        // create user to author tuit
        const newUser = await createUser(ripley);
        // insert new tuit in the database
        const newTuit = await createTuit(newUser._id, sampleTuit);

        // verify inserted tuit's properties
        expect(newTuit.tuit).toEqual(newTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.postedOn).toEqual(newTuit.postedOn);
    });
});

describe('can delete tuit with REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});