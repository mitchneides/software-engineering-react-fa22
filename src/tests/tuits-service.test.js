import {createTuit, deleteTuit, findTuitById, findAllTuits} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

// Create random 24 hexadecimal id for tuit
// Source: https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
const genRanHex = () => [...Array(24)]
        .map(() =>
                 Math.floor(Math.random() * 16).toString(16)).join('');

describe('can create tuit with REST API', () => {
    // Mock tuit data
    const tuitData = {
        _id: genRanHex(),
        tuit: 'Test tuit for create tuit with REST API',
        postedOn: '1927-10-31T00:00:00.000Z'
    }

    // Mock user data
    const albert = {
        username: 'albert',
        password: 'albert123',
        email: 'albert@einstein.org'
    }

    beforeAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(albert.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    afterAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(albert.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    test('can create tuit with REST API', async () => {
        // Create new user using user data
        const testUser = await createUser(albert)

        // Create new tuit using tuit data and posted by new user
        const testTuit = await createTuit(testUser._id, tuitData)

        // Create tuit test
        expect(testTuit.tuit).toEqual(tuitData.tuit)
        expect(testTuit.postedBy).toEqual(testUser._id)
        expect(testTuit.postedOn).toEqual(tuitData.postedOn)
    })
});

describe('can delete tuit with REST API', () => {
    //  Mock tuit data
    const tuitData = {
        _id: genRanHex(),
        tuit: 'Test tuit for delete tuit with REST API',
        postedOn: '2022-10-31T00:00:00.000Z'
    }

    // Mock user data
    const larry = {
        username: 'larry',
        password: 'larry123',
        email: 'larry@david.com'
    }

    // Set up before test
    beforeAll(async () => {
        // Create a new user using user data
        const testUser = await createUser(larry)
        // Return a new tuit with tuit data posted by new user
        return createTuit(testUser._id, tuitData)
    })

    // Clean up after test
    afterAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(larry.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    test('can delete tuit wtih REST API', async () => {
        // Delete tuit test
        const status = await deleteTuit(tuitData._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    //  Mock tuit data
    const tuitData = {
        _id: genRanHex(),
        tuit: 'Test to retrieve tuit by primary key with REST API',
        postedOn: '2022-11-01T00:00:00.000Z'
    }

    // Mock user data
    const joffrey = {
        username: 'joffrey',
        password: 'king123',
        email: 'joffrey@got.com'
    }

    beforeAll(async () => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(joffrey.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    afterAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(joffrey.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const testUser = await createUser(joffrey)
        const testTuit = await createTuit(testUser._id, tuitData)

        // Verify tuit match tuitData
        expect(testTuit._id).toEqual(tuitData._id)
        expect(testTuit.tuit).toEqual(tuitData.tuit)
        expect(testTuit.postedBy).toEqual(testUser._id)
        expect(testTuit.postedOn).toEqual(tuitData.postedOn)

        // Retrieve the tuit from the database by primary key
        const existingTuit = await findTuitById(testTuit._id)

        // Verify retrieved tuit matches tuitData
        expect(existingTuit._id).toEqual(tuitData._id)
        expect(existingTuit.tuit).toEqual(tuitData.tuit)
        expect(existingTuit.postedBy).toEqual(testUser)
        expect(existingTuit.postedOn).toEqual(tuitData.postedOn)
    })
});

describe('can retrieve all tuits with REST API', () => {
    // Mock tuit data
    const tuitData = [
        {
            _id: genRanHex(),
            tuit: 'Retrieve all tuits test 1',
            postedOn: '2022-11-01T00:00:00.000Z'
        },
        {
            _id: genRanHex(),
            tuit: 'Retrieve all tuits test 2',
            postedOn: '2022-11-01T00:00:00.000Z'
        },
        {
            _id: genRanHex(),
            tuit: 'Retrieve all tuits test 3',
            postedOn: '2022-11-01T00:00:00.000Z'
        }
    ]

    // Mock user data
    const zoe = {
        username: 'zoe',
        password: 'zoe101',
        email: 'zoe@nickelodeon.com'
    }

    beforeAll(() => {
        let promises = []

        // Delete user if it exists before test
        promises.push(deleteUsersByUsername(zoe.username))

        // Delete tuits with ids from tuitIds
        tuitData.map(
            tuit =>
                promises.push(deleteTuit(tuit._id))
        )
        return Promise.all(promises)
    })

    afterAll(() => {
        let promises = []

        // Delete user if it exists before test
        promises.push(deleteUsersByUsername(zoe.username))

        // Delete tuits with ids from tuitIds
        tuitData.map(
            tuit => promises.push(deleteTuit(tuit._id)))

        // Wait for promises to be completed
        return Promise.all(promises)
    })

    test('can retrieve all tuits with REST API', async () => {
        // Create test user from mock zoe data
        const testUser = await createUser(zoe);

        // Create mock tuits from tuitData
        tuitData.map(
            tuit => createTuit(testUser._id, tuit)
        )

        // Find all tuits in database
        const allTuits = await findAllTuits();

        // Verify tuits created have been inserted
        expect(allTuits.length).toBeGreaterThanOrEqual(tuitData.length);

        // Check all tuits in database and collect all tuits inserted
        const tuitIdData = tuitData.map(tuit => tuit._id)
        const tuitsInserted = allTuits.filter(
            tuit => tuitIdData.indexOf(tuit._id) >= 0
        )

        // compare the actual tuits in database with the ones we sent
        tuitsInserted.forEach(insertedTuit => {
            const sentTuit = tuitData.find(data => data._id === insertedTuit._id);
            expect(insertedTuit.tuit).toEqual(sentTuit.tuit)
            expect(insertedTuit.postedBy).toEqual(testUser)
            expect(insertedTuit.postedOn).toEqual(sentTuit.postedOn)
        })
    })
});