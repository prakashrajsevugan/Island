import { useRef, useEffect } from 'react'

const FrontLight = ({ ambientColor = "#ffd700", spotColor = "#ffcc00" }) => {
  const spotRef = useRef()
  
  useEffect(() => {
    if (spotRef.current) {
      spotRef.current.target.position.set(20, -40, 0)
      spotRef.current.target.updateMatrixWorld()
    }
  }, [])

  return (
    <>
        {/* Yellow ambient glow */}
        <ambientLight intensity={0.2} color={ambientColor} />
        
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