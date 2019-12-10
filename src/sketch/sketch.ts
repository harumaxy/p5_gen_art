import p5, { Vector } from "p5";
import Particle from "../models/particle";

export const sketch = (p: p5) => {

  let particle: Particle

  p.setup = ()=>{
    p.createCanvas(p.windowWidth, p.windowHeight) 
    particle =  new Particle(p)

  }

  p.draw = () => {
    let gravity = p.createVector(0, 0.1)
    p.background(51)
    particle.update()
    particle.display(p)    
  }
}


