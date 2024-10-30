/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { mainCharDept } from '../../../../../../redux/actions/actions'
import { BioDeptHeadCharacter } from '../../player/dept/BioDeptHeadCharacter'
import { CSDeptHeadCharacter } from '../../player/dept/CSDeptHeadCharacter'
import { DesignDeptHeadCharacter } from '../../player/dept/DesignDeptHeadCharacter'
import { FoodDeptHeadCharacter } from '../../player/dept/FoodDeptHeadCharacter'
import { MainCharacter } from '../../player/main/MainCharacter'
import DeptElements from './elements/DeptElements'
import DeptFloor from './elements/DeptFloor'

const DeptMap = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const myChar = useSelector((state) => state.mChar)
    const groundMapState = useSelector((state) => state.groundMap)
    const groundMapName = groundMapState.mapName

    const [targetPosition, setTargetPosition] = useState(myChar.deptInitPosition)
    console.log('dept targetPosition : ', targetPosition)
    
    const handleMove = (newPosition) => {
        setTargetPosition(newPosition)
    }

    useEffect(() => {
        if (targetPosition) {
            dispatch(mainCharDept(targetPosition))
        }
    }, [targetPosition, dispatch])
    
    useEffect(() => {
        if(groundMapName === '' || groundMapName === 'yh_map') {
            navigate('/')
            history.go(0)
        }
    }, [groundMapName])

    return (
        <group>
            <DeptFloor
                position={[0, -11, 0]}
                onMove={handleMove}
            />
            <DeptElements groundMapName={groundMapName} />

            <React.Fragment>
                {/* 캐릭터가 있는 경우에만 MainCharacter 컴포넌트 렌더링 */}
                {groundMapName === 'yuhan_bio_map' && (
                    <BioDeptHeadCharacter groundMapName={groundMapName} position={[80, -7.7, -100]} scale={0.7} />
                    // <BioDeptHeadCharacter groundMapName={groundMapName} position={[-100, 0, 42.5]} scale={0.7} />
                )}
                {groundMapName === 'computer_sw_map' && (
                    <CSDeptHeadCharacter groundMapName={groundMapName} position={[-100, 0.7, -127]} scale={0.7} />
                )}
                {groundMapName === 'food_nutrition_map' && (
                    <FoodDeptHeadCharacter groundMapName={groundMapName} position={[0, 0.7, -100]} scale={0.7} />
                )}
                {groundMapName === 'industrial_design_map' && (
                    <DesignDeptHeadCharacter groundMapName={groundMapName} position={[0, -6.3, -100]} scale={0.7} />
                )}
                {groundMapName === 'mini_game_map' && (
                    <></>
                )}
            </React.Fragment>
            
            <React.Fragment>
                {/* 캐릭터가 있는 경우에만 MainCharacter 컴포넌트 렌더링 */}
                {targetPosition && myChar !== '' && (
                    <MainCharacter myChar={myChar} position={targetPosition} />
                )}
            </React.Fragment>
        </group>
    )
}

export default DeptMap
