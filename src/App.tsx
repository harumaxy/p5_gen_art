import React from 'react'
//@ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import GUIContainer, { SKETCH_TYPE } from './GUI'

import { sketch as default_sketch } from './sketch/sketch'
import { attract_sketch } from './sketch/attract_sketch'
import { liquid_sketch } from './sketch/liquid_sketch'

const App = () => {
    const { sketchType, gui } = GUIContainer.useContainer()
    return (
        <>
            {sketchType === SKETCH_TYPE.default && (
                <P5Wrapper sketch={default_sketch} gui={gui} />
            )}
            {sketchType === SKETCH_TYPE.attract && (
                <P5Wrapper sketch={attract_sketch} />
            )}
            {sketchType === SKETCH_TYPE.liquid && (
                <P5Wrapper sketch={liquid_sketch} />
            )}
        </>
    )
}

export default () => (
    <GUIContainer.Provider>
        <App />
    </GUIContainer.Provider>
)
