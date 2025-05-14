import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContestPage from './components/Contestpage';
import FavoritePage from './components/FavoritePage';

function App() {
  const [contests, setContests] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 기본은 로그아웃 상태

  const handleFavorite = (title) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (favorites.includes(title)) {
      setFavorites(favorites.filter(f => f !== title));
      alert("즐겨찾기 해제됨");
    } else {
      setFavorites([...favorites, title]);
      alert("즐겨찾기 추가됨");
    }
  };

  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
    alert(!isLoggedIn ? "로그인 되었습니다!" : "로그아웃 되었습니다!");
  };

  useEffect(() => {
    fetch('/talkdata.json')
      .then(res => res.json())
      .then(data => {
        const labeled = data.map(item => ({
          ...item,
          dday: Math.ceil((new Date(item.마감일) - new Date()) / (1000 * 60 * 60 * 24))
        }));
        setContests(labeled);
      });
  }, []);

  return (
    <Router>
      <nav style={{
  padding: '12px 20px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
{/* 오른쪽 메뉴 (즐겨찾기 + 로그인 버튼) */}
  <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
    <Link
      to="/favorites"
      style={{
        padding: '6px 12px',
        border: '1px solid #2d6cdf',
        borderRadius: '6px',
        color: '#2d6cdf',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}
    >
      즐겨찾기 목록
    </Link>

    <button
      onClick={toggleLogin}
      style={{
        padding: '6px 12px',
        border: '1px solid #2d6cdf',
        backgroundColor: 'white',
        color: '#2d6cdf',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      {isLoggedIn ? "로그아웃" : "로그인"}
    </button>
  </div>
</nav>

      <Routes>
        <Route path="/" element={
          <ContestPage
            contests={contests}
            favorites={favorites}
            handleFavorite={handleFavorite}
            isLoggedIn={isLoggedIn}
          />
        } />
        <Route path="/favorites" element={
          <FavoritePage
            contests={contests}
            favorites={favorites}
            handleFavorite={handleFavorite}
            isLoggedIn={isLoggedIn}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;

