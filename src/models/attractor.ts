import p5, { Vector } from 'p5'
import Particle from './particle'

export default class Attractor {
    pos: Vector
    mass: number = 20
    round: number = 20 * 5
    G: number = 2

    // drag用のプロパティ
    isDragging: boolean = false
    offsetPos: Vector

    constructor(x: number, y: number, p: p5) {
        this.pos = p.createVector(x, y)
        this.offsetPos = p.createVector(0, 0)
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

    isHovered = (p: p5): boolean => {
        const relMousePos = p.createVector(
            p.mouseX - this.pos.x,
            p.mouseY - this.pos.y
        )
        return relMousePos.mag() < this.round
    }
    isPressed = (p: p5) => {
        return p.mouseIsPressed && this.isHovered(p)
    }

    update(p: p5) {
        if (!this.isDragging && this.isPressed(p)) {
            this.isDragging = true
            this.offsetPos = this.pos.sub(p.createVector(p.mouseX, p.mouseY))
        }
        if (!p.mouseIsPressed) {
            this.isDragging = false
        }

        if (this.isDragging) {
            this.pos = p.createVector(p.mouseX, p.mouseY).add(this.offsetPos)
        }
    }

    display = (p: p5) => {
        if (this.isDragging) {
            p.fill(255, 255, 0, 255)
        } else {
            p.fill(255)
        }
        p.circle(this.pos.x, this.pos.y, this.round * 2)
    }
}

const constrain = (value: number, min: number, max: number) => {
    if (value < min) return min
    if (value > max) return max
    return value
}
