/**
 * 임성준
 * - 기타 오브젝트 그룹 생성
 */
import React from 'react'
import { BasketballHoop } from './etc/BasketballHoop'
import { Statue } from './etc/Statue'
import { Wire_Netting } from './etc/Wire_Netting'
import { YuhanEntrance } from './etc/YuhanEntrance'
import { SideWalk } from './road/SideWalk'
import MainPark from './park/MainPark'
import SubPark from './park/SubPark'
import { YuhanTV } from './yuhanTv/YuhanTV'
import Welcome from './etc/Welcome'

const EtcGroup = () => {

    return (
        <>
            {/* 유한대 Welcome */}
            {/* <Welcome /> */}

            {/* 농구골대 */}
            <BasketballHoop position={[136.195, 0, -237.254]} />
            <BasketballHoop position={[80.195, 0, -237.254]} rotation={[0, Math.PI, 0]} />

            {/* 입구 */}
            <YuhanEntrance position={[227.941, 31.653, -391.413]} />
            <YuhanEntrance position={[225.126, 31.653, -507.304]} rotation={[Math.PI, 0, Math.PI]} />

            {/* 동상 */}
            <Statue position={[-480, 30, -500]} rotation={[0, Math.PI / 2.7, 0]} scale={26} />

            {/* 철조망 */}
            <Wire_Netting position={[50.639, 6.42, 395.918]} rotation={[Math.PI / 2, 0, 0]} />

            {/* 바리게이트 */}
            {/* <NoEntry position={[-460, -9, -97]} rotation={[0, Math.PI / 2, 0]} scale={1.7} /> */}

            {/* 인도 */}
            <SideWalk position={[-0.5, -6.6, 0]} />

            {/* 공원 */}
            <MainPark />
            <SubPark />

            {/* 유한TV */}
            <YuhanTV position={[-125, 45, -557.49]} rotation={[0,0,0]}/>
        </>
    );
};

export default EtcGroup;
