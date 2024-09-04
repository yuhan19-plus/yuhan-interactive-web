/**
 * 임성준
 */
import React from 'react'
import { Kiosk } from './etc/Kiosk'

const KioskGroup = () => {
    return (
        <>
            <Kiosk position={[37.031, 1, -18.57]} rotation={[Math.PI / 2, 0, 0]} />
            <Kiosk position={[180.605, 1, -200.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            <Kiosk position={[-160.605, 1, -234.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            <Kiosk position={[201.605, 1, 148.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            <Kiosk position={[37.031, 1, 80.138]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <Kiosk position={[-15.873, 0.7, 319.606]} rotation={[Math.PI / 2, 0, 0]} />
            <Kiosk position={[-250.605, 0.7, 93.924]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
            <Kiosk position={[-301.246, 0.7, -86.629]} rotation={[Math.PI / 2, 0, 0]} />
            <Kiosk position={[26.272, 0.7, -120.724]} rotation={[Math.PI / 2, 0, Math.PI]} />
        </>
    )
}

export default KioskGroup