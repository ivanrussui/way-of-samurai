import {StateType} from '../types/types';

const state: StateType = {
    profilePage: {
        posts: [
            {title: 'JavaScript is the best programming language', likeCount: 10},
            {title: 'TypeScript is the best Javascript dialect', likeCount: 15}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: '1', name: 'Ivan'},
            {id: '2', name: 'Anna'},
            {id: '3', name: 'Melissa'},
            {id: '4', name: 'Kristina'},
            {id: '5', name: 'Vladimir'},
            {id: '6', name: 'Alexandra'},
        ],
        messages: [
            {title: 'Hi!'},
            {title: 'My name is Ivan!'},
            {title: 'And you?'},
            {title: 'I am Fine'},
            {title: 'It s cool!'},
        ],
    },
    sidebar: {
        friends: [
            {id: '1', name: 'Kristina'},
            {id: '2', name: 'Vladimir'},
            {id: '3', name: 'Alexa'},
        ]
    }
};

export const addPost = (postTitle: string) => {
    const newPost = {title: postTitle, likeCount: 0};
    state.profilePage.posts.push(newPost);
};

export default state;