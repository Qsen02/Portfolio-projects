import { login, register } from "../api/userService";

export function useLogin() {
    async function logingin(data) {
        return await login(data);
    }

    return logingin;
}

export function useRegister() {
    async function registration(data) {
        return await register(data);
    }

    return registration;
}