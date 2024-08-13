/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React from 'react'
import MemberLogin from './MemberLogin'
import MemberJoin from './MemberJoin'
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
                            value === 'login' ? <MemberLogin /> : <MemberJoin />
                        }
                    </MemberContainer>
                </MemberContentWrapper>
            </div>
            <div className='footer-wrapper'>
                <div className='container'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

const MemberContentWrapper = styled.div`
    margin-top: 50px;
    padding: 35px 150px;
`

const MemberContainer = styled.div`
    margin: 0 auto;
    padding: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 25px;
    box-shadow:  7px 7px 9px #d9d9d9,
                -7px -7px 9px #ffffff;
`

export default MemberIndex