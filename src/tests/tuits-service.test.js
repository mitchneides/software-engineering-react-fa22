import {
  createTuit,
  deleteTuit, findTuitById,
  findAllTuits
} from "../services/tuits-service";
import {
    deleteUsersByUsername, createUser
} from "../services/users-service";


describe('createTuit', () => {
    // sample tuit to insert
    const sampleTuit = {
        _id: '111111111111111111111111',
        tuit: "Ripley's test tuit",
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

describe('deleteTuit', () => {
    // sample tuit to insert
    const sampleTuit = {
        _id: '111111111111111111111111',
        tuit: "El Jefe",
        postedOn: '2022-11-04T00:00:00.000Z'
    };

    // sample user to author the tuit
    const jeff = {
        username: 'Jeff',
        password: 'jeffe123',
        email: 'jeff@jeffe.com'
    };

    // setup before running
    beforeAll(async () => {
        // create user to author tuit
        const newUser = await createUser(jeff)
        // Return a new tuit posted by the new user
        return createTuit(newUser._id, sampleTuit)
    })

    // clean up after test runs
    afterAll (() => {
        // tracks promises to fulfill before returning
        let promises = [];
        // remove any/all tuits to make sure we create it in the test
        promises.push(deleteTuit(sampleTuit._id));
        // remove user
        promises.push(deleteUsersByUsername(jeff.username));
        // Return once all promises fulfilled
        return Promise.all(promises)
    })

    // run test
    test('can delete tuit with REST API', async () => {
        // Delete the sample tuit
        const status = await deleteTuit(sampleTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })

});

describe('findTuitById', () => {
    // sample tuit to insert
    const sampleTuit = {
        _id: '111111111111111111111111',
        tuit: "Bubble's test tuit",
        postedOn: '2022-11-04T00:00:00.000Z'
    };

    // sample user to author the tuit
    const bubbles = {
        username: 'Bubbles',
        password: 'bubs321',
        email: 'bubbles@sunnyvale.com'
    };

    // setup before running
    beforeAll(async () => {
        // tracks promises to fulfill before returning
        let promises = [];
        // remove any/all tuits to make sure we create it in the test
        promises.push(deleteTuit(sampleTuit._id));
        // remove user
        promises.push(deleteUsersByUsername(bubbles.username));
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
        promises.push(deleteUsersByUsername(bubbles.username));
        // Return once all promises fulfilled
        return Promise.all(promises)
    })

    // run test
    test('can retrieve a tuit by their primary key with REST API', async () => {
        const testUser = await createUser(bubbles)
        const testTuit = await createTuit(testUser._id, sampleTuit)

        // Verify test tuit matches sample data
        expect(testTuit._id).toEqual(sampleTuit._id)
        expect(testTuit.tuit).toEqual(sampleTuit.tuit)
        expect(testTuit.postedBy).toEqual(testUser._id)
        expect(testTuit.postedOn).toEqual(sampleTuit.postedOn)

        // Retrieve tuit by its ID
        const existingTuit = await findTuitById(testTuit._id)

        // Verify retrieved tuit also matches sample data
        expect(existingTuit._id).toEqual(sampleTuit._id)
        expect(existingTuit.tuit).toEqual(sampleTuit.tuit)
        expect(existingTuit.postedBy).toEqual(testUser)
        expect(existingTuit.postedOn).toEqual(sampleTuit.postedOn)
    })
});

describe('findAllTuits', () => {
    // sample tuits to retrieve
    let sampleTuits = [
        {tuit: 'test1', postedBy: '633c41de89045f21193ea004'},
        {tuit: 'test2', postedBy: '633c41fa89045f21193ea006'},
        {tuit: 'test3', postedBy: '633c421b89045f21193ea008'}
    ]

    // setup before running
    beforeAll(() => {
        sampleTuits = sampleTuits.map(async t => {
            t = await createTuit(t.postedBy, t)
        })
        return sampleTuits
    })

    // clean up after test runs
    afterAll (() => {
        sampleTuits.map(t =>
            deleteTuit(t._id)
        )
    })

    // run test
    test('can retrieve all tuits with REST API', async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(sampleTuits.length);

        const insertedTuits = allTuits.filter( t =>
            sampleTuits.indexOf(t.tuit) >= 0);

        insertedTuits.forEach(t => {
            const someT = sampleTuits.find(someT => someT === t.tuit);
            expect(t.tuit).toEqual(someT.tuit);
            expect(t.postedBy).toEqual(someT.postedBy);
        })
    })

});