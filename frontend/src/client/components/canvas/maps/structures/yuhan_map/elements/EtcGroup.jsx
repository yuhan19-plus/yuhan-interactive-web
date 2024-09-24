import React, { useEffect } from 'react'
import { BasketballHoop } from './etc/BasketballHoop'
import { YuhanEntrance } from './etc/YuhanEntrance'
import { Statue } from './etc/Statue'
import { Wire_Netting } from './etc/Wire_Netting'
import { BusStationOne } from './etc/BusStationOne'
import { BusStationTwo } from './etc/BusStationTwo'
import Direction from '../3dUIs/modal/Direction'
import { useSelector } from 'react-redux'
import { Bus } from './bus/Bus'

const EtcGroup = () => {
    // Redux 상태에서 버스존 1에 있는지 여부 가져오기
    const isInBusStationOne = useSelector(state => state.bus.inBusStationOne);
    useEffect(() => {
        console.log(isInBusStationOne)
    }, [isInBusStationOne])
    const isInBusStationTwo = useSelector(state => state.bus.inBusStationTwo);
    useEffect(() => {
        console.log(isInBusStationTwo)
    }, [isInBusStationTwo])

    return (
        <>
            {/* 농구골대 */}
            <BasketballHoop position={[136.195, 0, -237.254]} />
            <BasketballHoop position={[80.195, 0, -237.254]} rotation={[0, Math.PI, 0]} />

            {/* 입구 */}
            <YuhanEntrance position={[227.941, 31.653, -391.413]} />
            <YuhanEntrance position={[225.126, 31.653, -507.304]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 동상 */}
            <Statue position={[10, 34, -540]} rotation={[0, Math.PI / 3.5, 0]} scale={12} />
            <Statue position={[-480, 26 + 4, -500]} rotation={[0, Math.PI / 2.7, 0]} scale={26} />

            {/* 철조망 */}
            <Wire_Netting position={[50.639, 6.42, 395.918]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 버스정류장 */}
            <BusStationOne position={[271.453, 6.15, -163.289]} />
            <BusStationTwo position={[526.536, 5.55, -235.881]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 찾아오는 길 안내문 */}
            {isInBusStationOne && (
                <>
                    <Direction position={[253, 10, -140]} />
                    <Bus position={[350, 17.5, -150]}/>
                </>
            )}
            {isInBusStationTwo && (
                <>
                    <Direction position={[553, 0, -220]} />
                    <Bus position={[450, 17.5, -150]}/>
                </>
            )}

        </>
    )
}

export default EtcGroup