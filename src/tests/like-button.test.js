/**
 * @file Tests like button
 */

import React from "react";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuit from "../components/tuits/tuit";

const MOCK_LIKED_TUIT = {
    _id: "111111111111111111111111",
    tuit: "Testing like button",
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

describe('test rendering like button', () => {
    render(
        <HashRouter>
            <Tuit tuit={MOCK_LIKED_TUIT}/>
        </HashRouter>
    )

    test('liked tuits render', () => {
        const likes = screen.getByText(MOCK_LIKED_TUIT.stats.likes);
        expect(likes).toBeInTheDocument();
    })
})