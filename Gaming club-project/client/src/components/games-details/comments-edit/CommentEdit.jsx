import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

import { useEditForm } from "../../../hooks/useForm"

import styles from "../../FormsAndErrors.module.css"
import { editComment } from "../../../api/commentService";

export default function CommentEdit({
    setCurGame
}) {
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const { gameId, commentId } = useParams();
    const { formValues, changeHandler, submitHandler } = useEditForm({ content: "" }, onEdit, commentId, null);
    async function onEdit() {
        const content = formValues.content;
        try {
            const data = await editComment(commentId, gameId, { content });
            setCurGame(data);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            console.log(err.message)
            setErrMessage(JSON.parse(err.message));
            setIsError(true);
        }
    }
    return (
        <div className={styles.modal}>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Edit your comment</h3>
                <div className={styles.editComment}>
                    {errMessage instanceof Array
                        ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                        : errMessage.content
                            ? <label className={styles.errorMessage}>{errMessage.content}</label>
                            : ""
                    }
                    <input type="text" name="content" value={formValues.content} onChange={changeHandler} />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}