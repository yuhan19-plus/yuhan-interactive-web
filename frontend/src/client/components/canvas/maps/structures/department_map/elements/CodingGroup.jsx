/**
 * 오자현
 */
import { useEffect, useState } from "react";
import CodingExperience from "./coding/CodingExperience";
import ThreeDCode from "./coding/ThreeDCode";
import { useSelector } from "react-redux";

const CodingGroup = () => {
    const isInCodingArea = useSelector(state => state.codingArea.value);
    const [resultCode, setResultCode] = useState('');

    const handleCode = (Code) => {
        setResultCode(Code)
    }

    // useEffect(() =>{
    //     console.log(resultCode);
    // },[resultCode])

    return (
        <>
            {isInCodingArea && (
                <>
                    <CodingExperience onResultCode={handleCode} />
                    <ThreeDCode resultCode={resultCode} />
                </>
            )}
        </>
    )
}

export default CodingGroup;