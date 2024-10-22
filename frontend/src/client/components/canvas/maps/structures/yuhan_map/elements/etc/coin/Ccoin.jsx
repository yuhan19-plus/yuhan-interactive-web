/**
 * 오자현 
 */

import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function Ccoin({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/Ccoin.glb')
  const isZoneActive = useSelector((state) => state.goldBox.isZone1);// 1번존 상태
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
            <group rotation={[Math.PI / 2, 0, -Math.PI]} scale={[2.616, 0.1, 2.616]}>
              <mesh geometry={nodes.Cylinder002.geometry} material={materials.colorWihte} />
              <mesh geometry={nodes.Cylinder002_1.geometry} material={materials.skyblue} />
              <mesh geometry={nodes.Cylinder002_2.geometry} material={materials.Material} />
            </group>
          </motion.group>
        </motion.group>
      )}
    </group>
  );
}

useGLTF.preload('/assets/models/etc/Ccoin.glb')
