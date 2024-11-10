/** 
 * 임성준
 * - 캐릭터 조작 기능
 * - handleCamera 및 handelGSAPCamera 기능 구현
 * - 카메라 영역 설정
 * - 캐릭터 애니메이션 설정
 * - 캐릭터 관리 훅
 */

import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph, useThree } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimationMixer, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import {
    Enter_First_Work,
    Leave_First_Work,
    Enter_Second_Work,
    Leave_Second_Work,
    Enter_Third_Work,
    Leave_Third_Work,
    Enter_Statue,
    Enter_StudentKiosk,
    Leave_Statue,
    Leave_StudentKiosk,
    deptInfoCareerAndEmploymentField,
    deptInfoDeptFeatures,
    deptInfoEduGoals,
    deptInfoLicense,
    deptInfoMainEduFields,
    initDeptInfo,
    initKiosk,
    initMiniMapTeleport,
    kioskBongSa,
    kioskCafeteria,
    kioskChangjo,
    kioskJayu,
    kioskMemorialHall,
    kioskNanum, kioskPyeonghwaOne, kioskPyeonghwaTwo, kioskYujaela, mainChar, mainCharDept, deptHeadAniInit, deptHeadAniMove, welcomeGuide, initGuide, tvGuide, statueGuide, EnterGoldBoxArea, LeaveGoldBoxArea, initCodingArea, initBusStation, initSmokingArea,
    onBusStationOne,
    onBusStationTwo,
    onSmokingArea,
    enterCodingArea
} from "../../../../../../redux/actions/actions"
import { calculateMinimapPosition } from "../../../../../../utils/utils"
import Swal from "sweetalert2"

