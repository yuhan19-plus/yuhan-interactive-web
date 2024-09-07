/**
 * 키오스크 그룹화 : 임성준
 */
import React from 'react'
import { Kiosk } from './etc/Kiosk'

const KioskGroup = () => {
    return (
        <>
            {/* 학생식당 길목 평화관 */}
            <Kiosk position={[37.031, 1, -18.57]} rotation={[Math.PI / 2, 0, 0]} />
            
            {/* 2호관 */}
            <Kiosk position={[180.605, 1, -200.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            
            {/* 자유관 */}
            <Kiosk position={[-160.605, 1, -234.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            
            {/* 학생식당 */}
            <Kiosk position={[201.605, 1, 148.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
            
            {/* 나눔관 */}
            <Kiosk position={[37.031, 1, 80.138]} rotation={[Math.PI / 2, 0, Math.PI]} />
            
            {/* 창조관 */}
            <Kiosk position={[-150, 0.7, 265]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />

            {/* 유일한기념관 */}
            <Kiosk position={[-250.605, 0.7, 93.924]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
            
            {/* 유재라관 */}
            <Kiosk position={[-301.246, 0.7, -86.629]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 나눔의 숲 내부 평화관 */}
            <Kiosk position={[26.272, 0.7, -120.724]} rotation={[Math.PI / 2, 0, Math.PI]} />
        </>
    )
}

export default KioskGroup