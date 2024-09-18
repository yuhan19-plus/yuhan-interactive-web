/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function ProfessorCafeteria({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B4Restaurant.glb')
  const [meshRef, api] = useBox(() => ({
    args: [36, 50, 179],
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
      <group position={[0,-1,0]} rotation={[0,0,0]} scale={[18.615, 4.051, 38.03]}>
        <mesh geometry={nodes.Cube006.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube006_1.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Cube006_2.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube006_3.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube006_4.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
        <mesh geometry={nodes.Cube006_5.geometry} material={materials['4B1711 (Building4)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B4Restaurant.glb')
