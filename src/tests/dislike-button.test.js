/**
 * @file Tests dislike button
 */

import React from "react";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuit from "../components/tuits/tuit";

const MOCK_DISLIKED_TUIT = {
    _id: "111111111111111111111111",
    tuit: "Testing dislike button",
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
}

describe('test rendering dislike button', () => {
    render(
        <HashRouter>
            <Tuit tuit={MOCK_DISLIKED_TUIT}/>
        </HashRouter>
    )

    test('dislike tuits render', () => {
        const dislikes = screen.getByText(MOCK_DISLIKED_TUIT.stats.dislikes);
        expect(dislikes).toBeInTheDocument();
    })
})