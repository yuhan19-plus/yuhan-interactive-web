/** 파일 생성자 : 임성준
 * 임성준
 * 라우터 설정
 *  - 초기 루트
 *  - 로그인
 *  - 회원가입
 *  - 관리자페이지
 *  - 회원관리
 *  - 오늘의 메뉴관리
 *  - 게시판관리
 *  - 전공추천관리
 *  - 학과체험
 *  - 에러
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ClientIndex from './client/ClientIndex'
import AdminIndex from './admin/AdminIndex'
import AdminMain from './admin/components/content/AdminMain'
import MemberIndex from './client/components/member/MemberIndex'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import AdminBoard from './admin/components/content/board/AdminBoard'
import AdminFood from './admin/components/content/food/AdminFood'
import AdminMember from './admin/components/content/member/AdminMember'
import AdminDeptRec from './admin/components/content/dept_rec/AdminDeptRec'
import DeptCanvasLayout from './client/components/canvas_layout/DeptCanvasLayout'
import ErrorPage from './client/components/error/ErrorPage'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<ClientIndex />} />
          <Route path='/login' element={<MemberIndex value='login' />} />
          <Route path='/join' element={<MemberIndex value='join' />} />

          {/* client 부분 경로
            학과체험
            상담신청
            유한게시판
            오늘의 메뉴
          */}
          <Route path='/department/*' element={<DeptCanvasLayout />} />
          {/* <Route path='/sideMenu' element={<SideMenuLayout />}>
            <Route path='/sideMenu/consultation' element={<SideMenuLayout pageName='consultation' />} />
            <Route path='/sideMenu/board' element={<SideMenuLayout pageName='board' />} />
          </Route> */}
          {/* <Route path='/client-yuhanBoard' element={<YuhanBoard />} /> */}
          {/* <Route path='/client-food' element={<FoodBoard />} /> */}

          <Route path='/admin' element={<AdminIndex />}>
            <Route path='/admin' element={<AdminMain />} />
            <Route path='/admin/member' element={<AdminMember />}>
              {/* 경로설정 */}
            </Route>
            <Route path='/admin/foodMenu' element={<AdminFood />}>
              {/* 경로설정 */}
            </Route>
            <Route path='/admin/board' element={<AdminBoard />}>
              {/* 경로설정 */}
            </Route>
            <Route path='/admin/deptRec' element={<AdminDeptRec />}>
              {/* 경로설정 */}
            </Route>
          </Route>
          <Route path='/error' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
