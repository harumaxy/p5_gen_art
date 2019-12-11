import p5, { Vector } from 'p5'
import Particle from '../models/particle'
import Liquid from '../models/liquid'

export const liquid_sketch = (p: p5) => {
    let particles: Particle[] = []
    let liquid: Liquid
    let gravity_acc = p.createVector(0, 0.1)

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(p.random(0, p.width), 0, p, 5))
        }

        liquid = new Liquid({
            y: p.height / 2,
            w: p.width,
            h: p.height,
            c: 0.2
        })
    }

    p.draw = () => {
        // 塗りつぶし
        p.background(51)

        // particlesの物理処理
        particles.forEach(particle => {
            // 重力
            particle.applyForce(gravity_acc.copy().mult(particle.mass))

            if (liquid.isContaines(particle)) {
                const dragForce = liquid.calculateDrag(particle)
                particle.applyForce(dragForce)
            }

            particle.update()
            particle.display(p)
            particle.edge(p)
        })

        liquid.display(p)
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
