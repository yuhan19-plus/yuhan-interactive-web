/**
 * 오자현
 */
import { useEffect, useState } from "react";
import CodingExperience from "./coding/CodingExperience";
import ThreeDCode from "./coding/ThreeDCode";
import { useSelector } from "react-redux";

const CodingGroup = () => {
    const [resultCode, setResultCode] = useState('');
    const isInCodingArea = useSelector(state => state.codingArea.value);

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
                    {/* {console.log("학과맵에 있으며 코딩 영역에 진입하여 컴포넌트가 렌더링됩니다.", isInCodingArea)} */}
                    <CodingExperience onResultCode={handleCode} />
                    <ThreeDCode resultCode={resultCode} />
                </>
            )}
        </>
    )
}

export default CodingGroup;