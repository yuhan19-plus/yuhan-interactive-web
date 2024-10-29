/** 파일생성자 : 이정민
 *초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 * 애니메이션 적용 : 오자현
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion-3d';

export function BusStationTwo({ position, ...props }) {
  // 찾아오는 길버튼의 클릭여부
  const directionsState = useSelector((state) => state.btnMenu.value && state.btnMenu.btnMenuName === 'directionsView');

  const { scene, nodes, materials } = useGLTF('/assets/models/etc/BusStation2.glb')
  
  const [meshRef, api] = useBox(() => ({
    args: [8, 20, 34],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    // console.log("상태", directionsState)
    scene.traverse((obj) => {
      if (obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <>
      {directionsState ? (
        <group
          ref={meshRef}
          onPointerUp={(e) => {
            e.stopPropagation()
          }}
        >
          <motion.group
            animate={{ scale: [1, 2, 1.5], y: [5, 7, 5] }} // 애니메이션 효과
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}>
            <group position={[-3, -1.4, 0]} rotation={[0, 0, 0]} scale={[0.719, 7.5, 3.99]}>
              <mesh geometry={nodes.Cube038.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
              <mesh geometry={nodes.Cube038_1.geometry} material={materials['373737 (BusStaion)']} />
              <mesh geometry={nodes.Cube038_2.geometry} material={nodes.Cube038_2.material} />
              <mesh geometry={nodes.Cube038_3.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
            </group>
          </motion.group>
        </group>
      ) : (
        <group
          ref={meshRef}
          onPointerUp={(e) => {
            e.stopPropagation()
          }}>
          <group position={[-3, -1.4, 0]} rotation={[0, 0, 0]} scale={[0.719, 7.5, 3.99]}>
            <mesh geometry={nodes.Cube038.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
            <mesh geometry={nodes.Cube038_1.geometry} material={materials['373737 (BusStaion)']} />
            <mesh geometry={nodes.Cube038_2.geometry} material={nodes.Cube038_2.material} />
            <mesh geometry={nodes.Cube038_3.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
          </group>
        </group>
      )}
    </>
  )
}

useGLTF.preload('/assets/models/etc/BusStation2.glb')
