import { useEffect, useState } from "react";
import { createComment, deleteComment, editComment, getCommentById } from "../api/commentService";

export function useCreateComment() {
    async function creatingComment(gameId, commentData) {
        const game = await createComment(gameId, commentData);
        return game;
    }

    return creatingComment
}

export function useEditComment() {
    async function editingComment(commentId, commentData) {
        const game = await editComment(commentId, commentData);
        return game;
    }

    return editingComment
}

export function useDeleteComment() {
    async function deletingComment(commentId) {
        const game = await deleteComment(commentId);
        return game;
    }

    return deletingComment;
}

export function useGetCommentById(commentId) {
    const [comment, setComment] = useState({
        content: ""
    });

    useEffect(() => {
        (async() => {
            const comment = await getCommentById(commentId);
            setComment(comment);
        })()
    }, [])

    return {
        comment
    }
}