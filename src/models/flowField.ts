import p5, { Vector } from 'p5'
import { array } from 'prop-types'
import _ from 'lodash'

export class FlowField {
    resolution: number
    cols: number
    rows: number
    field: Vector[][]
    constructor(p: p5, r: number) {
        this.resolution = r
        this.cols = p.width / r
        this.rows = p.height / r
        this.field = this.__make2dArray(this.cols)
        this.__init(p)
    }

    __make2dArray = (n: number) => {
        const array = []
        for (let i = 0; i < n; i++) {
            array.push([])
        }
        return array
    }

    __init = (p: p5) => {
        p.noiseSeed(Math.floor(p.random(10000)))
        _.times(this.cols, i => {
            _.times(this.rows, j => {
                const theta = p.map(p.noise(i / 10, j / 10), 0, 1, 0, p.TWO_PI)
                this.field[i][j] = p.createVector(p.cos(theta), p.sin(theta))
            })
        })
    }

    lookup = (lookup: Vector, p: p5) => {
        const col = Math.floor(
            p.constrain(lookup.x / this.resolution, 0, this.cols - 1)
        )
        const row = Math.floor(
            p.constrain(lookup.y / this.resolution, 0, this.rows - 1)
        )
        return this.field[col][row]
    }

    display = (p: p5) => {
        _.times(this.cols, col => {
            _.times(this.rows, row => {
                this.__drawVector(
                    this.field[col][row],
                    col * this.resolution,
                    row * this.resolution,
                    this.resolution - 2,
                    p
                )
            })
        })
    }

    __drawVector = (v: Vector, x: number, y: number, scale: number, p: p5) => {
        p.push()
        const arrowSize = 4
        p.translate(x, y)
        p.stroke(200, 100)
        p.rotate(v.heading())
        const len = v.mag() * scale
        p.line(0, 0, len, 0)
        p.pop()
    }
}
