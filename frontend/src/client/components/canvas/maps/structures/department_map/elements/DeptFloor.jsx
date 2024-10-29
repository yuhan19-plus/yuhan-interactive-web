/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { Zone } from '../../common/Zone'
import { Arrow } from '../../common/Arrow'
import { useSelector } from 'react-redux'
import { CodingInfoBoard } from './dept/coding/CodingInfoBoard'

const DeptFloor = ({onMove, ...props}) => {
    const deptInfoState = useSelector((state) => state.deptInfo)
    const deptInfoName = deptInfoState.deptInfoName
    const deptInfoValue = deptInfoState.value
    const [meshRef] = useBox(
        () => ({ args: [500, 10, 500], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (
        <>
            {/* 학과 맵 바닥 */}
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                onPoint
                onPointerUp={(e) => {
                    const currentPosition = [e.point.x, 0.3, e.point.z]
                    console.log('currentPosition', currentPosition) // 확인을 위한 출력
                    if (onMove) {
                        onMove(currentPosition)  // 클릭한 좌표를 전달
                    }
                }}
                {...props}
            >
                <boxGeometry args={[500, 7, 500]} />
                <meshStandardMaterial color='#000000' />
            </mesh>

            {/* 학과소개 벽면 1 */}
            <mesh position={[125, 50, -250]}>
                <boxGeometry args={[250, 125, 5]} />
                <meshStandardMaterial color='#0A2241' />
            </mesh>

            {/* 학과소개 벽면 2 */}
            <mesh position={[250, 50, -125]}>
                <boxGeometry args={[5, 125, 250]} />
                <meshStandardMaterial color='#0A2241' />
            </mesh>

            {/* 카메라 클로즈업 영역 */}
            {/* 교육 목표 */}
            {
                (deptInfoName === '교육목표' && deptInfoValue === true) ? (
                    <></>
                ) : (
                    <Arrow position={[93, 10, -50]} scale={5} />
                )
            }
            <Zone position={[115, -20, -51]} rotation={[0, Math.PI / 1.5, 0]} scale={4} />
            <Zone position={[90, -20, -34]} rotation={[0, Math.PI / 6, 0]} scale={4} />
            <Zone position={[75, -20, -59]} rotation={[0, Math.PI / 6, 0]} scale={4} />
            {/* <mesh position={[97, -8, -55]} rotation={[0, Math.PI / 1.5, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}

            {/* 주요교육분야 */}
            {
                (deptInfoName === '주요교육분야' && deptInfoValue === true) ? (
                    <></>
                ) : (
                    <Arrow position={[55, 10, -95]} scale={5} />
                )
            }
            <Zone position={[75, -20, -105]} rotation={[0, Math.PI / 1.2, 0]} scale={4} />
            <Zone position={[63, -20, -80]} rotation={[0, Math.PI / 3, 0]} scale={4} />
            <Zone position={[37, -20, -95]} rotation={[0, Math.PI / 3, 0]} scale={4} />
            {/* <mesh position={[55, -8, -95]} rotation={[0, Math.PI / 1.2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}

            {/* 학과특징 */}
            {
                (deptInfoName === '학과특징' && deptInfoValue === true) ? (
                    <></>
                ) : (
                    <Arrow position={[147, 10, -140]} scale={5} />
                )
            }
            <Zone position={[173, -20, -150]} rotation={[0, Math.PI / 1.32, 0]} scale={4} />
            <Zone position={[133, -20, -151]} rotation={[0, Math.PI / 4, 0]} scale={4} />
            <Zone position={[157, -20, -129]} rotation={[0, Math.PI / 4, 0]} scale={4} />
            {/* <mesh position={[153, -8, -148]} rotation={[0, Math.PI / 1.32, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}

            {/* 진로 및 취업분야 */}
            {
                (deptInfoName === '진로 및 취업분야' && deptInfoValue === true) ? (
                    <></>
                ) : (
                    <Arrow position={[47, 10, -169]} scale={5} />
                )
            }
            <Zone position={[34, -20, -180]} rotation={[0, Math.PI * 2, 0]} scale={4} />
            <Zone position={[30, -20, -153]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[63, -20, -153]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            {/* <mesh position={[47, -8, -169]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}

            {/* 자격증 */}
            {
                (deptInfoName === '자격증' && deptInfoValue === true) ? (
                    <></>
                ) : (
                    <Arrow position={[200, 10, -50]} scale={5} />
                )
            }
            <Zone position={[212, -20, -63.5]} rotation={[0, Math.PI / -2, 0]} scale={4} />
            <Zone position={[184, -20, -66]} rotation={[0, Math.PI * 2, 0]} scale={4} />
            <Zone position={[184, -20, -36]} rotation={[0, Math.PI * 2, 0]} scale={4} />
            {/* <mesh position={[200, -8, -50]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}

            {/* 학과장 영역 */}
            <mesh position={[-125, -8.5, -125]}>
                <boxGeometry args={[80, 3, 80]} />
                <meshStandardMaterial color={'#f0e16d'} />
            </mesh>

            {/* 학과체험 - 코딩경험 */}
            <Zone position={[39.5, -20, 220]} rotation={[0, 0, 0]} scale={4} />
            <Zone position={[37, -20, 217.5]} rotation={[0,  Math.PI / 2, 0]} scale={4} />
            <Zone position={[67, -20, 217.5]} rotation={[0,  Math.PI / 2, 0]} scale={4} />
            <CodingInfoBoard position={[52.5, 5, 230]} rotation={[0, Math.PI / 2, 0]}/>
        </>
    )
}
export default DeptFloor