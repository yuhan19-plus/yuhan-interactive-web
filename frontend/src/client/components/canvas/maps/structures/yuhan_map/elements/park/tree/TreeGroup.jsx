/**
 * 임성준
 */
import React from 'react'
import { TreeOne } from './TreeOne'
import { FlowerBed } from './FlowerBed'
import { BigForest } from './BigForest'
import { SmallForest } from './SmallForest'

const TreeGroup = () => {
    return (
        <>
            {/* 길거리 나무 */}
            <TreeOne position={[-91.358, 0.475, -7.105]} />
            <TreeOne position={[-3.355, 0.438, -7.105]} />
            <TreeOne position={[112.294, 0.438, -7.105]} />
            <FlowerBed position={[69.012, -2, -324.727]} rotation={[0, Math.PI / 2, 0]} />

            {/* 7호관 뒷 숲 */}
            <BigForest position={[-465.7, 34.7, 182]} />
            <SmallForest position={[-483.3, 28.9, 0]} />
        </>
    )
}

export default TreeGroup