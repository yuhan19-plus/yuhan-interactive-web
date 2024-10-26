/**
 * 임성준
 * - 테라스 오브젝트 그룹화
 */
import React from 'react'
import { TerraceObjectSmall } from './terrace/TerraceObjectSmall'
import { TerraceObjectBig } from './terrace/TerraceObjectBig'

const TerraceGroup = () => {
    return (
        <>
            <TerraceObjectSmall position={[-24.238, 0.5, 165.576]} />
            <TerraceObjectSmall position={[-24.238, 0.5, 191.617]} />
            <TerraceObjectSmall position={[-11.374, 0.5, 165.576]} />
            <TerraceObjectSmall position={[-11.374, 0.5, 191.617]} />
            <TerraceObjectBig position={[-68.087, 3, 200.422]} />
            <TerraceObjectBig position={[-68.087, 3, 231.193]} />
        </>
    )
}

export default TerraceGroup