import p5, { Vector, XML } from 'p5'
import { array } from 'prop-types'
import _ from 'lodash'

export default class SeparatedParticle {
    pos: Vector
    vel: Vector = new Vector().set(0, 0)
    acc: Vector = new Vector().set(0, 0)
    r: number = 12
    maxspeed: number = 3
    maxforce: number = 0.2

    constructor(x: number, y: number) {
        this.pos = new Vector().set(x, y)
    }

    applyFource = (force: Vector) => {
        this.acc.add(force)
    }

    update = () => {
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }
    display = (p: p5) => {
        p.fill(127)
        p.stroke(200)
        p.strokeWeight(2)
        p.push()
        p.circle(this.pos.x, this.pos.y, this.r * 2)
        p.pop()
    }
    borders = (p: p5) => {
        if (this.pos.x < -this.r) this.pos.x = p.width + this.r
        if (this.pos.y < -this.r) this.pos.y = p.height + this.r
        if (this.pos.x > p.width + this.r) this.pos.x = -this.r
        if (this.pos.y > p.height + this.r) this.pos.y = -this.r
    }

    seperate = (others: SeparatedParticle[]) => {
        const desiredSeparation = this.r * 2
        let sum = new Vector().set(0, 0)
        let count = 0
        // 自分と半径が交わる粒子の、位置ベクトルの差を累積する
        others.forEach(other => {
            const dist = Vector.dist(this.pos, other.pos)
            if (dist > 0 && dist < desiredSeparation) {
                let diff = Vector.sub(this.pos, other.pos)
                diff.normalize()
                diff.div(dist)
                sum.add(diff)
                count++
            }
        })
        // 1つ以上、距離が半径以内に重なっている粒子があるとき
        if (count > 0) {
            // 重なる粒子と反対の方向を距離の近さで重み付けした平均の方向に、maxSpeedで移動する
            sum.div(count)
            sum.normalize()
            sum.mult(this.maxspeed)
            const steer = Vector.sub(sum, this.vel)
            steer.limit(this.maxforce)
            this.applyFource(steer)
        }
    }
}
