import p5, { Vector } from 'p5'

export class Vehicle {
    pos: Vector = new Vector()
    vel: Vector = new Vector().set(0, 0)
    acc: Vector = new Vector().set(0, 0)
    maxSpeed: number = 50
    maxForce: number = 4

    r: number = 6

    constructor(x: number, y: number) {
        this.pos.set(x, y)
    }

    applyForce = (force: Vector) => {
        this.acc.add(force)
    }

    // steering = desired - velocity
    // 旋回力 = 望む速度の方向 - 現在の速度
    arrive = (target: Vector, p: p5) => {
        let desired = Vector.sub(target, this.pos)

        // The arrive behaviour!
        // 緩やかに目標地点にたどり着く
        const d = desired.mag()
        if (d < 100) {
            // p5.map(val, (range1), (range2))
            // ある値を、あるレンジから別のレンジにスケール変換
            const newMag = p.map(d, 0, 100, 0, this.maxSpeed)
            desired.setMag(newMag)
        } else {
            desired.setMag(this.maxSpeed)
        }
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
        const theta = this.vel.heading()
        p.fill(127)
        p.stroke(200)
        p.strokeWeight(1)
        p.push()
        p.translate(this.pos.x, this.pos.y)
        p.rotate(theta)
        // shape
        p.beginShape()
        p.vertex(this.r * 2, 0)
        p.vertex(-this.r * 2, this.r)
        p.vertex(-this.r * 2, -this.r)
        p.endShape(p.CLOSE)
        p.pop()
    }
}
