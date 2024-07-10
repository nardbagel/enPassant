import { Piece } from "../pieces/Piece"
import { Move } from "../pieces/moves/Move"
import { pawnPush, pawnTake, rook, bishop, knight, king, castle } from "../pieces/moves"
import { Board } from "./Board"

import bb from '../assets/chess/bb.svg'
import bw from '../assets/chess/bw.svg'
import kb from '../assets/chess/kb.svg'
import kw from '../assets/chess/kw.svg'
import nb from '../assets/chess/nb.svg'
import nw from '../assets/chess/nw.svg'
import pb from '../assets/chess/pb.svg'
import pw from '../assets/chess/pw.svg'
import qb from '../assets/chess/qb.svg'
import qw from '../assets/chess/qw.svg'
import rb from '../assets/chess/rb.svg'
import rw from '../assets/chess/rw.svg'

const f = (name: string, color: "b" | "w", image: string, moves?: Move[]): Piece => ({name, hasMoved: false, color, moves: moves || [], image})

const board: Board = [
    [f("rook", "b", rb, [rook]), f("night", "b", nb, [knight]), f("bishop", "b", bb, [bishop]), f("king", "b", kb, [king, castle]), f("queen", "b", qb, [rook, bishop]), f("bishop", "b", bb, [bishop]), f("night", "b", nb, [knight]), f("rook", "b", rb, [rook])],
    [f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush]), f("pawn", "b", pb, [pawnTake, pawnPush])],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush]), f("pawn", "w", pw, [pawnTake, pawnPush])],
    [f("rook", "w", rw, [rook]), f("night", "w", nw, [knight]), f("bishop", "w", bw, [bishop]), f("queen", "w", qw, [rook, bishop]), f("king", "w", kw, [king, castle]), f("bishop", "w", bw, [bishop]), f("night", "w", nw, [knight]), f("rook", "w", rw, [rook])]
]

export default board