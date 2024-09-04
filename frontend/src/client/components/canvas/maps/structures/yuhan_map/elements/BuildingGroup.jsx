/**
 * 임성준
 */

import React from 'react'
import { Pyeonghwagwan } from './building/Pyeonghwagwan'
import { Bongsagwan } from './building/Bongsagwan'
import { BongsagwanEntrance } from './building/BongsagwanEntrance'
import { Jayugwan } from './building/Jayugwan'
import { StudentCafeteria } from './building/StudentCafeteria'
import { StudentCafeteriaEntrance } from './building/StudentCafeteriaEntrance'
import { StudentCafeteriaEntranceTwo } from './building/StudentCafeteriaEntranceTwo'
import { ProfessorCafeteria } from './building/ProfessorCafeteria'
import { Nanumgwan } from './building/Nanumgwan'
import { NanumgwanLeftPillar } from './building/NanumgwanLeftPillar'
import { NanumgwanRightPillar } from './building/NanumgwanRightPillar'
import { B5_B6 } from './building/B5_B6'
import { B5_B6_Between_B } from './building/B5-B6-Between-B'
import { Changjogwan } from './building/Changjogwan'
import { ChangjogwanPillar } from './building/ChangjogwanPillar'
import { MemorialHall } from './building/MemorialHall'
import { MemorialHallBigEntrance } from './building/MemorialHallBigEntrance'
import { MemorialHallSmallEntrance } from './building/MemorialHallSmallEntrance'
import { MemorialHallEntranceBlock } from './building/MemorialHallEntranceBlock'
import { Yujaelagwan } from './building/Yujaelagwan'
import { YujaelagwanPillar } from './building/YujaelagwanPillar'
import { GateOfSharing } from './building/GateOfSharing'
import { GateOfSharingEntrance } from './building/GateOfSharingEntrance'
import { GateOfSharingLeftPillar } from './building/GateOfSharingLeftPillar'
import { GateOfSharingRightPillar } from './building/GateOfSharingRightPillar'
import { B9_B1_Between_B } from './building/B9-B1-Between-B'

const BuildingGroup = () => {
    return (
        <>
            {/* 1호관 */}
            <Pyeonghwagwan position={[66.35, 80, -69.278]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 2호관 */}
            <Bongsagwan position={[222, 67, -180]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
            <BongsagwanEntrance position={[179, 70.5, -298.787]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />

            {/* 3호관 */}
            <Jayugwan position={[-108.5, 68, -142.3]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 4호관 */}
            <StudentCafeteria position={[249.5, 56, 248.3]} rotation={[Math.PI, 0, Math.PI]} />
            <StudentCafeteriaEntrance position={[220.8, 26, 182.6]} rotation={[Math.PI, 0, Math.PI]} />
            <StudentCafeteriaEntranceTwo position={[225.2, -3, 129]} rotation={[Math.PI, 0, Math.PI]} />
            <ProfessorCafeteria position={[211.6, 20, 308.4]} rotation={[Math.PI, 0, Math.PI]} />
            
            {/* 5호관 */}
            <Nanumgwan position={[13.651, 73, 121.584]} rotation={[0, 1.571, 0]} />
            <NanumgwanLeftPillar position={[83, 69, 163]} rotation={[0, 1.571, 0]} />
            <NanumgwanRightPillar position={[-67.348, 74, 160.355]} rotation={[0, 1.571, 0]} />
            
            {/* 56호관 */}
            <B5_B6 position={[128.273, 82, 199.836]} rotation={[0, 0, 0]} />
            <B5_B6_Between_B position={[13.644, 8, 159.007]} rotation={[0, 0, 0]} />
            
            {/* 6호관 */}
            <Changjogwan position={[12.86, 71, 271.937]} rotation={[0, -1.571, 0]} />
            <ChangjogwanPillar position={[12.1, 81, 232.529]} />
            
            {/* 7호관 */}
            <MemorialHall position={[-341.439, 69, 182.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <MemorialHallBigEntrance position={[-263.439, 69, 192.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <MemorialHallSmallEntrance position={[-263.439, 69, 107.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <MemorialHallEntranceBlock position={[-274.439, 69, 192.681]} rotation={[Math.PI / 2, 0, Math.PI]} />

            {/* 8호관 */}
            <Yujaelagwan position={[-380.0, 97, -186.3]} rotation={[-Math.PI, 0, -Math.PI]} />
            <YujaelagwanPillar position={[-377.9, 11, -90.8]} rotation={[-Math.PI, 0, -Math.PI]} />
            <YujaelagwanPillar position={[-325.4, 11, -90.5]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 9호관 */}
            <GateOfSharing position={[267.607, 62, 40.988]} rotation={[Math.PI, 0, Math.PI]} />
            <GateOfSharingEntrance position={[229.787, -6, 41.207]} rotation={[Math.PI, 0, Math.PI]} />
            <GateOfSharingLeftPillar position={[205.264, 26, 20.396]} rotation={[Math.PI, 0, Math.PI]} />
            <GateOfSharingRightPillar position={[205.264, 26, 61.894]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 1 9호관 */}
            <B9_B1_Between_B position={[218.815, 71, -30.8]} rotation={[-Math.PI, 0, -Math.PI]} />
        </>
    )
}

export default BuildingGroup