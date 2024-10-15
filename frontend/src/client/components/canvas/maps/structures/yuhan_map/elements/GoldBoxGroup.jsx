/*
* 오자현 
*/

import React from 'react'
import { GoldBox } from './etc/GoldBox'

const GoldBoxGroup = () => {
    /**
     * 앞으로 할 것
     * 상자기준 _+40정도의 영역을 잡아서 상태관리하기
     * 보상은 캐릭터에 효과 추가
     */
    return (
        <>
            <GoldBox position={[300, 0, -400]} rotation={[0, 0, 0]} />
            <GoldBox position={[-350, 0, -110]} rotation={[0, 0, 0]} />
            <GoldBox position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
            <GoldBox position={[170, 0, -110]} rotation={[0, Math.PI / 2, 0]} />
            <GoldBox position={[400, 0, 400]} rotation={[0, 0, 0]} />
        </>
    )
}

export default GoldBoxGroup