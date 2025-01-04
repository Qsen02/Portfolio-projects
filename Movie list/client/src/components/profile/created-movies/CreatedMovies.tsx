import styles from "../ProfileMovies.module.css";
import { useNavigate } from "react-router-dom";
import CreatedMoviesDetails from "./created-movies-details/CreatedMoviesDetails";
import { Movie } from "../../../types/Movies";

type CreatedMoviesProps = {
    createdMovies: Movie[]
}

export default function CreatedMovies({
    createdMovies
}: CreatedMoviesProps) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <button onClick={onBack}>X</button>
            <h1>Your created movies</h1>
            <section className={styles.catalogContent}>
                    {createdMovies.length > 0
                        ? createdMovies.map(el => <CreatedMoviesDetails
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