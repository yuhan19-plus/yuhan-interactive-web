import React from 'react'
import { Text3D, useGLTF } from '@react-three/drei'
import moment from 'moment'
import { FONT_URL } from '../../../../../../../../../data/commonData'

export function CalendarObject({position, ...props}) {
  const currentMonthDate = moment(new Date()).format("MM월")
  console.log(currentMonthDate)
  const { nodes, materials } = useGLTF('/assets/models/dept_etc/Calendar.glb')
  
  const fontStyle = {
      font: FONT_URL,
      letterSpacing: 0.01,
      height: 0.1,
      lineHeight: 1,
      fontSize: 1
  }
  return (
    <group position={position} {...props} dispose={null}>
      <group position={[0, -0.328, 0.002]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.08, 0.15, 0.08]}>
        <mesh geometry={nodes.Torus004.geometry} material={materials.steel} />
        <mesh geometry={nodes.Torus004_1.geometry} material={materials.green} />
        <mesh geometry={nodes.Torus004_2.geometry} material={materials.white} />
      </group>
      <group position={[-1, -0.3, 0.8]} rotation={[Math.PI / -5.5, 0, 0]} scale={0.9}>
        <Text3D size={1} {...fontStyle}>
          {currentMonthDate}
          <meshStandardMaterial color={'green'} />
        </Text3D>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/Calendar.glb')
