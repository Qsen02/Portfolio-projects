import { ActionType } from "../types/ActionReducerType";
import { Movie } from "../types/Movies";

export const moviesReducer:React.Reducer<Movie[], ActionType>=(state, action)=>{
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "search":
            const games = [];
            for (let i = 0; i < 6; i++) {
                if (action.payload[i] == undefined) {
                    break;
                }
                games.push(action.payload[i]);
            }
            return games;
        case "getNext":
            return action.payload.slice();
        default:
            return state;
    }
}