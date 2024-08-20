/** 파일 생정자 : 임성준
 * 나무 흡연장 등 배치하는 곳
 */

import React from 'react'
import { Park1 } from './structures/yuhan_map/elements/building/Park1'
import { Park1_B1 } from './structures/yuhan_map/elements/building/Park1_B1'
import { Park1_B2 } from './structures/yuhan_map/elements/building/Park1_B2'
import { Park1_T1 } from './structures/yuhan_map/elements/building/Park1_T1'
import { Park1_T2 } from './structures/yuhan_map/elements/building/Park1_T2'
import { Park1_T3 } from './structures/yuhan_map/elements/building/Park1_T3'
import { Park1_T4 } from './structures/yuhan_map/elements/building/Park1_T4'
import { Park1_T5 } from './structures/yuhan_map/elements/building/Park1_T5'
import { Park1_T6 } from './structures/yuhan_map/elements/building/Park1_T6'
import { Park1_T7 } from './structures/yuhan_map/elements/building/Park1_T7'

import { Park2 } from './structures/yuhan_map/elements/building/Park2'
import { Park2_T1 } from './structures/yuhan_map/elements/building/Park2_T1'
import { Park2_T2 } from './structures/yuhan_map/elements/building/Park2_T2'
import { Park2_T3 } from './structures/yuhan_map/elements/building/Park2_T3'
import { Park2_T4 } from './structures/yuhan_map/elements/building/Park2_T4'
import { Park2_T5 } from './structures/yuhan_map/elements/building/Park2_T5'
import { Park2_T6 } from './structures/yuhan_map/elements/building/Park2_T6'
import { Park2_T7 } from './structures/yuhan_map/elements/building/Park2_T7'
import { Park2_T8 } from './structures/yuhan_map/elements/building/Park2_T8'

import { GrassAndTree } from './structures/yuhan_map/elements/building/GrassAndTree'
import { SideWalk_T1 } from './structures/yuhan_map/elements/building/SideWalk_T1'
import { SideWalk_T2 } from './structures/yuhan_map/elements/building/SideWalk_T2'
import { SideWalk_T3 } from './structures/yuhan_map/elements/building/SideWalk_T3'

import { Kiosk1 } from './structures/yuhan_map/elements/building/Kiosk1'
import { Kiosk2 } from './structures/yuhan_map/elements/building/Kiosk2'
import { Kiosk3 } from './structures/yuhan_map/elements/building/Kiosk3'
import { Kiosk4 } from './structures/yuhan_map/elements/building/Kiosk4'
import { Kiosk5 } from './structures/yuhan_map/elements/building/Kiosk5'
import { Kiosk6 } from './structures/yuhan_map/elements/building/Kiosk6'
import { Kiosk7 } from './structures/yuhan_map/elements/building/Kiosk7'
import { Kiosk8 } from './structures/yuhan_map/elements/building/Kiosk8'
import { Kiosk9 } from './structures/yuhan_map/elements/building/Kiosk9'

import { BusStation1 } from './structures/yuhan_map/elements/building/BusStation1'
import { BusStation2 } from './structures/yuhan_map/elements/building/BusStation2'
import { CT1_1 } from './structures/yuhan_map/elements/building/CT1_1'
import { CT1_2 } from './structures/yuhan_map/elements/building/CT1_2'
import { CT1_3 } from './structures/yuhan_map/elements/building/CT1_3'
import { CT1_4 } from './structures/yuhan_map/elements/building/CT1_4'
import { CT1_5 } from './structures/yuhan_map/elements/building/CT1_5'
import { CT1_6 } from './structures/yuhan_map/elements/building/CT1_6'
import { CT2_1 } from './structures/yuhan_map/elements/building/CT2_1'
import { CT2_2 } from './structures/yuhan_map/elements/building/CT2_2'

import { Enter_L } from './structures/yuhan_map/elements/building/Enter_L'
import { Enter_R } from './structures/yuhan_map/elements/building/Enter_R'

import { SmokingArea } from './structures/yuhan_map/elements/building/SmokingArea'
import { SmokingBooth } from './structures/yuhan_map/elements/building/SmokingBooth'
import { Statue } from './structures/yuhan_map/elements/building/Statue'
import { Wire_Netting } from './structures/yuhan_map/elements/building/Wire_Netting'


