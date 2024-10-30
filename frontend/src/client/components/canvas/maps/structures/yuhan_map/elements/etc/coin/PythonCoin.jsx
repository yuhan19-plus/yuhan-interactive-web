/**
 * 파일생성자 오자현
 */

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';

export function PythonCoin({ position, rotation }) {
  const isZoneActive = useSelector((state) => state.goldBox.isZone3);
  
  const { nodes, materials } = useGLTF('/assets/models/etc/PythonCoin.glb')

  return (
    <group position={position} rotation={rotation} scale={0.5}>
      {isZoneActive && (
        <>
          <motion.group
            animate={{
              y: 20,
            }}
            transition={{ duration: 2.5 }}
          >
            <motion.group
              animate={{
                rotateY: [0, Math.PI * 2, 0],
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
          <motion.group
            animate={{
              y: [10, -20, 10]
            }}
            transition={{
              repeat: Infinity,  // 무한 반복
              duration: 2.5
            }}
          >
            <mesh  position={[0, 20, 0]} rotation={[Math.PI / 2, 0, 0]} scale={7}>
              <torusGeometry args={[5, 0.25, 16, 25]} />
              <meshStandardMaterial color="yellow" />
            </mesh>
          </motion.group>
        </>
      )}
    </group>
  );
}

useGLTF.preload('/assets/models/etc/PythonCoin.glb')

