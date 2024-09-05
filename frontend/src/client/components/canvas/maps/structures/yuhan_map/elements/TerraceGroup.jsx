/**
 * 임성준
 */
import React from 'react'
import { TerraceObjectSmall } from './terrace/TerraceObjectSmall'
import { TerraceObjectBig } from './terrace/TerraceObjectBig'

const TerraceGroup = () => {
    return (
        <>
            <TerraceObjectSmall position={[-24.238, 0.25, 165.576]} />
            <TerraceObjectSmall position={[-24.238, 0.25, 191.617]} />
            <TerraceObjectSmall position={[-11.374, 0.25, 165.576]} />
            <TerraceObjectSmall position={[-11.374, 0.25, 191.617]} />
            <TerraceObjectBig position={[-68.087, 2.75, 200.422]} />
            <TerraceObjectBig position={[-68.087, 2.75, 231.193]} />
        </>
    )
}

export default TerraceGroup