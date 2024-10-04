/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 관리자 로그아웃 기능 구현 완료
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AdminPanelSettings, Logout, ViewInAr } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Badge } from '@mui/material'
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

const AdminNav = () => {
    const [reportCount, setReportCount] = useState(0);
    // 뱃지에 적용할 숫자를 불러오는 함수
    const fetchBadge = async () => {
        try {
            const response = await fetch(`/api/report/fetchBadge`);
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setReportCount(data.badge)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '데이터 불러오기 실패',
                text: '데이터를 불러오는 중 문제가 발생했습니다.',
                confirmButtonColor: '#d33',
            });
            console.error("데이터 불러오는 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const shouldUpdate = localStorage.getItem('updateBadge');
            if (shouldUpdate === 'true') {
                fetchBadge(); // 뱃지 갱신
                localStorage.removeItem('updateBadge'); // 플래그 제거하여 재실행 방지
            }
        };
    
        window.addEventListener('storage', handleStorageChange); 
        // 신고관리에서 발생한 storage 이벤트가 실행되면 handleStorageChange를 실행
    
        return () => {
            window.removeEventListener('storage', handleStorageChange); // 언마운트 시 리스너 제거
        };
    }, []);
    

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
                    <Link to="#" onClick={() => {
                        window.location.href = '/'; // 단순히 경로만 이동
                    }}>
                        <p><ViewInAr />&nbsp;3D맵으로</p>
                    </Link>
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
                        title: '학부추천'
                    }}>
                        <AdminButton>학부추천</AdminButton>
                    </Link>
                    
                <Link 
                    to={'/admin/report'}
                    state={{
                        title: '신고내역'
                    }}>
                    <AdminButton> 
                        <Badge
                            badgeContent={reportCount}
                            color="error"
                            sx={{"& .MuiBadge-badge": {
                                    top: -7, // 상단으로 5px 이동
                                    right: -7, // 오른쪽으로 5px 이동
                                }
                            }}
                        >
                            신고내역
                        </Badge>
                    </AdminButton>
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