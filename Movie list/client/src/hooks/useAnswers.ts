import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAnswer, deleteAnswer, editAnswer, getAnswerById, likeAnswer, unlikeAnswer } from "../api/answerService"
import { Answer } from "../types/Answers";

export function useGetOneAnswer(initialvalues: {}, answerId: string|undefined) {
    const [answer, setAnswer] = useState<Answer | {}>(initialvalues);
    const [loading,setLoading]=useState(false);
    const [fetchError,setFetchError]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const answer = await getAnswerById(answerId);
                setAnswer(answer);
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
    }, [answerId])

    return {
        answer,setAnswer,loading,setLoading,fetchError,setFetchError
    }
}

export function useCreateAnswer() {
    async function creatingAnswer(data: {}, commentId: string | undefined) {
        return await createAnswer(data, commentId)
    }

    return creatingAnswer;
}

export function useDeleteAnswer() {
    async function deletingAnswer(answerId: string | undefined, commentId: string | undefined) {
        return await deleteAnswer(answerId, commentId)
    }

    return deletingAnswer;
}

export function useEditAnswer() {
    async function editingAnswer(answerId: string | undefined, commentId: string | undefined,data:{}) {
        return await editAnswer(answerId, commentId,data)
    }

    return editingAnswer;
}

export function useLikeAnswer(){
    async function likingAnswer(answerId:string,commentId:string |undefined){
        return await likeAnswer(answerId,commentId);
    }
    return likingAnswer;
}

export function useUnlikeAnswer(){
    async function unlikingAnswer(answerId:string,commentId:string |undefined){
        return await unlikeAnswer(answerId,commentId);
    }
    return unlikingAnswer;
}