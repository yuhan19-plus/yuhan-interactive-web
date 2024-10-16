import { FormControlLabel, Input, Radio, RadioGroup } from "@mui/material";
import { Html } from "@react-three/drei";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { CodingExperienceCode } from "../../../../../../../../data/commonData";

const CodingExperience = ({ onResultCode }) => {
    const [selectLanguage, setSelectLanguage] = useState('C');
    const [num, setNum] = useState(5);

    const handleLanguageChange = (event) => {
        setSelectLanguage(event.target.value);
        // console.log("Selected language:", event.target.value);
    };

    const handleNumChange = (event) => {
        const value = event.target.value;
        // 숫자 입력만 허용하고 마지막 숫자만 남기도록 처리
        if (/^[0-9]+$/.test(value)) {
            const lastNum = value.slice(-1);
            setNum(lastNum);
        }
    };

    useEffect(() => {
        onResultCode(num); // ThreeDCode.jsx로 값을 전달 실행   
    }, [num]);

    const splitCodes = CodingExperienceCode.map(code => {
        const [part1, part2] = code.split("'정수형데이터'");
        return { part1, part2 };
    });

    return (
        <Html position={[-20, 0, 240]} center>
            <MainContainer
                $selectLanguage={selectLanguage} // $를 이용하여 해당 컴포넌트의 속성으로 사용함 (MainContainer)
                // 마우스클릭 이벤트전파를 차단하는 부분 (※이유 모달창을 클릭 시 케릭터이동을 차단)
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
            >
                <CodeTitle>
                    <h4>언어 선택</h4>
                    <RadioGroup row value={selectLanguage} onChange={handleLanguageChange}>
                        <FormControlLabel value="C" control={<Radio />} label="C" />
                        <FormControlLabel value="Java" control={<Radio />} label="Java" />
                        <FormControlLabel value="Python" control={<Radio />} label="Python" />
                    </RadioGroup>
                    <p>간단한 구구단 코드</p>
                    <p>0~9까지만 가능</p>
                </CodeTitle>
                <CodeContainer>
                    {selectLanguage === "C" &&
                        <>
                            {splitCodes[0].part1}
                            <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                            {splitCodes[0].part2}
                        </>}
                    {selectLanguage === "Java" &&
                        <>
                            {splitCodes[1].part1}
                            <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                            {splitCodes[1].part2}
                        </>
                    }
                    {selectLanguage === "Python" &&
                        <>
                            {splitCodes[2].part1}
                            <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                            {splitCodes[2].part2}
                        </>
                    }
                </CodeContainer>
            </MainContainer>
        </Html>
    );
};

export default CodingExperience;

const MainContainer = styled.div`
    background-color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    width: ${(props) =>
        props.$selectLanguage === 'C' ? '25vw' :
            props.$selectLanguage === 'Java' ? '32vw' : '20vw'};
    height: ${(props) =>
        props.$selectLanguage === 'C' ? '40vh' :
            props.$selectLanguage === 'Java' ? '35vh' : '30vh'};
`;

const CodeContainer = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    padding: 10px;
    white-space: pre-wrap;
    word-break: break-word;
`;
const CodeTitle = styled.div`
    text-align: center;
`

const CodeArea = styled.div`
    width: 100%;

`