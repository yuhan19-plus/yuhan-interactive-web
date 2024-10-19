/*
* 오자현 
*/

import React from 'react'
import { GoldBox } from './etc/GoldBox'
import { useSelector } from 'react-redux';
import { Coin } from './etc/Coin';

const GoldBoxGroup = () => {

    const isZone1 = useSelector((state) => state.goldBox.hasVisitedZone1);
    const isZone2 = useSelector((state) => state.goldBox.hasVisitedZone2);
    const isZone3 = useSelector((state) => state.goldBox.hasVisitedZone3);
    return (
        <>
            {/* 동상 */}
            {/* <GoldBox position={[120, 0, -520]} rotation={[0, 0, 0]} /> */}
            {/* 유재라관 */}
            {!isZone1 && (
                <>
                    <GoldBox position={[-350, 0, -110]} rotation={[0, 0, 0]} />
                    <Coin position={[-350, 0, -110]} rotation={[0, 0, 0]} />
                </>
            )}
            {/* 테라스 */}
            {!isZone2 && (
                <>
                    <GoldBox position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
                    <Coin position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
                </>
            )}
            {/* 나눔의 숲 */}
            {!isZone3 && (
                <>
                    <GoldBox position={[95, 0, -200]} rotation={[0, 0, 0]} />
                    <Coin position={[95, 0, -200]} rotation={[0, 0, 0]} />
                </>
            )}
        </>
    )
}

export default GoldBoxGroup