const GroundElements = () => {
    return (
        <group>
        {/* 123 호관 공원 */}
        <Park1 position={[63.195, 0, -203.254]}/>
        <Park1_B1 position={[136.195, 0, -237.254]} />
        <Park1_B2 position={[80.195, 0, -237.254]} />
        <Park1_T1 position={[23.195, 0, -237.254]} />
        <Park1_T2 position={[-0.195, 0, -192.254]} />
        <Park1_T3 position={[33.195, 0, -203.254]} />
        <Park1_T4 position={[38.195, 0, -173.254]} />
        <Park1_T5 position={[88.195, 0, -173.254]} />
        <Park1_T6 position={[113.195, 0, -193.254]} />
        <Park1_T7 position={[61.195, 0, -205.254]} />

        {/* 7 8 호관 공원 */}
        <Park2 position={[-360.743, 0, 6.593]}/>
        <Park2_T1 position={[-348.221, 24.792, -26.805]}/>
        <Park2_T2 position={[-313.936, 17.834, -15.873]}/>
        <Park2_T3 position={[-320.533, 27.045, 14.808]} />
        <Park2_T4 position={[-341.572, 45.601, 35.167]} />
        <Park2_T5 position={[-386.438, 21.772, 40.777]} />
        <Park2_T6 position={[-396.531, 22.835, -2.079]} />
        <Park2_T7 position={[-415.802, 32.105, -25.245]} />
        <Park2_T8 position={[-366.259, 32.947, 1.186]} />

        {/* 길거리 나무 */}
        <SideWalk_T1 position={[-91.358, 4.475, -7.105]} />
        <SideWalk_T2 position={[-3.355, 4.438, -7.105]} />
        <SideWalk_T3 position={[112.294, 4.438, -7.105]} />
        <GrassAndTree position={[69.012, 2.099, -324.727]} rotation={[0, Math.PI / 2, 0]} />

        {/* 키오스크 */}
        <Kiosk1 position={[37.031, 7.1, -18.57]} rotation={[Math.PI / 2, 0, 0]} />
        <Kiosk2 position={[180.605, 7.1, -200.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
        <Kiosk3 position={[-160.605, 7.1, -234.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
        <Kiosk4 position={[201.605, 7.1, 148.919]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
        <Kiosk5 position={[37.031, 7.1, 80.138]} rotation={[Math.PI / 2, 0, Math.PI]} />
        <Kiosk6 position={[-15.873, 5.714, 319.606]} rotation={[Math.PI / 2, 0, 0]} />
        <Kiosk7 position={[-250.605, 5.899, 93.924]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
        <Kiosk8 position={[-301.246, 5.899, -86.629]} rotation={[Math.PI / 2, 0, 0]} />
        <Kiosk9 position={[26.272, 5.899, -120.724]} rotation={[Math.PI / 2, 0, Math.PI]} />

        {/* 테라스 오브젝트 */}
        <CT1_1 position={[-37.949, 4.666, 165.576]} />
        <CT1_2 position={[-37.949, 4.666, 191.617]} />
        <CT1_3 position={[-24.238, 4.666, 165.576]} />
        <CT1_4 position={[-24.238, 4.666, 191.617]} />
        <CT1_5 position={[-11.374, 4.666, 165.576]} />
        <CT1_6 position={[-11.374, 4.666, 191.617]} />
        <CT2_1 position={[-68.087, 7.741, 200.422]} />
        <CT2_2 position={[-68.087, 7.741, 231.193]} />

        {/* 입구 */}
        <Enter_L position={[227.941, 36.653, -391.413]}/>
        <Enter_R position={[225.126, 36.653, -507.304]} rotation={[Math.PI, 0, Math.PI]}/>

        {/* 동상 */}
        <Statue position={[9.782, 20.316, -557.29]} />

        {/* 철조망 */}
        <Wire_Netting position={[50.639, 10.339, 395.918]} rotation={[Math.PI / 2, 0, 0]} />

        {/* 흡연 부스 및 흡연 구역 */}
        <SmokingArea position={[41.672, 23.001, -284.431]} rotation={[Math.PI, 0, 0]} />
        <SmokingBooth position={[131.979, 13.277, -125.014]}/>

        {/* 버스정류장 */}
        <BusStation1 position={[271.453, 9.959, -163.289]}/>
        <BusStation2 position={[526.536, 9.408, -235.881]} rotation={[Math.PI, 0, Math.PI]}/>

        </group>
    )
}

export default GroundElements