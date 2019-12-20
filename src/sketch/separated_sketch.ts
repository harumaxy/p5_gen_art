import p5 from 'p5'
import SeparatedParticle from '../models/separatedParticle'
import _ from 'lodash'

export const separated_sketch = (p: p5) => {
    let particles: SeparatedParticle[] = []

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        _.times(75, () => {
            particles.push(
                // p.random() 引数が1つだけのときは0 ~ 引数までのランダム値
                new SeparatedParticle(p.random(p.width), p.random(p.height))
            )
        })
    }
    p.draw = () => {
        p.background(51)
        particles.forEach(particle => {
            particle.seperate(particles)
            particle.update()
            particle.borders(p)
            particle.display(p)
        })
    }
    p.mouseDragged = () => {
        particles.push(new SeparatedParticle(p.mouseX, p.mouseY))
    }
}
