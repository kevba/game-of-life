import React, { useContext, useRef, useState } from 'react'
import { BoardContext, BoardDispatch } from '../boardReducer'
import { Cell } from '../logic/cells'

const CANVAS_WIDTH = 900

export const Canvas = () => {
    const [drawing, setDrawing] = useState(false)

    const { cells, width } = useContext(BoardContext)
    const boardDispatch = useContext(BoardDispatch)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null)

    const handleMouseDown = () => {
        setDrawing(true)
        console.log(drawing)
    }

    const handleMouseUp = () => {
        setDrawing(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!drawing) {
            return
        }

        let x = e.offsetX
        let y = e.offsetY
        let offsetFactor = width / CANVAS_WIDTH

        const actualX = Math.floor(x * offsetFactor)
        const actualY = Math.floor(y * offsetFactor)
        const cellNumber = actualX + actualY * width
        console.log(e.offsetX, e.offsetY, drawing, cellNumber)
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
    }, [context])

    React.useEffect(() => {
        if (context === null) {
            return
        }

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH)
        // canvasGrid(width, context)
        canvasCells(width, cells, context)
    }, [context, width, cells])

    React.useEffect(() => {
        if (context === null) {
            return
        }

        canvasRef.current.addEventListener('mousedown', handleMouseDown)
        canvasRef.current.addEventListener('mouseup', handleMouseUp)
        canvasRef.current.addEventListener('mousemove', handleMouseMove)
        canvasRef.current.addEventListener('mouseleave', handleMouseUp)

        return () => {
            if (context) {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown)
                canvasRef.current.removeEventListener('mouseup', handleMouseUp)
                canvasRef.current.removeEventListener('mousemove', handleMouseMove)
                canvasRef.current.removeEventListener('mouseleave', handleMouseUp)
            }
        }
    }, [context, width, drawing])

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
    context.font = `${offsetSize - 2}px Arial`

    let y = 1
    let x = 0

    for (let cell of cells) {
        context.fillText(cell.icon, x * offsetSize, y * offsetSize)

        x = x + 1
        if (x >= width) {
            x = 0
            y = y + 1
        }
    }
}
