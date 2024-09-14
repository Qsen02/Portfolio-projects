import { del, get, post, put } from "./api";

const endpoint = "comments";

export async function getCommentById(commentId:string|undefined) {
    return await get(`${endpoint}/${commentId}`);
}

export async function createComment(movieId:string|undefined, data:{}) {
    return await post(`${endpoint}/in/${movieId}`, data);
}

export async function deleteComment(commentId:string|undefined, movieId:string|undefined) {
    return await del(`${endpoint}/${commentId}/in/${movieId}`);
}

export async function editComment(commentId:string|undefined, movieId:string|undefined, data:{}) {
    return await put(`${endpoint}/${commentId}/in/${movieId}`, data);
}

export async function likeComment(commentId:string) {
    await post(`${endpoint}/${commentId}/like`, {});
}

export async function unlikeComment(commentId:string) {
    await post(`${endpoint}/${commentId}/unlike`, {});
}