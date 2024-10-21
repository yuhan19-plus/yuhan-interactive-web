import React from 'react'
import Welcome from '../../canvas/maps/structures/yuhan_map/elements/etc/Welcome'
import BuildingGroup from '../../canvas/maps/structures/yuhan_map/elements/BuildingGroup'
import TreeGroup from '../../canvas/maps/structures/yuhan_map/elements/park/tree/TreeGroup'
import GrassGroup from '../../canvas/maps/structures/yuhan_map/elements/park/grass/GrassGroup'
import TerraceGroup from '../../canvas/maps/structures/yuhan_map/elements/TerraceGroup'
import { SideWalk } from '../../canvas/maps/structures/yuhan_map/elements/road/SideWalk'
import MainPark from '../../canvas/maps/structures/yuhan_map/elements/park/MainPark'
import SubPark from '../../canvas/maps/structures/yuhan_map/elements/park/SubPark'
import { Statue } from '../../canvas/maps/structures/yuhan_map/elements/etc/Statue'
import { YuhanEntrance } from '../../canvas/maps/structures/yuhan_map/elements/etc/YuhanEntrance'

const MiniMapElements = () => {
    return (
        <>
            {/* 유한대 Welcome */}
            {/* <Welcome /> */}

            {/* 그룹화 */}
            <BuildingGroup />
            <TreeGroup />
            <GrassGroup />
            <TerraceGroup />
            
            {/* 입구 */}
            <YuhanEntrance position={[227.941, 31.653, -391.413]} />
            <YuhanEntrance position={[225.126, 31.653, -507.304]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 인도 */}
            <SideWalk position={[-0.5, -6.6, 0]} />

            {/* 공원 */}
            <MainPark />
            <SubPark />

            {/* 동상 */}
            <Statue position={[0, 50, -500]} rotation={[0, Math.PI / 2.7, 0]} scale={26} />
        </>
    )
}

export default MiniMapElements