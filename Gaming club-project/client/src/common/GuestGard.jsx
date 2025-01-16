import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext"

export default function GuestGard() {
    const { user } = useUserContext();

    return (
        <>
            {user
                ? <Outlet />
                : <Navigate to="/login" />

            }
        </>
    )
}