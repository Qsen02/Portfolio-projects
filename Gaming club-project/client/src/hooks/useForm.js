import { useEffect, useState } from "react";
import { getGameById } from "../api/gameService";
import { getCommentById } from "../api/commentService";

export function useForm(initalvalues, callback) {
    const [formValues, setFormValues] = useState(initalvalues);

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}

export function useEditForm(initalvalues, callback, commentId, gameId) {
    const [formValues, setFormValues] = useState(initalvalues);

    useEffect(() => {
        (async() => {
            if (commentId) {
                const comment = await getCommentById(commentId);
                setFormValues(oldValues => ({
                    ...oldValues,
                    content: comment.content
                }))
            } else {
                const game = await getGameById(gameId);
                setFormValues(oldValues => ({
                    ...oldValues,
                    name: game.name,
                    category: game.category,
                    year: game.year,
                    image: game.image,
                    creator: game.creator,
                    description: game.description
                }))
            }
        })()
    }, [])

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}