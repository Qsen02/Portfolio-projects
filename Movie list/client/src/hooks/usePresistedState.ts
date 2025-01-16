import { useState } from "react"
import { getUserData } from "../utils/userHelper"
import { User } from "../types/User";

export function usePresistedState(initialvalues: User | null) {
    const [user, setUser] = useState(() => {
        const user = getUserData();
        if (user) {
            return user;
        }
        return initialvalues;
    })

    function setCurUser(value: User | null) {
        setUser(value);
    }

    return {
        user, setCurUser
    }
}