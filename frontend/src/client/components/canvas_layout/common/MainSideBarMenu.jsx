/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportIcon from '@mui/icons-material/Support';
import BusinessIcon from '@mui/icons-material/Business';
import MuseumIcon from '@mui/icons-material/Museum';
import FestivalIcon from '@mui/icons-material/Festival';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { faBowlFood, faChalkboardTeacher, faCode, faDna, faLightbulb, faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { RestaurantMenu, Send } from '@mui/icons-material';
import { board, computerSoftwareMap, consultation, deptMap, deptRec, food, foodNutritionMap, industrialDesignMap, yuhanBioMap } from '../../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const MainSideBarMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSideMenuConsultation = () => {
        dispatch(consultation())
    }
    const handleSideMenuBoard = () => {
        dispatch(board())
    }
    const handleSideMenuFood = () => {
        dispatch(food())
    }
    const handleChangeMap = () => {
        dispatch(deptMap())
        navigate('/department')
    }
    const handleComputerSW = () => {
        dispatch(computerSoftwareMap())
        navigate('/department/csw')
    }
    const handleIndustrialDesign = () => {
        dispatch(industrialDesignMap())
        navigate('/department/id')
    }
    const handleFoodNutrition = () => {
        dispatch(foodNutritionMap())
        navigate('/department/fn')
    }
    const handleYuhanBio = () => {
        dispatch(yuhanBioMap())
        navigate('/department/bio')
    }
    const handleDeptRec = () => {
        dispatch(deptRec())
    }
    return (
        <>
            <div>
                <AccountBalanceIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3007'>대학소개</a></span>
            </div>
            <div>
                <InfoIcon />
                <span><a href='https://sky.yuhan.ac.kr/intro.html'>입학안내</a></span>
            </div>
            <div>
                <CampaignIcon />
                <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3071'>대학홍보</a></span>
            </div>
            <div>
                <SchoolIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3091'>학과안내</a></span>
            </div>
            <div>
                <SupportIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?per_menu_idx=3101&menu_idx=3415'>학생서비스</a></span>
            </div>
            <div>
                <AssignmentIcon />
                <span><a onClick={handleSideMenuBoard}>게시판</a></span>
            </div>
            <div>
                <Send />
                <span><a onClick={handleSideMenuConsultation}>상담신청</a></span>
            </div>
            <div>
                <RestaurantMenu />
                <span><a onClick={handleSideMenuFood}>오늘의 메뉴</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faLightbulb} />
                <span><a onClick={handleDeptRec}>전공추천</a></span>
            </div>
            <div>
                <FestivalIcon />
                <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3160'>유한광장</a></span>
            </div>
            <div>
                <BusinessIcon />
                <span><a href='https://sanhak.yuhan.ac.kr/index.do'>산학협력단</a></span>
            </div>
            <div>
                <MuseumIcon />
                <span><a href='https://newih.yuhan.ac.kr/index.do'>유일한기념관</a></span>
            </div>
            {/* <div>
                <FontAwesomeIcon icon={faChalkboardTeacher}/>
                <span><a>학과체험</a></span>
            </div> */}
            <div>
                <FontAwesomeIcon icon={faCode} />
                <span><a onClick={handleComputerSW}>컴퓨터소프트웨어공학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faPenRuler} />
                <span><a onClick={handleIndustrialDesign}>산업디자인학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faBowlFood} />
                <span><a onClick={handleFoodNutrition}>식품영양학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faDna} />
                <span><a onClick={handleYuhanBio}>유한생명바이오학과체험</a></span>
            </div>
            {/* test용도 아침에 병합 시 삭제 
            <div>
                <AssignmentIcon />
                <span><a href='/boardtest'>디비test</a></span>
            </div> */}
        </>
    )
}

export default MainSideBarMenu