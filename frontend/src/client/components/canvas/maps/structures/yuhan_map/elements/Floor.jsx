/** 임성준
 * 학교 바닥맵 제작 및 클릭 이벤트 추가
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { useSelector } from 'react-redux'
import { Zone } from '../../common/Zone'
import { Arrow } from '../../common/Arrow'

const Floor = ({onMove, ...props}) => {
    const viewMenuState = useSelector((state) => state.btnMenu)
    const aerialViewStateValue = viewMenuState.value

    const [meshRef] = useBox(
        () => ({ args: [1080, 50, 960], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (    
        <>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                onPointerUp={(e) => {
                    if(!aerialViewStateValue) {
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

            {/* Welcome Zone */}
            <Arrow position={[-275, 15, -433]} scale={5} />
            <Zone position={[-286, -15, -420]} rotation={[0, 0, 0]} scale={4} />
            <Zone position={[-286, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[-286, -15, -445]} rotation={[0, 0, 0]} scale={4} />

            {/* 유한TV Zone */}
            <Arrow position={[-128, 15, -430]} scale={5} />
            <Zone position={[-140, -15, -445]} rotation={[0, 0, 0]} scale={4} />
            <Zone position={[-140, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[-115, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            {/* <mesh position={[-278, -5, -433]}>
                <boxGeometry args={[15, 3, 15]} />
                <meshStandardMaterial color='red' />
            </mesh> */}
        </>
    )
}

export default Floor