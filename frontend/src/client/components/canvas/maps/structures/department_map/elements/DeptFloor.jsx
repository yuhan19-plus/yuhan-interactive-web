/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import { useBox } from '@react-three/cannon'
import React from 'react'
import { useSelector } from 'react-redux'

const DeptFloor = ({onMove, ...props}) => {
    const [meshRef] = useBox(
        () => ({ args: [500, 10, 500], mass: 0, type: 'Static', rotation:[0, 0, 0], ...props})
    )
    return (    
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
            <boxGeometry args={[500, 10, 500]} />
            <meshStandardMaterial color='#333333' />
        </mesh>
    )
}
export default DeptFloor