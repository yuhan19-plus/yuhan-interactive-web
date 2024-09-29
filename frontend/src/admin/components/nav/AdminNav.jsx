/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 관리자 로그아웃 기능 구현 완료
 */

import React from 'react'
import styled from 'styled-components'
import { AdminPanelSettings, Logout, ViewInAr } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

const AdminNav = () => {

    const [, ,removeCookie] = useCookies(['adminMode']); // adminMode 쿠키 삭제 함수 사용


    const handleLogout = () => {
        Swal.fire({
            icon: 'success',
            title: '로그아웃 완료',
            text: '관리자 메뉴에서 로그아웃합니다.',
            showCancelButton: false,
            confirmButtonText: '확인'
        }).then((result) => {
            if (result.isConfirmed) {
                removeCookie('adminMode', { path: '/' }); // adminMode 쿠키 삭제
                // 페이지 리다이렉트
                window.location.href = '/'; // 루트 페이지로 리다이렉트
                
            }
        });
    };

    return (
        <>
            <AdminNavList>
                <Link 
                    to={'/admin'}
                    state={{
                        title: '관리자'
                    }}>
                        <AdminPanelSettings className='adminLogo' /><span>Yuhan Admin</span>
                </Link>
                <div>
                    {/* 로그아웃 기능구현할 때 태그 변경할 것 */}
                    <Link to="#" onClick={handleLogout}><p><Logout />&nbsp;로그아웃</p></Link>
                    <Link to={'/'}><p><ViewInAr />&nbsp;3D맵으로</p></Link>
                </div>
            </AdminNavList>
            <AdminButtonList>
                <Link 
                    to={'/admin/member'}
                    state={{
                        title: '회원관리'
                    }}>
                    <AdminButton>회원관리</AdminButton>
                </Link>
                <Link 
                    to={'/admin/foodMenu'}
                    state={{
                        title: '오늘의 메뉴'
                    }}>
                        <AdminButton>오늘의 메뉴</AdminButton>
                    </Link>
                <Link to={'/admin/board'}
                    state={{
                        title: '유한게시판'
                    }}>
                        <AdminButton>유한게시판</AdminButton>
                    </Link>
                <Link 
                    to={'/admin/deptRec'}
                    state={{
                        title: '전공추천'
                    }}>
                        <AdminButton>전공추천</AdminButton>
                    </Link>
                    
                <Link 
                    to={'/admin/report'}
                    state={{
                        title: '신고내역'
                    }}>
                        <AdminButton>신고내역</AdminButton>
                    </Link>
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
    font-size: 20px;
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