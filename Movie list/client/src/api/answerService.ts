import { Answer } from "../types/Answers";
import { Comment } from "../types/Comments";
import { del, get, post, put } from "./api";

const endpoint = "answers";

export async function getAnswerById(answerId: string | undefined) {
    const answer = await get(`${endpoint}/${answerId}`);
    return answer as Answer;
}

export async function createAnswer(data: {}, commentId: string | undefined) {
    const comment = await post(`${endpoint}/in/comment/${commentId}`, data);
    return comment as Comment;
}

export async function deleteAnswer(answerId: string | undefined, commentId: string | undefined) {
    await del(`${endpoint}/${answerId}/in/${commentId}`);
}

export async function editAnswer(answerId: string | undefined, commentId: string | undefined, data: {}) {
    const comment = await put(`${endpoint}/${answerId}/in/${commentId}`, data);
    return comment as Comment;
}

export async function likeAnswer(answerId: string , commentId: string | undefined) {
    const answer = await post(`${endpoint}/${answerId}/in/${commentId}/like`, {});
    return answer as Answer;
}

export async function unlikeAnswer(answerId: string, commentId: string | undefined) {
    const answer = await post(`${endpoint}/${answerId}/in/${commentId}/unlike`, {});
    return answer as Answer;
}
