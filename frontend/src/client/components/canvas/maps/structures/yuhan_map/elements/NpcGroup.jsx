import React from 'react'
import { useSelector } from 'react-redux'
import { Npc } from '../../../player/npc/Npc'

const NpcGroup = () => {
    // 맵 상태 가져오기
    const groundMapState = useSelector((state) => state.groundMap)
    const groundMapName = groundMapState.mapName

    return (
        <>
            {groundMapName && (
                <>
                    {/* 유일한 박사님 동상 */}
                    <Npc 
                        groundMapName={groundMapName} 
                        npcName={'박사님 NPC'} 
                        areaName={'유일한 박사님 동상'} 
                        position={[20, 0, -500]} 
                        rotation={[0, Math.PI / 3.5, 0]}
                        mainColor={'white'}
                        subColor={'pink'}
                    />

                    {/* 평화관 정문 */}
                    <Npc 
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[10, 0, -130]} 
                        rotation={[0, -Math.PI, 0]}
                        mainColor={'white'}
                        subColor={'red'}
                    />
                    
                    {/* 평화관 후문 */}
                    <Npc 
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[10, 0, 0]} 
                        rotation={[0, 0, 0]}
                        mainColor={'yellow'}
                        subColor={'red'}
                    />

                    {/* 봉사관 */}
                    <Npc 
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[170, 0, -170]} 
                        rotation={[0, -Math.PI / 2, 0]}
                        mainColor={'lightblue'}
                        subColor={'blue'}
                    />

                    {/* 학생회관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[200, 0, 165]} 
                        rotation={[0, -Math.PI / 2, 0]}
                        mainColor={'lightyellow'}
                        subColor={'yellow'}
                    />

                    {/* 나눔관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[55, 0, 75]} 
                        rotation={[0, -Math.PI, 0]}
                        mainColor={'lightgreen'}
                        subColor={'green'}
                    />

                    {/* 유일한 기념관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[-245, 0, 120]} 
                        rotation={[0, Math.PI / 2, 0]}
                        mainColor={'yellow'}
                        subColor={'orange'}
                    />

                    {/* 창조관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[-155, 0, 280]} 
                        rotation={[0, -Math.PI / 2, 0]}
                        mainColor={'yellow'}
                        subColor={'black'}
                    />

                    {/* 자유관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[-170, 0, -200]} 
                        rotation={[0, -Math.PI / 2, 0]}
                        mainColor={'yellow'}
                        subColor={'black'}
                    />

                    {/* 유재라관 */}
                    <Npc
                        groundMapName={groundMapName} 
                        npcName={''} 
                        areaName={''} 
                        position={[-280, 0, -90]} 
                        rotation={[0, 0, 0]}
                        mainColor={'white'}
                        subColor={'black'}
                    />
                </>
            )}
        </>
    )
}

export default NpcGroup