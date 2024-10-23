import { FormControlLabel, Input, Radio, RadioGroup } from "@mui/material";
import { Html } from "@react-three/drei";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { CodingExperienceCode } from "../../../../../../../../data/commonData";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJava } from "@fortawesome/free-brands-svg-icons";
import { faC } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";

const CodingExperience = ({ onResultCode }) => {
    const [selectLanguage, setSelectLanguage] = useState('');
    const [num, setNum] = useState('');
    const CZone = useSelector((state) => state.goldBox.hasVisitedZone1);// 1번 진입했었는지 여부
    const JavaZone = useSelector((state) => state.goldBox.hasVisitedZone2);// 2번 진입했었는지 여부
    const PythonZone = useSelector((state) => state.goldBox.hasVisitedZone3);// 3번 진입했었는지 여부

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
        if ((CZone || JavaZone || PythonZone) && selectLanguage) {
            onResultCode(num); // ThreeDCode.jsx로 값을 전달 실행   
        }
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
                <IconContainer>
                    {!JavaZone ? (<IconStyle icon={faJava} />) : (<VisitedIconStyle icon={faJava} />)}
                    {!CZone ? (<IconStyle icon={faC} />) : (<VisitedIconStyle icon={faC} />)}
                    {!PythonZone ? (<IconStyle icon={faPython} />) : (<VisitedIconStyle icon={faPython} />)}
                </IconContainer>
                {(CZone || JavaZone || PythonZone) ? ( // 보물을 찾아야 언어를 선택가능하도록
                    <>
                        <CodeTitle>
                            <ChoseLan>언어 선택</ChoseLan>
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

export default CodingExperience;

const MainContainer = styled.div`
    background-color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width:35vw;
    height: 35vh;
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

const GoldBoxInfo = styled.div`
    font-size: large;
    font-weight: 900;
    color: red;

`
const IconContainer = styled.div`
    position: absolute; /* 상단에 고정 */
    top: 0; /* 위쪽에 고정 */
    height: 10%; /* 높이를 줄여 아이콘만 상단에 고정되게 설정 */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px; /* 아이콘과 경계 사이에 여백 추가 */
`;

const IconStyle = styled(FontAwesomeIcon)`
    font-size: 2rem; /* 아이콘 크기 조정 */
`;
const VisitedIconStyle = styled(FontAwesomeIcon)`
    font-size: 2rem; /* 아이콘 크기 조정 */
    color: red;
`;
const ChoseLan = styled.div`
    padding: 0;
    margin: 0;
    margin-top: 4vh;
`