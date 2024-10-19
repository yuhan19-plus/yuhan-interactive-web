/**
 * 오자현 계획 로우폴리 코인 오브젝트 제작 후 사용
 */

import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function Coin({ position, rotation }) {
    const { nodes, materials } = useGLTF('/assets/models/etc/Coin.glb')
    const isZoneActive = useSelector((state) => state.goldBox.isZone1 );  // 하나라도 true면 동작
    const [isEnd, setIsEnd] = useState(true);

    return (
        <group position={position} rotation={rotation} scale={0.5}>
            {isZoneActive && (
                <motion.group
                    animate={{
                        y: isEnd ? [0, 5, 0] : 20,  // y 애니메이션은 isEnd에 따라 동작
                    }}
                    transition={{ duration: 2.5 }}
                    onAnimationComplete={() => setIsEnd(false)}  // y 애니메이션 완료 시 isEnd를 false로 설정
                >
                    <motion.group
                        animate={{
                            rotateY: [0, Math.PI * 2, 0],  // rotateY는 무한 반복
                        }}
                        transition={{
                            repeat: Infinity,  // 무한 반복
                            duration: 2.5  // 회전 속도
                        }}
                    >
                        <mesh geometry={nodes.Cylinder.geometry} material={materials.Material} rotation={[Math.PI / 2, 0, 0]} scale={[8.202, 0.517, 8.202]} />
                        <group rotation={[Math.PI / 2, 0, 0]} scale={[7.74, 0.02, 7.74]}>
                            <mesh geometry={nodes.실린더002.geometry} material={materials.colorWihte} />
                            <mesh geometry={nodes.실린더002_1.geometry} material={materials.colorLogo} />
                        </group>
                    </motion.group>
                </motion.group>
            )}
        </group>
    );
}

useGLTF.preload('/assets/models/etc/Coin.glb')
