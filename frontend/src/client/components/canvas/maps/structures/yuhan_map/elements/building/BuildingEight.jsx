/** 파일생성자 : 임성준
 * 임성준
 *  - 물리엔진 적용 및 오브젝트 배치
 */
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function BuildingEight({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/8building.glb')
  const [meshRef, api] = useBox(() => ({
    args: [250, 210, 110],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        // console.log(obj)
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])
  return (
    <group ref={meshRef}>
      <group scale={[4.452, 15, 4.429]}>
        <mesh geometry={nodes.실린더002.geometry} material={materials.building} />
        <mesh geometry={nodes.실린더002_1.geometry} material={materials.buildingPillar} />
        <mesh geometry={nodes.실린더002_2.geometry} material={materials.buildingNumBoard} />
        <mesh geometry={nodes.실린더002_3.geometry} material={materials.buildingName} />
        <mesh geometry={nodes.실린더002_4.geometry} material={materials.rooftopSign} />
        <mesh geometry={nodes.실린더002_5.geometry} material={materials.buildingNum} />
        <mesh geometry={nodes.실린더002_6.geometry} material={materials.flag} />
        <mesh geometry={nodes.실린더002_7.geometry} material={materials.windowFrame} />
        <mesh geometry={nodes.실린더002_8.geometry} material={materials.door} />
        <mesh geometry={nodes.실린더002_9.geometry} material={materials.window} />
        <mesh geometry={nodes.실린더002_10.geometry} material={materials.stone} />
        <mesh geometry={nodes.실린더002_11.geometry} material={materials.rooftop} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/8building.glb')