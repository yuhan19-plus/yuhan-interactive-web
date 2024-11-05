/**
 * 임성준
 * - NPC 생성 및 애니메이션 설정
 */

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useNPC } from '../hook/npcHook/useNPC'
import TextBoard from '../../structures/department_map/3dUI/TextBoard'

export function Npc({groundMapName, npcName, areaName, position, mainColor, subColor, ...props}) {
  const { 
    nodes, 
    materials, 
    npcRef, 
    text, 
    displayText, 
    chatRef, 
    nameRef } = useNPC({
      npcName,
      areaName,
      groundMapName, 
      position, 
      ...props
    })

  return (
    <>
      {/* {groundMapName === 'yh_map' && (
        <group>
          <TextBoard
              ref={nameRef}
              text={npcName}
              isNpc
          />
          <TextBoard
              ref={chatRef}
              text={displayText}
          />
        </group>
      )} */}
      <group ref={npcRef} position={position} {...props}>
        <group name="Scene">
          <group name="MainCharacter" scale={1.2}>
            <primitive object={nodes.Hip} />
            <primitive object={nodes.Thigh_L} />
            <primitive object={nodes.Thigh_R} />
            <group name="MainCharacterObject">
              <skinnedMesh name="평면001" geometry={nodes.평면001.geometry} material={materials['colorBlack.002']} skeleton={nodes.평면001.skeleton} />
              <skinnedMesh name="평면001_1" geometry={nodes.평면001_1.geometry} skeleton={nodes.평면001_1.skeleton} >
                <meshStandardMaterial color={mainColor} />
              </skinnedMesh>
              <skinnedMesh name="평면001_2" geometry={nodes.평면001_2.geometry} material={materials['colorNose.002']} skeleton={nodes.평면001_2.skeleton} />
              <skinnedMesh name="평면001_3" geometry={nodes.평면001_3.geometry} material={materials['colorBeige.002']} skeleton={nodes.평면001_3.skeleton} />
              <skinnedMesh name="평면001_4" geometry={nodes.평면001_4.geometry} material={materials['colorBrown.001']} skeleton={nodes.평면001_4.skeleton} />
              <skinnedMesh name="평면001_5" geometry={nodes.평면001_5.geometry} skeleton={nodes.평면001_5.skeleton}>
                <meshStandardMaterial color={subColor} />
              </skinnedMesh>
            </group>
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/assets/models/character/MainCharacter.glb')
