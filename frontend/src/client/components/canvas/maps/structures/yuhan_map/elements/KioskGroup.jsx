/**
 * 키오스크 그룹화 : 임성준
 */
import React from 'react'
import { Kiosk } from './etc/Kiosk'

const KioskGroup = () => {
    return (
        <>
            {/* 학생식당 길목 평화관 */}
            <Kiosk position={[37.031, 1, 9]} rotation={[Math.PI / 2, 0, 0]} name={'평화관 후문'} />
            
            {/* 봉사관 */}
            <Kiosk position={[180.605, 1, -190]} rotation={[Math.PI / 2, 0, Math.PI / 2]} name={'봉사관'} />
            
            {/* 자유관 */}
            <Kiosk position={[-160.605, 1, -234.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} name={'자유관'} />
            
            {/* 학생회관 */}
            <Kiosk position={[201.605, 1, 148.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} name={'학생회관'} />
            
            {/* 나눔관 */}
            <Kiosk position={[37.031, 1, 80.138]} rotation={[Math.PI / 2, 0, Math.PI]} name={'나눔관'} />
            
            {/* 창조관 */}
            <Kiosk position={[-150, 0.7, 265]} rotation={[Math.PI / 2, 0, Math.PI / 2]} name={'창조관'} />

            {/* 유일한기념관 */}
            <Kiosk position={[-250.605, 0.7, 93.924]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} name={'유일한기념관'} />
            
            {/* 유재라관 */}
            <Kiosk position={[-301.246, 0.7, -86.629]} rotation={[Math.PI / 2, 0, 0]} name={'유재라관'} />

            {/* 나눔의 숲 내부 평화관 */}
            <Kiosk position={[26.272, 0.7, -120.724]} rotation={[Math.PI / 2, 0, Math.PI]} name={'평화관 정문'} />
        </>
    )
}

export default KioskGroup