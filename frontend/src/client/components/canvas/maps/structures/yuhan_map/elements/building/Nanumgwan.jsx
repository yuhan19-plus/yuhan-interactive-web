/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Nanumgwan({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/Nanumgwan.glb')
  const [meshRef, api] = useBox(() => ({
    args: [57, 205, 285],
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
      <group position={[-2,-1,0]} scale={[5, 2.5, 10]}>
        <mesh geometry={nodes.Cube009.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).002']} />
        <mesh geometry={nodes.Cube009_1.geometry} material={materials['61544D.001']} />
        <mesh geometry={nodes.Cube009_2.geometry} material={materials['23683C.001']} />
        <mesh geometry={nodes.Cube009_3.geometry} material={materials['C0E8F6 (B1~9(Window)).003']} />
        <mesh geometry={nodes.Cube009_4.geometry} material={materials['E2EBCA.002']} />
        <mesh geometry={nodes.Cube009_5.geometry} material={materials['darksteel.002']} />
        <mesh geometry={nodes.Cube009_6.geometry} material={materials['numcolor.002']} />
        <mesh geometry={nodes.Cube009_7.geometry} material={materials['DCE759 & Metal (DEVName, Statue).002']} />
        <mesh geometry={nodes.Cube009_8.geometry} material={materials['18226AA (Number Plane).002']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/Nanumgwan.glb')
