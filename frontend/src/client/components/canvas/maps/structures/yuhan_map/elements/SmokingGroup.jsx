import React from 'react'
import { SmokingArea } from './etc/SmokingArea'
import { SmokingBooth } from './etc/SmokingBooth'

const SmokingGroup = () => {
    return (
        <>
            {/* 지상 흡연 구역 */}
            <SmokingArea position={[41.672, 23.001, -284.431]} rotation={[Math.PI, 0, 0]} scale={[2.268, 18.224, 2.041]} />
            <SmokingBooth position={[131.979, 13.277, -125.014]}/>
            {/* 옥상 흡연 구역 */}
            <SmokingArea position={[150, 155, -70]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[220, 155, -120]} rotation={[Math.PI, Math.PI/2, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[100, 173, 125]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[12, 185, 230]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[-310, 166.5, 125]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
        </>
    )
}

export default SmokingGroup