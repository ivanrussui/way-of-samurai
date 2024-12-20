import {AuthResponseType} from '../api/api';

type ToggleFollowUserParams = {
    userId: number;
    followed: boolean;
    methodAPI: (userId: number) => Promise<AuthResponseType>;
    followUnfollow: (userId: number, bool: boolean) => void;
};
export const toggleFollowUser = ({userId, followed, methodAPI, followUnfollow}: ToggleFollowUserParams) => {
    return methodAPI(userId)
        .then(data => {
            if (data.resultCode === 0) {
                followUnfollow(userId, followed);
            }
        });
};