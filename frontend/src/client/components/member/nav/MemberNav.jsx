import { AdminPanelSettings, Login, Logout, PersonAdd, ViewInAr } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MemberNav = () => {
    return (
        <>
            <MemberNavContainer>
                <img src='./assets/images/yuhan.png' className='image-logo' />
                <MemberNavMenu>
                    <p><Login />&nbsp;로그인</p>
                    <Link to={'/'}><p><PersonAdd />&nbsp;회원가입</p></Link>
                </MemberNavMenu>
            </MemberNavContainer>
        </>
    )
}

const MemberNavContainer = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        width: 42px;
        height: 42px;
        color: black;
    }
`

const MemberNavMenu = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;

    p {
        display: flex;
        align-items: center;
        margin-top: 0px;
        color: black;
        font-size: 32px;

        svg {
            width: 17px;
            height: 17px;
        }
    }
`

export default MemberNav