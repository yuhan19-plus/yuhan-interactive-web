/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 로그아웃 기능 구현
 */
import { AdminPanelSettings, Close, Login, Logout, Menu } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import MainSideBarMenu from './MainSideBarMenu';
import DeptSideBarMenu from './DeptSideBarMenu';
import { adminEnterModal } from '../../../../redux/actions/actions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const title = ''
const SideBar = () => {

    const location = useLocation()
    const currentPath = location.pathname
    // console.log('currentPath', currentPath) // 현재 경로 출력

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const currentMap = useSelector((state) => state.groundMap)
    const currentMapName = currentMap.mapName

    // console.log('currentMapName', currentMapName) // 현재 맵 이름 출력
    
    const dispatch = useDispatch()
    const handleShowAdminEnterModal = () => {
        dispatch(adminEnterModal())
    }
    
    // const sideMenuValue = useSelector((state) => state.sideMenu)

    // console.log('sideMenuValue', sideMenuValue)

    // 쿠키(세션 쿠키)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // 로그아웃 메서드
    const handleLogout = () => {
        removeCookie('user', { path: '/' }); // 쿠키 삭제
        alert('로그아웃 되었습니다.');
    };

    return (
        <>
            <SideBarContainer className={isDropdownOpen ? "opened" : "closed"}>
                <SideBarHeader>
                {cookies.user ? ( // 쿠키가 존재하면 로그아웃 버튼을 보여줍니다.
                        <div>
                            <Link to={'/'} onClick={handleLogout}><Logout /><p>로그아웃</p></Link>
                        </div>
                    ) : ( // 쿠키가 없으면 로그인 버튼을 보여줍니다.
                        <>
                        <div>
                            <Link to={'/login'}><Login /><p>로그인</p></Link>
                        </div>
                        <div>
                            <Link to={'/join'}><PersonAddIcon /><p>회원가입</p></Link>
                        </div>
                        </>
                    )}
                    <div>
                        <a onClick={handleShowAdminEnterModal}><AdminPanelSettings /><p>관리자</p></a>
                    </div>
                    <div>
                        <Link 
                            to={'/admin'}
                            state={{
                                title: '관리자'
                            }}>
                                <AdminPanelSettings /><p>TEST</p>
                        </Link>
                    </div>
                </SideBarHeader>
                <SideBarList>
                    <div>
                        <FontAwesomeIcon icon={faSchool} />
                        <span><a href='/'>유한대학교</a></span>
                    </div>
                    {
                        (currentMapName === 'yh_map' &&  currentPath === '/') ? <MainSideBarMenu /> : <DeptSideBarMenu mapName={currentMapName} />
                    }
                </SideBarList>
            </SideBarContainer>
            <DropdownController onClick={(e) => {
                e.stopPropagation()
                setIsDropdownOpen((prev) => !prev)
            }}>
                {isDropdownOpen ? <Close className="side-icon-white" /> : <Menu className="side-icon" /> }
            </DropdownController>
        </>
    )
}

const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #0F275Cdd;
    width: 220px;
    height: 100%;
    transition: 0.3s ease-in-out;
    padding: 0px 0px 40px 0px;
    border-radius: 0 10px 10px 0;
    &.opened {
        transform: translateX(0);
    }
    &.closed {
        transform: translateX(-100%)
    }
`

const SideBarHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 9px;
  justify-content: center;
  align-items: center;

  div {
    width: 33%;
    margin: 40px 0 5px 0;

    svg {
      width: 20px;
      height: 20px;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a:hover {
      border-bottom: 1px solid white;
    }
  }
`

const SideBarList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 40px;
    div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        gap: 10px;
        border-bottom: 1px solid white;
        cursor: pointer;
        color: white;
        svg {
            width: 38px;
            height: 38px;
        }
        span {
            font-size: 16px;
            padding-top: 8px;
            font-weight: 500;
        }
        & > * {
            transition: 0.2s ease-in-out;
        }
        &:hover {
            background-color: white;
            color: #0F275C;
            span {
                font-size: 18px;
                font-weight: 800;
            }
            span > a {
                color: #0F275C;
            }
            svg {
                width: 40px;
                height: 40px;
            }
        }
    }
`

const DropdownController = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    color: #340070;
    cursor: pointer;
    svg {
        width: 42px;
        height: 42px;
    }
`

export default SideBar;
