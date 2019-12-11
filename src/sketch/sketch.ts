import p5, { Vector } from 'p5'
import Particle from '../models/particle'
import Attractor from '../models/attractor'
import Liquid from '../models/liquid'
export const sketch = (p: p5) => {
    let particle1: Particle
    let liquid: Liquid

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        particle1 = new Particle(400, 0, 5, p)
        liquid = new Liquid({
            y: p.height / 2,
            w: p.width,
            h: p.height,
            c: 0.08
        })
    }

    p.draw = () => {
        // 塗りつぶし
        p.background(51)

        // 重力
        const gravity = p.createVector(0, 0.2)
        particle1.applyForce(gravity.copy().mult(particle1.mass))

        // 液体の抗力(浮力)
        if (liquid.isContaines(particle1)) {
            const dragForce = liquid.calculateDrag(particle1)
            particle1.applyForce(dragForce)
        }

        liquid.display(p)
        particle1.update()
        particle1.display(p)
        particle1.edge(p)
    }
}
