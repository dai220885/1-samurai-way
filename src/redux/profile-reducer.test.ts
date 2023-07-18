import profileReducer, {addNewPostAC, ProfilePageType, removePostAC} from './profile-reducer';
import {v1} from 'uuid';

const state: ProfilePageType = {
    posts: [
        {id: '1', message: 'post 1', likeCount: 1},
        {id: '2', message: 'post 2', likeCount: 2},
        {id: '3', message: 'post 3', likeCount: 3},
        {id: '4', message: 'post 4', likeCount: 4},
    ],
    profile: undefined,
    status: '',
}
const newPost = 'new test post'
const idForRemove = '2'

it ('posts length should be incremented', () => {
    const action = addNewPostAC(newPost)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5);
})

it ('state length should not increase', () => {
    const action = addNewPostAC(newPost)
    const newState = profileReducer(state, action)
    expect(state.posts.length).toBe(4);
})

it ('the new post text should be correct', () => {
    const action = addNewPostAC(newPost)
    const newState = profileReducer(state, action)
    expect(newState.posts[0].message).toBe(newPost);
})

it ('posts length should be decrement after deleting', () => {
    const action = removePostAC(idForRemove)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3);
})

it ('correct post should be deleted', () => {
    const action = removePostAC(idForRemove)
    const newState = profileReducer(state, action)
    const index = newState.posts.findIndex(p => p.id === idForRemove)
    expect(index).toBe(-1)
    expect(newState.posts[1].message).toBe('post 3');
})

it (`posts length shouldn't be decrement after deleting if id is incorrect`, () => {
    const action = removePostAC('incorrectId')
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4);
})