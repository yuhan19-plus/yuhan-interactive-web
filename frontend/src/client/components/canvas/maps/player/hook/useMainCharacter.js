import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { SkeletonUtils } from "three-stdlib"
import { AnimationMixer, Vector3 } from "three"
import { useSelector } from "react-redux"
import gsap from "gsap"

export const useMainCharacter = ({position, myChar}) => {
    const btnValue = useSelector((state) => state.btnMenu)
    // console.log(btnValue.value)
    const aerialViewState = btnValue.value

    const { camera } = useThree()

    // 현재 플레이어의 이름을 가져옴
    const player = myChar.name // 값 : SJ
    const charRef = useRef(null)

    // 초기 목표 위치를 설정
    const [targetPosition, setTargetPosition] = useState(new Vector3(...position))

    const { scene, materials, animations } = useGLTF('/assets/models/character/MainCharacter.glb')
    // console.log(animations)
    
    // 씬을 복제하여 상태 변화로부터 안전하게 만듦
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    // 씬의 모든 노드를 얻음 (모델의 각 파트를 개별적으로 제어 가능)
    const objectMap = useGraph(clone)
    const nodes = objectMap.nodes

    // AnimationMixer 생성 (애니메이션을 제어하는 클래스)
    const mixer = useMemo(() => new AnimationMixer(clone), [clone])

    // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
    const [animation, setAnimation] = useState('Stand')

    const actions = useMemo(() => {
        return animations.reduce((acc, clip) => {
            acc[clip.name] = mixer.clipAction(clip) // 애니메이션 클립에 대한 액션 생성
            return acc
        }, {})
    }, [animations, mixer])

    useEffect(() => {
        if (actions[animation]) {
            actions[animation].reset().fadeIn(0.1).play() // 선택된 애니메이션 재생
        }
        return () => {
            if (actions[animation]) {
                actions[animation].fadeOut(0.1)
            }
        }
    }, [animation, actions])

    // 처음 렌더링 시 초기 위치를 설정
    useEffect(() => {
        if (charRef.current) {
            charRef.current.position.set(...position)
        }
    }, [])

    // 목표 위치가 변경되면 캐릭터 이동 시작
    useEffect(() => {
        if (position) {
            setTargetPosition(new Vector3(...position))
        }
    }, [position])

    useEffect(() => {
        if(aerialViewState) {
            gsap.to(camera.position, {
                x: 0,
                y: 500,
                z: -300,
                duration: 1,
                ease: 'power2.inOut'
            })
        }
    }, [aerialViewState, camera])

    useFrame(({ camera }) => {
        if (!player || !charRef.current || !targetPosition) return

        if(aerialViewState) {
            return
        } else {
            const currentPosition = charRef.current.position
            const distance = currentPosition.distanceTo(targetPosition)
    
            // 카메라 설정 부분
            const handleCamera = (x, y, z) => {
                // console.log(x, y, z)
                camera.position.set(x, y, z)
                // gsap.to(camera.position, {
                //     x: x,
                //     y: y,
                //     z: z,
                //     duration: 0.01,
                //     ease: 'power2.inOut',
                //     onUpdate: () => {
                //         camera.updateProjectionMatrix() // 카메라 업데이트
                //     }
                // })
            }
            // const handleGetXYZ = (x, y, z) => {
            //     const newX = gsap.getProperty(camera.position, 'x') + x
            //     const newY = gsap.getProperty(camera.position, 'y') + y
            //     const newZ = gsap.getProperty(camera.position, 'z') + z

            //     handleCamera(newX, newY, newZ)
            // }
            
            handleCamera(currentPosition.x + 130, currentPosition.y + 400, currentPosition.z - 150)

            // Start Zone
            if(currentPosition.x <= 285 && currentPosition.x >= 275) {
                if(currentPosition.z >= -360 && currentPosition.z <= -350) {
                    // console.log('Start Zone')
                    handleCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z + 100)
                    // gsap.to({}, {
                    //     duration: 0.5,
                    //     ease: 'power2.inOut',
                    //     onUpdate: () => {
                    //         handleGetXYZ(0, 50, 100)
                    //     },
                    //     onComplete: () => {
                    //         // 애니메이션 완료 후 최종 위치 설정
                    //         handleCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z + 100);
                    //     }
                    // })
                }
            }

            // Bus Zone
            if(currentPosition.x <= 302 && currentPosition.x >= 282) {
                if(currentPosition.z >= -168 && currentPosition.z <= -148) {
                    handleCamera(currentPosition.x + 50, currentPosition.y + 50, currentPosition.z + 0)
                    // gsap.to({}, {
                    //     duration: 0.5,
                    //     ease: 'power2.inOut',
                    //     onUpdate: () => {
                    //         handleGetXYZ(50, 50, 0)
                    //     },
                    //     onComplete: () => {
                    //         // 애니메이션 완료 후 최종 위치 설정
                    //         handleCamera(currentPosition.x + 50, currentPosition.y + 50, currentPosition.z + 0);
                    //     }
                    // })
                }
            }
            if(currentPosition.x <= 512 && currentPosition.x >= 492) {
                if(currentPosition.z >= -247 && currentPosition.z <= -237) {
                    handleCamera(currentPosition.x + -50, currentPosition.y + 50, currentPosition.z + 0)
                }
            }

            // 학생식당 가는 길목
            if(currentPosition.x >= -128 && currentPosition.x <= 147) {
                if(currentPosition.z >= -28  && currentPosition.z <= 80){
                    handleCamera(currentPosition.x - 180, currentPosition.y + 100, currentPosition.z + 0)
                    // 나눔관 키오스크
                    if((currentPosition.x >= 22 && currentPosition.x <= 44) &&
                        (currentPosition.z >= 57  && currentPosition.z <= 77)) {
                            handleCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z - 50)
                        }
                    // 평화관 키오스크
                    if((currentPosition.x >= 26 && currentPosition.x <= 46) &&
                        (currentPosition.z >= -15  && currentPosition.z <= 5)) {
                            handleCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z + 50)
                        }
                }
            }
            
            // 9호관 & 학생식당 앞
            if(currentPosition.x > 147 && currentPosition.x <= 224) {
                if(currentPosition.z >= -28 && currentPosition.z < 285) {
                    handleCamera(currentPosition.x + 30, currentPosition.y + 200, currentPosition.z - 20)

                    // 학생식당 키오스크
                    if((currentPosition.x >= 182 && currentPosition.x <= 202) &&
                        (currentPosition.z >= 138  && currentPosition.z <= 158)) {
                            handleCamera(currentPosition.x - 30, currentPosition.y + 50, currentPosition.z + 10)
                        }
                }
            }
            
            if(currentPosition.x <= 150 && currentPosition.z > 120) {
                if(currentPosition.x > -240) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z - 180)
                }
                if(currentPosition.x > -170) {
                    handleCamera(currentPosition.x - 50, currentPosition.y + 100, currentPosition.z + 0)
                    // 창조관 키오스크
                    if((currentPosition.x >= -175 && currentPosition.x <= -155) &&
                        (currentPosition.z >= 254  && currentPosition.z <= 274)) {
                            handleCamera(currentPosition.x - 40, currentPosition.y + 40, currentPosition.z + 0)
                        }
                }
            }

            // 공원
            if(currentPosition.z <= 120 && currentPosition.z > -130) {
                if(currentPosition.x < -128 && currentPosition.x > -270) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 130, currentPosition.z + 100)
                    // 유일한기념관 키오스크
                    if((currentPosition.x >= -248 && currentPosition.x <= -228) &&
                        (currentPosition.z >= 84  && currentPosition.z <= 104)) {
                            handleCamera(currentPosition.x + 50, currentPosition.y + 50, currentPosition.z + 0)
                        }
                }
                if(currentPosition.x <= -270) {
                    // console.log('??')
                    handleCamera(currentPosition.x + 100, currentPosition.y + 100, currentPosition.z + 0)
                    if((currentPosition.x <= -289 && currentPosition.x >= -309) &&
                        (currentPosition.z <= -65 && currentPosition.z >= -85)) {
                            handleCamera(currentPosition.x + 0, currentPosition.y + 70, currentPosition.z + 40)
                        }
                }
            }

            // 3호관 8호관 사이
            if(currentPosition.x < -128 && currentPosition.x > -270) {
                if(currentPosition.z < -60 && currentPosition.z > -270) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z + 180)
                    // 자유관 키오스크
                    if((currentPosition.x >= -181 && currentPosition.x <= -161) &&
                        (currentPosition.z <= -224 && currentPosition.z <= -224)) {
                            handleCamera(currentPosition.x -50, currentPosition.y + 50, currentPosition.z + 0)
                        }
                }
                if(currentPosition.z <= -270) {
                    handleCamera(currentPosition.x + 180, currentPosition.y + 300, currentPosition.z - 180)
                }
            }

            // Welcome 존 앞
            if(currentPosition.z < -260) {
                if(currentPosition.x < -230) {
                    handleCamera(currentPosition.x + 400, currentPosition.y + 200, currentPosition.z + 0)
                }
            }

            // 유한TV Zone
            if(currentPosition.x > -230 && currentPosition.x < -80) {
                if(currentPosition.z < -430) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 40, currentPosition.z + 230)
                }
            }

            // 나눔의 숲 큰 입구
            if(currentPosition.x >= -128 && currentPosition.x < -30) {
                if(currentPosition.z < -254 && currentPosition.z > -340){
                    handleCamera(currentPosition.x - 180, currentPosition.y + 250, currentPosition.z - 150)
                }
            }

            // 나눔의 숲 1사분면, 2사분면
            if(currentPosition.z <= -102 && currentPosition.z >= -200) {
                if(currentPosition.x >= -69 && currentPosition.x <= 58) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z - 50)
                    // 평화관 키오스크
                    if((currentPosition.x <= 35 && currentPosition.x >= 15) &&
                        (currentPosition.z <= -126 && currentPosition.z >= -146)) {
                            handleCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z -50)
                    }

                }
                if(currentPosition.x > 58 && currentPosition.x <= 190) {
                    handleCamera(currentPosition.x - 50, currentPosition.y + 100, currentPosition.z - 50)
                }
            }
            
            // 나눔의 숲 3사분면, 4사분면(4-1, 4-2)
            if(currentPosition.z < -200 && currentPosition.z >= -320) {
                if(currentPosition.x > 58 && currentPosition.x <= 190) {
                    // console.log('??')
                    handleCamera(currentPosition.x - 50, currentPosition.y + 100, currentPosition.z + 50)
                    if((currentPosition.x <= 175 && currentPosition.x >= 155) &&
                        (currentPosition.z >= -211 && currentPosition.z <= -191)) {
                            handleCamera(currentPosition.x - 50, currentPosition.y + 70, currentPosition.z + 0)
                        }
                }
                if(currentPosition.x >= -69 && currentPosition.x < -30) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z - 180)
                }
                if(currentPosition.x >= -30 && currentPosition.x <= 58) {
                    // 흡연구역 이벤트 발생 지역
                    handleCamera(currentPosition.x - 150, currentPosition.y + 100, currentPosition.z - 120)
                }
            }

            // 학교입구, 유한TV, 나눔의 숲 입구, Welcome Zone 사이
            if(currentPosition.z <= -340) {
                if(currentPosition.x >= -128 && currentPosition.x <= -30) {
                    handleCamera(currentPosition.x - 180, currentPosition.y + 350, currentPosition.z + 180)
                }
            }

            // 학교입구
            if(currentPosition.x > -30 && currentPosition.x <= 245) {
                if(currentPosition.z < -337) {
                    // console.log(currentPosition)
                    handleCamera(currentPosition.x + 180, currentPosition.y + 230, currentPosition.z + 0)
                }
                // 동상 Zone
                if(currentPosition.x <= 49 && currentPosition.x >= 29) {
                    if(currentPosition.z <= -507 && currentPosition.z >= -527) {
                        handleCamera(currentPosition.x + 110, currentPosition.y + 30, currentPosition.z + 110)
                    }
                }
            }

            camera.lookAt(currentPosition)
            // console.log(camera)
            // console.log('distance', distance)
            // console.log('currentPosition', currentPosition)
            // console.log('targetPosition', targetPosition)
        
            if (distance > 0.4) {
                // 방향을 구하고 스칼라를 곱하여 이동량을 설정
                const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize().multiplyScalar(0.5)
        
                // 현재 위치에 방향을 더해 새로운 위치를 설정
                currentPosition.add(direction)

                // 물리 엔진에서 캐릭터의 위치를 업데이트
                charRef.current.position.copy(currentPosition)
        
                // 캐릭터가 이동 방향을 바라보도록 설정
                charRef.current.lookAt(targetPosition)
        
                setAnimation('WalkSpeed24')
            } else {
                setAnimation('Stand')
            }
            mixer.update(0.01)
        }
    })
    return { nodes, materials, charRef }
}