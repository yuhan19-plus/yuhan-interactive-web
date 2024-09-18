/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function StudentCafeteria({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B4.glb')
  const [meshRef, api] = useBox(() => ({
    args: [38.5, 120, 297],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group
      ref={meshRef}
      onPointerUp={(e) => {
            onMove(null)
    }}>
      <group position={[0,0,0]} rotation={[0,0,0]} scale={[18.615, 4.051, 38.03]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame)).001']} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['858585 (B4,B9,B2).001']} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).001']} />
        <mesh geometry={nodes.Cube001_3.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
        <mesh geometry={nodes.Cube001_4.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table)).001']} />
        <mesh geometry={nodes.Cube001_5.geometry} material={materials['4B1711 (Building4).001']} />
        <mesh geometry={nodes.Cube001_6.geometry} material={materials['23683C (RoofTop).001']} />
        <mesh geometry={nodes.Cube001_7.geometry} material={materials['DCE759 & Metal (DEVName, Statue).001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B4.glb')
