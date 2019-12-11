import p5, { Vector } from 'p5'

// createVector などは、p5InstanceExtensions インターフェースでしか
// 実行できない
export default class Particle {
    pos: Vector
    vel: Vector
    acc: Vector
    mass: number = 1

    constructor(x: number, y: number, mass: number, p: p5) {
        this.pos = p.createVector(x, y)
        this.vel = p.createVector(0, 0)
        this.acc = p.createVector(0, 0)
        this.mass = mass
    }

    update = () => {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        // 加速度は毎回リセット(蓄積され続けるので)
        this.acc.set(0, 0)
    }

    display = (p: p5) => {
        p.fill(255)
        p.ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10)
    }

    applyForce = (force: Vector) => {
        const acc = force.copy().div(this.mass)
        this.acc.add(acc)
    }

    edge = (p: p5) => {
        if (this.pos.y > p.height) {
            this.vel.y *= -1
            this.pos.y = p.height
        }
        if (this.pos.y < 0) {
            this.vel.y *= -1
            this.pos.y = 0
        }
        if (this.pos.x > p.width) {
            this.vel.x *= -1
            this.pos.x = p.width
        }
        if (this.pos.x < 0) {
            this.vel.x *= -1
            this.pos.x = 0
        }
    }
}
