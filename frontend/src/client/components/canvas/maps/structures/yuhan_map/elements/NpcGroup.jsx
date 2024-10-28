import React from 'react'
import { BioDeptHeadCharacter } from '../../../player/dept/BioDeptHeadCharacter'
import { useSelector } from 'react-redux'
import { Npc } from '../../../player/npc/Npc'

const NpcGroup = () => {
    // 맵 상태 가져오기
    const groundMapState = useSelector((state) => state.groundMap)
    const groundMapName = groundMapState.mapName

    return (
        <>
            {/* 평화관 정문 */}
            {groundMapName && (
                <Npc position={[82, 0, -525]} rotation={[0, Math.PI / 3.5, 0]} colorValue={'orange'} />
            )}
            
            {/* 평화관 후문 */}
            <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, 0]} rotation={[0, Math.PI / 2, 0]} />
            
            {/* 봉사관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 자유관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 학생회관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 나눔관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 창조관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 유일한 기념관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
            
            {/* 유재라관 */}
            {/* <BioDeptHeadCharacter groundMapName={groundMapName} position={[-115, -5, -100]} rotation={[0, Math.PI, 0]} /> */}
        </>
    )
}

export default NpcGroup