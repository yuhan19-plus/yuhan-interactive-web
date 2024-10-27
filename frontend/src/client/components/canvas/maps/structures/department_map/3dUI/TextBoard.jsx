import { Text, Text3D } from '@react-three/drei'
import React, { forwardRef } from 'react'

const TextBoard = forwardRef(({text, isNpc}, ref) => {
    // const fontUrl = 'assets/fonts/HakgyoansimWoojuR.json'
    
    // const fontStyle = {
    //     font: fontUrl,
    //     letterSpacing: 0.01,
    //     height: 0.3,
    //     lineHeight: 1,
    //     fontSize: isNpc ? 1 : 0.7,
    // }

    return (
        <mesh ref={ref}>
            {/* <Text3D
                {...fontStyle}
                fontSize={isNpc ? 1 : 0.7}
            >
                {text}
                <meshStandardMaterial color={isNpc ? 0x000000 : 0xffffff} />
            </Text3D> */}
            <Text
                font='/assets/fonts/HakgyoansimWoojuR.ttf'
                fontSize={isNpc ? 1 : 0.7}
                color={isNpc ? 0xF4CE3D : 0xEF7421}
            >
                {text}
            </Text>
        </mesh>
    )
})

export default TextBoard