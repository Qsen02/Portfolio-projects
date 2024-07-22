import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from ".././GameDetails.module.css"

import { LikesAndSavesContext } from "../../../context/LikesAndSaveContext"

import { likeGame, unLikeGame } from "../../../api/gameService";

export default function GamesDetailsButtons({
    ownerId,
    userData,
    likes,
    savesCount,
    gameId
}) {
    const navigate = useNavigate();
    const { saves, likesArray, setGameHandler } = useContext(LikesAndSavesContext);
    async function onLike() {
        try {
            const data = await likeGame(gameId);
            setGameHandler(data);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    async function onUnlike() {
        try {
            const data = await unLikeGame(gameId);
            setGameHandler(data);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    return (
        <>
            {userData._id.toString() == ownerId
                ? <div className={styles.likes}>
                    <i className="fa-solid fa-heart"></i>
                    <p>{likes}</p>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.buttons}>
                    <button><Link to="edit">Edit</Link></button>
                    <button className={styles.delete}><Link to="delete">Delete</Link></button>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{savesCount}</p>
                </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? likesArray.includes(userData._id.toString())
                    ? <div className={styles.likes}>
                        <i className="fa-solid fa-heart" onClick={onUnlike}></i>
                        <p>{likes}</p>
                    </div>
                    : <div className={styles.likes}>
                        <i className="fa-regular fa-heart" onClick={onLike}></i>
                        <p>{likes}</p>
                    </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? saves.includes(userData._id.toString()) ? <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{savesCount}</p>
                </div>
                    : <div className={styles.saves}>
                        <Link to="save"><i className="fa-regular fa-bookmark"></i></Link>
                        <p>{savesCount}</p>
                    </div>
                : ""
            }
        </>
    )
}