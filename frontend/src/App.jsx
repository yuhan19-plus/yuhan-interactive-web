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
 *  - 학부추천관리
 *  - 학과체험
 *  - 에러
 * 이석재
 *  - 회원정보 수정 라우트 로직 추가
 */
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminIndex from './admin/AdminIndex'
import AdminMain from './admin/components/content/AdminMain'
import ClientIndex from './client/ClientIndex'
import DeptCanvasLayout from './client/components/canvas_layout/DeptCanvasLayout'
import BoardTest from './client/components/dbtest/BoardTest'
import ErrorPage from './client/components/error/ErrorPage'
import MemberIndex from './client/components/member/MemberIndex'
import store from './redux/store/store'

function App() {

  // 서버 연결 상태를 확인하는 함수
  const checkServerConnection = async () => {
    console.log('서버의 응답을 기다리는 중...'); // 서버 응답 대기 메시지 출력
    try {
      const response = await fetch('/api/healthcheck'); // 백엔드 서버의 헬스체크 엔드포인트
      if (!response.ok) {
        throw new Error('서버 연결에 실패했습니다');
      }
      const data = await response.json();
      console.log('서버와 연결되었습니다:', data.message); // 서버 연결 성공 메시지 출력
    } catch (error) {
      console.error('서버 연결 확인 중 오류 발생:', error);
    }
  };

  // 컴포넌트가 마운트될 때 서버 연결 상태를 확인
  useEffect(() => {
    checkServerConnection();
  }, []);


  return (
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' index element={<ClientIndex />} />
            <Route path='/login' element={<MemberIndex value='login' />} />
            <Route path='/join' element={<MemberIndex value='join' />} />
            <Route path='/membermodify' element={<MemberIndex value='modify' />} />

            {/* client 부분 경로
              오늘의 메뉴
              학과체험
              상담신청
              유한게시판
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
              <Route path='/admin/member' element={<AdminMain />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/foodMenu' element={<AdminMain />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/board' element={<AdminMain />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/deptRec' element={<AdminMain />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/report' element={<AdminMain />}>
                {/* 경로설정 */}
              </Route>            
            </Route>
            <Route path='/error' element={<ErrorPage />} />
            <Route path="/boardtest" element={<BoardTest />} />
          </Routes>
        </BrowserRouter> 
    </Provider>
  )
}

export default App;
