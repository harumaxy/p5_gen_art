import p5, { Vector } from 'p5'
import Particle from '../models/particle'
import { Vehicle } from '../models/vehicle'

export const vehicle_sketch = (p: p5) => {
    let vehicle: Vehicle
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        vehicle = new Vehicle(p.width / 2, p.height / 2)
    }
    p.draw = () => {
        p.background(51)

        const target = p.createVector(p.mouseX, p.mouseY)
        vehicle.seek(target)
        vehicle.update()
        vehicle.display(p)
    }
}