export const useMainCharacter = ({ position, myChar }) => {
    const dispatch = useDispatch()

    const groundMapState = useSelector((state) => state.groundMap)

    const viewState = useSelector((state) => state.view)
    const aerialViewValue = viewState.value
    const directionsState = viewState.value && viewState.viewName === 'directionsView'
    const smokingAreaState = viewState.value && viewState.viewName === 'smokingAreaView'
    const campusGuideViewValue = viewState.value
    const campusGuideViewName = viewState.viewName

    const kioskState = useSelector((state) => state.kiosk)
    const busState = useSelector((state) => state.bus)
    const smokingState = useSelector((state) => state.smokingArea)
    const statueState = useSelector((state) => state.statue)
    const kioskValue = kioskState.value
    const busValue = busState.value
    const smokingValue = smokingState.value
    const statueValue = statueState.inStatue

    // 텔레포트
    const teleportState = useSelector((state) => state.teleport)
    const teleportValue = teleportState.value
    const teleportPosition = teleportState.position
    // console.log('teleportPosition', teleportPosition)

    const [isAnimating, setIsAnimating] = useState(false)
    const [gsapCameraState, setGsapCameraState] = useState(false)

    // 추가적인 useRef 선언으로 상태를 추적
    const kioskDispatchFlag = useRef(false)
    const welcomeZoneCameraFlag = useRef(false)
    const yuhanTvZoneCameraFlag = useRef(false)
    const yuhanStatueCameraFlag = useRef(false)
    const deptInfoEduGoalsDispatchFlag = useRef(false)
    const deptInfoMainEduFieldsDispatchFlag = useRef(false)
    const deptInfoLicenseDispatchFlag = useRef(false)
    const deptInfoDeptFeaturesDispatchFlag = useRef(false)
    const deptInfoCareerAndEmploymentFieldDispatchFlag = useRef(false)
    const deptHeadAniFlag = useRef(false)
    const busStationFlag = useRef(false)
    const smokingAreaFlag = useRef(false)

    const { camera } = useThree()

    // 현재 플레이어의 이름을 가져옴
    const player = myChar.name // 값 : SJ
    const charRef = useRef(null)
    const point = document.getElementById(`student-point-${player}`)

    const { scene, materials, animations } = useGLTF('/assets/models/character/MainCharacter.glb')

    // 씬을 복제하여 상태 변화로부터 안전하게 만듦
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    // 씬의 모든 노드를 얻음 (모델의 각 파트를 개별적으로 제어 가능)
    const objectMap = useGraph(clone)
    const nodes = objectMap.nodes

    // AnimationMixer 생성 (애니메이션을 제어하는 클래스)
    const mixer = useMemo(() => new AnimationMixer(clone), [clone])

    // 초기 목표 위치를 설정
    // console.log('position', position)
    const [targetPosition, setTargetPosition] = useState(new Vector3(...position))

    // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
    const [animation, setAnimation] = useState('Stand')

    // 동상영역에 있는지 상태를 관리하는 상태 변수
    const [isInStatueZone, setIsInStatueZone] = useState(false);

    // 흡연장영역에 있는지 상태를 관리하는 상태 변수
    const [isInSmokingArea, setIsInSmokingArea] = useState(false);

    //학생회관 음식 호출
    const [isInStudentKioskZone, setIsInStudentKioskZone] = useState(false);

    // 학과체험의 코딩영역 상태관리
    const [isCodingArea, setIsCodingArea] = useState(false);

    // 보물상자영역 상태관리
    const [isGoldBoxArea1, setisGoldBoxArea1] = useState(false);
    const [isGoldBoxArea2, setisGoldBoxArea2] = useState(false);
    const [isGoldBoxArea3, setisGoldBoxArea3] = useState(false);

    // 갤러리 영역 상태관리
    const [isFirstWork, setIsFirstWork] = useState(false);
    const [isSecondWork, setIsSecondWork] = useState(false);
    const [isThirdWork, setIsThirdWork] = useState(false);

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
        // console.log('groundMapState.mapName ', groundMapState.mapName)
        // console.log(myChar.currentPosition)
        // console.log(myChar.deptInitPosition)
        if (charRef.current) {
            if (groundMapState.mapName === 'yh_map') {
                charRef.current.position.set(
                    myChar.currentPosition[0],
                    myChar.currentPosition[1],
                    myChar.currentPosition[2]
                )
            } else {
                if (charRef.current) {
                    charRef.current.position.set(
                        myChar.deptInitPosition[0],
                        myChar.deptInitPosition[1],
                        myChar.deptInitPosition[2]
                    )
                }
            }
        }
        // console.log('charRef.current.position', charRef.current.position)
    }, [groundMapState])

    // 목표 위치가 변경되면 캐릭터 이동 시작
    useEffect(() => {
        if (position) {
            setTargetPosition(new Vector3(...position))
            if (groundMapState.mapName === 'yh_map') {
                dispatch(mainChar(position))
            } else {
                dispatch(mainCharDept(position))
            }
        }
    }, [position, groundMapState.mapName])

    // 텔레포트
    useEffect(() => {
        if (teleportValue) {
            setTargetPosition(new Vector3(...teleportPosition))
            dispatch(mainChar(teleportPosition))
            charRef.current.position.set(
                teleportPosition[0],
                teleportPosition[1],
                teleportPosition[2]
            )
        }
        dispatch(initMiniMapTeleport())
    }, [teleportValue, teleportPosition])

    // 항공뷰
    useEffect(() => {
        if (aerialViewValue) {
            if (
                kioskValue ||
                busValue ||
                smokingValue ||
                statueValue ||
                yuhanTvZoneCameraFlag.current ||
                welcomeZoneCameraFlag.current
            ) {
                // if(kioskValue) dispatch(initKiosk())
                // if(busValue) dispatch(initBusStation())
                // if(smokingValue) dispatch(initSmokingArea())
                // if(statueValue) dispatch(initStatue())

                Swal.fire({
                    icon: "info",
                    title: "안내",
                    text: "해당 이벤트 영역에서는 이용할 수 없습니다."
                })
            }
            else {
                gsap.to(camera.position, {
                    x: 0,
                    y: 1000,
                    z: -300,
                    duration: 1,
                    ease: 'power2.inOut'
                })
            }
        }
    }, [aerialViewValue, camera])

    // 찾아오는 길 뷰
    useEffect(() => {
        if (directionsState) {
            if (
                kioskValue ||
                busValue ||
                smokingValue ||
                statueValue ||
                yuhanTvZoneCameraFlag.current ||
                welcomeZoneCameraFlag.current
            ) {
                // if(kioskValue) dispatch(initKiosk())
                // if(busValue) dispatch(initBusStation())
                // if(smokingValue) dispatch(initSmokingArea())
                // if(statueValue) dispatch(initStatue())

                Swal.fire({
                    icon: "info",
                    title: "안내",
                    text: "해당 이벤트 영역에서는 이용할 수 없습니다."
                })
            }
            else {
                gsap.to(camera.position, {
                    x: 1800,
                    y: 700,
                    z: -250,
                    duration: 1.5,
                    ease: 'power2.inOut',
                });
            }
        }
    }, [directionsState, camera]);

    // 흡연구역 뷰
    useEffect(() => {
        if (smokingAreaState) {
            if (
                kioskValue ||
                busValue ||
                smokingValue ||
                statueValue ||
                yuhanTvZoneCameraFlag.current ||
                welcomeZoneCameraFlag.current
            ) {
                // if(kioskValue) dispatch(initKiosk())
                // if(busValue) dispatch(initBusStation())
                // if(smokingValue) dispatch(initSmokingArea())
                // if(statueValue) dispatch(initStatue())

                Swal.fire({
                    icon: "info",
                    title: "안내",
                    text: "해당 이벤트 영역에서는 이용할 수 없습니다."
                })
            }
            else {
                gsap.to(camera.position, {
                    x: -580,
                    y: 1000,
                    z: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                });
            }
        }
    }, [smokingAreaState, camera]);

    useEffect(() => {
        if (campusGuideViewValue && campusGuideViewName === 'campusGuideView') {
            gsap.to(camera.position, {
                x: 1000,
                y: 1000,
                z: -1000,
                duration: 1,
                ease: 'power2.inOut'
            })
        }
    }, [campusGuideViewValue, campusGuideViewName])

    // 카메라 설정 부분
    const handleGSAPCamera = (x, y, z) => {
        if (isAnimating) return
        setIsAnimating(true)
        gsap.to(camera.position, {
            x: x,
            y: y,
            z: z,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                setIsAnimating(false) // 애니메이션이 끝난 후 상태를 업데이트
            }
        })
    }

    const handleCamera = (x, y, z) => {
        if (!gsapCameraState) {
            camera.position.set(x, y, z)
        }
    }

    useFrame(({ camera }) => {
        if (!player || !charRef.current || !targetPosition) return

        if (aerialViewValue) {
            return
        }
        else {
            const currentPosition = charRef.current.position // 현재 위치
            const distance = currentPosition.distanceTo(targetPosition) // 현재 위치와 클릭위치 사이의 거리

            // 학교맵일 경우
            if (groundMapState.mapName === 'yh_map') {
                // Start Zone
                if ((currentPosition.x <= 285 && currentPosition.x >= 275) &&
                    (currentPosition.z >= -360 && currentPosition.z <= -350)) {
                    // console.log('test')
                    // console.log('이것', currentPosition.x + 0, currentPosition.y + 50, currentPosition.z + 100)
                    handleGSAPCamera(currentPosition.x + 0, currentPosition.y + 50, currentPosition.z + 100)
                }
                // 학교 밖 정문 앞 쪽
                else if ((currentPosition.x > 250 && currentPosition.x < 520) &&
                    ((currentPosition.z < -325 && currentPosition.z >= -560))) {
                    // console.log('test')
                    handleCamera(550, 150, -550)
                }
                // 그 외 학교 밖
                else if ((currentPosition.x > 250 && currentPosition.x < 520) &&
                    ((currentPosition.z < 396 && currentPosition.z >= -325))) {
                    // console.log('test')
                    handleCamera(600, 150, 50)
                    // Bus Zone
                    if ((currentPosition.x <= 322 && currentPosition.x >= 262) &&
                        (currentPosition.z >= -183 && currentPosition.z <= -143)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(550, 100, -170)
                        }
                        if (!busStationFlag.current) {
                            busStationFlag.current = true
                            dispatch(onBusStationOne())
                        }
                        // dispatch(enterBusStationOne()); // 리덕스 액션 디스패치
                        // console.log("버스존 1에 진입했습니다.");
                    }
                    else if ((currentPosition.x <= 522 && currentPosition.x >= 482) &&
                        (currentPosition.z >= -257 && currentPosition.z <= -217)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(750, 100, -450)
                        }
                        if (!busStationFlag.current) {
                            busStationFlag.current = true
                            dispatch(onBusStationTwo())
                        }
                        // dispatch(enterBusStationTwo()); // 리덕스 액션 디스패치
                        // console.log("버스존 2에 진입했습니다.");
                    }
                    else { // 버스존이 아닌 경우
                        if (gsapCameraState) {
                            setGsapCameraState(false)
                        }

                        if (kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = false
                            dispatch(initKiosk())
                        }

                        if (busStationFlag.current) {
                            busStationFlag.current = false
                            dispatch(initBusStation())
                        }
                    }
                }

                // 학생회관과 5&6호관 사이
                if ((currentPosition.x > 147 && currentPosition.x <= 224)
                    && (currentPosition.z >= -28 && currentPosition.z < 285)) {
                    handleCamera(currentPosition.x + 30, currentPosition.y + 200, currentPosition.z - 20)

                    // 학생 식당 영역에 들어왔을 때
                    if ((currentPosition.x >= 179 && currentPosition.x <= 202)
                        && (currentPosition.z >= 128 && currentPosition.z <= 168)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(165, 50, 200)
                        }

                        // 학생 식당 입장 처리
                        if (!isInStudentKioskZone) {
                            setIsInStudentKioskZone(true);
                            dispatch(Enter_StudentKiosk());
                            // console.log("학생식당 입장", isInStudentKioskZone);
                        }

                        if (!kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = true
                            dispatch(kioskCafeteria())
                        }
                    }
                    else {
                        if (gsapCameraState) {
                            // console.log('학생 식당')
                            setGsapCameraState(false)
                        }

                        // 학생 식당 퇴장 처리
                        if (isInStudentKioskZone) {
                            setIsInStudentKioskZone(false);
                            dispatch(Leave_StudentKiosk());
                            // console.log("학생식당 퇴장", isInStudentKioskZone);
                        }

                        if (kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = false
                            dispatch(initKiosk())
                        }
                    }
                }

                // 테라스 안쪽 좌측
                if ((currentPosition.z <= 213 && currentPosition.z >= 143)
                    && (currentPosition.x <= 0 && currentPosition.x >= -42)) {
                    handleCamera(currentPosition.x + 0, currentPosition.y + 30, currentPosition.z + 30)
                }

                if (currentPosition.x <= 150 && currentPosition.z > 120) {
                    if (currentPosition.x < -170 && currentPosition.x > -240) {
                        // console.log('test')
                        handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z - 180)
                    }

                    if (currentPosition.x > -170 && currentPosition.x <= -48) {
                        // 테라스 입구
                        handleCamera(currentPosition.x - 50, currentPosition.y + 100, currentPosition.z + 0)
                    }

                    if (currentPosition.x > -48 && currentPosition.x <= 0) {
                        // 테라스 안쪽 우측
                        handleCamera(currentPosition.x - 60, currentPosition.y + 60, currentPosition.z + 0)
                    }

                    // 창조관 키오스크 + 이벤트
                    if ((currentPosition.x >= -175 && currentPosition.x <= -155) &&
                        (currentPosition.z >= 244 && currentPosition.z <= 284)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(-230, 50, 263)
                        }
                        if (!kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = true
                            dispatch(kioskChangjo())
                        }
                    }
                    // 테라스
                    else if ((currentPosition.x >= -140 && currentPosition.x <= -100) &&
                        (currentPosition.z >= 180 && currentPosition.z <= 220)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(-160, 10, 165)
                        }
                        // 영역진입체크
                        if (!isGoldBoxArea2) {
                            setisGoldBoxArea2(true)
                            dispatch(EnterGoldBoxArea('isZone2'));
                            // console.log("테라스 보물상자 진입")
                        }
                    }
                    else {
                        if (gsapCameraState) {
                            // console.log('te')
                            setGsapCameraState(false)
                        }

                        if (isGoldBoxArea2) {
                            setisGoldBoxArea2(false);
                            dispatch(LeaveGoldBoxArea('isZone2', 'hasVisitedZone2'))
                            // console.log("테라스 보물상자 탈출")
                        }

                        if (kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = false
                            dispatch(initKiosk())
                        }
                    }
                }

                // 학생식당 가는 길목
                if ((currentPosition.x >= -128 && currentPosition.x <= 147) && (currentPosition.z >= -28 && currentPosition.z <= 80)) {
                    handleCamera(currentPosition.x - 180, currentPosition.y + 100, currentPosition.z + 0)
                    // 평화관 키오스크 + 이벤트
                    if ((currentPosition.x >= 25 && currentPosition.x <= 45)
                        && (currentPosition.z >= 11 && currentPosition.z <= 33)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(-3, 3, 0)
                        }
                        if (!kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = true
                            dispatch(kioskPyeonghwaTwo())
                        }
                    }

                    // 나눔관 키오스크 + 이벤트
                    else if ((currentPosition.x >= 12 && currentPosition.x <= 54) &&
                        (currentPosition.z >= 57 && currentPosition.z <= 77)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(-10, 15, 0)
                        }
                        if (!kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = true
                            dispatch(kioskNanum())
                        }
                    }

                    else {
                        if (gsapCameraState) {
                            setGsapCameraState(false)
                        }
                        if (kioskDispatchFlag.current) {
                            kioskDispatchFlag.current = false
                            dispatch(initKiosk())
                        }
                    }
                }

                // 공원
                if (currentPosition.z <= 120 && currentPosition.z > -130) {
                    if (currentPosition.x < -128 && currentPosition.x > -270) {
                        handleCamera(currentPosition.x + 0, currentPosition.y + 130, currentPosition.z + 100)
                        // 유일한기념관 키오스크 + 이벤트
                        if ((currentPosition.x >= -248 && currentPosition.x <= -228) &&
                            (currentPosition.z >= 74 && currentPosition.z <= 114)) {
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                // console.log('gsapCameraState', gsapCameraState)
                                handleGSAPCamera(-160, 50, 95)
                            }

                            if (!kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = true
                                dispatch(kioskMemorialHall())
                            }
                        }
                        else {
                            if (gsapCameraState) {
                                setGsapCameraState(false)
                                // console.log("유일한기념관 setGsapCameraState")
                            }
                            if (kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = false
                                dispatch(initKiosk())
                            }
                        }
                    }

                    if (currentPosition.x <= -270) {
                        handleCamera(currentPosition.x + 100, currentPosition.y + 100, currentPosition.z + 0)
                        // 유재라관 키오스크 + 이벤트
                        if ((currentPosition.x <= -279 && currentPosition.x >= -319) &&
                            (currentPosition.z <= -65 && currentPosition.z >= -85)) {
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                handleGSAPCamera(-298, 30, 13)
                            }
                            if (!kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = true
                                dispatch(kioskYujaela())
                            }
                        }
                        // 유재라관
                        else if ((currentPosition.x >= -370 && currentPosition.x <= -320) &&
                            (currentPosition.z >= -130 && currentPosition.z <= -90)) {
                            // console.log('test')
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                handleGSAPCamera(-310, 10, -40)
                            }
                            // 영역진입체크
                            if (!isGoldBoxArea1) {
                                setisGoldBoxArea1(true)
                                dispatch(EnterGoldBoxArea('isZone1'));
                                // console.log("유재라관 보물상자 진입")
                            }
                        }
                        else {
                            // console.log('test2')
                            if (gsapCameraState) {
                                setGsapCameraState(false)
                                // console.log("유재라관 setGsapCameraState")
                            }

                            if (isGoldBoxArea1) {
                                setisGoldBoxArea1(false);
                                dispatch(LeaveGoldBoxArea('isZone1', 'hasVisitedZone1'))
                                // console.log("유재라관 보물상자 탈출")
                            }

                            if (kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = false
                                dispatch(initKiosk())
                            }
                        }
                    }
                }

                // 3호관 8호관 사이
                if (currentPosition.x < -128 && currentPosition.x > -270) {
                    if (currentPosition.z < -60 && currentPosition.z > -270) {
                        handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z + 180)
                        // 자유관 키오스크 + 이벤트
                        if ((currentPosition.x >= -191 && currentPosition.x <= -161) &&
                            (currentPosition.z <= -214 && currentPosition.z >= -244)) {
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                handleGSAPCamera(-243, 50, -235)
                            }
                            if (!kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = true
                                dispatch(kioskJayu())
                            }
                        }
                        else {
                            if (gsapCameraState) {
                                setGsapCameraState(false)
                                // console.log("자유관 setGsapCameraState")
                            }
                            if (kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = false
                                dispatch(initKiosk())
                            }
                        }
                    }
                    if (currentPosition.z <= -270) {
                        // console.log("자유관 근처")
                        handleCamera(currentPosition.x + 180, currentPosition.y + 300, currentPosition.z - 180)
                    }
                }

                if ((currentPosition.x <= -270 && currentPosition.x > -527) &&
                    (currentPosition.z <= -254 && currentPosition.z > -528)) {
                    // console.log("Welcome Zone 밖")
                    handleCamera(currentPosition.x + 300, currentPosition.y + 150, currentPosition.z)
                }

                // 나눔의 숲 큰 입구
                if (currentPosition.x >= -128 && currentPosition.x < -30) {
                    if (currentPosition.z < -254 && currentPosition.z > -340) {
                        // console.log('test')
                        handleCamera(currentPosition.x, currentPosition.y + 150, currentPosition.z - 150)
                    }
                }

                // 나눔의 숲 1사분면, 2사분면
                if ((currentPosition.z <= -102 && currentPosition.z >= -200)) {
                    if (currentPosition.x >= -69 && currentPosition.x <= 58) {
                        handleCamera(currentPosition.x + 0, currentPosition.y + 100, currentPosition.z - 50)
                        // 평화관 정문 키오스크
                        if ((currentPosition.x <= 45 && currentPosition.x >= 5) &&
                            (currentPosition.z <= -126 && currentPosition.z >= -146)) {
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                handleGSAPCamera(0, 50, -200)
                            }
                            if (!kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = true
                                dispatch(kioskPyeonghwaOne())
                            }
                        }
                        else {
                            if (gsapCameraState) {
                                setGsapCameraState(false)
                            }
                            if (kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = false
                                dispatch(initKiosk())
                            }
                        }

                    }
                    if (currentPosition.x > 58 && currentPosition.x <= 190) {
                        handleCamera(currentPosition.x - 50, currentPosition.y + 100, currentPosition.z - 50)
                        if ((currentPosition.x <= 189 && currentPosition.x >= 159) &&
                            (currentPosition.z <= -170 && currentPosition.z >= -210)) {
                            // 봉사관 키오스크
                            if (!gsapCameraState) {
                                setGsapCameraState(true)
                                handleGSAPCamera(114, 50, -230)
                            }
                            if (!kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = true
                                dispatch(kioskBongSa())
                            }
                        }
                        else {
                            if (gsapCameraState) {
                                setGsapCameraState(false)
                                // console.log("봉사관 setGsapCameraState")
                            }
                            if (kioskDispatchFlag.current) {
                                kioskDispatchFlag.current = false
                                dispatch(initKiosk())
                            }
                        }
                    }
                }

                // 나눔의 숲 3, 4사분면
                if ((currentPosition.x >= -69 && currentPosition.x <= 190) &&
                    (currentPosition.z < -200 && currentPosition.z >= -320)) {
                    // console.log('test')
                    handleCamera(currentPosition.x, currentPosition.y + 100, currentPosition.z + 50)

                    // 흡연구역 이벤트 발생 지역
                    if ((currentPosition.x <= 58 && currentPosition.x >= 25) &&
                        (currentPosition.z <= -240 && currentPosition.z >= -280)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(70, 100, -170)
                        }
                        // if (!isInSmokingArea) {
                        //     console.log('스모킹 온')
                        //     setIsInSmokingArea(true);
                        //     dispatch(onSmokingArea())
                        //     // dispatch(Enter_SmokingArea());
                        //     // console.log("흡연구역 입장", isInSmokingArea);
                        // }
                        if (!smokingAreaFlag.current) {
                            smokingAreaFlag.current = true
                            dispatch(onSmokingArea())
                        }
                    }
                    else if ((currentPosition.x >= 66 && currentPosition.x <= 126) &&
                        (currentPosition.z >= -230 && currentPosition.z < -200)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(75, 20, -272)
                        }
                        if (!isGoldBoxArea3) {
                            console.log('코인 온')
                            setisGoldBoxArea3(true)
                            dispatch(EnterGoldBoxArea('isZone3'));
                            // console.log("나눔의 숲 보물상자 진입")
                        }
                    }
                    else {
                        if (gsapCameraState) {
                            setGsapCameraState(false)
                        }

                        if (isGoldBoxArea3) {
                            console.log('코인 오프')
                            setisGoldBoxArea3(false);
                            dispatch(LeaveGoldBoxArea('isZone3', 'hasVisitedZone3'))
                            // console.log("나눔의 숲 보물상자 탈출")
                        }

                        // if (isInSmokingArea) {
                        //     console.log('스모킹 오프')
                        //     setIsInSmokingArea(false);
                        //     dispatch(initSmokingArea())
                        //     // dispatch(Leave_SmokingArea());
                        //     // console.log("흡연구역 퇴장", isInSmokingArea);
                        // }
                        if (smokingAreaFlag.current) {
                            smokingAreaFlag.current = false
                            dispatch(initSmokingArea())
                        }
                    }
                }

                // 학교입구, 유한TV, 나눔의 숲 입구, Welcome Zone 사이
                if (currentPosition.z <= -340) {
                    if (currentPosition.x >= -128 && currentPosition.x <= -30) {
                        // console.log("학교입구, 유한TV, 나눔의 숲 입구, Welcome Zone 사이")
                        // console.log('test')
                        handleCamera(currentPosition.x - 180, currentPosition.y + 350, currentPosition.z + 180)
                    }
                }

                // Welcome Zone
                if ((currentPosition.x <= -260 && currentPosition.x >= -286) &&
                    (currentPosition.z <= -420 && currentPosition.z >= -450)) {
                    // console.log('Welcome Zone 진입')
                    if (!welcomeZoneCameraFlag.current) {
                        welcomeZoneCameraFlag.current = true
                        setGsapCameraState(true)
                        handleGSAPCamera(-115, 30, -370)
                        dispatch(welcomeGuide())
                    }
                }
                else {
                    if (welcomeZoneCameraFlag.current) {
                        welcomeZoneCameraFlag.current = false
                        if (gsapCameraState) {
                            // console.log("Welcome setGsapCameraState")
                            setGsapCameraState(false)
                            dispatch(initGuide())
                        }
                    }
                }

                // 유한TV Zone
                if ((currentPosition.x <= -108 && currentPosition.x >= -148) &&
                    (currentPosition.z <= -410 && currentPosition.z >= -450)) {
                    // console.log('유한TV Zone 진입')
                    if (!yuhanTvZoneCameraFlag.current) {
                        yuhanTvZoneCameraFlag.current = true
                        setGsapCameraState(true)
                        handleGSAPCamera(-128, 35, -250)
                        dispatch(tvGuide())
                    }
                }
                else {
                    if (yuhanTvZoneCameraFlag.current) {
                        yuhanTvZoneCameraFlag.current = false
                        if (gsapCameraState) {
                            // console.log("유한TV setGsapCameraState")
                            setGsapCameraState(false)
                            dispatch(initGuide())
                        }
                    }
                }

                // 학교입구
                if ((currentPosition.x > -32 && currentPosition.x <= 250) &&
                    (currentPosition.z < -325 && currentPosition.z >= -560)) {
                    handleCamera(currentPosition.x + 180, currentPosition.y + 200, currentPosition.z + 0)
                    // 동상 Zone
                    if ((currentPosition.x >= 22 && currentPosition.x <= 62) &&
                        (currentPosition.z >= -535 && currentPosition.z <= -495)) {
                        if (!yuhanStatueCameraFlag.current) {
                            yuhanStatueCameraFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(200, 75, -385)
                            dispatch(statueGuide())
                        }
                        if (!isInStatueZone) {
                            setIsInStatueZone(true);
                            dispatch(Enter_Statue());
                            // console.log("동상 입장", isInStatueZone);
                        }
                    }
                    else {
                        if (yuhanStatueCameraFlag.current) {
                            yuhanStatueCameraFlag.current = false
                            if (gsapCameraState) {
                                // console.log("동상 setGsapCameraState")
                                setGsapCameraState(false)
                                dispatch(initGuide())
                            }
                        }
                        if (isInStatueZone) {
                            setIsInStatueZone(false);
                            dispatch(Leave_Statue());
                            // console.log("동상 퇴장", isInStatueZone);
                        }
                    }
                }
                else {
                    if (isInStatueZone) {
                        setIsInStatueZone(false);
                        dispatch(Leave_Statue());
                        // console.log("동상 퇴장", isInStatueZone);
                    }
                }
            }
            else if (groundMapState.mapName === 'mini_game_map') {
                // return
                if (currentPosition.x === 0 && currentPosition.z === 0) {
                    handleGSAPCamera(0, 50, 75)
                }

                // 1사분면
                if ((currentPosition.x > 0 && currentPosition.x <= 250) &&
                    (currentPosition.z >= -250 && currentPosition.z <= 0)) {
                    handleCamera(currentPosition.x + -200, currentPosition.y + 130, currentPosition.z + 200)
                }

                // 2사분면
                if ((currentPosition.x < 0 && currentPosition.x >= -250) &&
                    (currentPosition.z >= -250 && currentPosition.z <= 0)) {
                    handleCamera(currentPosition.x + 100, currentPosition.y + 100, currentPosition.z + 100)
                }

                // 3, 4사분면
                if ((currentPosition.x <= 250 && currentPosition.x >= -250) &&
                    (currentPosition.z > 0 && currentPosition.z <= 250)) {
                    handleCamera(currentPosition.x, currentPosition.y + 350, currentPosition.z + 350)
                }
            }
            else {
                // return

                // 학과맵일 경우
                if (currentPosition.x === 0 && currentPosition.z === 0) {
                    handleGSAPCamera(0, 50, 75)
                }

                // 1사분면 : 학과소개영역
                if ((currentPosition.x > 0 && currentPosition.x <= 250) &&
                    (currentPosition.z >= -250 && currentPosition.z <= 0)) {
                    handleCamera(currentPosition.x + -200, currentPosition.y + 130, currentPosition.z + 200)

                    // 교육목표
                    if ((currentPosition.x >= 77 && currentPosition.x <= 117) &&
                        (currentPosition.z >= -75 && currentPosition.z <= -35)) {
                        if (!deptInfoEduGoalsDispatchFlag.current) {
                            deptInfoEduGoalsDispatchFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(7, 50, 35)
                            dispatch(deptInfoEduGoals())
                        }
                    }
                    else {
                        if (deptInfoEduGoalsDispatchFlag.current) {
                            // console.log("교육목표 setGsapCameraState")
                            deptInfoEduGoalsDispatchFlag.current = false
                            setGsapCameraState(false)
                            dispatch(initDeptInfo())
                        }
                    }

                    // 전공교육분야
                    if ((currentPosition.x >= 35 && currentPosition.x <= 75) &&
                        (currentPosition.z >= -115 && currentPosition.z < -75)) {
                        if (!deptInfoMainEduFieldsDispatchFlag.current) {
                            deptInfoMainEduFieldsDispatchFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(25, 50, -35)
                            dispatch(deptInfoMainEduFields())
                        }
                    }
                    else {
                        if (deptInfoMainEduFieldsDispatchFlag.current) {
                            // console.log("전공교육분야 setGsapCameraState")
                            deptInfoMainEduFieldsDispatchFlag.current = false
                            setGsapCameraState(false)
                            dispatch(initDeptInfo())
                        }
                    }

                    // 학과특징
                    if ((currentPosition.x >= 127 && currentPosition.x <= 167) &&
                        (currentPosition.z >= -160 && currentPosition.z <= -120)) {
                        if (!deptInfoDeptFeaturesDispatchFlag.current) {
                            deptInfoDeptFeaturesDispatchFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(97, 50, -90)
                            dispatch(deptInfoDeptFeatures())
                        }
                    }
                    else {
                        if (deptInfoDeptFeaturesDispatchFlag.current) {
                            // console.log("학과특징 setGsapCameraState")
                            deptInfoDeptFeaturesDispatchFlag.current = false
                            setGsapCameraState(false)
                            dispatch(initDeptInfo())
                        }
                    }

                    // 진로 및 취업분야
                    if ((currentPosition.x >= 27 && currentPosition.x <= 67) &&
                        (currentPosition.z >= -189 && currentPosition.z <= -149)) {
                        if (!deptInfoCareerAndEmploymentFieldDispatchFlag.current) {
                            deptInfoCareerAndEmploymentFieldDispatchFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(-3, 70, -119)
                            dispatch(deptInfoCareerAndEmploymentField())
                        }
                    }
                    else {
                        if (deptInfoCareerAndEmploymentFieldDispatchFlag.current) {
                            // console.log("진로 및 취업분야 setGsapCameraState")
                            deptInfoCareerAndEmploymentFieldDispatchFlag.current = false
                            setGsapCameraState(false)
                            dispatch(initDeptInfo())
                        }
                    }

                    // 자격증
                    if ((currentPosition.x >= 180 && currentPosition.x <= 220) &&
                        (currentPosition.z >= -70 && currentPosition.z <= -30)) {
                        if (!deptInfoLicenseDispatchFlag.current) {
                            deptInfoLicenseDispatchFlag.current = true
                            setGsapCameraState(true)
                            handleGSAPCamera(110, 50, -50)
                            dispatch(deptInfoLicense())
                        }
                    }
                    else {
                        if (deptInfoLicenseDispatchFlag.current) {
                            // console.log("자격증 setGsapCameraState")
                            setGsapCameraState(false)
                            deptInfoLicenseDispatchFlag.current = false
                            dispatch(initDeptInfo())
                        }
                    }
                }

                // 2사분면 & 3사분면 : 학과체험영역
                if ((currentPosition.x < 0 && currentPosition.x >= -250) &&
                    (currentPosition.z >= -250 && currentPosition.z <= 0)) {
                    handleCamera(currentPosition.x + 100, currentPosition.y + 100, currentPosition.z + 100)

                    // 학과장 영역
                    if ((currentPosition.x >= -165 && currentPosition.x <= -85) &&
                        (currentPosition.z >= -165 && currentPosition.z <= -85)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(-50, 50, -30)
                        }
                        if (!deptHeadAniFlag.current) {
                            deptHeadAniFlag.current = true
                            dispatch(deptHeadAniMove())
                        }
                    }
                    else {
                        if (gsapCameraState) {
                            // console.log("학과장 setGsapCameraState")
                            setGsapCameraState(false)
                        }
                        if (deptHeadAniFlag.current) {
                            deptHeadAniFlag.current = false
                            dispatch(deptHeadAniInit())
                        }
                    }
                }
                if ((currentPosition.x < 0 && currentPosition.x >= -250) &&
                    (currentPosition.z >= 0 && currentPosition.z <= 250)) {
                    handleCamera(currentPosition.x + 90, currentPosition.y + 40, currentPosition.z)
                    // 3등 작품 영역
                    if ((currentPosition.x >= -145 && currentPosition.x <= -107) &&
                        (currentPosition.z >= 150 && currentPosition.z <= 191)) {
                        if (!isThirdWork) {
                            setIsThirdWork(true);
                            dispatch(Enter_Third_Work());
                            // console.log("3등 작품 영역에 들어왔습니다.");
                        }
                    }

                    // 1등 작품 영역
                    else if ((currentPosition.x >= -145 && currentPosition.x <= -107) &&
                        (currentPosition.z >= 85 && currentPosition.z <= 121)) {
                        if (!isFirstWork) {
                            setIsFirstWork(true);
                            dispatch(Enter_First_Work());
                            // console.log("1등 작품 영역에 들어왔습니다.");
                        }
                    }

                    // 2등 작품 영역
                    else if ((currentPosition.x >= -145 && currentPosition.x <= -107) &&
                        (currentPosition.z >= 5 && currentPosition.z <= 57)) {
                        if (!isSecondWork) {
                            setIsSecondWork(true);
                            dispatch(Enter_Second_Work());
                            // console.log("2등 작품 영역에 들어왔습니다.");
                        }
                    }

                    // 퇴장 처리
                    else {
                        // 3등 영역 퇴장
                        if (isThirdWork) {
                            setIsThirdWork(false);
                            dispatch(Leave_Third_Work());
                            // console.log("3등 작품 영역에서 나갔습니다.");
                        }
                        // 1등 영역 퇴장
                        else if (isFirstWork) {
                            setIsFirstWork(false);
                            dispatch(Leave_First_Work());
                            // console.log("1등 작품 영역에서 나갔습니다.");
                        }
                        // 2등 영역 퇴장
                        else if (isSecondWork) {
                            setIsSecondWork(false);
                            dispatch(Leave_Second_Work());
                            // console.log("2등 작품 영역에서 나갔습니다.");
                        }
                    }
                }

                // 4사분면 : 미니게임
                if ((currentPosition.x >= 140 && currentPosition.x <= 250) &&
                    (currentPosition.z >= 100 && currentPosition.z <= 250)) {
                    handleCamera(currentPosition.x + -90, currentPosition.y + 120, currentPosition.z + 0)
                }
                // 4사분면 : 자유영역
                if ((currentPosition.x > 0 && currentPosition.x <= 250) &&
                    (currentPosition.z >= 0 && currentPosition.z <= 250)) {
                    handleCamera(currentPosition.x + -100, currentPosition.y + 100, currentPosition.z + -100)
                    // 코딩체험 위치
                    if ((currentPosition.x <= 70 && currentPosition.x >= 30) &&
                        (currentPosition.z <= 220 && currentPosition.z >= 180)) {
                        if (!gsapCameraState) {
                            setGsapCameraState(true)
                            handleGSAPCamera(0, 10, 0)
                        }
                        if (!isCodingArea) {
                            setIsCodingArea(true)
                            dispatch(enterCodingArea())
                        }
                    }
                    else {
                        if (gsapCameraState) {
                            setGsapCameraState(false)
                        }
                        if (isCodingArea) {
                            setIsCodingArea(false);
                            dispatch(initCodingArea())
                            // console.log("코딩영역을 떠났습니다.");
                        }
                    }
                }
                dispatch(initBusStation()); // 버스정류장 초기화
            }

            camera.lookAt(currentPosition)

            if (distance > 0.4) {
                // 방향을 구하고 스칼라를 곱하여 이동량을 설정
                const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize().multiplyScalar(0.5)
                // console.log('targetPosition', targetPosition)
                // 현재 위치에 방향을 더해 새로운 위치를 설정
                currentPosition.add(direction)

                // 물리 엔진에서 캐릭터의 위치를 업데이트
                currentPosition.copy(currentPosition)

                // 캐릭터가 이동 방향을 바라보도록 설정
                charRef.current.lookAt(targetPosition)

                if (point) {
                    point.style.transform = `
                        translate(${calculateMinimapPosition(currentPosition).x}px,
                        ${(calculateMinimapPosition(currentPosition).y)}px)
                    `
                }

                setAnimation('WalkSpeed24')
            } else {
                setAnimation('Stand')
            }
            mixer.update(0.01)
        }
    })
    return { nodes, materials, charRef }
}