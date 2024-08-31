import { useNavigate, useParams } from "react-router-dom"

import styles from "./GameDelete.module.css"
import { useDeleteGame } from "../../hooks/useGames.js";
import { useState } from "react";

export default function GameDelete({
    name
}) {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const deleteGame=useDeleteGame();
    const [clicked, setClicked] = useState(false);

    async function onDelete() {
        setClicked(true);
        await deleteGame(gameId);
        navigate("/catalog");
        setClicked(false);
    }

    function onCancel(){
        setClicked(true);
        navigate(`/catalog/${gameId}`);
        setClicked(false);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h1>Are you sure you want to delete {name}?</h1>
                <button disabled={clicked ? true : false} onClick={onDelete}>Yes</button>
                <button disabled={clicked ? true : false} onClick={onCancel}>No</button>
            </div>
        </div>

    )
}