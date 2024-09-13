import React from 'react'
import { BasketballHoop } from './etc/BasketballHoop'
import { YuhanEntrance } from './etc/YuhanEntrance'
import { Statue } from './etc/Statue'
import { Wire_Netting } from './etc/Wire_Netting'
import { BusStationOne } from './etc/BusStationOne'
import { BusStationTwo } from './etc/BusStationTwo'
import { NoEntry } from './etc/NoEntry'

const EtcGroup = () => {
    return (
        <>
            {/* 농구골대 */}
            <BasketballHoop position={[136.195, 0, -237.254]} />
            <BasketballHoop position={[80.195, 0, -237.254]} rotation={[0, Math.PI, 0]} />

            {/* 입구 */}
            <YuhanEntrance position={[227.941, 31.653, -391.413]}/>
            <YuhanEntrance position={[225.126, 31.653, -507.304]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 동상 */}
            <Statue position={[10, 34, -540]} rotation={[0, Math.PI / 3.5, 0]} scale={12} />
            <Statue position={[-480, 26+4, -500]} rotation={[0, Math.PI / 2.7, 0]} scale={26} />

            {/* 철조망 */}
            <Wire_Netting position={[50.639, 6.42, 395.918]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 버스정류장 */}
            <BusStationOne position={[271.453, 6.15, -163.289]}/>
            <BusStationTwo position={[526.536, 5.55, -235.881]} rotation={[Math.PI, 0, Math.PI]}/>

            {/* 바리게이트 */}
            <NoEntry position={[-460, -9, -97]} rotation={[0, Math.PI / 2, 0]} scale={1.7} />
        </>
    )
}

export default EtcGroup