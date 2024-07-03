import {followSuccess, InitialStateUsersType, unfollowSuccess, usersReducer} from "../redux/users-reducer"
import {UserType} from "../types/types";

let startState: InitialStateUsersType;
    beforeEach(()=> {
        startState = {
            users: [
                {id: 0, name: 'John 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
                {id: 1, name: 'John 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
                {id: 2, name: 'John 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
                {id: 3, name: 'John 3', followed: true, photos: {small: null, large: null}, status: 'status 3'}
            ] as UserType[],
            pageSize: 10,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: []
        }
    })

test('follow success', () => {

    const endState = usersReducer(startState, followSuccess(1))

    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeTruthy()
})
test('unfollow success', () => {

    const endState = usersReducer(startState, unfollowSuccess(3))

    expect(endState.users[2].followed).toBeTruthy()
    expect(endState.users[3].followed).toBeFalsy()
})
