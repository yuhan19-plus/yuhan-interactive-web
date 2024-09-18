/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeNine({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park2_T1.glb')
  const [meshRef, api] = useBox(() => ({
    args: [4, 50, 5],
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
      <group position={[0.5,-1.4,-1.5]} scale={[-71.906, -42.936, -48.895]}>
        <mesh geometry={nodes.Plane001.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Plane001_1.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park2_T1.glb')
