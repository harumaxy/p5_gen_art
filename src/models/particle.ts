import p5, { Vector } from "p5"

// createVector などは、p5InstanceExtensions インターフェースでしか
// 実行できない
export default class Particle {
  pos: Vector
  vel: Vector
  acc: Vector
  constructor (p: p5){
    this.pos = p.createVector(p.width/2, p.height/2)
    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)
  }

  update = ()=> {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }

  display = (p: p5)=>{
      p.fill(255)
      p.ellipse(this.pos.x, this.pos.y, 48, 48)
    }
}