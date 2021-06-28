import { CreateEmptyCell } from './empty'
import { ICell, IAgingCell } from './base'
import { Cell } from '..'
import { CreateTreeCell } from './tree'
import { random } from '../../helpers'

export interface IAshCell extends IAgingCell {
    type: 'ash'
}

export const CreateAshCell = (): IAshCell => {
    return {
        type: 'ash',
        icon: String.fromCodePoint(0x2668),
        age: 0,
        maxAge: 20,
    }
}

const GROW_TREE_CHANCE = 5

export const simulateAsh = (board: Cell[], cell: IAshCell, boardWidth: number, cellNumber: number): Cell | null => {
    // Ash does not do anything, besides exising, and eventually "dying".
    cell.age++

    if (cell.age > cell.maxAge) {
        // There is a small chance a tree might grow from the ashes.
        if (random(GROW_TREE_CHANCE)) {
            return CreateTreeCell()
        }

        return CreateEmptyCell()
    }

    return cell
}
