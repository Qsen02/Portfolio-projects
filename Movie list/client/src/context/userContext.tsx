import { createContext, useContext } from "react";
import { logout } from "../api/userService";
import { clearUserData, setUserData } from "../utils/userHelper";
import { usePresistedState } from "../hooks/usePresistedState";
import {  User, UserContextType } from "../types/User";

const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider(props: { children: React.ReactNode }) {

    const { user, setCurUser } = usePresistedState(null);

    function setUserState(user: User | null) {
        setCurUser(user);
        setUserData(user);
    }

    async function clearUserState() {
        await logout();
        clearUserData();
        setCurUser(null);
    }

    return (
        <UserContext.Provider value={{user, setUserState, clearUserState }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);

    return {
        user: context?.user,
        setUserState: context?.setUserState,
        clearUserState: context?.clearUserState
    }
}