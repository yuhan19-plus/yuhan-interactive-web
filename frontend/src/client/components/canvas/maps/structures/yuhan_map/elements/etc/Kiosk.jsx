/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { Html, useGLTF } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import KioskModal from '../../3dUIs/modal/kiosk/KioskModal'

export function Kiosk({position, name, ...props}) {
  const kiosk = useSelector((state) => state.kiosk)
  const kioskValue = kiosk.value
  const kioskName = kiosk.name

  // console.log('kioskValue', kioskValue)
  // console.log('kioskName', kioskName)

  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Kiosk.glb')
  const [meshRef, api] = useBox(() => ({
    args: [10, 2.5, 26],
    type: 'Static',
    mass: 100,
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
      <group position={[0,1,0]} scale={0.766}>
        <mesh geometry={nodes.Empty004.geometry} material={materials['YuhanLogo(B9, Kiosk)']} />
        <mesh geometry={nodes.Empty004_1.geometry} material={materials['D7EFD4 (Kiosk)']} />
        <mesh geometry={nodes.Empty004_2.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Empty004_3.geometry} material={materials['000000 & Metal (C2,T2)']} />
        {(kioskValue && (name === kioskName)) && 
          <>
            <mesh geometry={nodes.Empty004_3.geometry}>
              <meshStandardMaterial
                color={'#16B6FC'}
                emissive={'#16B6FC'} // 발광 색상
                emissiveIntensity={5} // 발광 강도
              />
              <KioskModal kioskName={kioskName} />
            </mesh>
          </>
        }
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Kiosk.glb')