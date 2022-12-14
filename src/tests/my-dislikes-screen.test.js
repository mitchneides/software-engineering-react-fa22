/**
 * @file Implements tests for my dislikes screen
 */
import React from "react";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";
const axios = require('axios')

const MOCK_DISLIKED_TUITS = [
    {
        _id: "111111111111111111111111",
        tuit: "Testing dislike tuits 1",
        postedBy: {
            _id: "000000000000000000000001",
            username: "test",
            password: "test",
            email: "test@test.test"
        },
        stats: {
            replies: 10,
            retuits: 3,
            likes: 5,
            dislikes: 2
        }
    },
    {
        _id: "222222222222222222222222",
        tuit: "Testing dislike tuits 2",
        postedBy: {
            _id: "000000000000000000000002",
            username: "test2",
            password: "test2",
            email: "test2@test2.test"
        },
        stats: {
            replies: 102,
            retuits: 32,
            likes: 52,
            dislikes: 22
        }
    },
    {
        _id: "333333333333333333333333",
        tuit: "Testing dislike tuits 3",
        postedBy: {
            _id: "000000000000000000000003",
            username: "test3",
            password: "test3",
            email: "test3@test3.test"
        },
        stats: {
            replies: 103,
            retuits: 33,
            likes: 53,
            dislikes: 23
        }
    }
]

describe('testing dislikes screen renders disliked tuits', () => {
    beforeAll(() => {
        jest.spyOn(axios, "get").mockImplementation()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    test('disliked tuits render', async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: MOCK_DISLIKED_TUITS})
        )

        render(
            <HashRouter>
                <Tuits tuits={MOCK_DISLIKED_TUITS}/>
            </HashRouter>
        )

        MOCK_DISLIKED_TUITS.map(
            tuit => {
                let dislikes = tuit.stats.likes.toString();
                const dislikedElements = screen.getAllByText(dislikes);
                dislikedElements.forEach(
                    element => expect(element).toBeInTheDocument()
                )
            }
        )

    })
})