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
            
            
        </>
    )
}

export default SmokingGroup