/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Statue({position, rotation, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Statue.glb')
  const [meshRef, api] = useBox(() => ({
    args: [20, 77, 27],
    type: 'Static',
    mass: 1,
    position,
    scale,
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
      <group rotation={rotation} scale={scale}>
        <mesh geometry={nodes.Cube002.geometry} material={materials['E7E500 & Metal (Statue)']} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
        <mesh geometry={nodes.Cube002_2.geometry} material={materials['96947D(B2(Window Frame),B6(Stone))']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Statue.glb')
