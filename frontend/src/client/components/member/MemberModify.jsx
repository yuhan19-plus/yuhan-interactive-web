/** 파일 생성자 : 이석재
 * 이석재 : 프론트엔드 개발
 * 
 * 이석재
 *   - 회원정보수정 기능 구현완료
 */


import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FilledInput, FormControl, FormLabel, FormHelperText, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { MAJORS, PROFESSOR_POSITION } from '../../../data/commonData'
import { useCookies } from 'react-cookie'

const MemberModify = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [cookies] = useCookies(['user', 'userType'])
    const [memberType, setMemberType] = useState(cookies.userType === 'student') // 쿠키에서 회원 유형 결정
    const [formData, setFormData] = useState({
        memberID: '',
        memberPW: '',
        memberName: '',
        memberPhone: '',
        memberEmail: '',
        memberMajor: '',
        memberGender: '',
        studentNum: '',
        studentGrade: '',
        studentClass: '',
        professorPosition: ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/member/${cookies.user}`)
                const data = await response.json()

                setFormData({
                    memberID: data.user_id,
                    memberPW: '',
                    memberName: data.user_name,
                    memberPhone: data.user_phone,
                    memberEmail: data.user_email,
                    memberMajor: data.user_major,
                    memberGender: data.user_gender !== null ? data.user_gender.toString() : '', // 성별을 이미 선택한 경우 기본값으로 설정
                    studentNum: memberType ? data.student_number : '',
                    studentGrade: memberType ? data.student_grade : '',
                    studentClass: memberType ? data.student_class : '',
                    professorPosition: !memberType ? data.professor_position : ''
                })
            } catch (error) {
                console.error('데이터 로드 실패:', error)
            }
        }

        fetchData()
    }, [cookies.user, memberType])

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => event.preventDefault()

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let tempErrors = {}
        if (!formData.memberName) tempErrors.memberName = '이름을 입력하세요.'
        if (!formData.memberPhone || !formData.memberPhone.match(/^\d{10,11}$/)) tempErrors.memberPhone = '유효한 전화번호를 입력하세요.'
        if (!formData.memberEmail.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) tempErrors.memberEmail = '유효한 이메일을 입력하세요.'
        if (!formData.memberMajor) tempErrors.memberMajor = '전공을 선택하세요.'
        if (!formData.memberGender) tempErrors.memberGender = '성별을 선택하세요.'

        if (memberType) { // 학생일 경우
            if (!formData.studentNum) tempErrors.studentNum = '학번을 입력하세요.'
            if (!formData.studentGrade) tempErrors.studentGrade = '학년을 선택하세요.'
            if (!formData.studentClass) tempErrors.studentClass = '반을 선택하세요.'
        } else { // 교수일 경우
            if (!formData.professorPosition) tempErrors.professorPosition = '직책을 선택하세요.'
        }

        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (validate()) {
            try {
                const { memberPW, ...restFormData } = formData
                const payload = { 
                    ...restFormData,
                    memberType: memberType ? 'student' : 'professor'
                }
                
                if (memberPW) {
                    payload.memberPW = memberPW // 비밀번호가 있을 경우에만 포함
                }

                const response = await fetch('/api/member/modify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })

                if (response.ok) {
                    Swal.fire({
                        title: '수정 완료',
                        text: '회원 정보가 성공적으로 수정되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    }).then(() => {
                        window.location.href = '/' // 확인을 누르면 '/'로 리다이렉트
                    });
                } else {
                    Swal.fire({
                        title: '수정 실패',
                        text: '회원 정보 수정에 실패했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: '서버 오류',
                    text: '서버에서 오류가 발생했습니다. 다시 시도해 주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        }
    }

    return (
        <div>
            <div className='content-title'>회원 정보 수정</div>
            <MemberModifyContent>
                <FormControl>
                    <div>
                        <TextField className='form-item' variant="filled" id="memberID" name="memberID" label="ID" value={formData.memberID} InputProps={{ readOnly: true }} fullWidth />
                    </div>

                    {/* 비밀번호 입력칸 추가 */}
                    <div>
                        <TextField
                            className='form-item'
                            variant="filled"
                            type={showPassword ? 'text' : 'password'}
                            id="memberPW"
                            name="memberPW"
                            label='수정할 비밀번호를 입력하세요.(수정 안할 시 빈칸)'
                            value={formData.memberPW}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            style={{ padding: '0px', marginTop: '5px' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </div>

                    <div>
                        <TextField className='form-item' variant="filled" id="memberName" name="memberName" label='이름' value={formData.memberName} onChange={handleChange} error={!!errors.memberName} helperText={errors.memberName} />
                    </div>
                    <div>
                        <TextField className='form-item' variant="filled" type='Phone' id="memberPhone" name="memberPhone" placeholder='-없이 입력하세요' label='Phone' value={formData.memberPhone} onChange={handleChange} error={!!errors.memberPhone} helperText={errors.memberPhone} />
                    </div>
                    <div>
                        <TextField className='form-item' variant="filled" type='email' id="memberEmail" name="memberEmail" label='Email' value={formData.memberEmail} onChange={handleChange} error={!!errors.memberEmail} helperText={errors.memberEmail} />
                    </div>

                    <FormControl error={!!errors.memberMajor}>
                        <div className='form-item'>
                            <Select value={formData.memberMajor} onChange={handleChange} name='memberMajor' input={<FilledInput />}>
                                <MenuItem disabled value="">
                                    <em>전공을 선택하세요</em>
                                </MenuItem>
                                {MAJORS.map((major) => (
                                    <MenuItem key={major} value={major}>
                                        {major}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.memberMajor}</FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl error={!!errors.memberGender}>
                        <div className='form-item'>
                            <FormLabel>성별</FormLabel>
                            <Select value={formData.memberGender} onChange={handleChange} name="memberGender">
                                <MenuItem value="0">남성</MenuItem>
                                <MenuItem value="1">여성</MenuItem>
                            </Select>
                            <FormHelperText>{errors.memberGender}</FormHelperText>
                        </div>
                    </FormControl>

                    {memberType ? (
                        <>
                            <TextField className='form-item' variant="filled" id="studentNum" name="studentNum" label='학번' value={formData.studentNum} onChange={handleChange} error={!!errors.studentNum} helperText={errors.studentNum} />
                            <FormControl error={!!errors.studentGrade}>
                                <div className='form-item'>
                                    <Select value={formData.studentGrade} onChange={handleChange} name="studentGrade">
                                        <MenuItem disabled value=""><em>학년을 선택하세요</em></MenuItem>
                                        <MenuItem value={1}>1학년</MenuItem>
                                        <MenuItem value={2}>2학년</MenuItem>
                                        <MenuItem value={3}>3학년</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.studentGrade}</FormHelperText>
                                </div>
                            </FormControl>
                            <FormControl error={!!errors.studentClass}>
                                <div className='form-item'>
                                    <Select value={formData.studentClass} onChange={handleChange} name="studentClass">
                                        <MenuItem disabled value=""><em>반을 선택하세요</em></MenuItem>
                                        <MenuItem value={1}>1반</MenuItem>
                                        <MenuItem value={2}>2반</MenuItem>
                                        <MenuItem value={3}>3반</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.studentClass}</FormHelperText>
                                </div>
                            </FormControl>
                        </>
                    ) : (
                        <FormControl error={!!errors.professorPosition}>
                            <div className='form-item'>
                                <Select value={formData.professorPosition} onChange={handleChange} name="professorPosition">
                                    <MenuItem disabled value=""><em>직책을 선택하세요</em></MenuItem>
                                    {PROFESSOR_POSITION.map((position) => (
                                        <MenuItem key={position} value={position}>
                                            {position}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.professorPosition}</FormHelperText>
                            </div>
                        </FormControl>
                    )}
                </FormControl>
                <ModifyButton type='submit' onClick={handleSubmit}>수정하기</ModifyButton>
            </MemberModifyContent>
        </div>
    )
}

const MemberModifyContent = styled.div`
    width: 100%;
    height: 100%;
    div {
        width: 100%;
        margin: 7px 0;
        padding: 0 15px;
        background-color: #ffffff00;
        border-radius: 15px;
    }
`

const ModifyButton = styled.button`
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

export default MemberModify
