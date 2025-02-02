import { Link, useNavigate } from "react-router-dom";

import styles from "../MovieDetails.module.css";

import { useLikeMovie, useSaveMovie, useUnlikeMovie, useUnsaveMovie } from "../../../hooks/useMovies";
import { User } from "../../../types/User";
import { Movie } from "../../../types/Movies";

type MovieDetailsButtonsType = {
    user: User,
    ownerId: string,
    setMovie: React.Dispatch<React.SetStateAction<{}>>,
    likes: User[],
    saves: User[],
    movie: Movie | {}
}

export default function MovieDetailsButtons({
    user, ownerId, setMovie, likes, saves, movie
}: MovieDetailsButtonsType) {
    const likesIds = likes?.map(el => (el as { _id: string })._id);
    const savesIds = saves?.map(el => (el as { _id: string })._id);
    const likeMovie = useLikeMovie();
    const unlikeMovie = useUnlikeMovie();
    const saveMovie = useSaveMovie();
    const unsaveMovie = useUnsaveMovie();
    const navigate = useNavigate();

    async function onLike() {
        try {
            const newMovie = await likeMovie(movie);
            setMovie(newMovie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`/404`);
                return;
            }
            return;
        }
    }

    async function onUnlike() {
        try {
            const newMovie = await unlikeMovie(movie);
            setMovie(newMovie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`/404`);
                return;
            }
            return;
        }
    }
    async function onSave() {
        try {
            const newMovie = await saveMovie(movie);
            setMovie(newMovie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`/404`);
                return;
            }
            return;
        }
    }
    async function onUnsave() {
        try {
            const newMovie = await unsaveMovie(movie);
            setMovie(newMovie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`/404`);
                return;
            }
            return;
        }
    }
    return (
        <>
            {user._id == ownerId
                ? <article className={styles.adminButtons}>
                    <div>
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p><Link to={`/catalog/${(movie as {_id:string})._id}/likes`}>{likes?.length}</Link></p>
                    </div>
                    <Link to={`/catalog/${(movie as {_id:string})._id}/edit`}><button>Edit</button></Link>
                    <Link to={`/catalog/${(movie as {_id:string})._id}/delete`}><button>Delete</button></Link>
                    <div>
                        <i className="fa-solid fa-bookmark"></i>
                        <p><Link to={`/catalog/${(movie as {_id:string})._id}/saves`}>{saves?.length}</Link></p>
                    </div>
                </article>
                : <article className={styles.userButtons}>
                    {likesIds?.includes(user._id)
                        ? <div>
                            <i className="fa-solid fa-thumbs-up" onClick={onUnlike}></i>
                            <p><Link to={`/catalog/${(movie as {_id:string})._id}/likes`}>{likes?.length}</Link></p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-thumbs-up" onClick={onLike}></i>
                            <p><Link to={`/catalog/${(movie as {_id:string})._id}/likes`}>{likes?.length}</Link></p>
                        </div>
                    }
                    {savesIds?.includes(user._id)
                        ? <div>
                            <i className="fa-solid fa-bookmark" onClick={onUnsave}></i>
                            <p><Link to={`/catalog/${(movie as {_id:string})._id}/saves`}>{saves?.length}</Link></p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-bookmark" onClick={onSave}></i>
                            <p><Link to={`/catalog/${(movie as {_id:string})._id}/saves`}>{saves?.length}</Link></p>
                        </div>
                    }
                </article>
            }
        </>
    )
}