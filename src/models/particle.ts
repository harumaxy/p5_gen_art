import p5, { Vector, Color } from 'p5'

const Colors = {
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
    yellow: '#00'
}

// createVector などは、p5InstanceExtensions インターフェースでしか
// 実行できない
export default class Particle {
    pos: Vector
    vel: Vector
    acc: Vector
    mass: number = 1
    color: Color

    constructor(x: number, y: number, p: p5, mass: number = 1, color?: Color) {
        this.pos = p.createVector(x, y)
        this.vel = p.createVector(0, 0)
        this.acc = p.createVector(0, 0)
        this.mass = mass
        p.colorMode('hsb', 100)
        this.color = color || p.color(p.random(0, 100), 100, 100)
        p.colorMode('rgb', 255)
    }

    update = () => {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        // 加速度は毎回リセット(蓄積され続けるので)
        this.acc.set(0, 0)
    }

    display = (p: p5) => {
        p.fill(this.color)
        p.ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10)
    }

    applyForce = (force: Vector) => {
        const acc = force.copy().div(this.mass)
        this.acc.add(acc)
    }

    edge = (p: p5, bounce_constant: number = 0.8) => {
        if (this.pos.y > p.height) {
            this.vel.y *= -1
            this.pos.y = p.height
            this.vel.mult(bounce_constant)
        }
        if (this.pos.y < 0) {
            this.vel.y *= -1
            this.pos.y = 0
            this.vel.mult(bounce_constant)
        }
        if (this.pos.x > p.width) {
            this.vel.x *= -1
            this.pos.x = p.width
            this.vel.mult(bounce_constant)
        }
        if (this.pos.x < 0) {
            this.vel.x *= -1
            this.pos.x = 0
            this.vel.mult(bounce_constant)
        }
    }
}
