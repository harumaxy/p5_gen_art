import p5, { Vector } from 'p5'

export class Vehicle {
    pos: Vector = new Vector()
    vel: Vector = new Vector().set(0, 0)
    acc: Vector = new Vector().set(0, 0)
    maxSpeed: number = 5
    maxForce: number = 5

    constructor(x: number, y: number) {
        this.pos.set(x, y)
    }

    applyForce = (force: Vector) => {
        this.acc.add(force)
    }

    // steering = desired - velocity
    // 旋回力 = 望む速度の方向 - 現在の速度
    seek = (target: Vector) => {
        let desired = Vector.sub(target, this.pos)
        desired.setMag(this.maxSpeed)

        const steering = Vector.sub(desired, this.vel)
        steering.limit(this.maxForce)
        this.applyForce(steering)
    }

    update = () => {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.set(0, 0)
    }

    display = (p: p5) => {
        p.fill(255)
        p.stroke(255)
        p.circle(this.pos.x, this.pos.y, 48)
    }
}
