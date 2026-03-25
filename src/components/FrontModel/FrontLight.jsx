import { useEffect, useRef } from 'react'
import GUI from 'lil-gui'

const FrontLight = ({ ambientColor = "#ffd700", spotColor = "#ffcc00" }) => {
  const ambientRef = useRef()
  const spotRef = useRef()
  const guiRef = useRef()
  const guiStateRef = useRef({
    ambientColor,
    spotColor,
  })

  useEffect(() => {
    guiStateRef.current.ambientColor = ambientColor
    guiStateRef.current.spotColor = spotColor

    if (ambientRef.current) ambientRef.current.color.set(ambientColor)
    if (spotRef.current) spotRef.current.color.set(spotColor)
  }, [ambientColor, spotColor])
  
  useEffect(() => {
    if (spotRef.current) {
      spotRef.current.target.position.set(20, -40, 0)
      spotRef.current.target.updateMatrixWorld()
    }
  }, [])

  useEffect(() => {
    const gui = new GUI({ title: 'Light Debug' })
    guiRef.current = gui
    gui.domElement.style.position = 'fixed'
    gui.domElement.style.top = '112px'
    gui.domElement.style.right = '0px'
    gui.domElement.style.left = 'auto'
    gui.domElement.style.zIndex = '40'

    gui
      .addColor(guiStateRef.current, 'ambientColor')
      .name('Ambient Color')
      .onChange((value) => {
        if (ambientRef.current) {
          ambientRef.current.color.set(value)
        }
      })

    gui
      .addColor(guiStateRef.current, 'spotColor')
      .name('Spot Color')
      .onChange((value) => {
        if (spotRef.current) {
          spotRef.current.color.set(value)
        }
      })

    return () => {
      gui.destroy()
      guiRef.current = null
    }
  }, [])

  return (
    <>
        {/* Yellow ambient glow */}
        <ambientLight ref={ambientRef} intensity={0.2} color={ambientColor} />
        
        {/* Main point light for overall illumination */}
        {/* <pointLight 
            position={[100, 150, 0]} 
            intensity={800}
            distance={400}
            decay={1.5}
            color="#f4d342"
        /> */}
        
        {/* Additional point light from opposite side */}
        {/* <pointLight 
            position={[-50, 100, -50]} 
            intensity={800}
            distance={350}
            decay={1.5}
            color="#b8d4ff"
        /> */}
        
        {/* Yellow spotlight for dramatic golden effect */}
        <spotLight
            ref={spotRef}
            position={[100, 120, 100]}
            angle={0.8}
            penumbra={0.9}
            color={spotColor}
            intensity={25000}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={500}
            distance={600}
        />

    </>
  )
}

export default FrontLight;