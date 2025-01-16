import styles from "../ProfileMovies.module.css";
import { useNavigate } from "react-router-dom";
import SavedMoviesDetails from "./saved-movies-details/SavedMoviesDetails";
import { Movie } from "../../../types/Movies";

type SavedMoviesProps = {
    savedMovies: Movie[]
}

export default function SavedMovies({
    savedMovies
}: SavedMoviesProps) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <button onClick={onBack}>X</button>
            <h1>Your saved movies</h1>
            <section className={styles.catalogContent}>
                    {savedMovies.length > 0
                        ? savedMovies.map(el => <SavedMoviesDetails
                            key={el._id}
                            id={el._id}
                            title={el.title}
                            image={el.image}
                            genre={el.genre}
                            />)
                        : <h2>No liked movies yet</h2>
                    }
            </section>
        </div>
    )
}