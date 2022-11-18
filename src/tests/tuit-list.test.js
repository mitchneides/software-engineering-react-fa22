import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

const axios = require('axios')

const MOCKED_TUITS = [
  {
    _id: "000000000000000000000001",
    tuit: "Albert's Tuit",
    postedBy: {
      _id: "000000000000000000000001",
      username: "Albert",
      password: "albert123",
      email: "albert@einstein.org"
    },
    postedOn: "2022-11-01T00:00:00.000Z"
  },
  {
    _id: "000000000000000000000002",
    tuit: "Bill's Tuit",
    postedBy: {
      _id: "000000000000000000000002",
      username: "Bill",
      password: "bill123",
      email: "bill@windows.com"
    },
    postedOn: "2022-11-01T00:00:00.000Z"
  },
  {
    _id: "000000000000000000000003",
    tuit: "Cleopatra's Tuit",
    postedBy: {
      _id: "000000000000000000000003",
      username: "Cleopatra",
      password: "cleo123",
      email: "cleopatra@egypt.gov"
    },
    postedOn: "2022-11-01T00:00:00.000Z"
  },
]

test('tuit list renders static tuit array', () => {
    // Renders mock tuit data
    render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
    )
    MOCKED_TUITS.map(
      tuit => {
        // Verify username is found in document
        let username = tuit.postedBy.username
        const usernameElements = screen.getAllByText(`${username}@${username} -`)
        usernameElements.forEach(
            username => expect(username).toBeInTheDocument())

        // Verify tuit is found in document
        const tuitElements = screen.getAllByText(tuit.tuit)
        tuitElements.forEach(
            text => expect(text).toBeInTheDocument())
      }
    )
});

describe('tuit list renders async', () => {
    // Mock tuit data
    const tuitData = {
    _id: '000000000000000000000001',
    tuit: 'Render tuit list async',
    postedOn: '2022-11-03T00:00:00.000Z'
    }

    // Mock user data
    const larry = {
    username: 'larry',
    password: 'larry123',
    email: 'larry@david.com'
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    beforeAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(larry.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    afterAll(() => {
        let promises = []

        // Remove test user and test tuit
        promises.push(deleteUsersByUsername(larry.username))
        promises.push(deleteTuit(tuitData._id))

        // Wait for all promises to be completed
        return Promise.all(promises)
    })

    test('tuit list renders async', async () => {
        // Create test user from mock jeff data
        const testUser = await createUser(larry);

        // Create mock tuit from tuitData
        const testTuit = await createTuit(testUser._id, tuitData)

        // Retrieve all tuits in database
        const allTuits = await findAllTuits()

        // Render tuits
        render(
            <HashRouter>
              <Tuits tuits={allTuits}/>
            </HashRouter>
        )

        // Expect tuit text element to be in document
        const tuitTextElement = screen.getByText(testTuit.tuit)
        expect(tuitTextElement).toBeInTheDocument()

        // Expect testUser username to be in document
        const userElement = screen.getByText(`${testUser.username}@${testUser.username} -`)
        expect(userElement).toBeInTheDocument()
    })
})

describe('tuit list renders mocked', () => {
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })


    test('tuit list renders mocked', async () => {
        axios.get.mockImplementation(() =>
                                         Promise.resolve({data: {tuits: MOCKED_TUITS}}))
        const response = await findAllTuits()
        const tuits = response.tuits

        render(
            <HashRouter>
                <Tuits tuits={tuits}/>
            </HashRouter>
        )

        MOCKED_TUITS.map(
            tuit => {

                // Expect username from mocked tuits to be in document
                let username = tuit.postedBy.username
                const usernameElements = screen.getAllByText(`${username}@${username} -`)
                usernameElements.forEach(
                    element => expect(element).toBeInTheDocument()
                )

                // Expect tuit text from mocked tuits to be in document
                let text = tuit.tuit
                const tuitTextElements = screen.getAllByText(text)
                tuitTextElements.forEach(
                    element => expect(element).toBeInTheDocument()
                )
            }
        )
    });
})
