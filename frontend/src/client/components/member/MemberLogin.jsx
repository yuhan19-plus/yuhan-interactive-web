/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 * 이석재
 *   - 로그인 기능 구현완료
 *   - 로그인 시 쿠키 정보 추가
 */

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import styled from 'styled-components'


const MemberLogin = () => {

    // 텍스트필드 상태 및 관련 메서드
    const [memberID, setMemberID] = useState('');
    const [memberPW, setMemberPW] = useState('');

    // 쿠키(세션 쿠키)
    const [cookies, setCookie] = useCookies(['user']);

   // 쿠키가 존재하면 루트 경로로 리다이렉트
   useEffect(() => {
    if (cookies.user) {
        window.location.href = '/';
    }
}, [cookies]);

    const handleIDChange = (event) => {
        setMemberID(event.target.value);
    };

    const handlePWChange = (event) => {
        setMemberPW(event.target.value);
    };

    // 패스워드 상태 및 관련 메서드
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    // 유효성검사 상태 및 관련 메서드
    const [errors, setErrors] = useState({ memberID: '', memberPW: '' });

    // 유효성검사 메서드
    const validate = () => {
        let tempErrors = {};

        if (!memberID) tempErrors.memberID = "아이디를 입력하세요.";
        if (!memberPW) tempErrors.memberPW = "비밀번호를 입력하세요.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
    
        if (validate()) {
            const loginData = {
                memberID,
                memberPW,
            };
    
            try {
                const response = await fetch('/api/member/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    setCookie('user', memberID, { path: '/' });
                    setCookie('userType', result.userType, { path: '/' });
                    setCookie('userName', result.userName, { path: '/' });
                    // 로그인 성공 시 바로 리다이렉트
                    window.location.href = '/'; // 로그인 성공 후 루트 경로로 이동
                } else if (response.status === 403) {
                    Swal.fire({
                        title: '로그인 실패!',
                        text: '해당 계정은 탈퇴(비활성화) 상태입니다. 관리자에게 문의하십시오.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                } else {
                    Swal.fire({
                        title: '로그인 실패!',
                        text: '아이디 또는 비밀번호가 올바르지 않습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: '서버 오류!',
                    text: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        }
    };

     // 로그인 페이지에 접근 시 쿠키가 존재하고 로그인 성공이 아닌 경우에만 리다이렉트
     useEffect(() => {
        if (cookies.user && !loginSuccess) {
            window.location.href = '/';
        }
    }, cookies);

    return (
        <div
            // action=""
            // method="post"
        >
            <div className='content-title'>로그인</div>
            <MemberJoinContent>
                <FormControl>
                    <div>
                        <TextField className='form-item' variant="filled" id="memberID" name="memberID" placeholder='아이디를 입력하세요' label='ID' value={memberID} onChange={handleIDChange} error={!!errors.memberID} helperText={errors.memberID} />
                    </div>
                    <div>
                        <TextField
                            className='form-item'
                            variant="filled"
                            type={showPassword ? 'text' : 'password'}
                            id="memberPW"
                            name="memberPW"
                            placeholder='비밀번호를 입력하세요'
                            value={memberPW}
                            onChange={handlePWChange}
                            error={!!errors.memberPW}
                            helperText={errors.memberPW}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            style={{padding: '0px', marginTop: '5px'}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </div>
                    <JoinButton type='submit' onClick={handleLogin}>로그인</JoinButton>
                </FormControl>
            </MemberJoinContent>
        </div>
    )
}

const MemberJoinContent = styled.div`
    width: 100%;
    height: 100%;
    
    div {
        width: 100%;
        margin: 7px 0;
        padding: 0 15px;
        background-color: var(--sub-opacity-color);
        border-radius: 15px;

        &:hover {
            background-color: var(--sub-opacity-color);
        }
    }
`

const JoinButton = styled.button`
    width: 100%;
    border-radius: 15px;
    color: var(--sub-color);
    border: none;
    padding: 15px;
    font-size: 24px;
    background: var(--main-color);
    box-shadow: 2px 2px 4px #d9d9d9,
                -2px -2px 4px #ffffff;
    &:hover {
        box-shadow: inset 2px 2px 4px #0d214e,
                    inset -2px -2px 4px #112d6a;
        cursor: pointer;
    }
`

export default MemberLogin