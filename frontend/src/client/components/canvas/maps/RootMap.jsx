/** 작성자 : 임성준
 */
import React, { useEffect, useState } from 'react'
import YuhanElements from './structures/yuhan_map/YuhanElements'
import { MainCharacter } from './player/main/MainCharacter'
import { useDispatch, useSelector } from 'react-redux'
import { mainChar } from '../../../../redux/actions/actions'
import Floor from './structures/yuhan_map/elements/Floor'
import KioskGroup from './structures/yuhan_map/elements/KioskGroup'
import { BusStationOne } from './structures/yuhan_map/elements/etc/BusStationOne'
import { BusStationTwo } from './structures/yuhan_map/elements/etc/BusStationTwo'
import { Bus } from './structures/yuhan_map/elements/bus/Bus'
import Direction from './structures/yuhan_map/3dUIs/modal/Direction'

const RootMap = () => {
    const myChar = useSelector((state) => state.mChar)
    const dispatch = useDispatch()

    const [targetPosition, setTargetPosition] = useState(myChar.currentPosition)
    // console.log(targetPosition)

    useEffect(() => {
        dispatch(mainChar(targetPosition))
    }, [targetPosition])

    const handleMove = (newPosition) => {
        // console.log('newPosition', newPosition)
        setTargetPosition(newPosition)
    }

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
        <group>
            {/* 바닥 셋팅 */}
            <Floor
                position={[12, -30, -82.5]}
                onMove={handleMove}
            />

            {/* 맵 오브젝트들 */}
            <KioskGroup />

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

            <YuhanElements />

            {/* React.Fragment: DOM 요소를 생성하지 않고 묶게 해줌 */}
            <React.Fragment>
                {/* 캐릭터 이동에 클릭한 위치를 전달, 초기에는 null 상태 */}
                {(targetPosition && myChar !== '') && (
                    <MainCharacter myChar={myChar} position={targetPosition} />
                )}
            </React.Fragment>
        </group>
    )
}

export default RootMap