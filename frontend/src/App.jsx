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
import AdminIndex from './admin/AdminIndex'
import AdminMain from './admin/components/content/AdminMain'
import ClientIndex from './client/ClientIndex'
import DeptCanvasLayout from './client/components/canvas_layout/DeptCanvasLayout'
import ErrorPage from './client/components/error/ErrorPage'
import MemberIndex from './client/components/member/MemberIndex'
import store from './redux/store/store'

function App() {

  // 서버 연결 상태를 확인하는 함수
  const checkServerConnection = async () => {
    // console.log('서버의 응답을 기다리는 중...'); // 서버 응답 대기 메시지 출력
    try {
      const response = await fetch('/api/healthCheck'); // 백엔드 서버의 헬스체크 엔드포인트
      if (!response.ok) {
        throw new Error('서버 연결에 실패했습니다');
      }
      const data = await response.json();
      // console.log('서버와 연결되었습니다:', data.message); // 서버 연결 성공 메시지 출력
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
            <Route path='/' index element={<ClientIndex />} errorElement={<ErrorPage />} />
            <Route path='/login' element={<MemberIndex value='login' />} errorElement={<ErrorPage />} />
            <Route path='/join' element={<MemberIndex value='join' />} errorElement={<ErrorPage />} />
            <Route path='/membermodify' element={<MemberIndex value='modify' />} errorElement={<ErrorPage />} />

            {/* client 부분 경로
              오늘의 메뉴
              학과체험
              상담신청
              유한게시판
            */}
            <Route path='/department/*' element={<DeptCanvasLayout />} errorElement={<ErrorPage />} />
            <Route path='/admin' element={<AdminIndex />} errorElement={<ErrorPage />}>
              <Route path='/admin' element={<AdminMain />} />
              <Route path='/admin/member' element={<AdminMain />} errorElement={<ErrorPage />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/foodMenu' element={<AdminMain />} errorElement={<ErrorPage />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/board' element={<AdminMain />} errorElement={<ErrorPage />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/deptRec' element={<AdminMain />} errorElement={<ErrorPage />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/report' element={<AdminMain />} errorElement={<ErrorPage />}>
                {/* 경로설정 */}
              </Route>
              <Route path='/admin/gallery' element={<AdminMain />} errorElement={<ErrorPage />}>
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