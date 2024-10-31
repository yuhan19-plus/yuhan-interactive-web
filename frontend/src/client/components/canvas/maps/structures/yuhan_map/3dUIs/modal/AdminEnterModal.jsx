/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 관리자 로그인 기능 구현 완료
 */

import { Close } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2';
import { initModal } from '../../../../../../../../redux/actions/actions'
import axios from 'axios'; // axios를 사용하여 서버와 통신
import { useCookies } from 'react-cookie'; // 쿠키에서 사용자 정보 가져오기
import { useNavigate } from 'react-router-dom';

const AdminEnterModal = () => {
    const [code, setCode] = useState(''); // 코드 입력값을 관리할 상태 추가
    const [cookies, setCookie] = useCookies(['user', 'adminMode']); // 쿠키에서 로그인한 user ID 가져오기
    
    const dispatch = useDispatch()
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleCloseModal = (e) => {
        e.stopPropagation()
        dispatch(initModal())
    }

    const handleSubmit = async () => {
        if (code) {
            try {
                // fetch를 사용하여 서버에 사용자 ID와 코드 전송
                const response = await fetch('/api/memberAdmin/verifyAdminCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: cookies.user, // 현재 로그인한 사용자 ID
                        code: code, // 사용자가 입력한 코드
                    }),
                });
    
                const data = await response.json();
    
                if (data.success) {
                    // 리다이렉트 전 모달 닫기
                    dispatch(initModal());

                    // 쿠키에 adminMode 설정 추가
                    setCookie('adminMode', true, { path: '/' }); // adminMode를 true로 설정

                    // 검증 성공 시 관리자 페이지로 state를 전달하며 리다이렉트
                    navigate('/admin', { state: { title: '관리자' } });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '2차인증 실패!',
                        text: '코드가 일치하지 않습니다.',
                    });
                }
            } catch (error) {
                console.error('서버 오류 발생:', error);
                Swal.fire({
                    icon: 'error',
                    title: '서버 오류',
                    text: '서버 오류가 발생했습니다. 다시 시도해주세요.',
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: '입력 필요',
                text: '코드를 입력하세요.',
            });
        }
    };

    // adminMode 쿠키가 존재할 경우 자동으로 /admin으로 리다이렉트
    useEffect(() => {
            if (cookies.adminMode) {
            navigate('/admin', { state: { title: '관리자' } });
        }
    }, [cookies, navigate]);

    return (
        <>
            <AdminEnterModalWrapper>
                <AdminEnterModalHeader>
                    <p>유한대 관리자</p>
                    <p onClick={handleCloseModal}><Close /></p>
                </AdminEnterModalHeader>
                <AdminEnterModalContent>
                    <em>관리자로 코드를 입력하세요</em>
                    <TextField type='password' style={{ width: '100%' }} value={code} onChange={(e) => setCode(e.target.value)} />
                </AdminEnterModalContent>
                <AdminEnterModalFooter>
                    <EnterButton onClick={handleSubmit}>확인</EnterButton>
                </AdminEnterModalFooter>
            </AdminEnterModalWrapper>
        </>
    )
}

const AdminEnterModalWrapper = styled.div`
    position: fixed;
    left: 40%;
    top: 30%;
    width: 350px;
    background-color: var(--sub-opacity-color2);
    color: var(--sub-color);
    border-radius: 1rem;
`
const AdminEnterModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: var(--main-color);
    width: 100%;
    font-size: 1.2rem;
    font-weight: 900;
    height: 25%;
    border-radius: 1rem 1rem 0 0;

    svg {
        &:hover {
            cursor: pointer;
        }
    }
`

const AdminEnterModalContent = styled.div`
    width: 100%;
    padding: 0.7rem;
    color: black;
`
const AdminEnterModalFooter = styled.div`
    margin-top: 0.7rem;
    padding: 0.7rem;
`

const EnterButton = styled.div`
    background-color: var(--main-color);
    text-align: center;
    padding: 0.7rem;
    border-radius: 1rem;
    cursor: pointer;
`

export default AdminEnterModal