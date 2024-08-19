import React from 'react'
import { usePlane } from '@react-three/cannon'

const DeptFloor = (props) => {
    const [meshRef] = usePlane(
        () => ({ args: [300, 300], mass: 1, type: 'Static', rotation:[-Math.PI / 2, 0, 0], ...props})
    )
    return (
        <>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                {...props}
            >
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color={'#333333'} />
            </mesh>
        </>
    )
}

export default DeptFloor