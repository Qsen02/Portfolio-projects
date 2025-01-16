import { Comment } from "./Comments"
import { User } from "./User"

export type Movie ={
    _id: string,
    title: string,
    genre: string,
    image: string,
    likes: User[],
    saves: User[],
    comments:Comment[],
    ownerId: User | string
}