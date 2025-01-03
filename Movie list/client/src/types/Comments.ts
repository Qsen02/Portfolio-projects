import { Answer } from "./Answers"
import { Movie } from "./Movies"
import { User } from "./User"

export type Comment = {
    _id:string,
    username: string,
    content: string,
    ownerId: User | string,
    movieId: Movie,
    likes: User[],
    answers: Answer[]
}