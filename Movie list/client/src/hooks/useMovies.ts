import { useEffect, useReducer } from "react";
import { useState } from "react";
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById, getTopMovies, likeMovie, pagination, saveMovie, searchMovies, unlikeMovie, unsaveMovie } from "../api/movieService";
import { useNavigate } from "react-router-dom";
import { moviesReducer } from "../reducers/catalog";
import { Movie } from "../types/Movies";

export function useGetTopMovies(initialvalues: []) {
    const [movies, setMovies] = useState<Movie[]>(initialvalues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movies = await getTopMovies();
                setMovies(movies);
                setLoading(false);
            } catch (err) {
                setFetchError(true);
                return;
            }
        })()
    }, []);

    return {
        movies,
        loading,
        fetchError
    }
}

export function useGetAllMovies(initialvalues: []) {
    const [movies, setMovies] = useReducer<Movie[]>(moviesReducer, initialvalues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const curMovies = await getAllMovies();
                setMovies({ type: "getAll", payload: curMovies.movies });
                setMaxPage(curMovies.maxPage);
                setLoading(false);
            } catch (err) {
                setFetchError(true);
                return;
            }
        })()
    }, [])

    return {
        movies, setMovies, loading, setLoading, fetchError, setFetchError, maxPage, setMaxPage
    }
}

export function useSearchMovies() {
    async function searchingMovies(query: string) {
        return await searchMovies(query);
    }

    return searchingMovies;
}

export function useGetOneMovie(initialvalues: {}, movieId: string | undefined) {
    const [movie, setMovie] = useState<Movie | {}>(initialvalues)
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movie = await getMovieById(movieId);
                setMovie(movie);
                setLoading(false);
            } catch (err) {
                if ((err as { message: string }).message == "Resource not found!") {
                    navigate(`/404`);
                    return;
                }
                setFetchError(true);
                return;
            }
        })()
    }, [])

    return {
        movie, setMovie, loading, setLoading, fetchError, setFetchError
    }
}

export function useCreateMovie() {
    async function creatingMovie(data: {}) {
        return await createMovie(data);
    }

    return creatingMovie;
}

export function useDeleteMovie() {
    async function deletingMovie(id: string | undefined) {
        return await deleteMovie(id);
    }

    return deletingMovie;
}

export function useEditMovie() {
    async function editingMovie(id: string | undefined, data: {}) {
        return await editMovie(id, data);
    }

    return editingMovie;
}

export function useLikeMovie() {
    async function likingMovie(data: {}) {
        return await likeMovie(data);
    }

    return likingMovie;
}

export function useUnlikeMovie() {
    async function unlikingMovie(data: {}) {
        return await unlikeMovie(data);
    }

    return unlikingMovie;
}

export function useSaveMovie() {
    async function savingMovie(data: {}) {
        return await saveMovie(data);
    }

    return savingMovie;
}

export function useUnsaveMovie() {
    async function unsavingMovie(data: {}) {
        return await unsaveMovie(data);
    }

    return unsavingMovie;
}

export function usePagination(
    isSearched: boolean,
    maxPage: number,
    setMovieHandler: React.Dispatch<React.SetStateAction<ActionType>>,
    loadingHandler: React.Dispatch<React.SetStateAction<boolean>>,
    searchedResults: Movie[],
    setSearchedResults: React.Dispatch<React.SetStateAction<Movie[]>>) {

    const [page, setPage] = useState(0);

    async function paginationHandler(page: number) {
        setPage(oldvalue => page);
        loadingHandler(true);
        if (!isSearched) {
            const data = await pagination(page);
            setMovieHandler({ type: "getNext", payload: data.movies });
        } else {
            const curResults = [...searchedResults];
            const movies: Movie[][] = [];
            for (let i = 0; i < maxPage; i++) {
                const curMovies: Movie[] = [];
                for (let j = 0; j < 6; j++) {
                    const movie= curResults.shift();
                    if (movie == undefined) {
                        break;
                    }
                    curMovies.push(movie as Movie );
                }
                movies.push(curMovies);
            }
            setMovieHandler({ type: "getNext", payload: movies[page] });
            setSearchedResults(oldvalue=> [...searchedResults]);
        }
        loadingHandler(false);
    }

    return {
        paginationHandler,
        page,
        setPage
    }
}
