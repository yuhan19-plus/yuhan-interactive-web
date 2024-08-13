/** 파일생성자 : 임성준
 * Light 설정을 위한 Helper 셋팅 및 Light 설정 (24/08/02)
 */
import { useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Light = ({lightPosition}) => {
    const lightRef = useRef(null)
    // console.log(lightPosition)
    useHelper(lightRef, THREE.DirectionalLightHelper, 300, 0xff0000)
    return (
        <directionalLight
            ref={lightRef}
            args={[0xffffff, 1]}
            castShadow
            intensity={5}
            position={lightPosition}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-camera-near={0.1}
            shadow-camera-far={200}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
    )
}

export default Light