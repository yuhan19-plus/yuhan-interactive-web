/** 파일생성자 : 임성준
 * 임성준 : 바닥 및 투명벽 설정
 * 
 */
import React from 'react'
import DeptFloor from './DeptFloor'
import Wall from '../../yuhan_map/elements/testObject/Wall'

const DeptElements = () => {
    return (
        <>
            {/* 바닥 셋팅 */}
            <DeptFloor />
            
            {/* 투명벽 셋팅 */}
            <Wall position={[50, 51, -260]} />
            <Wall position={[50, 51, 260]} />
            <Wall position={[-260, 51, -20/2]} rotation={[0,  Math.PI / 2, 0]} />
            <Wall position={[260, 51, -20/2]} rotation={[0,  Math.PI / 2, 0]} />
        </>
    )
}

export default DeptElements