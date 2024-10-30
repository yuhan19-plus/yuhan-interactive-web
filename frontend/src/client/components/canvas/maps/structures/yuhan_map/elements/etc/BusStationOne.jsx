/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 * 애니메이션 적용 : 오자현
 */
import { useBox } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion-3d';

export function BusStationOne({ position, ...props }) {
  // 찾아오는 길 버튼의 클릭 여부를 확인
  const directionsState = useSelector((state) => state.view.value && state.view.viewName === 'directionsView');

  const { scene, nodes, materials } = useGLTF('/assets/models/etc/BusStation1.glb');

  const [meshRef, api] = useBox(() => ({
    args: [8, 20, 36],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }));

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isObject3D) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      {directionsState ? (
        // 애니메이션이 적용
        <group
          ref={meshRef}
          onPointerUp={(e) => {
            e.stopPropagation();
          }}
        >
          <motion.group
            animate={{ scale: [1, 2, 1.5], y: [5, 7, 5] }} // 애니메이션 효과
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}>
            <group position={[-3, -1.3, 0]} scale={[1.027, 6.844, 6.844]}>
              <mesh geometry={nodes.Cube057.geometry} material={materials['373737 (BusStaion)']} />
              <mesh geometry={nodes.Cube057_1.geometry} material={materials['373737 (BusStaion)']} />
              <mesh geometry={nodes.Cube057_2.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
              <mesh geometry={nodes.Cube057_3.geometry} material={materials['1760E7(Trashbaskit)']} />
              <mesh geometry={nodes.Cube057_4.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
              <mesh geometry={nodes.Cube057_5.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
              <mesh geometry={nodes.Cube057_6.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
            </group>
          </motion.group>
        </group >
      ) : (
        // 애니메이션이 없는 기본
        <group
          ref={meshRef}
          onPointerUp={(e) => {
            e.stopPropagation();
          }}
        >
          <group position={[-3, -1.3, 0]} scale={[1.027, 6.844, 6.844]}>
            <mesh geometry={nodes.Cube057.geometry} material={materials['373737 (BusStaion)']} />
            <mesh geometry={nodes.Cube057_1.geometry} material={materials['373737 (BusStaion)']} />
            <mesh geometry={nodes.Cube057_2.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
            <mesh geometry={nodes.Cube057_3.geometry} material={materials['1760E7(Trashbaskit)']} />
            <mesh geometry={nodes.Cube057_4.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
            <mesh geometry={nodes.Cube057_5.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
            <mesh geometry={nodes.Cube057_6.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
          </group>
        </group>
      )
      }
    </>
  );
}

useGLTF.preload('/assets/models/etc/BusStation1.glb');
