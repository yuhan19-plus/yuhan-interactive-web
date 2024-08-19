/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * - 바닥 셋팅 (24/08/02)
 * - 투명벽 셋팅 (24/08/03)
 */

import React from 'react'
import Floor from './structures/yuhan_map/elements/Floor'
import { BuildingEight } from './structures/yuhan_map/elements/building/BuildingEight'
import Wall from './structures/yuhan_map/elements/testObject/Wall'
import YuhanElements from './structures/yuhan_map/YuhanElements'

const RootMap = () => {
    return (
        <group>
            {/* 바닥 셋팅 */}
            <Floor position={[50, -1, -20]} />

            {/* 맵 오브젝트들 */}
            <YuhanElements />

            {/* 건물 오브젝트 배치 */}
            <BuildingEight position={[-305, 105, -150]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 투명벽 셋팅 */}
            <Wall position={[50, 51, -505]} />
            <Wall position={[50, 51, 465]} />
            <Wall position={[-465, 51, -20]} rotation={[0,  Math.PI / 2, 0]} />
            <Wall position={[535, 51, -20]} rotation={[0,  Math.PI / 2, 0]} />
        </group>
    )
}

export default RootMap