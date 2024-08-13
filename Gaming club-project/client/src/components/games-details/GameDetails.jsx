import { useParams, Route, Routes } from "react-router-dom"
import { useState } from "react";

import styles from "./GameDetails.module.css"

import GamesDetailsButtons from "./games-details-buttons/GamesDetailsButtons";
import GameEdit from "../game-edit/GameEdit";
import GameDelete from "../game-delete/GameDelete";
import CommentDelete from "./comments-delete/CommentDelete";
import CommentEdit from "./comments-edit/CommentEdit";
import GameCommentSection from "./game-comment-section/GameCommentSection.jsx";

import { useGetOneGame } from "../../hooks/useGames.js";
import { useUserContext } from "../../context/userContext";

import { LikesAndSavesContext } from "../../context/LikesAndSaveContext";
import { useCreateComment } from "../../hooks/useComments.js";

export default function GameDetails() {
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const { gameId } = useParams();
    const { user } = useUserContext();
    const createComment = useCreateComment();
    const { game, userOwner, setGameHandler, isLoading } = useGetOneGame(gameId);


    function onSetGameHandler(game) {
        setGameHandler(game);
    }

    async function onComment(values,actions) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please fill the field!");
            }
            setIsError(false);
            const data = await createComment(gameId, { content });
            setGameHandler(data);
            actions.resetForm();
        } catch (err) {
            setErrMessage(err.message);
            setIsError(true);
            return;
        }
    }

    return (
        <>
            <Routes>
                <Route path="/delete" element={<GameDelete name={game.name} />} />
                <Route path="/edit" element={<GameEdit setCurGame={onSetGameHandler} />} />
                <Route path="comment/:commentId/delete" element={<CommentDelete setCurGame={onSetGameHandler} />} />
                <Route path="comment/:commentId/edit" element={<CommentEdit setCurGame={onSetGameHandler} />} />
            </Routes>
            {isLoading ?
                <div className={styles.loading}></div>
                : ""

            }
            <div className={styles.details}>
                <h1>{game.name}</h1>
                <p>Published by: {userOwner.username}</p>
                <img src={game.image} alt={game.name} />
                <div className={styles.category}>
                    <p>Category: {game.category}</p>
                    <p>Year: {game.year}</p>
                    <p>Creator: {game.creator}</p>
                </div>
                <p>{game.description}</p>
                {user
                    ?
                    <LikesAndSavesContext.Provider value={{ userData: user, saves: game.saves, likesArray: game.userLikes, setGameHandler }}>
                        <GamesDetailsButtons
                            ownerId={game.ownerId}
                            likes={game.likes}
                            savesCount={game.saves.length}
                            gameId={game._id}
                        />
                    </LikesAndSavesContext.Provider>
                    : ""
                }
            </div>
            <GameCommentSection
                submitHandler={onComment}
                commentCount={game.comments.length}
                comments={game.comments}
                error={errMessage}
                hasError={isError}
                ownerName={userOwner.username}
            />
        </>
    )
}