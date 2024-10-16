/**
 * 오자현
 */
import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion-3d';

export function GoldBox({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/goldBox.glb');
  const isZone1 = useSelector((state) => state.goldBox.isZone1);
  const [isVisible, setIsVisible] = useState(true);  // 상태로 visibility 관리

  return (
    <group position={position} rotation={rotation} scale={3}>
      <group scale={[3, 1.5, 2]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials.wood} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.Gold} />
      </group>
      {isZone1 ? (
        <motion.group
          animate={{
            y: isVisible ? [0, 2, 0] : 3.5,  // isVisible이 false라면 y 값을 2로 고정
            rotateY: [0, Math.PI, 0]
          }}
          transition={{ duration: 2.5 }}
          onAnimationComplete={() => setIsVisible(false)}  // 애니메이션 완료 시 상태 변경
        >
          <group position={[0, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1.5, 3, 2]}>
            <mesh geometry={nodes.Cylinder.geometry} material={materials.wood} />
            <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Gold} />
          </group>
        </motion.group>
      ) : (
        <group position={[0, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1.5, 3, 2]}>
          <mesh geometry={nodes.Cylinder.geometry} material={materials.wood} />
          <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Gold} />
        </group>
      )} {/* 애니메이션이 끝나면 그룹을 숨김 */}
    </group>
  );
}

useGLTF.preload('/assets/models/etc/goldBox.glb');
