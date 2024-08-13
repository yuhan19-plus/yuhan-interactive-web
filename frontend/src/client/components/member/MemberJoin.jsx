/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FilledInput, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, NativeSelect, OutlinedInput, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MAJORS, PROFESSOR_POSITION } from '../../../data/commonData'
import { Form, useSubmit } from 'react-router-dom'

const MemberJoin = () => {
    // const submit = useSubmit()

    // 패스워드 상태 및 관련 메서드
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    // 학생 혹은 교수 선택 상태 및 관련 메서드
    // true - 학생, false - 교수
    const [memberType, setMemberType] = useState(true)
    const handleChange = (event) => {
        setMemberType(event.target.checked)
    };

    // select 상태 및 관련 메서드
    const [memberMajor, setMemberMajor] = useState('')
    const [studentGrade, setStudentGrade] = useState('')
    const [studentClass, setStudentClass] = useState('')
    const [professorPosition, setProfessorPosition] = useState('')
    const handleMajor = (event) => {
        // console.log(event)
        const { target: { value } } = event // event에서 전공명만 가져오기
        // console.log(value) // 전공명 출력
        setMemberMajor(
            typeof value === 'string' ? value : console.log('err')
        )
    }

    const handleGrade = (event) => {
        const {target: {value}} = event
        // console.log(typeof value)
        setStudentGrade(
            typeof value === 'number' ? value : console.log('err')
        )
    }

    const handleClass = (event) => {
        const {target: {value}} = event
        setStudentClass(
            typeof value === 'number' ? value : console.log('err')
        )
    }

    const handlePosition = (event) => {
        const {target: {value}} = event
        setProfessorPosition(
            typeof value === 'string' ? value : console.log('err')
        )
    }

    return (
        <div
            // action=""
            // method="post"
        >
            <div className='content-title'>회원가입</div>
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
                    <div>
                        <TextField className='form-item' variant="filled" type='Phone' id="memberPhone" name="memberPhone" placeholder='-없이 입력하세요' label='Phone' />
                    </div>

                    {/* 본인인증 휴대폰 혹은 이메일 선택 후 나머지는 주석처리 (둘 다 가능) */}
                    <FormControl>
                        <JoinAuthArea>
                            <TextField className='form-item' variant="filled" type='email' id="memberEmail" name="memberEmail" placeholder='Email을 입력하세요' label='Email' />
                            <JoinAuthButton>인증하기</JoinAuthButton>
                        </JoinAuthArea>
                    </FormControl>

                    <FormControl>
                        <div className='form-item'>
                            <Select
                                defaultValue={1}
                                value={memberMajor}
                                displayEmpty
                                input={<FilledInput />}
                                onChange={handleMajor}
                                name='memberMajor'
                            >
                                <MenuItem disabled value="">
                                    <em>전공을 선택하세요</em>
                                </MenuItem>
                                {MAJORS.map((major) => (
                                    <MenuItem
                                        key={major}
                                        value={major}
                                    >
                                        {major}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="memberGender">성별</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="memberGender"
                            defaultValue="male"
                            name="memberGender"
                        >
                            <FormControlLabel value="여성" control={<Radio />} label="여성" />
                            <FormControlLabel value="남성" control={<Radio />} label="남성" />
                        </RadioGroup>
                    </FormControl>

                    {/* 학생일 경우 혹은 교수일 경우 선택 */}
                    <FormControl>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="end">
                            <Typography>학생</Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={memberType} onChange={handleChange} name="memberType" />
                                }
                            />
                            <Typography>교수</Typography>
                        </Stack>
                    </FormControl>
                    {
                        memberType ? 
                            <>
                            {/* 학생일 경우 */}
                                <FormControl>
                                    <TextField
                                        className='form-item'
                                        variant="filled"
                                        id="studentNum"
                                        name="studentNum"
                                        placeholder='학번을 입력하세요'
                                        label='학번'
                                    />
                                </FormControl>
                                <FormControl>
                                    <div className='form-item'>
                                        <Select
                                            defaultValue={1}
                                            displayEmpty
                                            input={<FilledInput />}
                                            onChange={handleGrade}
                                            name='studentGrade'
                                            value={studentGrade}
                                        >
                                            <MenuItem disabled value="">
                                                <em>학년을 선택하세요</em>
                                            </MenuItem>
                                            <MenuItem value={1}>1학년</MenuItem>
                                            <MenuItem value={2}>2학년</MenuItem>
                                            <MenuItem value={3}>3학년</MenuItem>
                                        </Select>
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <div className='form-item'>
                                        <Select
                                            defaultValue={1}
                                            displayEmpty
                                            input={<FilledInput />}
                                            onChange={handleClass}
                                            name='studentClass'
                                            value={studentClass}
                                        >
                                            <MenuItem disabled value="">
                                                <em>반을 선택하세요</em>
                                            </MenuItem>
                                            <MenuItem value={1}>1반</MenuItem>
                                            <MenuItem value={2}>2반</MenuItem>
                                            <MenuItem value={3}>3반</MenuItem>
                                        </Select>
                                    </div>
                                </FormControl>
                            </>
                        :
                            <>
                            {/* 교수일 경우 */}
                                <FormControl>
                                    <div className='form-item'>
                                        <Select
                                            defaultValue={1}
                                            displayEmpty
                                            input={<FilledInput />}
                                            onChange={handlePosition}
                                            name='professorPosition'
                                            value={professorPosition}
                                        >
                                            <MenuItem disabled value="">
                                                <em>직책을 선택하세요</em>
                                            </MenuItem>
                                            {PROFESSOR_POSITION.map((professorPosition) => (
                                                <MenuItem
                                                    key={professorPosition}
                                                    value={professorPosition}
                                                >
                                                    {professorPosition}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </FormControl>
                            </>
                    }
                </FormControl>
                <JoinButton type='submit'>회원가입</JoinButton>
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

const JoinAuthArea = styled.div`
    display: flex;
    flex-direction: column;
`

const JoinAuthButton = styled.button`
    width: 100%;
    border-radius: 15px;
    color: black;
    border: none;
    padding: 15px;
    font-size: 14px;
    box-shadow: 2px 2px 4px #d9d9d9,
                -2px -2px 4px #ffffff;
    &:hover {
        color: white;
        background: #0F275C;
        box-shadow: inset 2px 2px 4px #0d214e,
                    inset -2px -2px 4px #112d6a;
        cursor: pointer;
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

export default MemberJoin