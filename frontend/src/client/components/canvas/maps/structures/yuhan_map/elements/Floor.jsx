/** 담당자 : 임성준
 * 학교 바닥맵
 */
import { useBox, usePlane } from '@react-three/cannon'
import React from 'react'

const Floor = (props) => {
    const [meshRef] = useBox(
        // () => ({ args: [1080, 960], mass: 1, type: 'Static', rotation:[-Math.PI / 2, 0, 0], ...props})
        () => ({ args: [1080, 50, 960], mass: 1, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (    
        <mesh
            ref={meshRef}
            castShadow
            receiveShadow
            {...props}
        >
            {/* <planeGeometry args={[1080, 960]} /> */}
            <boxGeometry args={[1080, 50, 960]} />
            <meshStandardMaterial color='#333333' />
        </mesh>
    )
}

export default Floor