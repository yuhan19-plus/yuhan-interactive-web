import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { AnimationMixer, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"

export const useCsDeptCharacter = ({groundMapName, position, ...props}) => {
    const deptHeadAniState = useSelector((state) => state.deptHeadAni)
    const deptHeadAniValue = deptHeadAniState.value
    const deptHeadAniName = deptHeadAniState.animationName
    // console.log('deptHeadAniState', deptHeadAniState)

    const deptCharRef = useRef()
    const { scene, animations } = useGLTF('/assets/models/character/CSDeptHead.glb')
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)
    const { actions } = useAnimations(animations, deptCharRef)
    // console.log(animations)
    
    // AnimationMixer 생성 (애니메이션을 제어하는 클래스)
    const mixer = useMemo(() => new AnimationMixer(clone), [clone])

    // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
    const [animation, setAnimation] = useState('Typing')

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
        if(deptHeadAniName === 'move') {
            setAnimation('Walk')
        }
    }, [groundMapName, deptHeadAniName])

    useFrame(() => {
        const deptCurrentPosition = deptCharRef.current.position
        if(deptHeadAniValue && deptHeadAniName === 'move') {
            // console.log(deptCurrentPosition)
            // 방향을 구하고 스칼라를 곱하여 이동량을 설정
            const direction = new Vector3().subVectors({x: -100, y: 0, z: -127}, deptCurrentPosition).normalize().multiplyScalar(0.5)

            // 현재 위치에 방향을 더해 새로운 위치를 설정
            deptCurrentPosition.add(direction)

            // 물리 엔진에서 캐릭터의 위치를 업데이트
            deptCurrentPosition.copy(deptCurrentPosition)

            // 캐릭터가 이동 방향을 바라보도록 설정
            // deptCharRef.current.lookAt([-100, 0.7, -127])
            mixer.update(0.01)
        }

        // console.log(deptCurrentPosition)
    })

    return { nodes, materials, deptCharRef }
}