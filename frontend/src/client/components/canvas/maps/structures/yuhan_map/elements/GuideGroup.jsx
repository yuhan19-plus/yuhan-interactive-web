import React from 'react'
import { useSelector } from 'react-redux'
import { Arrow } from '../../common/Arrow'
import { Text3D } from '@react-three/drei'
import { FONT_URL } from '../../../../../../../data/commonData'
import { motion } from 'framer-motion-3d'

const GuideGroup = () => {
    
    const aerialViewState = useSelector((state) => state.btnMenu)
    const aerialViewValue =  aerialViewState.value
    const aerialViewName = aerialViewState.btnMenuName

    const fontStyle = {
        font: FONT_URL,
        letterSpacing: 0.01,
        height: 5, // 텍스트 두께
        lineHeight: 1,
        fontSize: 1,
    }

    return (
        <>
            {/* 가이드 뷰일 경우 */}
            {
                (aerialViewValue && aerialViewName === 'campusGuideView') && (
                    <>
                        {/* 1호관 */}
                        <motion.group
                            position={[66.35, 260, -69.278]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        평화관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        평화관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        평화관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        평화관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[66.35, 180, -69.278]} scale={15} />

                        {/* 2호관 */}
                        <motion.group
                            position={[222, 260, -180]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        봉사관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        봉사관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        봉사관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        봉사관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[222, 180, -180]} scale={15} />

                        {/* 3호관 */}
                        <motion.group
                            position={[-108.5, 260, -142.3]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        자유관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        자유관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        자유관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        자유관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[-108.5, 180, -142.3]} scale={15} />

                        {/* 4호관 */}
                        <motion.group
                            position={[249.5, 230, 248.3]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-43, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        학생회관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -43]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        학생회관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 43]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        학생회관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[43, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        학생회관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>   
                        <Arrow position={[249.5, 150, 248.3]} scale={15} />

                        {/* 5호관 */}
                        <motion.group
                            position={[13.651, 260, 121.584]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[13.651, 180, 121.584]} scale={15} />

                        {/* 6호관 */}
                        <motion.group
                            position={[12.86, 260, 271.937]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        창조관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        창조관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        창조관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        창조관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[12.86, 180, 271.937]} scale={15} />

                        {/* 7호관 */}
                        <motion.group
                            position={[-341.439, 260, 182.681]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 80, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-33, -10, 47]}>
                                    <group position-y={15}>
                                        <Text3D size={20} {...fontStyle}>
                                            유일한
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                    <group position-y={-15}>
                                        <Text3D size={20} {...fontStyle}>
                                            기념관
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                </group>
                                <group position={[-47, -10, -33]} rotation={[0, Math.PI / -2, 0]}>
                                    <group position-y={15}>
                                        <Text3D size={20} {...fontStyle}>
                                            유일한
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                    <group position-y={-15}>
                                        <Text3D size={20} {...fontStyle}>
                                            기념관
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                </group>
                                <group position={[47, -10, 33]} rotation={[0, Math.PI / 2, 0]}>
                                    <group position-y={15}>
                                        <Text3D size={20} {...fontStyle}>
                                            유일한
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                    <group position-y={-15}>
                                        <Text3D size={20} {...fontStyle}>
                                            기념관
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                </group>
                                <group position={[33, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <group position-y={15}>
                                        <Text3D size={20} {...fontStyle}>
                                            유일한
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                    <group position-y={-15}>
                                        <Text3D size={20} {...fontStyle}>
                                            기념관
                                            <meshStandardMaterial color={'white'} />
                                        </Text3D>
                                    </group>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[-341.439, 180, 182.681]} scale={15} />

                        {/* 8호관 */}
                        <motion.group
                            position={[-380.0, 350, -186.3]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-43, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        유재라관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -43]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        유재라관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 43]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        유재라관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[43, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        유재라관
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[-380.0, 280, -186.3]} scale={15} />

                        {/* 9호관 */}
                        <motion.group
                            position={[267.607, 230, 40.988]}
                            animate={{
                                scale: [0.5, 0.7, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <mesh>
                                <boxGeometry args={[100, 40, 100]} />
                                <meshStandardMaterial color={'#0A2241'} />
                                <group position={[-43, -10, 47]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔의문
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[-47, -10, -43]} rotation={[0, Math.PI / -2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔의문
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[47, -10, 43]} rotation={[0, Math.PI / 2, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔의문
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                                <group position={[43, -10, -47]} rotation={[0, Math.PI, 0]}>
                                    <Text3D size={20} {...fontStyle}>
                                        나눔의문
                                        <meshStandardMaterial color={'white'} />
                                    </Text3D>
                                </group>
                            </mesh>
                        </motion.group>
                        <Arrow position={[267.607, 150, 40.988]} scale={15} />
                    </>
                )
            }
        </>
    )
}

export default GuideGroup