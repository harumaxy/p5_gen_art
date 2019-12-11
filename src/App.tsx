import React from 'react'
//@ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import { sketch } from './sketch/sketch'

const App = () => <P5Wrapper sketch={sketch} />

export default App
