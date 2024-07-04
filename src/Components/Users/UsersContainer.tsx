import {Users} from "./Users"
import {Preloader} from "../../common/Preloader/Preloader"
import {useAppSelector} from "../../redux/redux-store"
import {getIsFetching} from "./usersSelectors"

export const UsersContainer =()=> {
const isFetching = useAppSelector(getIsFetching)

        return <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
}