import React from 'react'

const EventArea = ({position}) => {
    return (
        <>
            {/* PointLight 추가 (색상, 강도, 거리, 감쇠) */}
            <pointLight color="gold" intensity={100} distance={100} decay={1} position={position} castShadow />
        </>
    )
}

export default EventArea