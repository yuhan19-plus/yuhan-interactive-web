  /**
   * 임성준
   */
  import React from 'react'
  import { useGLTF, Stars } from '@react-three/drei'
  import { useMainCharacter } from '../hook/useMainCharacter'

  export function MainCharacter({ myChar, position }) {
    // 위치와 캐릭터 객체 로그 확인
    // console.log(position)
    // console.log(myChar.name)
    const player = myChar.name

    // useMainCharacter 훅을 통해 캐릭터 상태와 물리적 몸체 참조 가져오기
    const { nodes, materials, charRef } = useMainCharacter({ position, myChar })

    return (
      <group ref={charRef} name={player ?? ''}>
        <group name="Scene">
            <group name="MainCharacter" scale={1.2}>
              <primitive object={nodes.Hip} />
              <primitive object={nodes.Thigh_L} />
              <primitive object={nodes.Thigh_R} />
              <group name="MainCharacterObject">
                <skinnedMesh name="평면001" geometry={nodes.평면001.geometry} material={materials['colorBlack.002']} skeleton={nodes.평면001.skeleton} />
                <skinnedMesh name="평면001_1" geometry={nodes.평면001_1.geometry} material={materials['colorWihte.001']} skeleton={nodes.평면001_1.skeleton} />
                <skinnedMesh name="평면001_2" geometry={nodes.평면001_2.geometry} material={materials['colorNose.002']} skeleton={nodes.평면001_2.skeleton} />
                <skinnedMesh name="평면001_3" geometry={nodes.평면001_3.geometry} material={materials['colorBeige.002']} skeleton={nodes.평면001_3.skeleton} />
                <skinnedMesh name="평면001_4" geometry={nodes.평면001_4.geometry} material={materials['colorBrown.001']} skeleton={nodes.평면001_4.skeleton} />
                <skinnedMesh name="평면001_5" geometry={nodes.평면001_5.geometry} material={materials['colorGreen.001']} skeleton={nodes.평면001_5.skeleton} />
              </group>
              {/* 배경에 별 추가 */}
              {/* <Stars
                radius={1.3}
                depth={1.5}
                count={20}
                factor={5} // 별의 크기
                saturation={0} // 채도
                fade
                speed={2}
              /> */}
            </group>
        </group>
      </group>
    )
  }

  // 캐릭터 모델을 미리 로드
  useGLTF.preload('/assets/models/character/MainCharacter.glb')
