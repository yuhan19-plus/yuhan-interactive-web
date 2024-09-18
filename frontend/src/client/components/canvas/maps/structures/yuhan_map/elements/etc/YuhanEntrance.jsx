/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function YuhanEntrance({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Enter_L.glb')
  const [meshRef, api] = useBox(() => ({
    args: [45, 80, 27],
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
      <mesh geometry={nodes.Enter_L.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} position={[0,-1,4]} scale={[8.47, 22.599, 8.47]} />
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Enter_L.glb')
