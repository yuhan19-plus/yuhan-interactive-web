/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeOne({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/SideWalk-T.glb')
  const [meshRef, api] = useBox(() => ({
    args: [4, 50, 4],
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
            e.stopPropagation()
    }}>
      <group position-y={-1} scale={[8.474, 10.505, 7.017]}>
        <mesh geometry={nodes.Cylinder018.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Cylinder018_1.geometry} material={materials['654321 (Wood)']} />
        {/* <mesh geometry={nodes.Cylinder018_2.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Cylinder018_3.geometry} material={materials['AAAAAA (B8)']} />
        <mesh geometry={nodes.Cylinder018_4.geometry} material={materials['96947D(B2(Window Frame),B6(Stone))']} /> */}
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/SideWalk-T.glb')
