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
import { Html } from '@react-three/drei';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const StatueModal = ({ position }) => {
    return (
        <Html
            position={position}
            center
        >
            <StatueWrapper
                onPointerUp={(e) => {
                    e.stopPropagation()
                }}
            >
                <StatueContainer>
                    <StatueHeader>
                        <p>설립자 유일한, <StatueTitle>유일한은 누구인가!</StatueTitle></p>
                    </StatueHeader>
                    <StatueContent>
                        <PhotoContainer>
                            <PhotoContent src="assets/images/Yu_ilhan.png" />
                        </PhotoContainer>
                        <p>
                            <strong style={{ color: "#04b45f" }}>유일한 박사</strong>는 새로운 기업 윤리를 이 땅에 남긴
                            <strong style={{ color: "#04b45f" }}>모범적인 기업가</strong>이며,
                            <strong style={{ color: "green" }}>교육자</strong>이며, 
                            <strong style={{ color: "#FFD700" }}>사회사업가</strong>이며,
                            그리고 <strong style={{ color: "red" }}>독립운동가</strong>였다.
                            이러한 그의 공적을 높이 평가하여 1971년의 서거 시에 국가 최고의
                            영예인 <strong style={{ color: "violet" }}>「국민훈장 무궁화장」</strong>이 추서되었으며,
                            1995년 광복 제50주년 경축식에서 <strong style={{ color: "#04b45f" }}>「건국훈장 독립장」</strong>이 추서되었고,
                            1996년에는 문화체육부로부터
                            <strong style={{ color: "orange" }}>「6월의 문화인물」</strong>로 선정되었다.
                        </p>
                        <p>
                            유일한 박사는 일생의 대부분을 일제하에서 <strong style={{ color: "#04b45f" }}>
                            민족 기업을 설립</strong>하고
                            발전시키는 데에 바쳤다.
                            그러나 그와 못지않게 미국에서의 <strong style={{ color: "red" }}>독립투쟁</strong>을 통해
                            조국의 독립을 위해 노력했던 그의 <strong style={{ color: "blue" }}>애국적인 생활</strong>도
                            그의 일생에 중요한 일부분으로 높게 평가되고 있다.
                        </p>
                        <a href="https://newih.yuhan.ac.kr/index.do" target="_blank">
                            <StatueButton>
                                <p>유일한 박사 온라인 기념관으로</p>
                                <FontAwesomeIcon icon={faDoorOpen} />
                            </StatueButton>
                        </a>
                    </StatueContent>
                </StatueContainer>
            </StatueWrapper>
        </Html>
    );
};

export default StatueModal;

const StatueWrapper = styled.div`
    display: flex;
    width: 350px;
`

const StatueContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    padding: 0.5rem;
    background: var(--sub-color);
`

const StatueHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 1.3rem;
`

const StatueTitle = styled.p`
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--main-color);
`

const StatueContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    font-size: 1rem;

    p {
        margin-bottom: 0.7rem;
        line-height: 1.3rem;
    }
`

const StatueButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub-color);
    padding: 0.5rem;
    background: var(--main-color);
    border-radius: 1rem;

    P {
        margin: 0px;
        padding: 0px;
    }

    svg {
        margin-left: 10px;
    }
`

const PhotoContainer = styled.div`
    width: 30%;
`

const PhotoContent = styled.img`
    border-radius: 7px;
    width: 100%;
    height: 100%;
    border: 0.3rem solid var(--font-orange-color)
`