/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Changjogwan({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/Changjogwan.glb')
  const [meshRef, api] = useBox(() => ({
    args: [51, 205, 280],
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
      <group scale={[22.5, 77.5, 10]}>
        <mesh geometry={nodes.Cube013.geometry} material={materials['61544D.003']} />
        <mesh geometry={nodes.Cube013_1.geometry} material={materials['E2EBCA.003']} />
        <mesh geometry={nodes.Cube013_2.geometry} material={materials['23683C.003']} />
        <mesh geometry={nodes.Cube013_3.geometry} material={materials['18226AA (Number Plane).004']} />
        <mesh geometry={nodes.Cube013_4.geometry} material={materials['Windows.003']} />
        <mesh geometry={nodes.Cube013_5.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).004']} />
        <mesh geometry={nodes.Cube013_6.geometry} material={materials['darksteel.004']} />
        <mesh geometry={nodes.Cube013_7.geometry} material={materials['numcolor.004']} />
        <mesh geometry={nodes.Cube013_8.geometry} material={materials['DCE759 & Metal (DEVName, Statue).004']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/Changjogwan.glb')
