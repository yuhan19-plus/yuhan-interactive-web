/**
 * 오자현 
 */

import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function PythonCoin({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/PythonCoin.glb')
  const isZoneActive = useSelector((state) => state.goldBox.isZone3);// 3번존 상태
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
            <group position={[0, 0, 0.029]} rotation={[Math.PI / 2, 0, 0]} scale={4.795}>
              <mesh geometry={nodes.Plane_1.geometry} material={materials.Java} />
              <mesh geometry={nodes.Plane_2.geometry} material={materials.Material} />
            </group>
          </motion.group>
        </motion.group>
      )}
    </group>
  );
}

useGLTF.preload('/assets/models/etc/PythonCoin.glb')

