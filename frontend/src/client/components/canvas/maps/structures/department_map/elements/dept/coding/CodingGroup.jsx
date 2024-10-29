/**
 * 오자현
 * 코딩경험 그룹화 컴포넌트 
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CodingModal from "../modal/CodingModal";
import ResultTextObject from "./ResultTextObject";

const CodingGroup = () => {
    const isInCodingArea = useSelector(state => state.codingArea.value);
    const [num, setNum] = useState('');

    const onNum = (Code) => {
        setNum(Code)
    }

    // useEffect(() =>{
    //     console.log(num);
    // },[num])

    return (
        <>
            {isInCodingArea && (
                <>
                    <CodingModal inputNumber={onNum} />
                    <ResultTextObject receivedNumber={num} />
                </>
            )}
        </>
    )
}

export default CodingGroup;