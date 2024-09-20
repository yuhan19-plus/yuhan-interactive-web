/** 작성자 : 임성준
 */
import React, { useEffect, useState } from 'react'
import YuhanElements from './structures/yuhan_map/YuhanElements'
import { MainCharacter } from './player/main/MainCharacter'
import { useDispatch, useSelector } from 'react-redux'
import { mainChar } from '../../../../redux/actions/actions'
import Floor from './structures/yuhan_map/elements/Floor'
import KioskGroup from './structures/yuhan_map/elements/KioskGroup'

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
    
    return (
        <group>
            {/* 바닥 셋팅 */}
            <Floor
                position={[12, -30, -82.5]}
                onMove={handleMove}
            />

            {/* 맵 오브젝트들 */}
            <KioskGroup />
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