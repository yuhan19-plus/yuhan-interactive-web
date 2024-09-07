import React from 'react'
import { BasketballHoop } from './etc/BasketballHoop'
import { YuhanEntrance } from './etc/YuhanEntrance'
import { Statue } from './etc/Statue'
import { Wire_Netting } from './etc/Wire_Netting'
import { BusStationOne } from './etc/BusStationOne'
import { BusStationTwo } from './etc/BusStationTwo'
import EventArea from './etc/EventArea'

const EtcGroup = () => {
    return (
        <>
            {/* 농구골대 */}
            <BasketballHoop position={[136.195, 0, -237.254]} />
            <BasketballHoop position={[80.195, 0, -237.254]} rotation={[0, Math.PI, 0]} />

            {/* 입구 */}
            <YuhanEntrance position={[227.941, 36.653, -391.413]}/>
            <YuhanEntrance position={[225.126, 36.653, -507.304]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 동상 */}
            <Statue position={[10, 39, -540]} rotation={[0, Math.PI / 3.5, 0]} scale={12} />
            <Statue position={[-480, 39, -500]} rotation={[0, Math.PI / 2.7, 0]} scale={26} />

            {/* 철조망 */}
            <Wire_Netting position={[50.639, 10.339, 395.918]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 버스정류장 */}
            <BusStationOne position={[271.453, 9.959, -163.289]}/>
            {/* <EventArea position={[287, -4, -163.289]} /> */}
            <BusStationTwo position={[526.536, 9.408, -235.881]} rotation={[Math.PI, 0, Math.PI]}/>
        </>
    )
}

export default EtcGroup