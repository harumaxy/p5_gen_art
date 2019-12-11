import p5, { Vector } from 'p5'
import Particle from '../models/particle'
import Attractor from '../models/attractor'

export const attract_sketch = (p: p5) => {
    let particles: Particle[] = []
    let attractor: Attractor

    const addParticle = () => {
        const relativeVec = Vector.random2D().setMag(p.random(250, 300))
        const newParticle = new Particle(
            relativeVec.x + p.width / 2,
            relativeVec.y + p.height / 2,
            p,
            p.random(2, 5)
        )
        newParticle.vel = Vector.random2D().setMag(3)
        particles.push(newParticle)
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        for (let i = 0; i < 5; i++) {
            addParticle()
        }
        attractor = new Attractor(p.width / 2, p.height / 2, p)
    }

    p.draw = () => {
        // 塗りつぶし
        p.background(51)

        // attractorの移動
        attractor.update(p)

        // particlesの物理処理
        particles.forEach(particle => {
            // Attractorの引力
            const attractionForce = attractor.calculateAttraction(particle, p)
            particle.applyForce(attractionForce)
            particle.update()
            particle.edge(p)
        })

        particles.filter(el => el.vel.x < 0).forEach(el => el.display(p))
        attractor.display(p)
        particles.filter(el => el.vel.x >= 0).forEach(el => el.display(p))
    }

    p.mousePressed = () => {
        addParticle()
    }

    p.keyPressed = () => {
        if (p.key === ' ') {
            particles.splice(0, 1)
        }
    }
}
