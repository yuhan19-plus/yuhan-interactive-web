/** 파일 생성자 : 임성준
 * 그룹화
 */
import React from 'react'

// 그룹화
import SmokingGroup from './elements/SmokingGroup'
import GrassGroup from './elements/park/grass/GrassGroup'
import TreeGroup from './elements/park/tree/TreeGroup'
import TerraceGroup from './elements/TerraceGroup'
import BuildingGroup from './elements/BuildingGroup'
import EtcGroup from './elements/EtcGroup'
import StreetLampGroup from './elements/StreetLampGroup'
import GuideGroup from './elements/GuideGroup'
import NpcGroup from './elements/NpcGroup'
import GoldBoxGroup from './elements/GoldBoxGroup'

const YuhanElements = () => {
    return (
        <>
            {/* 가이드 뷰일 경우 */}
            <GuideGroup />

            {/* 그룹화 */}
            <BuildingGroup />
            <TreeGroup />
            <GrassGroup />
            <TerraceGroup />
            <SmokingGroup />
            <EtcGroup />
            <StreetLampGroup/>
            <GoldBoxGroup/>
            <NpcGroup />
        </>
    )
}

export default YuhanElements