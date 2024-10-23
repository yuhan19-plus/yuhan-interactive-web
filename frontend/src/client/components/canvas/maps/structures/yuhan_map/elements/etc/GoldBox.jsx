/**
 * 오자현
 */
import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion-3d';

export function GoldBox({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/goldBox.glb');
  const isZoneActive = useSelector((state) => state.goldBox.isZone1 || state.goldBox.isZone2 || state.goldBox.isZone3);  // 하나라도 true면 동작

  return (
    <group position={position} rotation={rotation} scale={3}>
      <group scale={[3, 1.5, 2]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials.wood} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.Gold} />
      </group>
      {isZoneActive ? (
        <motion.group
          animate={{
            y: 3.5
          }}
          transition={{ duration: 2.5 }}
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
