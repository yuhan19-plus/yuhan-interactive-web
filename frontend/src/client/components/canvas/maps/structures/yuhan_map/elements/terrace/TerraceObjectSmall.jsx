/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TerraceObjectSmall({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/terrace/CT1.glb')
  const [meshRef, api] = useBox(() => ({
    args: [10, 10, 20],
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
      <group position={[0,0,-6.5]} scale={[0.25, 3.25, 0.25]}>
        <mesh geometry={nodes.Cube052.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube052_1.geometry} material={materials['455A33(T1)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/terrace/CT1.glb')
