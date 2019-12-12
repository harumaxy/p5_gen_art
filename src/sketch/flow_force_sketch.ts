import p5, { Vector } from 'p5'
import { Vehicle } from '../models/vehicle'
import { FlowField } from '../models/flowField'

export const flow_forth_sketch = (p: p5) => {
    let vehicles: Vehicle[] = []
    let flow: FlowField

    const addVehicle = (x: number, y: number) => {
        const v = new Vehicle(x, y)
        vehicles.push(v)
        // 3秒後にVehicleを削除(メモリ解放目的)
        setTimeout(() => {
            vehicles.splice(0, 1)
        }, 3000)
        console.log(vehicles.length)
        //@ts-ignore
        console.log(performance.memory.usedJSHeapSize)
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        for (let i = 0; i < 10; i++) {
            addVehicle(p.random(p.width), p.random(0, p.height))
        }
        flow = new FlowField(p, p.width / 20)
    }
    p.draw = () => {
        if (p.round(p.random(0, 1)) == 1) {
            addVehicle(p.width, p.random(0, p.height))
        } else {
            addVehicle(p.random(0, p.width), 0)
        }

        if (p.mouseIsPressed) {
            const gap = 50
            let offset = -100
            addVehicle(p.mouseX + offset, p.mouseY + offset)
            offset += gap
            addVehicle(p.mouseX + offset, p.mouseY + offset)
            offset += gap
            addVehicle(p.mouseX + offset, p.mouseY + offset)
            offset += gap
            addVehicle(p.mouseX + offset, p.mouseY + offset)
            offset += gap
            addVehicle(p.mouseX + offset, p.mouseY + offset)
            offset += gap
        }

        p.background(51)

        flow.display(p)

        vehicles.forEach(v => {
            // v.arrive(target, p)
            v.applyForce(flow.lookup(v.pos, p))
            v.update()
            v.display(p)
        })
    }
}
