import { useEffect, useState } from "react";
import { createComment, deleteComment, getCommentById, likeComment, unlikeComment } from "../api/commentService";
import { useNavigate } from "react-router-dom";
import { Comment } from "../types/Comments";
import { User } from "../types/User";
import { Answer } from "../types/Answers";

type initialValuesType={
        username: string, 
        content: string, 
        ownerId: string, 
        movieId: string, 
        likes: User[]| [], 
        answers: Answer[] | []
}

export function useCreateComment() {
    async function creatingComment(movieId: string | undefined, data: {}) {
        return await createComment(movieId, data);
    }
    return creatingComment;
}

export function useDeleteComment() {
    async function deletingComment(commentId: string | undefined, movieId: string | undefined) {
        return await deleteComment(commentId, movieId);
    }
    return deletingComment;
}

export function useGetOneComment(initialvalues: initialValuesType, commentId: string | undefined) {
    const [comment, setComment] = useState<Comment | initialValuesType>(initialvalues);
    const [loading,setLoading]=useState(false);
    const [fetchError,setFetchError]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const comment = await getCommentById(commentId);
                setComment(comment);
                setLoading(false);
            } catch (err) {
                if ((err as { message: string }).message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                setFetchError(true);
                return;
            }
        })()
    }, [commentId])

    return {
        comment,setComment,loading,setLoading,fetchError,setFetchError
    }
}

export function useLikeComment() {
    async function likingComment(commentId: string | undefined,movieId:string | undefined) {
        return await likeComment(commentId,movieId);
    }

    return likingComment;
}

export function useUnlikeComment() {
    async function unlikingComment(commentId: string | undefined,movieId:string | undefined) {
        return await unlikeComment(commentId,movieId);
    }

    return unlikingComment;
}
