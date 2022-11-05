import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "AliceTemp", "BobTemp", "CharlieTemp"
];

const MOCKED_TUITS = [
  {
    _id: "999999999999999999999999",
    tuit: "Alice's Temp Tuit",
    postedBy: {
      _id: "999999999999999999999999",
      username: "AliceTemp",
      password: "AliceTemp123",
      email: "alice@temp.org"
    },
    postedOn: "2022-11-05T00:00:00.000Z"
  },
  {
    _id: "888888888888888888888888",
    tuit: "Bob's Temp Tuit",
    postedBy: {
      _id: "888888888888888888888888",
      username: "BobTemp",
      password: "BobTemp123",
      email: "bob@temp.org"
    },
    postedOn: "2022-11-05T00:00:00.000Z"
  },
  {
    _id: "666666666666666666666666",
    tuit: "Charlie's Temp Tuit",
    postedBy: {
      _id: "666666666666666666666666",
      username: "CharlieTemp",
      password: "CharlieTemp123",
      email: "charlie@temp.org"
    },
    postedOn: "2022-11-05T00:00:00.000Z"
  }
];

test('tuit list renders static tuit array', () => {
    render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
      const temp = "Charlie's Temp Tuit";
      const linkElement = screen.getByText(temp);
      expect(linkElement).toBeInTheDocument();
});

// please note that 'tuit list renders async' is tested in the file
// 'tuit-list2.test.js due to the error with "jest.mock('axios')"

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);
  const temp = "Charlie's Temp Tuit";
  const tuit = screen.getByText(temp);
  expect(tuit).toBeInTheDocument();
});
