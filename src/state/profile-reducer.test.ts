import {addPost, deletePost, ProfilePageType, profileReducer} from './profile-reducer';
import {v1} from 'uuid';

let initialState: ProfilePageType;
const postId1 = v1();
const postId2 = v1();

beforeEach(() => {
    // state
    initialState = {
        posts: [
            {id: postId1, title: 'JavaScript is the best programming language', likeCount: 10},
            {id: postId2, title: 'TypeScript is the best Javascript dialect', likeCount: 15}
        ],
        profileInfo: null,
        status: '',
        isFetchingProfile: true
    };
})

test('the post must be added', () => {
    const title = 'Jest is the best testing environment';

    // action
    const newState = profileReducer(initialState, addPost(title));

    // expect
    expect(newState.posts[2].title).toBe(title);
    expect(newState.posts[2].likeCount).toBe(0);
    expect(newState.posts.length).toBe(3);
});

test('the post must be deleting', () => {
    // state

    // action
    const newState = profileReducer(initialState, deletePost(postId2));

    // expect
    expect(newState.posts[1]).toBeFalsy();
    expect(newState.posts.length).toBe(1);
});