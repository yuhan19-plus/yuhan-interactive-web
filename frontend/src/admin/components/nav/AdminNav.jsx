/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React from 'react'
import styled from 'styled-components'
import { AdminPanelSettings, Logout, ViewInAr } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <>
            <AdminNavList>
                <Link to={'/admin'}><AdminPanelSettings className='adminLogo' /><span>Yuhan Admin</span></Link>
                <div>
                    {/* 로그아웃 기능구현할 때 태그 변경할 것 */}
                    <p><Logout />&nbsp;로그아웃</p>
                    <Link to={'/'}><p><ViewInAr />&nbsp;3D맵으로</p></Link>
                </div>
            </AdminNavList>
            <AdminButtonList>
                <Link to={'/admin/member'}><AdminButton>회원관리</AdminButton></Link>
                <Link to={'/admin/foodMenu'}><AdminButton>오늘의 메뉴</AdminButton></Link>
                <Link to={'/admin/board'}><AdminButton>게시판 관리</AdminButton></Link>
            </AdminButtonList>
        </>
    )
}

const AdminNavList = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > Link {
        display: flex;
        align-items: center;
    }

    span {
        font-size: 42px;
        font-weight: 900;
        color: black;
    }

    p {
        display: flex;
        align-items: center;
        margin-top: 0px;
        color: black;
        svg {
            width: 17px;
            height: 17px;
        }
    }
    svg {
        width: 42px;
        height: 42px;
        color: black;
    }
`

const AdminButtonList = styled.div`
    width: 80%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AdminButton = styled.div`
    padding: 15px 30px;
    font-size: 24px;
    font-weight: 700;
    color: black;
    cursor: pointer;
    border-radius: 25px;
    transition: 0.7s ease-in-out;
    box-shadow:  5px 5px 7px #d9d9d9,
                -5px -5px 7px #ffffff;
    &:hover {
        color: #005850;
        box-shadow: inset 5px 5px 9px #d9d9d9,
                    inset -5px -5px 9px #ffffff;
    }
`

export default AdminNav