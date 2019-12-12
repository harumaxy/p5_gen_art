import dat from 'dat.gui'
import { createContainer } from 'unstated-next'
import { useState, useMemo, useEffect } from 'react'

export enum SKETCH_TYPE {
    default = 'default',
    attract = 'attract',
    liquid = 'liquid',
    vehicle = 'vehicle'
}

const GUIContainer = createContainer(() => {
    const gui = useMemo(() => new dat.GUI(), [])
    const [sketchType, setSketchType] = useState(SKETCH_TYPE.vehicle)

    console.log('gui')

    useEffect(() => {
        refreshGUI(gui)
        gui.add({ sketch: sketchType }, 'sketch', {
            default: SKETCH_TYPE.default,
            attract: SKETCH_TYPE.attract,
            liquid: SKETCH_TYPE.liquid,
            vehicle: SKETCH_TYPE.vehicle

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }).onChange(newSketch => {
            refreshGUI(gui)
            setSketchType(newSketch)
        })
    }, [])

    return { sketchType, gui }
})

const refreshGUI = (gui: dat.GUI) => {
    gui.__controllers.forEach(c => {
        if (c.property !== 'sketch') gui.remove(c)
    })
}

export default GUIContainer
