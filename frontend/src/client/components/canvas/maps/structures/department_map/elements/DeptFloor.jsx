/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import { useBox } from '@react-three/cannon'
import { Cloud } from '@react-three/drei'
import React from 'react'

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
            <mesh position={[125, -10, 125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ff0000' />
            </mesh>
            <mesh position={[-125, -10, -125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ffff00' />
            </mesh>
            <mesh position={[-125, -10, 125]}>
                <boxGeometry args={[250, 7, 250]} />
                <meshStandardMaterial color='#ffff00' />
            </mesh>
            {/* <mesh position={[125, -11, -125]}>
                <boxGeometry args={[250, 5, 250]} />
                <meshStandardMaterial color='#0000ff' />
            </mesh> */}
            <mesh position={[125, 50, -250]}>
                <boxGeometry args={[250, 125, 5]} />
                <meshStandardMaterial color='#ffffff' />
            </mesh>
            <mesh position={[250, 50, -125]}>
                <boxGeometry args={[5, 125, 250]} />
                <meshStandardMaterial color='#ffffff' />
            </mesh>

            {/* 카메라 클로즈업 영역 */}
            {/* 교육 목표 */}
            <mesh position={[97, -8, -55]} rotation={[0, Math.PI / 1.5, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
            {/* 주요교육분야 */}
            <mesh position={[55, -8, -95]} rotation={[0, Math.PI / 1.2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
            {/* 학과특징 */}
            <mesh position={[153, -8, -148]} rotation={[0, Math.PI / 1.32, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
            {/* 자격증 */}
            <mesh position={[47, -8, -169]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
            {/* 자격증 */}
            <mesh position={[200, -8, -50]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[40, 3, 40]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </>
    )
}
export default DeptFloor