/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
      }}
    >
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
              {
                kioskName === '평화관 정문' && (
                  <KioskModal kioskName={kioskName} position={[-60, 0, 10]} />
                )
              }
              {
                kioskName === '평화관 후문' && (
                  <KioskModal kioskName={kioskName} position={[50, -50, 30]} />
                )
              }
              {
                kioskName === '봉사관' && (
                  <KioskModal kioskName={kioskName} position={[60, 0, 0]} />
                )
              }
              {
                kioskName === '학생회관' && (
                  <KioskModal kioskName={kioskName} position={[-130, 20, 50]} />
                )
              }
              {
                kioskName === '나눔관' && (
                  <KioskModal kioskName={kioskName} position={[10, -70, -40]} />
                )
              }
              {
                kioskName === '자유관' && (
                  <KioskModal kioskName={kioskName} position={[-65, -55, 50]} />
                )
              }
              {
                kioskName === '창조관' && (
                  <KioskModal kioskName={kioskName} position={[-75, -55, 50]} />
                )
              }
              {
                kioskName === '유일한기념관' && (
                  <KioskModal kioskName={kioskName} position={[-117, -65, 50]} />
                )
              }
              {
                kioskName === '유재라관' && (
                  <KioskModal kioskName={kioskName} position={[-85, -85, 30]} />
                )
              }
            </mesh>
          </>
        }
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Kiosk.glb')