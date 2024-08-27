/** 파일 생성자 : 임성준
 */

import React from 'react'
import YuhanElements from './structures/yuhan_map/YuhanElements'

const RootMap = () => {
    return (
        <group>
            {/* 맵 오브젝트들 */}
            <YuhanElements />
        </group>
    )
}

export default RootMap