import Particle from './particle'
import p5 from 'p5'

export default class Liquid {
    x: number = 0
    y: number = 0
    w: number = 0
    h: number = 0
    c: number = 0

    // Typescriptのコンストラクタ省略記法
    // Partial<T> : Tクラスのプロパティ全てをOptionalで持っているjsonオブジェクト
    // Object.assign(obj, obj) : プロパティを全て割り当てる
    constructor(init?: Partial<Liquid>) {
        Object.assign(this, init)
    }

    isContaines = (mover: Particle): boolean => {
        const { x, y } = mover.pos
        const [relX, relY] = [x - this.x, y - this.y]
        return relX > 0 && relX < this.w && relY > 0 && relY < this.h
    }

    calculateDrag = (mover: Particle) => {
        const velocity = mover.vel.mag()
        const dragMagnitude = this.c * Math.pow(velocity, 2)
        const dragForce = mover.vel
            .copy()
            .mult(-1)
            .setMag(dragMagnitude)
        return dragForce
    }

    display = (p: p5) => {
        p.noStroke()
        p.fill(50)
        p.rect(this.x, this.y, this.w, this.h)
    }
}
