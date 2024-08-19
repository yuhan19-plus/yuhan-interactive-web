/** 담당자 : 임성준
 * 학교 바닥맵
 */
import { usePlane } from '@react-three/cannon'
import React from 'react'

const Floor = (props) => {
    const [meshRef] = usePlane(
        () => ({ args: [1000, 1000], mass: 1, type: 'Static', rotation:[-Math.PI / 2, 0, 0], ...props})
    )
    return (    
        <mesh
            ref={meshRef}
            castShadow
            receiveShadow
            {...props}
        >
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color='#333333' />
        </mesh>
    )
}

export default Floor