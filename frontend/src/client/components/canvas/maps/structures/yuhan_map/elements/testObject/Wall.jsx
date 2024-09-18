/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 *  - 투명벽
 *  scale 수정 - 이정민
 */

import { useBox } from '@react-three/cannon'
import React from 'react'

const Wall = (props) => {
    const [meshRef, api] = useBox(
        () => ({ args: [1080, 100, 30], type: 'Static', mass: 1, ...props})
    )

    return (
        <mesh
            {...props}
            ref={meshRef}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[1080, 100, 30]} />
            <meshStandardMaterial color={'white'} transparent opacity={0.1} />
        </mesh>
    )
}

export default Wall