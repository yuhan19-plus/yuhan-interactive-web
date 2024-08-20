/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * - 바닥 셋팅 (24/08/02)
 * - 투명벽 셋팅 (24/08/03)
 * 이정민 : 프론트엔드 개발
 * - 오브젝트 배치 및 물리엔진 적용(24/08/14)
 */

import React from 'react'
import Floor from './structures/yuhan_map/elements/Floor'
import { YuhanMap } from './structures/yuhan_map/elements/YuhanMap'

import { B1 } from './structures/yuhan_map/elements/building/B1'

import { B2 } from './structures/yuhan_map/elements/building/B2'
import { B2Enter } from './structures/yuhan_map/elements/building/B2Enter'

import { B3 } from './structures/yuhan_map/elements/building/B3'

import { B4 } from './structures/yuhan_map/elements/building/B4'
import { B4Enter } from './structures/yuhan_map/elements/building/B4Enter'
import { B4Enter2 } from './structures/yuhan_map/elements/building/B4Enter2'
import { B4Restaurant } from './structures/yuhan_map/elements/building/B4Restaurant'

import { B5 } from './structures/yuhan_map/elements/building/B5'
import { B5Pipe_L } from './structures/yuhan_map/elements/building/B5-Pipe_L'
import { B5Pipe_R } from './structures/yuhan_map/elements/building/B5-Pipe_R'

import { B5_B6_Between_B } from './structures/yuhan_map/elements/building/B5-B6-Between-B'
import { B5_B6 } from './structures/yuhan_map/elements/building/B5_B6'

import { B6 } from './structures/yuhan_map/elements/building/B6'
import { B6Pipe } from './structures/yuhan_map/elements/building/B6-Pipe'

import { B7 } from './structures/yuhan_map/elements/building/B7'
import { B7_Enter1 } from './structures/yuhan_map/elements/building/B7_Enter1'
import { B7_Enter2 } from './structures/yuhan_map/elements/building/B7_Enter2'
import { B7_EnterBlock } from './structures/yuhan_map/elements/building/B7_EnterBlock'

import { B8 } from './structures/yuhan_map/elements/building/B8'
import { B8Pipe_L } from './structures/yuhan_map/elements/building/B8Pipe_L'
import { B8Pipe_R } from './structures/yuhan_map/elements/building/B8Pipe_R'

import { B9 } from './structures/yuhan_map/elements/building/B9'
import { B9_B1_Between_B } from './structures/yuhan_map/elements/building/B9-B1-Between-B'
import { B9_Pipe_L } from './structures/yuhan_map/elements/building/B9-Pipe_L'
import { B9_Pipe_R } from './structures/yuhan_map/elements/building/B9-Pipe_R'
import { B9Enter } from './structures/yuhan_map/elements/building/B9Enter'

import { SideWalk } from './structures/yuhan_map/elements/building/SideWalk'

import Wall from './structures/yuhan_map/elements/testObject/Wall'






const RootMap = () => {
    return (
        <group>
            {/* 바닥 셋팅 */}
            <Floor position={[12, -1, -82.5]} />
            <YuhanMap/>
            
            {/* 건물 오브젝트 배치 */}

            {/* 1호관 */}
            <B1 position={[66.35, 84.082, -69.278]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 2호관 */}
            <B2 position={[222, 71.427, -180]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
            <B2Enter position={[179, 76.427, -298.787]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />

            {/* 3호관 */}
            <B3 position={[-108.5, 72, -142.3]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 4호관 */}
            <B4 position={[249.5, 60, 248.3]} rotation={[Math.PI, 0, Math.PI]} />
            <B4Enter position={[220.8, 30, 182.6]} rotation={[Math.PI, 0, Math.PI]} />
            <B4Enter2 position={[225.2, 1, 129]} rotation={[Math.PI, 0, Math.PI]} />
            <B4Restaurant position={[211.6, 24, 308.4]} rotation={[Math.PI, 0, Math.PI]} />
            
            {/* 5호관 */}
            <B5 position={[13.651, 77.182, 121.584]} rotation={[0, 1.571, 0]} />
            <B5Pipe_L position={[-67.348, 78.431, 160.355]} rotation={[0, 1.571, 0]} />
            <B5Pipe_R position={[83.496, 84.734, 168.022]} rotation={[0, 1.571, 0]} />

            {/* 56호관 */}
            <B5_B6 position={[128.273, 86.249, 199.836]} rotation={[0, 0, 0]} />
            <B5_B6_Between_B position={[13.644, 12.767, 159.007]} rotation={[0, 0, 0]} />
            
            {/* 6호관 */}
            <B6 position={[12.86, 77.556, 271.937]} rotation={[0, -1.571, 0]} />
            <B6Pipe position={[12.736, 85.407, 232.529]} rotation={[0, -1.571, 0]} />

            {/* 7호관 */}
            <B7 position={[-341.439, 73.642, 182.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <B7_Enter1 position={[-263.439, 73.642, 192.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <B7_Enter2 position={[-263.439, 73.642, 107.681]} rotation={[Math.PI / 2, 0, Math.PI]} />
            <B7_EnterBlock position={[-274.439, 73.642, 192.681]} rotation={[Math.PI / 2, 0, Math.PI]} />

            {/* 8호관 */}
            <B8 position={[-380.0, 101, -186.3]} rotation={[-Math.PI, 0, -Math.PI]} />
            <B8Pipe_L position={[-377.9, 15, -90.8]} rotation={[-Math.PI, 0, -Math.PI]} />
            <B8Pipe_R position={[-325.4, 15, -90.5]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 9호관 */}
            <B9 position={[267.607, 66.181, 40.988]} rotation={[Math.PI, 0, Math.PI]} />
            <B9Enter position={[229.787, 0.475, 41.207]} rotation={[Math.PI, 0, Math.PI]} />
            <B9_Pipe_L position={[205.264, 30.402, 20.396]} rotation={[Math.PI, 0, Math.PI]} />
            <B9_Pipe_R position={[205.264, 30.402, 61.894]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 1 9호관 */}
            <B9_B1_Between_B position={[218.815, 75.494, -30.8]} rotation={[-Math.PI, 0, -Math.PI]} />

            {/* 인도 */}
            <SideWalk position={[126.747, -0.139, 70.783]} />
            
            {/* 투명벽 셋팅 */}
            <Wall position={[12, 51, -577.5]} />
            <Wall position={[12, 51, 412.5]} />
            <Wall position={[-543.5, 51, -90]} rotation={[0,  Math.PI / 2, 0]} />
            <Wall position={[566.5, 51, -90]} rotation={[0,  Math.PI / 2, 0]} />

        </group>
    )
}

export default RootMap