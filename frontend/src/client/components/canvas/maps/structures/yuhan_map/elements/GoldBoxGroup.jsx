/*
* 파일생성자 오자현
* 보물상자 그룹화 컴포넌트
*/

import React from 'react'
import { GoldBox } from './etc/GoldBox'
import { useSelector } from 'react-redux';
import { Ccoin } from './etc/coin/Ccoin';
import { PythonCoin } from './etc/coin/PythonCoin';
import { JavaCoin } from './etc/coin/JavaCoin';

const GoldBoxGroup = () => {

    const hasVisitedZone1 = useSelector((state) => state.goldBox.hasVisitedZone1);
    const hasVisitedZone2 = useSelector((state) => state.goldBox.hasVisitedZone2);
    const hasVisitedZone3 = useSelector((state) => state.goldBox.hasVisitedZone3);

    return (
        <>
            {/* 유재라관 */}
            {!hasVisitedZone1 && (
                <>
                    <GoldBox position={[-350, 0, -110]} rotation={[0, 0, 0]} />
                    <Ccoin position={[-350, 0, -110]} rotation={[0, 0, 0]} />
                </>
            )}
            {/* 테라스 */}
            {!hasVisitedZone2 && (
                <>
                    <GoldBox position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
                    <JavaCoin position={[-120, 0, 200]} rotation={[0, Math.PI / 2, 0]} />
                </>
            )}
            {/* 나눔의 숲 */}
            {!hasVisitedZone3 && (
                <>
                    <GoldBox position={[95, 0, -200]} rotation={[0, 0, 0]} />
                    <PythonCoin position={[95, 0, -200]} rotation={[0, 0, 0]} />
                </>
            )}
        </>
    )
}

export default GoldBoxGroup