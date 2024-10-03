import { useEffect, useState } from "react";
import CodingExperience from "./coding/CodingExperience";
import ThreeDCode from "./coding/ThreeDCode";

const CodingGroup = () => {
    const [resultCode, setResultCode] = useState('');
    const handleCode = (Code) => {
        setResultCode(Code)
    }

    useEffect(() =>{
        console.log(resultCode);
    },[resultCode])

    return (
        <>
            <CodingExperience onResultCode={handleCode} />
            <ThreeDCode resultCode={resultCode}/>
        </>
    )
}

export default CodingGroup;