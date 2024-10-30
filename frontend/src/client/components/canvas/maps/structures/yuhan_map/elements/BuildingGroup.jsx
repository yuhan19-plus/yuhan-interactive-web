/**
 * 임성준
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { Pyeonghwagwan } from './building/Pyeonghwagwan'
import { Bongsagwan } from './building/Bongsagwan'
import { Jayugwan } from './building/Jayugwan'
import { StudentCafeteria } from './building/StudentCafeteria'
import { Nanumgwan } from './building/Nanumgwan'
import { B5_B6 } from './building/B5_B6'
import { B5_B6_Between_B } from './building/B5-B6-Between-B'
import { Changjogwan } from './building/Changjogwan'
import { MemorialHall } from './building/MemorialHall'
import { Yujaelagwan } from './building/Yujaelagwan'
import { GateOfSharing } from './building/GateOfSharing'
import { B9_B1_Between_B } from './building/B9-B1-Between-B'

const BuildingGroup = () => {
    // view 상태 값 가져오기
    const viewState = useSelector((state) => state.view)
    const viewValue = viewState.value
    const viewName = viewState.viewName

    return (
        <>
            {/* 1호관 */}
            <Pyeonghwagwan
                position={[66.35, 80, -69.278]}
                rotation={[-Math.PI, 0, -Math.PI]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 2호관 */}
            <Bongsagwan
                position={[222, 67, -180]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 3호관 */}
            <Jayugwan
                position={[-108.5, 68, -142.3]}
                rotation={[Math.PI / 2, 0, 0]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 4호관 */}
            <StudentCafeteria
                position={[249.5, 56, 248.3]}
                rotation={[Math.PI, 0, Math.PI]}
                viewValue={viewValue}
                viewName={viewName}
            />
            
            {/* 5호관 */}
            <Nanumgwan
                position={[13.651, 73, 121.584]}
                rotation={[0, 1.571, 0]}
                viewValue={viewValue}
                viewName={viewName}
            />
            
            {/* 56호관 */}
            <B5_B6 position={[128.273, 82, 199.836]} rotation={[0, 0, 0]} />
            <B5_B6_Between_B position={[13.644, 8, 159.007]} rotation={[0, 0, 0]} />
            
            {/* 6호관 */}
            <Changjogwan
                position={[12.86, 71, 271.937]}
                rotation={[0, -1.571, 0]}
                viewValue={viewValue}
                viewName={viewName}
            />
            
            {/* 7호관 */}
            <MemorialHall
                position={[-341.439, 69, 182.681]}
                rotation={[Math.PI / 2, 0, Math.PI]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 8호관 */}
            <Yujaelagwan
                position={[-380.0, 97, -186.3]}
                rotation={[-Math.PI, 0, -Math.PI]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 9호관 */}
            <GateOfSharing
                position={[267.607, 62, 40.988]}
                rotation={[Math.PI, 0, Math.PI]}
                viewValue={viewValue}
                viewName={viewName}
            />

            {/* 1 9호관 */}
            <B9_B1_Between_B position={[218.815, 71, -30.8]} rotation={[-Math.PI, 0, -Math.PI]} />
        </>
    )
}

export default BuildingGroup