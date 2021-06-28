import React, { useContext, useRef } from 'react'
import { BoardContext, BoardDispatch } from '../boardReducer'
import { Cell } from '../logic/cells'

const CANVAS_WIDTH = 600

export const Canvas = () => {
    const { cells, width } = useContext(BoardContext)
    const boardDispatch = useContext(BoardDispatch)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null)

    const handleSetCell = (x: number, y: number) => {
        const cellNumber = x + y * width
        boardDispatch({ type: 'updateCellType', cellNumber: cellNumber })
    }

    React.useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const renderCtx = canvasRef.current.getContext('2d')
        if (renderCtx) {
            setContext(renderCtx)
        }

        if (context === null) {
            return
        }

        canvasGrid(width, context)
        canvasCells(width, cells, context)
    }, [context, width, cells])

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_WIDTH}
            style={{
                border: '2px solid #000',
                marginTop: 10,
            }}></canvas>
    )
}

const canvasGrid = (width: number, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH)

    let offsetSize = CANVAS_WIDTH / width
    for (let x = 1; x < width; x++) {
        let offset = offsetSize * x
        context.fillRect(offset, 0, 1, CANVAS_WIDTH)
    }

    for (let y = 1; y < width; y++) {
        let offset = offsetSize * y
        context.fillRect(0, offset, CANVAS_WIDTH, 1)
    }
}

const canvasCells = (width: number, cells: Cell[], context: CanvasRenderingContext2D) => {
    let offsetSize = CANVAS_WIDTH / width
    let y = 0
    let x = 0

    for (let cell of cells) {
        context.fillText(cell.icon, x, y, offsetSize)
        x = x++
        if (x >= width) {
            x = 0
            y = y++
        }
    }
}
