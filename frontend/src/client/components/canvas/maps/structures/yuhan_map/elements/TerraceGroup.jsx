/**
 * 임성준
 */
import React from 'react'
import { TerraceObjectSmall } from './terrace/TerraceObjectSmall'
import { TerraceObjectBig } from './terrace/TerraceObjectBig'

const TerraceGroup = () => {
    return (
        <>
            <TerraceObjectSmall position={[-37.949, 4, 165.576]} />
            <TerraceObjectSmall position={[-37.949, 4, 191.617]} />
            <TerraceObjectSmall position={[-24.238, 4, 165.576]} />
            <TerraceObjectSmall position={[-24.238, 4, 191.617]} />
            <TerraceObjectSmall position={[-11.374, 4, 165.576]} />
            <TerraceObjectSmall position={[-11.374, 4, 191.617]} />
            <TerraceObjectBig position={[-68.087, 6.5, 200.422]} />
            <TerraceObjectBig position={[-68.087, 6.5, 231.193]} />
        </>
    )
}

export default TerraceGroup