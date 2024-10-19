/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { Zone } from '../../common/Zone'

const DeptFloor = ({onMove, ...props}) => {
    const [meshRef] = useBox(
        () => ({ args: [500, 10, 500], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (
        <>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                onPoint
                onPointerUp={(e) => {
                    const currentPosition = [e.point.x, 0, e.point.z]
                    console.log('currentPosition', currentPosition) // 확인을 위한 출력
                    if (onMove) {
                        onMove(currentPosition)  // 클릭한 좌표를 전달
                    }
                }}
                {...props}
            >
                <boxGeometry args={[500, 7, 500]} />
                <meshStandardMaterial color='#333333' />
            </mesh>
            {/* <mesh position={[125, -10, 125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ff0000' />
            </mesh> */}
            {/* <mesh position={[-125, -10, -125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ffff00' />
            </mesh> */}
            {/* <mesh position={[-125, -10, 125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ffff00' />
            </mesh> */}
            {/* <mesh position={[125, -11, -125]}>
                <boxGeometry args={[250, 5, 250]} />
                <meshStandardMaterial color='#0000ff' />
            </mesh> */}
            <mesh position={[125, 50, -250]}>
                <boxGeometry args={[250, 125, 5]} />
                <meshStandardMaterial color='#0A2241' />
            </mesh>
            <mesh position={[250, 50, -125]}>
                <boxGeometry args={[5, 125, 250]} />
                <meshStandardMaterial color='#0A2241' />
            </mesh>

            {/* 카메라 클로즈업 영역 */}
            {/* 교육 목표 */}
            <Zone position={[115, -20, -51]} rotation={[0, Math.PI / 1.5, 0]} scale={4} />
            <Zone position={[90, -20, -34]} rotation={[0, Math.PI / 6, 0]} scale={4} />
            <Zone position={[75, -20, -59]} rotation={[0, Math.PI / 6, 0]} scale={4} />
            {/* <mesh position={[97, -8, -55]} rotation={[0, Math.PI / 1.5, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}
            {/* 주요교육분야 */}
            <Zone position={[75, -20, -105]} rotation={[0, Math.PI / 1.2, 0]} scale={4} />
            <Zone position={[63, -20, -80]} rotation={[0, Math.PI / 3, 0]} scale={4} />
            <Zone position={[37, -20, -95]} rotation={[0, Math.PI / 3, 0]} scale={4} />
            {/* <mesh position={[55, -8, -95]} rotation={[0, Math.PI / 1.2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}
            {/* 학과특징 */}
            <Zone position={[173, -20, -150]} rotation={[0, Math.PI / 1.32, 0]} scale={4} />
            <Zone position={[133, -20, -151]} rotation={[0, Math.PI / 4, 0]} scale={4} />
            <Zone position={[157, -20, -129]} rotation={[0, Math.PI / 4, 0]} scale={4} />
            {/* <mesh position={[153, -8, -148]} rotation={[0, Math.PI / 1.32, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}
            {/* 진로 및 취업분야 */}
            <Zone position={[34, -20, -180]} rotation={[0, Math.PI * 2, 0]} scale={4} />
            <Zone position={[30, -20, -153]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            <Zone position={[63, -20, -153]} rotation={[0, Math.PI / 2, 0]} scale={4} />
            {/* <mesh position={[47, -8, -169]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'#0A2241'} />
            </mesh> */}
            {/* 자격증 */}
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
        </>
    )
}
export default DeptFloor