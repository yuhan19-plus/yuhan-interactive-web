import { Grid, Typography } from "@mui/material";
import { Html } from '@react-three/drei';
import React from 'react';
import styled from 'styled-components';

const StatueModal = ({ position }) => {
    return (
        <Html position={position} center>
            <BoardLayout>
                <Grid sx={{background:"white",width:'70%', margin:1, boxShadow:2, padding:1.2, borderRadius:2}} >
                <Grid sx={{height:'18%', marginBottom:1, boxShadow:2, padding:1, borderRadius:2}}>
                <Typography sx={{fontSize:'14px', fontWeight:'bold',}}>설립자 유일한,</Typography>
                <Typography sx={{fontSize:'20px', fontWeight:'bold', color:'blueviolet'}}>유일한은 누구인가!</Typography>
                </Grid >
                <p style={{lineHeight: "20px"}}>
                <strong style={{color:"#04b45f"}}>유일한 박사</strong>는 새로운 기업 윤리를 이 땅에 남긴 <strong style={{color:"#04b45f"}}>모범적인 기업가</strong>이며,<br/>
                <strong style={{color:"green"}}>교육자</strong>이며, <strong style={{color:"#FFD700"}}>사회사업가</strong>이며, 그리고 <strong style={{color:"red"}}>독립운동가</strong>였다.<br/>
                이러한 그의 공적을 높이 평가하여 1971년의 서거 시에 국가 최고의 <br/>
                영예인 <strong style={{color:"violet"}}>「국민훈장 무궁화장」</strong>이 추서되었으며, <br/>
                1995년 광복 제50주년 경축식에서 <strong style={{color:"#04b45f"}}>「건국훈장 독립장」</strong>이 추서되었고, <br/>
                1996년에는 문화체육부로부터 <strong style={{color:"orange"}}>「6월의 문화인물」</strong>로 선정되었다.<br/>
                유일한 박사는 일생의 대부분을 일제하에서 <strong style={{color:"#04b45f"}}>민족 기업을 설립</strong>하고<br/> 
                발전시키는 데에 바쳤다.<br/>
                그러나 그와 못지않게 미국에서의 <strong style={{color:"red"}}>독립투쟁</strong>을 통해<br/> 
                조국의 독립을 위해 노력했던 그의 <strong style={{color:"blue"}}>애국적인 생활</strong>도<br/>
                그의 일생에 중요한 일부분으로 높게 평가되고 있다.<br/>
                </p>
                <Grid sx={{
                background:"#0F275C",
                textAlign:'center',
                borderRadius:2,
                width:'100%',
                height:'30px',
                padding:1,
                marginTop:1,
                boxShadow:2,
                }}>
                <a href="https://newih.yuhan.ac.kr/index.do" target="_blank" style={{ color:"white"}}>유일한 박사 온라인 기념관</a>
                </Grid>
                </Grid>
                <Grid sx={{
                background:"white",
                display:'flex', 
                width:'30%',
                height:'50%',
                padding:'5px', 
                justifyContent:'center', 
                boxShadow:2, 
                marginTop:1,
                borderRadius:2,
                }}>
                    <img style={{boxShadow:1,borderRadius:7,width:"100%",height:"100%"}}src="assets/images/Yu_ilhan.png"/>
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
  height: 38vh;
  background: rgba(0,0,0,0);
`;
