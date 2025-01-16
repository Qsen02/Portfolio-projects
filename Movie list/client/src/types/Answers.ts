import { User } from "./User"

export type Answer = {
    _id:string,
    username: string,
    content: string,
    ownerId: User,
    likes: User[]
}