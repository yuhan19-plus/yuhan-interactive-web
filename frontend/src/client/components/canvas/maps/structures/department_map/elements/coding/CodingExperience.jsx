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
        console.log("Selected language:", event.target.value);
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

    const splitCodes = CodingExperienceCode.map(code => {
        const [part1, part2] = code.split("'정수형데이터'");
        return { part1, part2 };
    });

    return (
        <Html position={[100, 0, 50]} center>
            <MainContainer
                selectLanguage={selectLanguage}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
            >
                <h4>언어 선택</h4>
                <RadioGroup row value={selectLanguage} onChange={handleLanguageChange}>
                    <FormControlLabel value="C" control={<Radio />} label="C" />
                    <FormControlLabel value="Java" control={<Radio />} label="Java" />
                    <FormControlLabel value="Python" control={<Radio />} label="Python" />
                </RadioGroup>
                <div>간단한 구구단 코드</div>
                <CodeContainer>
                    {selectLanguage === "C" && <pre>{splitCodes[0].part1}
                        <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                        {splitCodes[0].part2}</pre>}
                    {selectLanguage === "Java" && <pre>{splitCodes[1].part1}
                        <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                        {splitCodes[1].part2}</pre>}
                    {selectLanguage === "Python" && <pre>{splitCodes[2].part1}
                        <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} placeholder="5" />
                        {splitCodes[2].part2}</pre>}
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
    width: ${(props) =>
        props.selectLanguage === 'C' ? '25vw' :
            props.selectLanguage === 'Java' ? '30vw' :
                '20vw'}; 
    height: ${(props) =>
        props.selectLanguage === 'C' ? '40vh' :
            props.selectLanguage === 'Java' ? '35vh' :
                '30vh'}; 
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