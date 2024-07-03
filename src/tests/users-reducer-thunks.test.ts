import {usersAPI} from '../api/users-api'
import {BaseResponseType, GetItemsType} from "../types/types";
import {
    followSuccess, followTC,
    getUsersThunkCreator, setCurrentPage, setTotalUsersCount, setUsers,
    toggleFollowingProgress, toggleIsFetching,
    unfollowSuccess, unfollowTC,
} from "../redux/users-reducer";
import {waitFor} from "@testing-library/react";


jest.mock('../api/users-api') //замокали объект к-ый импортируется по этому пути
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
// создаем фиктивную ф-цию. Jest позволяет делать ф-ции заглушку,
// для проверки вызова, но без выполнения фактического кода
//Это делается для того, чтобы иметь возможность отслеживать вызовы функции dispatch внутри санки.
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
//
// beforeEach(() => {
//     dispatchMock.mockClear()
//     getStateMock.mockClear()
//     userAPIMock.follow.mockClear() //Зачистка моковых данных
//     userAPIMock.unfollow.mockClear()
//     userAPIMock.getUsers.mockClear()
// })


const result: BaseResponseType = {
    resultCode: 0,
    messages: [],
    fieldsErrors: [],
    data: {}
}
const fakeData = {
    currentPage: 2,
    pageSize: 10,
    totalCount: 100,
    error: null,
    items: [
        {
            id: 1,
            name: 'Dimych',
            status: 'offline',
            followed: false,
            location: {
                city: 'Minsk',
                country: 'Belarus'
            },
            photos: {
                small: null,
                large: null
            }
        },
        {
            id: 2,
            name: 'Valera',
            status: 'online',
            followed: true,
            location: {
                city: 'Minsk',
                country: 'Belarus'
            },
            photos: {
                small: null,
                large: null
            }
        }
    ]
}
const getUsersResult: GetItemsType = {
    items: fakeData.items,
    totalCount: fakeData.totalCount,
    error: fakeData.error
}

test('success follow thunk', async () => {
    const thunk = followTC(1)
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock,getStateMock, {})
    await waitFor(() => {
        expect(dispatchMock).toBeCalledTimes(3);
    });
    // expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollowTC(2)
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 2))
})
test('users should be received successfully', async() => {

    userAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))
    const thunk = getUsersThunkCreator(2, 10)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(5);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setCurrentPage(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFetching(false))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setUsers(fakeData.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, setTotalUsersCount(fakeData.totalCount))
})
