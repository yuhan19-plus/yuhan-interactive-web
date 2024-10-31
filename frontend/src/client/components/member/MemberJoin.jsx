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

    // 상태관리
    const [showPassword, setShowPassword] = useState(false)
    const [memberType, setMemberType] = useState(true)
    const [memberID, setMemberID] = useState('');
    const [memberPW, setMemberPW] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhone, setMemberPhone] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberMajor, setMemberMajor] = useState('');
    const [memberGender, setMemberGender] = useState(''); // 기본값을 선택하지 않음으로 설정
    const [studentNum, setStudentNum] = useState('');
    const [studentGrade, setStudentGrade] = useState('')
    const [studentClass, setStudentClass] = useState('')
    const [professorPosition, setProfessorPosition] = useState('')
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
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    // 핸들러
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
                // 이메일이 변경되면 인증 상태 초기화
                setMemberEmail(value);
                setIsEmailVerified(false); // 인증 여부 초기화
                setIsCodeSent(false); // 인증 코드 전송 상태 초기화
                setVerificationCode(''); // 입력된 인증 코드 초기화
                break;
                setMemberEmail(value);
                break;
            case 'studentNum':
                setStudentNum(value);
                break;
            default:
                break;
        }
    };
    const handleType = (event) => {
        setMemberType(event.target.checked)
    };
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
    const handleGenderChange = (event) => {
        setMemberGender(event.target.value);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };
    // 회원가입 처리 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 유효성 검사
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
            // 회원가입 처리
            const response = await fetch('/api/member/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // 아이디가 중복인 경우
            if (response.status === 409) {
                Swal.fire({
                    title: '사용중인 아이디',
                    text: '이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                });
            // 선택한 학과의 학과장이 이미 존재하는 경우
            } else if (response.status === 418){
                Swal.fire({
                    title: '중복된 학과장 정보',
                    text: '선택한 학과에 해당하는 학과장 정보가 이미 존재합니다. 관리자에게 문의하십시오.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                });
            // 회원가입 성공시 리다이렉트
            } else if (response.ok) {
                Swal.fire({
                    title: '회원가입 성공',
                    text: '회원가입이 성공적으로 완료되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then(() => {
                    window.location.href = '/';
                });
            // 회원가입에 실패한 경우
            } else {
                Swal.fire({
                    title: '회원가입 실패',
                    text: '회원가입에 실패했습니다. 다시 시도해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        // 서버 오류인 경우
        } catch (error) {
            Swal.fire({
                title: '서버 오류',
                text: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }

        } else {
            console.log("유효성 검사를 통과하지 못했습니다.");
        }
    };
    // 유효성 검사 핸들러
    const validate = () => {
        let tempErrors = {};
    
        if (!memberID) tempErrors.memberID = "아이디를 입력하세요.";
        if (!memberPW) tempErrors.memberPW = "비밀번호를 입력하세요.";
        if (!memberName) tempErrors.memberName = "이름을 입력하세요.";
        if (!memberPhone || !memberPhone.match(/^\d{10,11}$/)) tempErrors.memberPhone = "유효한 전화번호를 입력하세요.";
        if (!memberEmail || !memberEmail.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) tempErrors.memberEmail = "유효한 이메일을 입력하세요.";
        else if (!isEmailVerified) tempErrors.memberEmail = "이메일 인증을 완료해주세요."; // 이메일 인증 완료 여부 추가
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
    // 이메일 검사 핸들러
    const validateEmail = () => {
        let tempErrors = {};

        if (!memberEmail || !memberEmail.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            tempErrors.memberEmail = "유효한 이메일을 입력하세요.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    // 이메일 인증 핸들러
    const handleSendVerification = async () => {
        if(!validateEmail()){
            return;
        }
        try {
            const response = await fetch('/api/member/sendVerification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: memberEmail })
            });
    
            if (response.ok) {
                Swal.fire('성공', '인증 코드가 전송되었습니다. 이메일을 확인하세요.', 'success');
                setIsCodeSent(true); // 인증 코드가 전송된 상태로 변경
            } else {
                const data = await response.json();
                Swal.fire('실패', data.message, 'error');
            }
        } catch (error) {
            Swal.fire('오류', '이메일 전송 중 오류가 발생했습니다.', 'error');
        }
    };
    // 인증코드 확인 핸들러
    const handleVerifyCode = async () => {
        try {
            const response = await fetch('/api/member/verifyCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: memberEmail, code: verificationCode })
            });
    
            if (response.ok) {
                setIsEmailVerified(true); // 이메일 인증 성공
                Swal.fire('인증 완료', '이메일 인증이 완료되었습니다.', 'success');
            } else {
                const data = await response.json();
                if (data.message === '인증 시간이 지났습니다. 재인증해주세요.') {
                    // 인증 시간이 만료된 경우 인증 입력란을 비우고 다시 인증받도록 설정
                    setVerificationCode(''); // 입력된 인증 코드 비우기
                    setIsCodeSent(false); // 인증 코드 전송 상태를 초기화
                    setIsEmailVerified(false); // 이메일 인증 상태를 초기화
                    Swal.fire('인증 시간 만료', '인증 시간이 만료되었습니다. 다시 인증을 시도해주세요.', 'error');
                }
                else {
                    Swal.fire('실패', data.message, 'error');
                }
            }
        } catch (error) {
            Swal.fire('오류', '인증 코드 확인 중 오류가 발생했습니다.', 'error');
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
                            <TextField className='form-item' variant="filled" type='email' id="memberEmail" name="memberEmail" placeholder='Email을 입력하세요' label='Email' value={memberEmail} onChange={handleChange} error={!!errors.memberEmail} helperText={errors.memberEmail} disabled={isEmailVerified} />
                            {!isEmailVerified && (
                                <>
                                    {!isCodeSent ? (
                                        <JoinAuthButton onClick={handleSendVerification}>인증하기</JoinAuthButton>
                                    ) : (
                                        <>
                                            <TextField className='form-item' variant="filled" id="verificationCode" name="verificationCode" placeholder='인증 코드를 입력하세요' label='인증 코드' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                                            <JoinAuthButton onClick={handleVerifyCode}>인증 확인</JoinAuthButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEmailVerified && <JoinAuthButton disabled>인증 완료</JoinAuthButton>}
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
        background-color: var(--sub-opacity-color);
        border-radius: 15px;
        &:hover {
            background-color: var(--sub-opacity-color);
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
        color: var(--sub-color);
        background: #0F275C;
        box-shadow: inset 2px 2px 4px #0d214e,
                    inset -2px -2px 4px #112d6a;
        cursor: pointer;
    }
`

const JoinButton = styled.button`
    width: 100%;
    border-radius: 15px;
    color: var(--sub-color);
    border: none;
    padding: 15px;
    font-size: 24px;
    color: var(--main-color);
    box-shadow: 2px 2px 4px #d9d9d9,
                -2px -2px 4px #ffffff;
                
    &:hover {
        box-shadow: inset 2px 2px 4px #0d214e,
                    inset -2px -2px 4px #112d6a;
        cursor: pointer;
    }
`

export default MemberJoin