/**
 * 임성준 구현
 */

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const name = 'yuhan-logo'

export function YuhanLogo({position}) {
  const { scene } = useGLTF('/assets/models/etc/YuhanLogo.glb')
  const ref = useRef(null)

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <>
      <primitive
        ref={ref}
        name={name}
        scale={5}
        position={position}
        rotation={[0, Math.PI / 2, 0]}
        object={scene}
      />
    </>
  )
}

useGLTF.preload('/assets/models/etc/YuhanLogo.glb')
