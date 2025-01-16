import { Movie } from "./Movies";

export type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string,
    likedMovies: Movie[]|[], 
    savedMovies: Movie[]|[],
    createdMovies: Movie[]|[]
}

export type UserContextType = {
    user: User | null;
    setUserState: (user: User | null) => void;
    clearUserState: () => Promise<void>;
}

export type initialvaluesType={
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    profileImage: string,
    likedMovies: Movie[]|[], 
    savedMovies: Movie[]|[],
    createdMovies: Movie[]|[]
}