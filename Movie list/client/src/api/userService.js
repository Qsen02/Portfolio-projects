import {get, post } from "./api"

const endpoint = "users"

export async function resigter(data) {
    return await post(`${endpoint}/register`, data);
}

export async function login(data) {
    return await post(`${endpoint}/login`, data);
}

export async function logout() {
    await get(`${endpoint}/logout`);
}

export async function getUserById(userId) {
    return await get(`${endpoint}/${userId}`);
}