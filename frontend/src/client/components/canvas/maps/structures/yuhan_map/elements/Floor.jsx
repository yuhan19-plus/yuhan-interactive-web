/** 담당자 : 임성준
 * 학교 바닥맵
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { useSelector } from 'react-redux'

const Floor = ({onMove, ...props}) => {
    const btnValue = useSelector((state) => state.btnMenu)
    const aerialViewState = btnValue.value

    const [meshRef] = useBox(
        () => ({ args: [1080, 50, 960], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (    
        <mesh
            ref={meshRef}
            castShadow
            receiveShadow
            onPoint
            onPointerUp={(e) => {
                if(!aerialViewState) {
                    const currentPosition = [e.point.x, 0.3, e.point.z]
                    console.log('currentPosition', currentPosition) // 확인을 위한 출력
                    if (onMove) {
                        onMove(currentPosition)  // 클릭한 좌표를 전달
                    }
                }
            }}
            {...props}
        >
            <boxGeometry args={[1080, 50, 960]} />
            <meshStandardMaterial color='#333333' />
        </mesh>
    )
}

export default Floor