// /** 파일생성자 : 임성준
//  * 임성준 : 프론트엔드 개발
//  * 
//  */
// import React, { useEffect, useState } from 'react'
// import DeptElements from './elements/DeptElements'
// import { useDispatch, useSelector } from 'react-redux'
// import { mainCharDept } from '../../../../../../redux/actions/actions'
// import DeptFloor from './elements/DeptFloor'
// import { MainCharacter } from '../../player/main/MainCharacter'

// const DeptMap = (props) => {
//     const dispatch = useDispatch()
//     const myChar = useSelector((state) => state.mChar)
//     const [targetPosition, setTargetPosition] = useState(myChar.deptInitPosition)
//     console.log(targetPosition)

//     useEffect(() => {
//         dispatch(mainCharDept(targetPosition))
//     }, [targetPosition])

//     const handleMove = (newPosition) => {
//         // console.log('newPosition', newPosition)
//         setTargetPosition(newPosition)
//     }

//     return (
//         <group>
//             <DeptFloor
//                 onMove={handleMove}
//             />
//             <DeptElements />

//             {/* React.Fragment: DOM 요소를 생성하지 않고 묶게 해줌 */}
//             <React.Fragment>
//                 {/* 캐릭터 이동에 클릭한 위치를 전달, 초기에는 null 상태 */}
//                 {(targetPosition && myChar !== '') && (
//                     <MainCharacter myChar={myChar} position={targetPosition} />
//                 )}
                
//                 {/* <MainCharacter myChar={myChar} position={targetPosition} /> */}
//             </React.Fragment>
//         </group>
//     )
// }

// export default DeptMap
/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React, { useEffect, useState } from 'react'
import DeptElements from './elements/DeptElements'
import { useDispatch, useSelector } from 'react-redux'
import { mainCharDept } from '../../../../../../redux/actions/actions'
import DeptFloor from './elements/DeptFloor'
import { MainCharacter } from '../../player/main/MainCharacter'

const DeptMap = () => {
    const dispatch = useDispatch()
    const myChar = useSelector((state) => state.mChar)
    const [targetPosition, setTargetPosition] = useState(myChar.deptInitPosition)
    console.log('dept targetPosition', targetPosition)
    useEffect(() => {
        if (targetPosition) {
            dispatch(mainCharDept(targetPosition))
        }
    }, [targetPosition, dispatch]) // dispatch가 외부 함수이므로 의존성 배열에 추가

    const handleMove = (newPosition) => {
        setTargetPosition(newPosition)
    }

    return (
        <group>
            {/* DeptFloor 컴포넌트에 캐릭터 이동 관련 핸들러 전달 */}
            <DeptFloor
                position={[0, -50, 0]}
                onMove={handleMove}
            />
            <DeptElements />
            
            {/* React.Fragment: DOM 요소를 생성하지 않고 묶게 해줌 */}
            <React.Fragment>
                {/* 캐릭터가 있는 경우에만 MainCharacter 컴포넌트 렌더링 */}
                {targetPosition && myChar !== '' && (
                    <MainCharacter myChar={myChar} position={targetPosition} />
                )}
            </React.Fragment>
            
        </group>
    )
}

export default DeptMap
