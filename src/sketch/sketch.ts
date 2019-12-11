import p5, { Vector } from 'p5'
import Particle from '../models/particle'
import Attractor from '../models/attractor'
export const sketch = (p: p5) => {
    let particle1: Particle
    let attractor: Attractor

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        particle1 = new Particle(400, 200, 5, p)

        attractor = new Attractor(p.width / 2, p.height / 2, p)
    }

    p.draw = () => {
        // 塗りつぶし
        p.background(51)

        const attraction = attractor.calculateAttraction(particle1, p)
        particle1.applyForce(attraction)

        attractor.display(p)

        particle1.update()
        particle1.display(p)
        particle1.edge(p)
    }
}
