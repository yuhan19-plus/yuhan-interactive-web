/** 
 * 임성준
 * - 학과장 캐릭터의 애니메이션을 위한 훅
 */

import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimationMixer, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { deptHeadAniInit } from "../../../../../../../redux/actions/actions"
import { useAnimatedText } from "../useAnimatedText"

export const useCsDeptCharacter = ({myChar, groundMapName, position, ...props}) => {
    const dispatch = useDispatch()

    const deptHeadAniState = useSelector((state) => state.deptHeadAni)
    const deptHeadAniValue = deptHeadAniState.value
    const deptHeadAniName = deptHeadAniState.animationName
    // console.log('deptHeadAniState', deptHeadAniState)

    const [text, setText] = useState('컴퓨터소프트웨어공학과에 오신걸 환영합니다.')
    const { displayText } = useAnimatedText(text)

    const deptCharRef = useRef()
    const nameRef = useRef(null)
    const chatRef = useRef(null)

    const { scene, animations } = useGLTF('/assets/models/character/CSDeptHead.glb')

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    const { nodes, materials } = useGraph(clone)
    
    const { actions } = useAnimations(animations, deptCharRef)
    // console.log(animations)
    
    // AnimationMixer 생성 (애니메이션을 제어하는 클래스)
    const mixer = useMemo(() => new AnimationMixer(clone), [clone])

    // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
    const [animation, setAnimation] = useState('Laugh')

    useEffect(() => {
        if(!deptCharRef.current) return
        if(!nameRef.current) return
        if(!chatRef.current) return

        nameRef.current.scale.set(7, 7, 7)
        chatRef.current.scale.set(5, 5, 5)

        chatRef.current.position.set(
            deptCharRef.current.position.x,
            deptCharRef.current.position.y + 25,
            deptCharRef.current.position.z
        )

        nameRef.current.position.set(
            deptCharRef.current.position.x,
            deptCharRef.current.position.y + 30,
            deptCharRef.current.position.z
        )

        scene.traverse((mesh) => {
            mesh.castShadow = true
            mesh.receiveShadow = true
        })
    }, [])

    useEffect(() => {
        if (actions && actions[animation]) {
            actions[animation].reset().fadeIn(0.3).play()
        }
        
        return () => {
            if (actions && actions[animation]) {
                actions[animation].fadeOut(0.3)
            }
        }
    }, [actions, animation])

    useEffect(() => {
        if(groundMapName === 'yh_map') {
            setAnimation('Laugh')
        }
    }, [groundMapName, deptHeadAniName])

    useFrame(() => {
        const deptCurrentPosition = deptCharRef.current.position
        if(deptHeadAniValue) {
            // console.log(deptCurrentPosition)
            // 방향을 구하고 스칼라를 곱하여 이동량을 설정
            const direction = new Vector3().subVectors({x: -125, y: 0, z: -127}, deptCurrentPosition).normalize().multiplyScalar(0.5)

            // 현재 위치에 방향을 더해 새로운 위치를 설정
            deptCurrentPosition.add(direction)

            // 물리 엔진에서 캐릭터의 위치를 업데이트
            deptCurrentPosition.copy(deptCurrentPosition)

            setAnimation('Walk')

            if(deptHeadAniName === '') {
                deptCharRef.current.lookAt(-125, 0, -127)

                if((Math.floor(deptCurrentPosition.x) === -125 &&
                    Math.floor(deptCurrentPosition.y) === -1 &&
                    Math.floor(deptCurrentPosition.z) === -127) &&
                    deptHeadAniValue) {
                        // console.log('test')
                        dispatch(deptHeadAniInit())
                        deptCharRef.current.lookAt(deptCurrentPosition)
                        setAnimation('Action')
                }
            }
            
            if(deptHeadAniName === 'move') {
                setText('')
                nameRef.current.lookAt(new Vector3(10000, 10000, 10000))
                chatRef.current.lookAt(new Vector3(10000, 10000, 10000))
                
                chatRef.current.position.x -= 0.5

                nameRef.current.position.x -= 0.5

                // 캐릭터가 이동 방향을 바라보도록 설정
                deptCharRef.current.lookAt(-125, 0.7, -127)
                // console.log('Math.floor(deptCurrentPosition.x)', Math.floor(deptCurrentPosition.x))
                // console.log('Math.floor(deptCurrentPosition.y)', Math.floor(deptCurrentPosition.y))
                // console.log('Math.floor(deptCurrentPosition.z)', Math.floor(deptCurrentPosition.z))

                if((Math.floor(deptCurrentPosition.x) === -125 &&
                    Math.floor(deptCurrentPosition.y) === 0 &&
                    Math.floor(deptCurrentPosition.z) === -127) &&
                    deptHeadAniValue) {
                        // console.log('test')
                        dispatch(deptHeadAniInit())
                        deptCharRef.current.lookAt(deptCurrentPosition)
                        setAnimation('Stand')
                }
            }

            mixer.update(0.01)
        }
        else {
            if(animation === 'Stand') {
                setTimeout(() => {
                    setAnimation('Typing')
                    setText('상담을 원하신다면 상담신청을 해주세요.')
                }, 1000)
            }
        }
    })

    return { nodes, materials, deptCharRef, text, displayText, chatRef, nameRef }
}