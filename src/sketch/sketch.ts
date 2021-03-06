import p5, { Vector } from 'p5'
import Particle from '../models/particle'

export const sketch = (p: p5) => {
    let particles: Particle[] = []
    const gravity_acc = p.createVector(0, 0.2)
    const wind = p.createVector(0.1, 0)

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(p.random(0, p.width), 0, p, 5))
        }
    }

    p.draw = () => {
        // 塗りつぶし
        p.background(51)

        // particlesの物理処理
        particles.forEach(particle => {
            particle.applyForce(gravity_acc.copy().mult(particle.mass))
            particle.applyForce(wind)
            particle.update()
            particle.display(p)
            particle.edge(p)
        })
    }

    p.mousePressed = () => {
        particles.push(new Particle(p.random(0, p.width), 0, p, 5))
    }

    p.keyPressed = () => {
        if (p.key === ' ') {
            particles.splice(0, 1)
        }
    }
}
