import { Text3D } from '@react-three/drei'
import React from 'react'
import { motion } from 'framer-motion-3d'
import { useSelector } from 'react-redux'

const DeptNameObject = ({groundMapName, positionOne, positionTwo , ...props}) => {
    const fontUrl = 'assets/fonts/HakgyoansimWoojuR.json'
    const fontStyle = {
        font: fontUrl,
        letterSpacing: 0.01,
        height: 2,
        lineHeight: 1,
        fontSize: 1
    }

    return (
        <>
            <motion.group
                position={positionOne}
                animate={{
                    scale: [0, 1]
                }}
                transition={{
                    delay: 0.3,
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                {...props}
            >
                {groundMapName === 'computer_sw_map' && (
                    <Text3D size={8} {...fontStyle}>
                        IT 융복합 시대를 선도하는 컴퓨터소프트웨어공학과
                        <meshStandardMaterial color={'white'} />
                    </Text3D>
                )}
            </motion.group>
            <motion.group
                position={positionTwo}
                animate={{
                    scale: [0, 1]
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                {...props}
            >
                {groundMapName === 'computer_sw_map' && (
                    <Text3D size={8} {...fontStyle}>
                        컴퓨터소프트웨어공학전공
                        <meshStandardMaterial color={'white'} />
                    </Text3D>
                )}
            </motion.group>
            <motion.group
                position={[248, 50, -200]}
                rotation={[0, Math.PI / -2, 0]}
                animate={{
                    scale: [0, 1]
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                {...props}
            >
                {groundMapName === 'computer_sw_map' && (
                    <Text3D size={8} {...fontStyle}>
                            가자~ 소프트웨어 개발자의 꿈을 찾아서~
                        <meshStandardMaterial color={'white'} />
                    </Text3D>
                )}
            </motion.group>
        </>
    )
}

export default DeptNameObject

// 

//                      

//                     