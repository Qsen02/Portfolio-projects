import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { useEditGame, useGetOneGame } from "../../hooks/useGames.js";

import { Form, Formik } from "formik";
import CustomInput from "../../common/CustomInput.jsx";
import CustomTextarea from "../../common/CustomTextarea.jsx";
import { gameSchema } from "../../schemas/index.js";

export default function GameEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState({});
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { game } = useGetOneGame(gameId);
    const editGame = useEditGame();

    async function onEdit(values, actions) {
        const name = values.name;
        const category = values.category;
        const year = values.year;
        const creator = values.creator;
        const description = values.description;
        const image = values.image;
        try {
            const game = await editGame(gameId, { name, category, year, image, creator, description, _id: gameId });
            setCurGame(game);
            actions.resetForm();
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if (err.message.includes("[")) {
                setErrMessage(JSON.parse(err.message));
                return;
            }
            setErrMessage(err.message);
            return;
        }
    }

    function onCancel() {
        navigate(`/catalog/${gameId}`);
    }

    return (
        <Formik initialValues={game} validationSchema={gameSchema} onSubmit={onEdit} enableReinitialize={true}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
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
                            <CustomInput label="Name" type="text" name="name" placeholder="Enter game name..." />
                            <CustomInput label="Category" type="text" name="category" placeholder="Enter game category..." />
                            <CustomInput label="Year" type="number" name="year" placeholder="Enter game year..." />
                            <CustomInput label="Image" type="text" name="image" placeholder="Enter valid URL of the image..." />
                            <CustomInput label="Creator" type="text" name="creator" placeholder="Enter creator of the game..." />
                            <CustomTextarea label="Description" type="text" name="description" placeholder="Enter good description..." />
                            <div className={styles.buttons}>
                                <button type="submit">Edit</button>
                                <button onClick={onCancel}>Cancel</button>
                            </div>
                        </Form>
                    </div >
                )
            }
        </Formik>
    )
}