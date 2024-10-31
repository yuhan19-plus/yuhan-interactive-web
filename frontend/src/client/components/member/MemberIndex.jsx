/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 * 이석재
 *   - 회원정보 수정 라우트 로직 추가
 */
import React from 'react'
import MemberLogin from './MemberLogin'
import MemberJoin from './MemberJoin'
import MemberModify from './MemberModify'
import styled from 'styled-components'
import Footer from '../../../common/components/Footer'
import { Outlet } from 'react-router-dom'
import MemberHeader from './MemberHeader'

const MemberIndex = (props) => {
    const { value } = props
    return (
        <div className='wrapper'>
            <div className='container'>
                <div className='header'>
                    <MemberHeader />
                </div>
                <MemberContentWrapper>
                    <Outlet />
                    <MemberContainer>
                        {
                            value === 'login' ? <MemberLogin /> : 
                            value === 'join' ? <MemberJoin /> : 
                            value === 'modify' ? <MemberModify /> : null
                        }
                    </MemberContainer>
                </MemberContentWrapper>
            </div>
            <div className='footer-wrapper'>
                <Footer />
            </div>
        </div>
    )
}

const MemberContentWrapper = styled.div`
    margin-top: 3rem;
    padding: 1.5rem 5rem;
`

const MemberContainer = styled.div`
    margin: 0 auto;
    padding: 1.3rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    box-shadow:  7px 7px 9px #d9d9d9,
                -7px -7px 9px #ffffff;
`

export default MemberIndex