/** 파일 생성자 : 임성준
 * 임성준
 *  - 초기 루트, 로그인, 회원가입, 관리자페이지, 회원관리, 오늘의 메뉴, 게시판 라우터 설정
 * 오자현
 *  - 소캣컨트롤 추가
 */
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ClientIndex from "./client/ClientIndex";
import AdminIndex from "./admin/AdminIndex";
import AdminMember from "./admin/components/content/AdminMember";
import AdminFood from "./admin/components/content/AdminFood";
import AdminBoard from "./admin/components/content/AdminBoard";
import AdminMain from "./admin/components/content/AdminMain";
import MemberIndex from "./client/components/member/MemberIndex";
import { TestSocketControls } from "./sockets/TestSocketControls";
function App() {
  return (
    <BrowserRouter>
      <TestSocketControls />
      <Routes>
        <Route path="/" element={<ClientIndex />} />
        <Route path="/login" element={<MemberIndex value="login" />} />
        <Route path="/join" element={<MemberIndex value="join" />} />
		
        <Route path="/admin" element={<AdminIndex />}>
          <Route path="/admin" element={<AdminMain />} />
          <Route path='/admin/member' element={<AdminMember />}>
            {/* 경로설정 */}
          </Route>
          <Route path='/admin/foodMenu' element={<AdminFood />}>
            {/* 경로설정 */}
          </Route>
          <Route path='/admin/board' element={<AdminBoard />}>
            {/* 경로설정 */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
