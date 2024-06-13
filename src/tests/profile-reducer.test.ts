import {
    addPostAC,
    deletePostAC,
    profileReducer,
    setStatus
} from "../redux/profile-reducer";
import {PostType, ProfileType} from "../types/types";

let startState = {
    posts: [
        {id: 0, message: "Hey, how are you", count: 15},
        {id: 1, message: "It is my first post", count: 20},
    ]  as PostType[],
    profile: {} as ProfileType,
    status: ""
}

test('new post should be added', () => {

    const endState = profileReducer(startState, addPostAC('New post'))

    expect(endState.posts.length).toBe(3);
})

test('message of new post should be correct', () => {

    const endState = profileReducer(startState, addPostAC('New post'))

    expect(endState.posts[2].message).toBe('New post');
})

test('after deleting length of posts should be decrement', () => {

    const endState = profileReducer(startState, deletePostAC(1))

    expect(endState.posts.length).toBe(1);
})

test('correct status profile should be update', () => {

    const endState = profileReducer(startState, setStatus('New status'))

    expect(endState.status).toBe('New status')
})