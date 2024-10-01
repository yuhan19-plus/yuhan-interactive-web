/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React from 'react'
import styled from 'styled-components'

const DetailFooter = () => {
    return (
        <>
            <DetailFooterLayout>
                <DetailFooterLogo>
                    {/* 로고 */}
                    <img src='/assets/images/yuhanLogo.png' />
                </DetailFooterLogo>
                <DetailFooterContent>
                    <div>
                        {/* 팀명 */}
                        <p>&copy; 2024 유한대학교 19PLUS 졸업작품</p>
                    </div>
                    <div>
                        {/* 팀원명 */}
                        <p>이석재</p>
                        <p>임성준</p>
                        <p>이정민</p>
                        <p>오자현</p>
                    </div>
                    <div>
                        {/* 학교 */}
                        <p>14780) 경기도 부천시 경인로 590 (괴안동 185-34)</p>
                    </div>
                </DetailFooterContent>
            </DetailFooterLayout>
        </>
    )
}

const DetailFooterLayout = styled.div`
    width: 100%;
    height: 15%;
    background-color: #0F275C;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5% 0.7%;
`

const DetailFooterLogo = styled.div`
    width: 10%;
    height: 100%;
`

const DetailFooterContent = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div > p {
        margin-right: 15px;
    }
`

export default DetailFooter