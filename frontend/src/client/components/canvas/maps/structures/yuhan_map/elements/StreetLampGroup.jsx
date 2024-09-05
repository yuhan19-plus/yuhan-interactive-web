/*
* 오자현 (24/08/28)
* 가로등 그룹화
*/ 

import React from 'react'
import { Street_lamp } from './etc/Street_lamp'

const StreetLampGroup = () => {
    return (
        <>
            <Street_lamp position={[20, 0.225, 7.5]} />
            <Street_lamp position={[70, 0, -190]} />
            <Street_lamp position={[-165.05, 0.225, 104.2]} />
        </>
    )
}

export default StreetLampGroup