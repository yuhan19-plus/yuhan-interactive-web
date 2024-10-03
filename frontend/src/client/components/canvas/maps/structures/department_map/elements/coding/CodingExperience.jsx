import { FormControlLabel, Input, Radio, RadioGroup } from "@mui/material";
import { Html } from "@react-three/drei";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { CodingExperienceCode } from "../../../../../../../../data/commonData";

const CodingExperience = ({ onResultCode }) => {
    const [selectLanguage, setSelectLanguage] = useState('C');
    const [num, setNum] = useState('');
    const [resultCode, setResultCode] = useState('');

    const handleLanguageChange = (event) => {
        setSelectLanguage(event.target.value);
    };

    const handleNumChange = (event) => {
        setNum(event.target.value);
    };

    useEffect(() => {
        if (num !== '') {
            let result = '';
            for (let i = 1; i <= 9; i++) {
                result += `${num} * ${i} = ${num * i}\n`;
            }
            setResultCode(result);
            onResultCode(result)
        } else {
            setResultCode('');
        }
    }, [num]); // num이 변경될 때마다 실행


    return (
        <Html position={[100, 0, 50]} center>
            <MainContainer
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
            >
                <h3>언어 선택</h3>
                <RadioGroup row value={selectLanguage} onChange={handleLanguageChange}>
                    <FormControlLabel value="C" control={<Radio />} label="C" />
                    <FormControlLabel value="Java" control={<Radio />} label="Java" />
                    <FormControlLabel value="Python" control={<Radio />} label="Python" />
                </RadioGroup>
                <h3>간단한 구구단 코드</h3>
                <CodeContainer>
                    <Input type="text" value={num} onChange={handleNumChange} style={{ width: "5vw" }} placeholder="정수데이터" />
                    <br />
                    {selectLanguage === "C" && (CodingExperienceCode[0])}
                    {selectLanguage === "Java" && (CodingExperienceCode[1])}
                    {selectLanguage === "Python" && (CodingExperienceCode[2])}
                </CodeContainer>
                <CodeResult>

                </CodeResult>
            </MainContainer>
        </Html>
    );
};

export default CodingExperience;

const MainContainer = styled.div`
    background-color: white;
    padding: 10px;
    width: 30vw;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const CodeContainer = styled.pre`
    background-color: #f0f0f0;
    padding: 10px;
    white-space: pre-wrap;
    word-break: break-word;
`;

const CodeResult = styled.div`
    
`;