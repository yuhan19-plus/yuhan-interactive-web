import { Cloud } from '@react-three/drei'
import React from 'react'

const Clouds = ({position}) => {
    return (
        <group position={position}>
            <Cloud
                opacity={0.4}
                speed={0.5}
                width={1000000}
                depth={1000000}
                segments={1000}
                color="white"
            />
            <Cloud
                position-x={5}
                opacity={0.4}
                speed={0.5}
                width={1000000}
                depth={1000000}
                segments={1000}
                color="white"
            />
            <Cloud
                position-x={10}
                opacity={0.4}
                speed={0.5}
                width={1000000}
                depth={1000000}
                segments={1000}
                color="white"
            />
            <Cloud
                position-x={3}
                position-z={5}
                opacity={0.4}
                speed={0.5}
                width={1000000}
                depth={1000000}
                segments={1000}
                color="white"
            />
            <Cloud
                position-x={6}
                position-z={-3}
                opacity={0.4}
                speed={0.5}
                width={1000000}
                depth={1000000}
                segments={1000}
                color="white"
            />
        </group>
    )
}

export default Clouds