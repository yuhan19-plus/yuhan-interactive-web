/**
 * 오자현
 * 코딩경험 모달 컴포넌트
 * 
 * 기능 구현 - 오자현
 * - 언어선택, 숫자입력
 */
import { FormControlLabel, Input, Radio, RadioGroup } from "@mui/material";
import { Html } from "@react-three/drei";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { CodingExperienceCode } from "../../../../../../../../../data/commonData";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJava } from "@fortawesome/free-brands-svg-icons";
import { faC } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";

const CodingModal = ({ inputNumber }) => {
    const CZone = useSelector((state) => state.goldBox.hasVisitedZone1);// 1번 진입했었는지 여부
    const JavaZone = useSelector((state) => state.goldBox.hasVisitedZone2);// 2번 진입했었는지 여부
    const PythonZone = useSelector((state) => state.goldBox.hasVisitedZone3);// 3번 진입했었는지 여부

    const [selectLanguage, setSelectLanguage] = useState('');
    const [num, setNum] = useState('');

    // 언어선택핸들러
    const handleLanguageChange = (event) => {
        setSelectLanguage(event.target.value);
        // console.log("Selected language:", event.target.value);
    };

    // 숫자변경핸들러
    const handleNumChange = (event) => {
        const value = event.target.value;
        // 숫자 입력만 허용하고 마지막 숫자만 남기도록 처리
        if (/^[0-9]+$/.test(value)) {
            const lastNum = value.slice(-1);
            setNum(lastNum);
        }
    };
    // 코드를 가져와서 '정수형데이터'를 기준으로 나누는 함수
    const splitCodes = CodingExperienceCode.map(code => {
        const [part1, part2] = code.split("'정수형데이터'");
        return { part1, part2 };
    });

    useEffect(() => {
        if ((CZone || JavaZone || PythonZone) && selectLanguage) {
            inputNumber(num); // ResultTextObject.jsx로 num을 전달 
        }
    }, [num]);

    useEffect(() => {
        // 진입한 Zone을 기준으로 언어설정
        if (CZone) {
            setSelectLanguage('C');
        } else if (JavaZone) {
            setSelectLanguage('Java');
        } else if (PythonZone) {
            setSelectLanguage('Python');
        }
    }, [CZone, JavaZone, PythonZone]);

    return (
        <Html position={[-60, 0, 240]} center>
            <MainContainer
                // 마우스클릭 이벤트전파를 차단하는 부분 (※이유 모달창을 클릭 시 케릭터이동을 차단)
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
            >
                <IconContainer>
                    {!CZone ? (<FontAwesomeIcon icon={faC} style={{color: 'gray' }} />) : (<FontAwesomeIcon icon={faC} style={{color: '#0000FF' }} />)}
                    {!JavaZone ? (<FontAwesomeIcon icon={faJava} style={{color: 'gray' }} />) : (<FontAwesomeIcon icon={faJava} style={{color: '#FF0000' }} />)}
                    {!PythonZone ? (<FontAwesomeIcon icon={faPython} style={{color: 'gray' }} />) : (<FontAwesomeIcon icon={faPython} style={{color: '#FFFF00' }} />)}
                </IconContainer>
                {(CZone || JavaZone || PythonZone) ? ( // 보물을 찾아야 언어를 선택가능
                    <>
                        <CodeTitle>
                            <ChooseLanguage>언어 선택</ChooseLanguage>
                            <RadioGroup row value={selectLanguage} onChange={handleLanguageChange}>
                                <>
                                    {CZone && (
                                        <FormControlLabel value="C" control={<Radio />} label="C" />
                                    )}
                                    {JavaZone && (
                                        <FormControlLabel value="Java" control={<Radio />} label="Java" />
                                    )}
                                    {PythonZone && (
                                        <FormControlLabel value="Python" control={<Radio />} label="Python" />
                                    )}
                                </>

                            </RadioGroup>
                            <p>간단한 구구단 코드</p>
                            <p>0~9까지만 가능</p>
                        </CodeTitle>
                        <CodeContainer>
                            {selectLanguage === "C" &&
                                <>
                                    {splitCodes[0].part1}
                                    <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} />
                                    {splitCodes[0].part2}
                                </>}
                            {selectLanguage === "Java" &&
                                <>
                                    {splitCodes[1].part1}
                                    <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} />
                                    {splitCodes[1].part2}
                                </>
                            }
                            {selectLanguage === "Python" &&
                                <>
                                    {splitCodes[2].part1}
                                    <Input type="number" value={num} onChange={handleNumChange} style={{ width: "2vw" }} />
                                    {splitCodes[2].part2}
                                </>
                            }
                        </CodeContainer>
                    </>
                ) : (
                    <GoldBoxInfo>보물을 찾아 언어를 얻어주세요</GoldBoxInfo>
                )}

            </MainContainer>
        </Html>
    );
};

export default CodingModal;

const MainContainer = styled.div`
    background-color: var(--sub-color);
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;
    width: 35vw;
    height: 50vh;
`;

const CodeContainer = styled.div`
    width: 100%;
    background-color: #F0F0F0;
    padding: 1rem;
    border-radius: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
`;

const CodeTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const GoldBoxInfo = styled.div` /* 찾은 언어가 없는 경우 문구 style */
    font-weight: 900;
    color: var(--error-color);
    font-size: 1.2rem;
    margin-top: 1.5rem;
`

const IconContainer = styled.div` /* 아이콘을 상단에 고정 */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2rem;
`;

const ChooseLanguage = styled.div`
    padding: 0;
    margin-top: 1rem;
`