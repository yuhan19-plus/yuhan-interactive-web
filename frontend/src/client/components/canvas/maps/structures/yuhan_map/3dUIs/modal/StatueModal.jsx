/**
 * 파일생성자 - 이정민
 * 기능 구현- 이정민
 * 클라이언트(학생)이 동상 구역에 들어갔을 때 출력되는 창
 * 
 * **********************************************************
 * 정리할 부분
 * - 스타일 컴포넌트로 변경 후 코드 정리
 * **********************************************************
 */
import { Grid, Typography } from "@mui/material";
import { Html } from '@react-three/drei';
import React from 'react';
import styled from 'styled-components';

const StatueModal = ({ position }) => {
    return (
        <Html
            position={position}
            center
        >
            <BoardLayout
                onPointerUp={(e) => {
                    e.stopPropagation()
                }}
            >
                <Grid sx={{ background: "white", width: '22vw', height: '45.5vh', margin: 1, boxShadow: 2, padding: 1.2, borderRadius: 2 }} >
                    <Grid sx={{ height: '6.5vh', marginBottom: 1, boxShadow: 2, padding: 1, borderRadius: 2 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', }}>설립자 유일한,</Typography>
                        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'blueviolet' }}>유일한은 누구인가!</Typography>
                    </Grid >
                    <Typography>
                        <p style={{ lineHeight: "19px" }}>
                            <strong style={{ color: "#04b45f" }}>유일한 박사</strong>는 새로운 기업 윤리를 이 땅에 남긴<br />
                            <strong style={{ color: "#04b45f" }}>모범적인 기업가</strong>이며,
                            <strong style={{ color: "green" }}>교육자</strong>이며, 
                            <strong style={{ color: "#FFD700" }}>사회사업가</strong>이며,<br /> 
                            그리고 <strong style={{ color: "red" }}>독립운동가</strong>였다.<br />
                            이러한 그의 공적을 높이 평가하여<br /> 
                            1971년의 서거 시에 국가 최고의
                            영예인<br /> 
                            <strong style={{ color: "violet" }}>「국민훈장 무궁화장」</strong>이 추서되었으며, <br />
                            1995년 광복 제50주년 경축식에서<br /> 
                            <strong style={{ color: "#04b45f" }}>「건국훈장 독립장」</strong>이 추서되었고, <br />
                            1996년에는 문화체육부로부터<br /> 
                            <strong style={{ color: "orange" }}>「6월의 문화인물」</strong>로 선정되었다.<br />
                            유일한 박사는 일생의 대부분을 일제하에서 <strong style={{ color: "#04b45f" }}><br />
                            민족 기업을 설립</strong>하고<br />
                            발전시키는 데에 바쳤다.<br />
                            그러나 그와 못지않게 미국에서의 <strong style={{ color: "red" }}>독립투쟁</strong>을 통해<br />
                            조국의 독립을 위해 노력했던 그의 <strong style={{ color: "blue" }}>애국적인 생활</strong>도<br />
                            그의 일생에 중요한 일부분으로 높게 평가되고 있다.<br />
                        </p>
                    </Typography>
                    <button
                        style={{
                            width: "21vw",
                            height: "3.5vh",
                            marginTop: 8,
                            color: "white",
                            background: "#0F275C",
                            borderRadius: 12
                        }}>
                        <a href="https://newih.yuhan.ac.kr/index.do" target="_blank">유일한 박사 온라인 기념관</a>
                    </button>
                </Grid>

                <Grid sx={{
                    background: "white",
                    display: 'flex',
                    width: '12vw',
                    height: '24vh',
                    padding: '5px',
                    justifyContent: 'center',
                    boxShadow: 2,
                    marginTop: 1,
                    borderRadius: 2,
                }}>
                    <img style={{ boxShadow: 1, borderRadius: 7, width: "100%", height: "100%" }} src="assets/images/Yu_ilhan.png" />
                </Grid>
            </BoardLayout>
        </Html>
    );
};

export default StatueModal;

const BoardLayout = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 66vh;
  height: 50vh;
  background: rgba(0,0,0,0);
`;
