import React from 'react'
import { SmokingArea } from './etc/SmokingArea'
import { SmokingBooth } from './etc/SmokingBooth'

const SmokingGroup = () => {
    return (
        <>
            {/* 지상 흡연 구역 */}
            <SmokingArea position={[41.672, 19.301, -284.431]} rotation={[Math.PI, 0, 0]} scale={[2.268, 18.224, 2.041]} />
            <SmokingBooth position={[131.979, 9.577, -125.014]}/>
            {/* 옥상 흡연 구역 */}
            <SmokingArea position={[150, 151.3, -70]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[220, 151.3, -120]} rotation={[Math.PI, Math.PI/2, 0]} scale={[1.5, 13, 1.5]} />
            
            <SmokingArea position={[100, 168, 125]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            
            <SmokingArea position={[12, 180.5, 230]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
            <SmokingArea position={[-310, 161.5, 125]} rotation={[Math.PI, 0, 0]} scale={[1.5, 13, 1.5]} />
        </>
    )
}

export default SmokingGroup