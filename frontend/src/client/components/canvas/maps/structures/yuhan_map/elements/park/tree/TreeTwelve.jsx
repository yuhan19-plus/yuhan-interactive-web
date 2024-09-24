/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeTwelve({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park2_T4.glb')
  const [meshRef, api] = useBox(() => ({
    args: [10, 100, 10],
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
      <group position={[2,-1.4,2]} scale={[-71.906, -42.936, -48.895]}>
        <mesh geometry={nodes.Plane004.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane004_1.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park2_T4.glb')
