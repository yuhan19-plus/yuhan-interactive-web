/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

const MemberLogin = () => {
    // 패스워드 상태 및 관련 메서드
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    return (
        <div
            // action=""
            // method="post"
        >
            <div className='content-title'>로그인</div>
            <MemberJoinContent>
                <FormControl>
                    <div>
                        <TextField className='form-item' variant="filled" id="memberID" name="memberID" placeholder='아이디를 입력하세요' label='ID' />
                    </div>
                    <div>
                        <TextField
                            className='form-item'
                            variant="filled"
                            type={showPassword ? 'text' : 'password'}
                            id="memberPW"
                            name="memberPW"
                            placeholder='비밀번호를 입력하세요'
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
                    <JoinButton type='submit'>로그인</JoinButton>
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
        background-color: #ffffff00;
        border-radius: 15px;
        &:hover {
            background-color: #ffffff00;
        }
    }
`

const JoinButton = styled.button`
    width: 100%;
    border-radius: 15px;
    color: white;
    border: none;
    padding: 15px;
    font-size: 24px;
    background: #0F275C;
    box-shadow: 2px 2px 4px #d9d9d9,
                -2px -2px 4px #ffffff;
    &:hover {
        box-shadow: inset 2px 2px 4px #0d214e,
                    inset -2px -2px 4px #112d6a;
        cursor: pointer;
    }
`

export default MemberLogin