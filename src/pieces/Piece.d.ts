import { Move } from "./moves/Move";

export type Piece = {
    name: string;
    hasMoved: boolean;
    color: "b" | "w";
    moves: Move[];
    image: string;
}