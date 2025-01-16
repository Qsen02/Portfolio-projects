import { Movie } from "./Movies"

export type ActionType={
    type:"getAll"|"search"|"getNext",
    payload:Movie[]|[]
}