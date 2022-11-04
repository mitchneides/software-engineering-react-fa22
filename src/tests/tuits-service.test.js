import {
  createTuit,
  deleteTuit, findTuitById,
  findAllTuits
} from "../services/tuits-service";

// ******************************** breaks node see errors ********************
describe('deleteTuit', () => {
    // sample tuit to insert
    const sample = {
        tuit: "Alice's test tuit",
        postedBy: '633c41de89045f21193ea004'
    };

    // setup before running
    // ******************************* cannot get id like this *********************
    beforeAll(() => {
        // remove any/all tuits to make sure we create it in the test
        return deleteTuit(sample._id);
    })

    // clean up after test runs
    // ******************************* cannot get id like this *********************
    afterAll (() => {
        return deleteTuit(sample._id);
    })

    test('can create a new tuit with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(sample);

        // verify inserted tuit's properties
        expect(newTuit.tuit).toEqual(sample.tuit);
        expect(newTuit.postedBy).toString().toEqual(sample.postedBy);
    });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});