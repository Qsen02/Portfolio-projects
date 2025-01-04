import { User } from "../types/User";
import { get, post, put } from "./api"

const endpoint = "users";

export async function resigter(data: {}) {
    const user = await post(`${endpoint}/register`, data)
    return user as User;
}

export async function login(data: {}) {
    const user = await post(`${endpoint}/login`, data)
    return user as User;
}

export async function logout() {
    await get(`${endpoint}/logout`);
}

export async function getUserById(userId: string|undefined) {
    const user=await get(`${endpoint}/${userId}`);
    return user as User;
}

export async function editUser(userId:string|undefined,data:{}){
    const user= await put(`${endpoint}/${userId}/edit`,data);
    return user as User;
}

export async function changePassword(userId:string|undefined,data:{}){
    const user= await put(`${endpoint}/${userId}/change/password`,data);
    return user as User;
}