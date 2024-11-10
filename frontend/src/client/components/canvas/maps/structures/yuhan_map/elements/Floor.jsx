/** 임성준
 * 학교 바닥맵 제작 및 클릭 이벤트 추가
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { useSelector } from 'react-redux'
import { Zone } from '../../common/Zone'
import { Arrow } from '../../common/Arrow'

const Floor = ({onMove, ...props}) => {
    // redux 상태 값 가져오기
    const guideState = useSelector((state) => state.guide)
    const viewState = useSelector((state) => state.view)
    const viewValue = viewState.value
    const guideValue = guideState.value
    const guideAreaName = guideState.guideAreaName

    const [meshRef] = useBox(
        () => ({ args: [1080, 50, 960], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    
    return (    
        <>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onPointerUp={(e) => {
                    if(!viewValue) {
                        const currentPosition = [e.point.x, 0.3, e.point.z]
                        // console.log('currentPosition', currentPosition) // 확인을 위한 출력
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

            {/* 동상 Zone */}
            {
                (guideValue === true && guideAreaName === 'StatueZone') ? (
                    <></>
                ) : (
                    <>
                        {
                            viewValue ? (
                                <></>
                            ) : (
                                <Arrow position={[42, 15, -515]} scale={5} />
                            )
                        }
                    </>
                )
            }
            <Zone position={[20, -15, -515]} rotation={[0, Math.PI / 3.5, 0]} scale={4} />
            <Zone position={[20, -15, -515]} rotation={[0, Math.PI / -5, 0]} scale={4} />
            <Zone position={[36, -15, -535]} rotation={[0, Math.PI / -5, 0]} scale={4} />

            {/* Welcome Zone */}
            {
                (guideValue === true && guideAreaName === 'WelcomeZone') ? (
                    <></>
                ) : (
                    <>
                        {
                            viewValue ? (
                                <></>
                            ) : (
                                <Arrow position={[-275, 15, -433]} scale={5} />
                            )
                        }
                    </>
                )
            }
            <Zone position={[-286, -15, -420]} rotation={[0, 0, 0]} scale={4} />
            <Zone position={[-286, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[-286, -15, -445]} rotation={[0, 0, 0]} scale={4} />

            {/* 유한TV Zone */}
            {
                (guideValue === true && guideAreaName === 'TVZone') ? (
                    <></>
                ) : (
                    <>
                        {
                            viewValue ? (
                                <></>
                            ) : (
                                <Arrow position={[-128, 15, -430]} scale={5} />
                            )
                        }
                    </>
                )
            }
            <Zone position={[-140, -15, -445]} rotation={[0, 0, 0]} scale={4} />
            <Zone position={[-140, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[-115, -15, -420]} rotation={[0, Math.PI / 2, 0]} scale={4} />
        </>
    )
}

export default Floor