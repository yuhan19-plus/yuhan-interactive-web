/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 * 이석재
 *   - 회원가입 처리 로직 추가
 */
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FilledInput, FormControl, FormControlLabel, FormLabel, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, NativeSelect, OutlinedInput, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
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
    const handleType = (event) => {
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

    // 텍스트필드 상태 및 관련 메서드
    const [memberID, setMemberID] = useState('');
    const [memberPW, setMemberPW] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhone, setMemberPhone] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [studentNum, setStudentNum] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'memberID':
                setMemberID(value);
                break;
            case 'memberPW':
                setMemberPW(value);
                break;
            case 'memberName':
                setMemberName(value);
                break;
            case 'memberPhone':
                setMemberPhone(value);
                break;
            case 'memberEmail':
                setMemberEmail(value);
                break;
            case 'studentNum':
                setStudentNum(value);
                break;
            default:
                break;
        }
    };

    // 라디오 버튼 상태 및 관련 메서드
    const [memberGender, setMemberGender] = useState(''); // 기본값을 선택하지 않음으로 설정

    const handleGenderChange = (event) => {
        setMemberGender(event.target.value);
    };

    // 유효성 검사 상태 및 관련 메서드
    const [errors, setErrors] = useState({
        memberID: '',
        memberPW: '',
        memberName: '',
        memberPhone: '',
        memberEmail: '',
        memberMajor: '',
        studentNum: '',
        studentGrade: '',
        studentClass: '',
        professorPosition: ''
    });

    const validate = () => {
        let tempErrors = {};
    
        if (!memberID) tempErrors.memberID = "아이디를 입력하세요.";
        if (!memberPW) tempErrors.memberPW = "비밀번호를 입력하세요.";
        if (!memberName) tempErrors.memberName = "이름을 입력하세요.";
        if (!memberPhone || !memberPhone.match(/^\d{10,11}$/)) tempErrors.memberPhone = "유효한 전화번호를 입력하세요.";
        if (!memberEmail.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) tempErrors.memberEmail = "유효한 이메일을 입력하세요.";
        if (!memberMajor) tempErrors.memberMajor = "전공을 선택하세요.";
        if (!memberGender) tempErrors.memberGender = "성별을 선택하세요.";
    
        if (memberType) { // 학생일 경우
            if (!studentNum) tempErrors.studentNum = "학번을 입력하세요.";
            if (!studentGrade) tempErrors.studentGrade = "학년을 선택하세요.";
            if (!studentClass) tempErrors.studentClass = "반을 선택하세요.";
        } else { // 교수일 경우
            if (!professorPosition) tempErrors.professorPosition = "직책을 선택하세요.";
        }
    
        setErrors(tempErrors);
        
        return Object.keys(tempErrors).length === 0;
    };

    // 폼 제출 처리 메서드
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            console.log("폼이 제출되었습니다.");

            const formData = {
                memberID,
                memberPW,
                memberName,
                memberPhone,
                memberEmail,
                memberMajor,
                memberGender,
                studentNum: memberType ? studentNum : null,
                studentGrade: memberType ? studentGrade : null,
                studentClass: memberType ? studentClass : null,
                professorPosition: !memberType ? professorPosition : null,
                memberType
            };
    
        try {
            const response = await fetch('/api/member/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 409) {
                // ID 중복
                Swal.fire({
                    title: '중복된 아이디!',
                    text: '이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                });
            } else if (response.ok) {
                Swal.fire({
                    title: '회원가입 성공!',
                    text: '회원가입이 성공적으로 완료되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then(() => {
                    window.location.href = '/'; // 회원가입 후 루트 경로로 이동
                });
            } else {
                Swal.fire({
                    title: '회원가입 실패!',
                    text: '회원가입에 실패했습니다. 다시 시도해주세요.',
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


            // 디버깅 코드
            /*
            console.log({
                memberID,
                memberPW,
                memberPhone,
                memberEmail,
                memberMajor,
                memberGender,
                studentNum: memberType ? studentNum : null,
                studentGrade: memberType ? studentGrade : null,
                studentClass: memberType ? studentClass : null,
                professorPosition: !memberType ? professorPosition : null,
            });
            */
        } else {
            console.log("유효성 검사를 통과하지 못했습니다.");
            // 디버깅 코드
            /*
            console.log({
                memberID,
                memberPW,
                memberPhone,
                memberEmail,
                memberMajor,
                memberGender,
                studentNum: memberType ? studentNum : null,
                studentGrade: memberType ? studentGrade : null,
                studentClass: memberType ? studentClass : null,
                professorPosition: !memberType ? professorPosition : null,
            });
            */
        }
    };
    

    return (
        <div
            // action=""
            // method="post"
        >
            <div className='content-title'>회원가입</div>
            <MemberJoinContent>
                <FormControl>
                    <div>
                        <TextField className='form-item' variant="filled" id="memberID" name="memberID" placeholder='아이디를 입력하세요' label='ID' value={memberID} onChange={handleChange} error={!!errors.memberID} helperText={errors.memberID}/>
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
                            onChange={handleChange}
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
                    <div>
                        <TextField className='form-item' variant="filled" id="memberName" name="memberName" label='이름' value={memberName} onChange={handleChange} error={!!errors.memberName} helperText={errors.memberName} />
                    </div>
                    <div>
                        <TextField className='form-item' variant="filled" type='Phone' id="memberPhone" name="memberPhone" placeholder='-없이 입력하세요' label='Phone' value={memberPhone} onChange={handleChange} error={!!errors.memberPhone} helperText={errors.memberPhone} />
                    </div>

                    {/* 본인인증 휴대폰 혹은 이메일 선택 후 나머지는 주석처리 (둘 다 가능) */}
                    <FormControl>
                        <JoinAuthArea>
                            <TextField className='form-item' variant="filled" type='email' id="memberEmail" name="memberEmail" placeholder='Email을 입력하세요' label='Email' value={memberEmail} onChange={handleChange} error={!!errors.memberEmail} helperText={errors.memberEmail} />
                            <JoinAuthButton>인증하기</JoinAuthButton>
                        </JoinAuthArea>
                    </FormControl>

                    <FormControl error={!!errors.memberMajor}>
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
                            <FormHelperText>{errors.memberMajor}</FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl error={!!errors.memberGender}>
                        <FormLabel id="memberGender">성별</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="memberGender"
                            value={memberGender}
                            onChange={handleGenderChange}
                            name="memberGender"
                        >
                            <FormControlLabel value="0" control={<Radio />} label="남성" />
                            <FormControlLabel value="1" control={<Radio />} label="여성" />
                        </RadioGroup>
                        <FormHelperText>{errors.memberGender}</FormHelperText>
                    </FormControl>

                    {/* 학생일 경우 혹은 교수일 경우 선택 */}
                    <FormControl>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="end">
                            <Typography>교수</Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={memberType} onChange={handleType} name="memberType" />
                                }
                            />
                            <Typography>학생</Typography>
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
                                        value={studentNum}
                                        onChange={handleChange}
                                        error={!!errors.studentNum}
                                        helperText={errors.studentNum}
                                    />
                                </FormControl>
                                <FormControl error={!!errors.studentGrade}>
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
                                        <FormHelperText>{errors.studentGrade}</FormHelperText>
                                    </div>
                                </FormControl>
                                <FormControl error={!!errors.studentClass}>
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
                                        <FormHelperText>{errors.studentClass}</FormHelperText>
                                    </div>
                                </FormControl>
                            </>
                        :
                            <>
                            {/* 교수일 경우 */}
                                <FormControl error={!!errors.professorPosition}>
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
                                        <FormHelperText>{errors.professorPosition}</FormHelperText>
                                    </div>
                                </FormControl>
                            </>
                    }
                </FormControl>
                <JoinButton type='submit' onClick={handleSubmit}>회원가입</JoinButton>
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