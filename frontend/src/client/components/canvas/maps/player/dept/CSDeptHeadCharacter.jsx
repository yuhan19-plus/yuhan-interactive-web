import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useCsDeptCharacter } from '../hook/csDeptHook/useCsDeptCharacter'
import TextBoard from '../../structures/department_map/3dUI/TextBoard'

export function CSDeptHeadCharacter({myChar, groundMapName, position, ...props}) {
  const { 
    nodes, 
    materials, 
    deptCharRef, 
    text, 
    displayText, 
    chatRef, 
    nameRef } = useCsDeptCharacter({
      myChar, 
      groundMapName, 
      position, 
      ...props
    })
  
  return (
    <>
      {groundMapName === 'computer_sw_map' && (
        <>
          <TextBoard
              ref={chatRef}
              text={displayText}
          />
          <TextBoard
              ref={nameRef}
              text={"학과장"}
              isNpc
          />
        </>
      )}
        <group ref={deptCharRef} position={position} {...props}>
          <group name="Scene">
            <group name="Armature" scale={2.032}>
              <primitive object={nodes.Hip} />
              <primitive object={nodes.Thigh_L} />
              <primitive object={nodes.Thigh_R} />
              <primitive object={nodes.neutral_bone} />
              <skinnedMesh name="Jacket" geometry={nodes.Jacket.geometry} material={materials.Material} skeleton={nodes.Jacket.skeleton} />
              <group name="SD_Join">
                <skinnedMesh name="Cube067" geometry={nodes.Cube067.geometry} material={materials.Body} skeleton={nodes.Cube067.skeleton} />
                <skinnedMesh name="Cube067_1" geometry={nodes.Cube067_1.geometry} material={materials.Black} skeleton={nodes.Cube067_1.skeleton} />
              </group>
              <group name="Shirt">
                <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Wine} skeleton={nodes.Cube001.skeleton} />
                <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Gray} skeleton={nodes.Cube001_1.skeleton} />
                <skinnedMesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials.Black} skeleton={nodes.Cube001_2.skeleton} />
              </group>
              <skinnedMesh name="Shoes" geometry={nodes.Shoes.geometry} material={materials.Black} skeleton={nodes.Shoes.skeleton} />
            </group>
          </group>
        </group>
    </>
  )
}

useGLTF.preload('/assets/models/character/CSDeptHead.glb')
