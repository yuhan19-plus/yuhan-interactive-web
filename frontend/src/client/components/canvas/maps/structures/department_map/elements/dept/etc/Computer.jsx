/**
 * 임성준
 * - 학과장실 오브젝트 생성 및 그림자 설정
 */
import React, { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function Computer({position, ...props}) {
  const texture = useTexture('/assets/images/yuhan-intro-page.png')
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/computer.glb')

  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
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
    <group position={position} {...props}>
      <group position={[-4.636, 2.438, -0.059]} scale={[0.272, 0.178, 0.409]}>
        <mesh geometry={nodes.큐브001.geometry} material={materials.Monitor} />
        {/* <mesh geometry={nodes.큐브001_1.geometry} material={materials.display} /> */}
        <mesh geometry={nodes.큐브001_1.geometry}>
          <meshStandardMaterial map={texture} />
        </mesh>
        <mesh geometry={nodes.큐브001_2.geometry} material={materials.power} />
        <mesh geometry={nodes.큐브001_3.geometry} material={materials.systemUnit} />
        <mesh geometry={nodes.큐브001_4.geometry} material={materials.FrameButton} />
        <mesh geometry={nodes.큐브001_5.geometry} material={materials.Keyboard} />
        <mesh geometry={nodes.큐브001_6.geometry} material={materials.Framebar} />
        <mesh geometry={nodes.큐브001_7.geometry} material={materials.Frame} />
        <mesh geometry={nodes.큐브001_8.geometry} material={materials.text} />
        <mesh geometry={nodes.큐브001_9.geometry} material={materials.colorWihte} />
        <mesh geometry={nodes.큐브001_10.geometry} material={materials.colorLogo} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/computer.glb')
