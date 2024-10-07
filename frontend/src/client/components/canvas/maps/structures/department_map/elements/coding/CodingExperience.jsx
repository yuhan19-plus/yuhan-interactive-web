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
        <Html position={[100, 0, 50]} center>
            <MainContainer
                selectLanguage={selectLanguage} // styled에 언어별로 영역을 다르게 설정한 것에 값을 넣어주는 부분
                // 마우스클릭 이벤트전파를 차단하는 부분 (※이유 모달창을 클릭 시 케릭터이동을 차단)
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
            </MainContainer>
        </Html>
    );
};

export default CodingExperience;

const MainContainer = styled.div`
    background-color: white;
    padding: 10px;
    /* 언어별로 영역을 다르게 설정 */
    width: ${(props) =>
        props.selectLanguage === 'C' ? '25vw' :
            props.selectLanguage === 'Java' ? '32vw' :
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