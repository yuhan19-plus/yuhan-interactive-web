import { useAnimations, useGLTF } from "@react-three/drei"
import { useGraph } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimationMixer } from "three"
import { SkeletonUtils } from "three-stdlib"
import { useAnimatedText } from "../useAnimatedText"

export const useNPC = ({ groundMapName, npcName, areaName, position, ...props }) => {
    // console.log(groundMapName)
    // console.log(npcName)
    // console.log(areaName)

    const dispatch = useDispatch()

    // const npcAniState = useSelector((state) => state.npcAni)
    // const npcAniValue = npcAniState.value
    // const npcAniName = npcAniState.animationName

    const [text, setText] = useState('')
    const { displayText } = useAnimatedText(text)

    const npcRef = useRef()
    const nameRef = useRef(null)
    const chatRef = useRef(null)

    const { scene, animations } = useGLTF('/assets/models/character/MainCharacter.glb')

    // 씬을 복제하여 상태 변화로부터 안전하게 만듦
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    const { nodes, materials } = useGraph(clone)

    const { actions } = useAnimations(animations, npcRef)
    // console.log(animations)

    const mixer = useMemo(() => new AnimationMixer(clone), [clone])

    const [animation, setAnimation] = useState('Stand')

    // const actions = useMemo(() => {
    //     return animations.reduce((acc, clip) => {
    //         acc[clip.name] = mixer.clipAction(clip) // 애니메이션 클립에 대한 액션 생성
    //         return acc
    //     }, {})
    // }, [animations, mixer])

    // useEffect(() => {
    //     if (!npcRef.current) return
    //     if (!nameRef.current) return
    //     if (!chatRef.current) return

    //     nameRef.current.scale.set(7, 7, 7)
    //     chatRef.current.scale.set(5, 5, 5)

    //     chatRef.current.position.set(
    //         npcRef.current.position.x,
    //         npcRef.current.position.y + 25,
    //         npcRef.current.position.z
    //     )

    //     nameRef.current.position.set(
    //         npcRef.current.position.x,
    //         npcRef.current.position.y + 30,
    //         npcRef.current.position.z
    //     )

    //     scene.traverse((mesh) => {
    //         mesh.castShadow = true
    //         mesh.receiveShadow = true
    //     })
    // }, [])

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

    // useFrame(() => {
    //     const npcCurrentPosition = npcRef.current.position
    //     if (npcAniValue) {
    //         // console.log(npcCurrentPosition)
    //         // 방향을 구하고 스칼라를 곱하여 이동량을 설정
    //         const direction = new Vector3().subVectors({ x: -125, y: 0, z: -127 }, npcCurrentPosition).normalize().multiplyScalar(0.5)

    //         // 현재 위치에 방향을 더해 새로운 위치를 설정
    //         npcCurrentPosition.add(direction)

    //         // 물리 엔진에서 캐릭터의 위치를 업데이트
    //         npcCurrentPosition.copy(npcCurrentPosition)

    //         setAnimation('Walk')

    //         if (npcAniName === '') {
    //             npcRef.current.lookAt(-125, 0, -127)

    //             if ((Math.floor(npcCurrentPosition.x) === -125 &&
    //                 Math.floor(npcCurrentPosition.y) === -1 &&
    //                 Math.floor(npcCurrentPosition.z) === -127) &&
    //                 npcAniValue) {
    //                 // console.log('test')
    //                 dispatch(npcAniInit())
    //                 npcRef.current.lookAt(npcCurrentPosition)
    //                 setAnimation('Stand')
    //             }
    //         }

    //         if (npcAniName === 'move') {
    //             if (npcName.includes('관')) {
    //                 setText(`여기는 ${areaName}입니다`)
    //             }
    //             else {
    //                 setAnimation('HandsUp')
    //                 setText(areaName)
    //             }

    //             nameRef.current.lookAt(new Vector3(10000, 10000, 10000))
    //             chatRef.current.lookAt(new Vector3(10000, 10000, 10000))

    //             chatRef.current.position.x -= 0.5

    //             nameRef.current.position.x -= 0.5

    //             // 캐릭터가 이동 방향을 바라보도록 설정
    //             npcRef.current.lookAt(-125, 0.7, -127)
    //             // console.log('Math.floor(npcCurrentPosition.x)', Math.floor(npcCurrentPosition.x))
    //             // console.log('Math.floor(npcCurrentPosition.y)', Math.floor(npcCurrentPosition.y))
    //             // console.log('Math.floor(npcCurrentPosition.z)', Math.floor(npcCurrentPosition.z))

    //             if ((Math.floor(npcCurrentPosition.x) === -125 &&
    //                 Math.floor(npcCurrentPosition.y) === 0 &&
    //                 Math.floor(npcCurrentPosition.z) === -127) &&
    //                 deptHeadAniValue) {
    //                 // console.log('test')
    //                 dispatch(npcAniInit())
    //                 npcRef.current.lookAt(npcCurrentPosition)
    //                 setAnimation('Stand')
    //             }
    //         }

    //         mixer.update(0.01)
    //     }
    //     else {
    //         if (animation === 'Stand') {
    //             setTimeout(() => {
    //                 setAnimation('Typing')
    //                 setText('상담을 원하신다면 상담신청을 해주세요.')
    //             }, 1000)
    //         }
    //     }
    // })


    return { nodes, materials, npcRef, text, displayText, chatRef, nameRef }

}