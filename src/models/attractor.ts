import p5, { Vector } from 'p5'
import Particle from './particle'

export default class Attractor {
    pos: Vector
    mass: number = 20
    G: number = 2
    constructor(x: number, y: number, p: p5) {
        this.pos = p.createVector(x, y)
    }

    calculateAttraction = (particle: Particle, p: p5) => {
        let vec = p5.Vector.sub(this.pos, particle.pos)
        // 近くなりすぎると引力が強くなりすぎる、遠くなると効かなくなるので程々に制限
        let distance = constrain(vec.mag(), 10, 25)
        let direction = vec.normalize()
        let strength =
            (this.G * this.mass * particle.mass) / (distance * distance)
        return direction.mult(strength)
    }

    display = (p: p5) => {
        p.fill(255)
        p.ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10)
    }
}

const constrain = (value: number, min: number, max: number) => {
    if (value < min) return min
    if (value > max) return max
    return value
}
