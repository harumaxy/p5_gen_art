import dat from 'dat.gui'
import { createContainer } from 'unstated-next'
import { useState, useMemo, useEffect } from 'react'

export enum SKETCH_TYPE {
    default = 'default',
    attract = 'attract',
    liquid = 'liquid'
}

const GUIContainer = createContainer(() => {
    const gui = useMemo(() => new dat.GUI(), [])
    const [sketchType, setSketchType] = useState(SKETCH_TYPE.default)

    console.log('gui')

    useEffect(() => {
        gui.add({ sketch: sketchType }, 'sketch', {
            default: SKETCH_TYPE.default,
            attract: SKETCH_TYPE.attract,
            liquid: SKETCH_TYPE.liquid

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }).onChange(newSketch => setSketchType(newSketch))
    }, [])

    return { sketchType }
})

export default GUIContainer
