/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'


export function YujaelagwanPillar({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B8Pipe_L.glb')
  const [meshRef, api] = useBox(() => ({
    args: [5, 30, 7],
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
      <mesh geometry={nodes.B8Pipe_L.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} position={[0,-1,0]} rotation={[0,0,0]} scale={[4.452, 15, 4.429]} />
    </group>
  )
}

useGLTF.preload('/assets/models/building/B8Pipe_L.glb')
