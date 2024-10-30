/** 작성자 : 임성준
 */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainChar } from '../../../../redux/actions/actions'
import { MainCharacter } from './player/main/MainCharacter'
import Direction from './structures/yuhan_map/3dUIs/modal/Direction'
import StatueModal from './structures/yuhan_map/3dUIs/modal/StatueModal'
import SmokingArea from './structures/yuhan_map/3dUIs/modal/SmokingArea'
import YuhanElements from './structures/yuhan_map/YuhanElements'
import Floor from './structures/yuhan_map/elements/Floor'
import FoodGroup from './structures/yuhan_map/elements/FoodGroup'
import KioskGroup from './structures/yuhan_map/elements/KioskGroup'
import { Bus } from './structures/yuhan_map/elements/bus/Bus'
import { BusStationOne } from './structures/yuhan_map/elements/etc/BusStationOne'
import { BusStationTwo } from './structures/yuhan_map/elements/etc/BusStationTwo'
import { Plate } from './structures/yuhan_map/elements/etc/Plate'
import { ShowCase } from './structures/yuhan_map/elements/etc/ShowCase'
import { Statue } from './structures/yuhan_map/elements/etc/Statue'
import { YuhanLogo } from './structures/yuhan_map/elements/etc/YuhanLogo'
import { Arrow } from './structures/common/Arrow'

const RootMap = () => {
    const dispatch = useDispatch()
    const myChar = useSelector((state) => state.mChar)
    const groundMapState = useSelector((state) => state.groundMap)
    const currentGroundMapName = groundMapState.mapName

    const [targetPosition, setTargetPosition] = useState(myChar.currentPosition)

    useEffect(() => {
        dispatch(mainChar(targetPosition))
    }, [targetPosition])

    const handleMove = (newPosition) => {
        // console.log('newPosition', newPosition)
        setTargetPosition(newPosition)
    }

    // Redux 상태에서 버스존 1에 있는지 여부 가져오기
    const isInBusStationOne = useSelector(state => state.bus.inBusStationOne);
    const isInBusStationTwo = useSelector(state => state.bus.inBusStationTwo);
    // 찾아오는 길버튼의 클릭여부를 확인
    const viewDirectionsState = useSelector((state) => state.view.value && state.view.viewName === 'directionsView');
    useEffect(() => {
        console.log(isInBusStationTwo)
    }, [isInBusStationTwo])

    // 찾아오는 길버튼의 클릭여부를 확인
    const viewSmokingAreaState = useSelector((state) => state.view.value && state.view.viewName === 'smokingAreaView');

    // 동상 출퇴장 처리
    const isInStatue = useSelector(state=> state.statue.inStatue);
    useEffect(()=>{
        console.log("동상",isInStatue)
    },[isInStatue])
    
    //학생 식당 음식 출퇴장 처리
    const isInStudentKiosk = useSelector(state=> state.studentKiosk.inStudentKiosk);
    useEffect(()=>{
        console.log("식당",isInStudentKiosk)
    },[isInStudentKiosk])

    // 흡연장 출퇴장 처리
    const isInSmokingArea = useSelector(state=> state.smokingArea.inSmokingArea);
    useEffect(()=>{
        console.log("흡연장",isInSmokingArea)
    },[isInSmokingArea])

    return (
        <group>
            {/* 바닥 셋팅 */}
            <Floor
                position={[12, -30, -82.5]}
                onMove={handleMove}
            />

            {currentGroundMapName === 'yh_map' && (
                <>
                    {/* 맵 오브젝트들 */}
                    <KioskGroup />

                    <YuhanElements />

                    <YuhanLogo position={[-495, 13, -290]} />

                    {/* 버스정류장 */}
                    <BusStationOne position={[271.453, 6.15, -163.289]} />
                    <BusStationTwo position={[526.536, 5.55, -235.881]} rotation={[Math.PI, 0, Math.PI]} />

                    <Statue position={[10, 34, -540]} rotation={[0, Math.PI / 3.5, 0]} scale={12}/>

                    {/* 동상 모달창 위치 */}
                    {isInStatue &&(
                        <>
                            <StatueModal position={[35, 0, -650]}/>
                        </>
                    )}
                    
                    {isInStudentKiosk &&(
                        <>
                            <FoodGroup position={[203.2, 5.2, 135]}/>
                            <ShowCase position={[193.605, -3, 134.919]} rotation={[Math.PI, 0, Math.PI]} scale={3}/>
                            <Plate position={[203.05, 3.6, 135.1]} scale={2}/>
                        </>
                    )}

                    {viewSmokingAreaState ? (
                            <>
                                <Arrow position={[41.672, 50, -284.431]} scale={8} />
                                <Arrow position={[131.979, 25, -125]} scale={8} />
                                <Arrow position={[150, 160, -70]} scale={8} />
                                <Arrow position={[220, 160, -120]} scale={8} />
                                <Arrow position={[100, 178, 125]} scale={8} />
                                <Arrow position={[12, 190, 230]} scale={8} />
                                <Arrow position={[-310, 171, 125]} scale={8} />
                            </>
                        ) : (
                            <>
                                {isInSmokingArea &&(
                                    <>
                                        <SmokingArea position={[0, 0, -250]}/>
                                    </>
                                )}
                            </>
                        )  
                    }

                    {viewDirectionsState ? (
                            <>
                                <Arrow position={[282, 25, -163]} scale={8} />
                                <Arrow position={[502, 25, -237]} scale={8} />
                                <Bus position={[355, 17.5, -150]} />
                            </>
                        ) : (
                            <>
                                {/* 찾아오는 길 안내문 */}
                                {isInBusStationOne && (
                                    <>
                                        <Direction position={[170, 0, 0]} />
                                        <Bus position={[355, 17.5, -150]} />
                                    </>
                                )}
                                {isInBusStationTwo && (
                                    <>
                                        <Direction position={[540, 0, 0]} />
                                        <Bus position={[355, 17.5, -150]} />
                                    </>
                                )}
                            </>
                        )
                    }
                    {/* React.Fragment: DOM 요소를 생성하지 않고 묶게 해줌 */}
                    <React.Fragment>
                        {/* 캐릭터 이동에 클릭한 위치를 전달, 초기에는 null 상태 */}
                        {(targetPosition && myChar !== '') && (
                            <MainCharacter myChar={myChar} position={targetPosition} />
                        )}
                    </React.Fragment>
                </>
            )}
        </group> 
    )
}

export default RootMap