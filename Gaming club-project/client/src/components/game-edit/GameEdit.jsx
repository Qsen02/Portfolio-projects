import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { useEditGame, useGetOneGame } from "../../hooks/useGames.js";
import { useForm } from "../../hooks/useForm.js";

export default function GameEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState({});
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { game } = useGetOneGame(gameId);
    const editGame = useEditGame();
    const { formValues, changeHandler, submitHandler } = useForm(game, onEdit, true);

    async function onEdit() {
        const name = formValues.name;
        const category = formValues.category;
        const year = formValues.year;
        const creator = formValues.creator;
        const description = formValues.description;
        const image = formValues.image;
        try {
            if (!name || !category || !year || !creator || !description || !image) {
                throw new Error("All fields required!");
            }
            const game = await editGame(gameId, { name, category, year, image, creator, description, _id: gameId });
            setCurGame(game);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if (err.message === "All fields required!") {
                setErrMessage(err.message);
                return;
            }
            setErrMessage(JSON.parse(err.message));
            return;
        }
    }

    function onCancel() {
        navigate(`/catalog/${gameId}`);
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Here you can add game</h3>
                {
                    errMessage instanceof Array
                        ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                        : ""
                }
                {typeof (errMessage) == "string"
                    ? <label className={styles.errorMessage}>{errMessage}</label>
                    : ""
                }
                {errMessage.name
                    ? <label className={styles.errorMessage}>{errMessage.name}</label>
                    : <label>Name</label>
                }
                <input type="text" name="name" value={formValues.name} onChange={changeHandler} />
                {errMessage.category
                    ? <label className={styles.errorMessage}>{errMessage.category}</label>
                    : <label>Category</label>
                }
                <input type="text" name="category" value={formValues.category} onChange={changeHandler} />
                {errMessage.year
                    ? <label className={styles.errorMessage}>{errMessage.year}</label>
                    : <label>Year</label>
                }
                <input type="number" name="year" value={formValues.year} onChange={changeHandler} />
                {errMessage.image
                    ? <label className={styles.errorMessage}>{errMessage.image}</label>
                    : <label>Image</label>
                }
                <input type="text" name="image" value={formValues.image} onChange={changeHandler} />
                {errMessage.creator
                    ? <label className={styles.errorMessage}>{errMessage.creator}</label>
                    : <label>Creator</label>
                }
                <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} />
                {errMessage.description
                    ? <label className={styles.errorMessage}>{errMessage.description}</label>
                    : <label>Description</label>
                }
                <textarea name="description" value={formValues.description} onChange={changeHandler} />
                <div className={styles.buttons}>
                    <button type="submit">Edit</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}