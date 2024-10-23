import React from 'react'
import { GalleryBoard } from './Galleryboard'
import { Zone } from '../etc/Zone'

const GalleryGroup = () => {
    return (
        <>
             {/* 갤러리 보드 */}
            <GalleryBoard position={[-180, 13, 170]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            <GalleryBoard position={[-180, 18, 100]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            <GalleryBoard position={[-180, 13, 30]} rotation={[0, Math.PI / 2, 0]} scale={6} />
            
             {/* 존(가로, 세로(왼쪽), 세로(오른쪽) 순서) */}
             {/* 3등 작품 */}
            <Zone position={[-140, -25, 155]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 191]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 150]} rotation={[0, Math.PI * -2, 0]} scale={5} />

            {/* // 1등 작품 */}
            <Zone position={[-140, -25, 85]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 121]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 80]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            
            {/* // 2등 작품 */}
            <Zone position={[-140, -25, 15]} rotation={[0, Math.PI / -2, 0]} scale={5} />
            <Zone position={[-135, -25, 52]} rotation={[0, Math.PI * -2, 0]} scale={5} />
            <Zone position={[-135, -25, 10]} rotation={[0, Math.PI * -2, 0]} scale={5} />

        </>

    )
}

export default GalleryGroup