import { useEffect, useState } from "react";
import { useNavigate, useParams, Route, Routes } from "react-router-dom"

import styles from "./GameDetails.module.css"

import { getGameById } from "../../api/gameService";
import { getUserData } from "../../utils/userDataHelper";

import GameDetailsComments from "./games-details-comments/GameDetailsComments";
import GamesDetailsButtons from "./games-details-buttons/GamesDetailsButtons";
import GameEdit from "../game-edit/GameEdit";
import GameDelete from "../game-delete/GameDelete";
import { getUserById } from "../../api/userService";

export default function GameDetails() {
    const [game, setGame] = useState({
        comments: [],
        userLikes: [],
        saves: []
    })
    const [userOwner,setUserOwner]=useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { gameId } = useParams();
    const navigate = useNavigate();
    const userData = getUserData();

    useEffect(() => {
        (async () => {
            try {
                const game = await getGameById(gameId);
                setGame(game);
                const user=await getUserById(game.ownerId)
                setUserOwner(user);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("404");
                }
                return;
            }
        })()
    }, [])

    function setGameHandler(game) {
        setGame(game);
    }

    return (
        <>
            <Routes>
                <Route path="/delete" element={<GameDelete />} />
                <Route path="/edit" element={<GameEdit setCurGame={setGameHandler}/>} />
            </Routes>

            <div className={styles.details}>
                <h1>{game.name}</h1>
                <p>Published by: {game.owner}</p>
                <img src={game.image} alt={game.name} />
                <div className={styles.category}>
                    <p>Category: {game.category}</p>
                    <p>Year: {game.year}</p>
                    <p>Creator: {game.creator}</p>
                </div>
                <p>{game.description}</p>
                {userData
                    ? <GamesDetailsButtons
                        isLiked={isLiked}
                        isSaved={isSaved}
                        userData={userData}
                        ownerId={game.ownerId}
                        likes={game.likes}
                        saves={game.saves.length}
                        gameId={game._id}
                    />
                    : ""
                }
            </div>
            <section className={styles.comments}>
                <details>
                    <summary>Comments:<span>{game.comments.length}</span></summary>
                    <div className={styles.commentContent}>
                        {userData
                            ? <form>
                                <input type="text" name="comment" placeholder="Enter comment..." />
                                <button><a href={`/catalog/${game._id}/comment`}>Comment</a></button>
                            </form>
                            : ""}
                        {game.comments.length == 0
                            ? <h3>No comments yet, be the first one!</h3>
                            : game.comments.map(el =>
                                <GameDetailsComments
                                    key={el._id}
                                    commentId={el._id}
                                    content={el.content}
                                    username={el.username}
                                    userData={userData}
                                    ownerName={userOwner.username}
                                />
                            )
                        }
                    </div>
                </details>
            </section>
        </>

    )
}