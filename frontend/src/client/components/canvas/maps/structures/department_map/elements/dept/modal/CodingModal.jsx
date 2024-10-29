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
            inputNumber(num); // ResultTextObject.jsx로 값을 전달 
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
        <Html position={[-20, 0, 240]} center>
            <MainContainer
                // 마우스클릭 이벤트전파를 차단하는 부분 (※이유 모달창을 클릭 시 케릭터이동을 차단)
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
            >
                <IconContainer>
                    {!CZone ? (<IconStyle icon={faC} />) : (<VisitedIconC icon={faC} />)}
                    {!JavaZone ? (<IconStyle icon={faJava} />) : (<VisitedIconJava icon={faJava} />)}
                    {!PythonZone ? (<IconStyle icon={faPython} />) : (<VisitedIconPython icon={faPython} />)}
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
    background-color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 35vw;
    height: 35vh;
`;

const CodeContainer = styled.div`
    width: 95%;
    background-color: #f0f0f0;
    padding: 1%;
    border-radius: 2.5%;
    white-space: pre-wrap;
    word-break: break-word;
`;
const CodeTitle = styled.div`
    text-align: center;
`

const GoldBoxInfo = styled.div` /* 찾은 언어가 없는 경우 문구 style */
    font-size: large;
    font-weight: 900;
    color: red;
`
const IconContainer = styled.div` /* 아이콘을 상단에 고정 */
    position: absolute;
    top: 0;
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`;

const IconStyle = styled(FontAwesomeIcon)`
    font-size: 2rem;
`;
const VisitedIconJava = styled(FontAwesomeIcon)`/* Java 아이콘 style */
    font-size: 2rem;
    color: red;
`;
const VisitedIconC = styled(FontAwesomeIcon)`/* C언어 아이콘 style */
    font-size: 2rem;
    color: purple; 
`;
const VisitedIconPython = styled(FontAwesomeIcon)` /* 파이썬 아이콘 style */
    font-size: 2rem;
    color: blue;
`;
const ChooseLanguage = styled.div`
    padding: 0;
    margin: 0;
    margin-top: 4vh;
`