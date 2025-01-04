import { User } from "../types/User";

export function setUserData(data: User | null) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
    const item = localStorage.getItem("user");
    if (item) {
        const data: User = JSON.parse(item);
        return data;
    }
}

export function clearUserData() {
    localStorage.removeItem("user");
}
