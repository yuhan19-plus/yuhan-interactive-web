import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { SkeletonUtils } from "three-stdlib"
import { AnimationMixer, Vector3 } from "three"

export const useMainCharacter = ({position, myChar}) => {
    // console.log(position, myChar)
    // 현재 플레이어의 이름을 가져옴
    const player = myChar.name // 값 : SJ
    const charRef = useRef(null)

    // const [charRef, charApi] = useCompoundBody(() => ({
    //     position,
    //     mass: 10,
    //     type: 'Kinematic',
    //     shapes: [
    //         {
    //             args: [5, 10, 5],
    //             type: 'Box',
    //             position: [0, 2, 0]
    //         }
    //     ]
    // }), useRef(null))

    // // 초기 위치를 메모이제이션하여 저장
    // const memoizedPosition = useMemo(() => position, [])

    // 초기 목표 위치를 설정
    const [targetPosition, setTargetPosition] = useState(null)

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

    // 목표 위치가 변경되면 캐릭터 이동 시작
    useEffect(() => {
        if (position) {
            setTargetPosition(new Vector3(...position))
        }
    }, [position])

    useFrame(({ camera }) => {
        if (!player || !charRef.current || !targetPosition) return
    
        const currentPosition = charRef.current.position
        const distance = currentPosition.distanceTo(targetPosition)

        // 카메라 설정 부분
        // 학생식당 가는 길목
        if(currentPosition.x >= -128 && currentPosition.x <= 147) {
            if(currentPosition.z > -28){
                camera.position.set(
                    currentPosition.x + -180,
                    currentPosition.y + 100,
                    currentPosition.z + 0
                )
            }
        }
        // 학생식당 앞 길목
        if(currentPosition.x > 148 && currentPosition.x <= 245) {
            if(currentPosition.z > 80) {
                // console.log('학생식당 앞 길목')
                camera.position.set(
                    currentPosition.x - 15,
                    currentPosition.y + 50,
                    currentPosition.z + -80
                )
            }
        }

        if(currentPosition.x <= 150 && currentPosition.z > 120) {
            // 유한공고 가는 길목
            if(currentPosition.x > -240) {
                console.log('유한공고 가는 길목')
                camera.position.set(
                    currentPosition.x + 0,
                    currentPosition.y + 100,
                    currentPosition.z - 180
                )
            }
            if(currentPosition.x > -170) {
                console.log('테라스')
                camera.position.set(
                    currentPosition.x - 50,
                    currentPosition.y + 100,
                    currentPosition.z + 0
                )
            }
        }

        if(currentPosition.z > 270) {
            camera.position.set(
                currentPosition.x - 100,
                currentPosition.y + 130,
                currentPosition.z + 180
            )
        }

        if(currentPosition.x < -175) {
            // 3호관 8호관 사이 길목
            if(currentPosition.z < -60) {
                // console.log('3호관 8호관 사이 길목')
                camera.position.set(
                    currentPosition.x + 0,
                    currentPosition.y + 100,
                    currentPosition.z + 180
                )
            }

            // Welcome 존 앞
            if(currentPosition.z < -310) {
                // console.log('Welcome 존 앞')
                camera.position.set(
                    currentPosition.x + 180,
                    currentPosition.y + 200,
                    currentPosition.z - 90
                )
            }
        }

        if(currentPosition.x < -270) {
            if(currentPosition.z < -60) {
                // console.log('서브공원 앞')
                camera.position.set(
                    currentPosition.x + 80,
                    currentPosition.y + 100,
                    currentPosition.z + 90
                )
            }
        }

        if(currentPosition.x > -175) {
            if(currentPosition.z < -260) {
                // 입구와 Welcome Zone 사이
                // console.log('입구와 Welcome Zone 사이')
                camera.position.set(
                    currentPosition.x + 180,
                    currentPosition.y + 200,
                    currentPosition.z - 190
                )
            }
        }

        // 나눔의 숲 입구
        if(currentPosition.x > -80 && currentPosition.z < -80) {
            // console.log('나눔의 숲 입구')
            camera.position.set(
                currentPosition.x - 180,
                currentPosition.y + 250,
                currentPosition.z - 150
            )
        }

        // 학교입구
        if(currentPosition.x > -6) {
            if(currentPosition.z < -337) {
                // console.log('학교입구')
                camera.position.set(
                    currentPosition.x + 180,
                    currentPosition.y + 230,
                    currentPosition.z + 0
                )
            }
        }

        // 학교 밖
        if(currentPosition.x > 245) {
            // console.log('학교밖')
            camera.position.set(
                currentPosition.x + 130,
                currentPosition.y + 400,
                currentPosition.z + -150
            )
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
    })
    return { nodes, materials, charRef }
}