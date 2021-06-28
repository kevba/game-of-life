import { Cell } from './cells'
import { CreateEmptyCell } from './cells/types/empty'
import { CreateMountainCell } from './cells/types/mountain'
import { CreateTreeCell } from './cells/types/tree'
import { CreateWaterCell } from './cells/types/water'

type cellCreator = () => Cell

export const randomCells = (size: number): Cell[] => {
    let state: Cell[] = []

    const cellCreators: cellCreator[] = [CreateEmptyCell, CreateWaterCell, CreateTreeCell, CreateMountainCell]

    for (let i = 0; i < size * size; i++) {
        let rand = Math.floor(Math.random() * cellCreators.length)
        state.push(cellCreators[rand]())
    }

    return state
}
