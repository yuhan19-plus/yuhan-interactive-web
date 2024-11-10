/**
 * 임성준
 * - 애니메이션 텍스트 보드
 */
import { Text, Text3D } from '@react-three/drei'
import React, { forwardRef } from 'react'

const TextBoard = forwardRef(({text, isNpc}, ref) => {
    const fontUrl = '/assets/fonts/HakgyoansimWoojuR.ttf'
    
    const fontStyle = {
        font: fontUrl,
        letterSpacing: 0.01,
        height: 0.3,
        lineHeight: 1,
        fontSize: isNpc ? 1.2 : 1,
    }

    return (
        <>
            <mesh ref={ref}>
                {/* <Text3D
                    {...fontStyle}
                    fontSize={isNpc ? 1 : 0.7}
                >
                    {text}
                    <meshStandardMaterial color={isNpc ? 0x000000 : 0xffffff} />
                </Text3D> */}
                <Text
                    {...fontStyle}
                    color={isNpc ? 0xF4CE3D : 0xffffff}
                >
                    {text}
                </Text>
            </mesh>
        </>
    )
})

export default TextBoard