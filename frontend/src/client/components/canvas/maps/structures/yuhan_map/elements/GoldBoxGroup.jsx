/*
* 오자현 
*/

import React from 'react'
import { GoldBox } from './etc/GoldBox'
import { useSelector } from 'react-redux';

const GoldBoxGroup = () => {
    /**
     * 앞으로 할 것
     * 상자기준 +-20정도의 영역을 잡아서 상태관리하기
     * 보상은 캐릭터에 효과 추가
     */
    return (
        <>
            {/* 동상 */}
            {/* <GoldBox position={[120, 0, -520]} rotation={[0, 0, 0]} /> */}
            {/* 유재라관 */}
                <GoldBox position={[-350, 0, -110]} rotation={[0, 0, 0]} />
            {/* 테라스 */}
            <GoldBox position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
            {/* 나눔의 숲 */}
            <GoldBox position={[95, 0, -200]} rotation={[0, 0, 0]} />
        </>
    )
}

export default GoldBoxGroup