import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoritePage = ({ contests, favorites, handleFavorite, isLoggedIn }) => {
  const navigate = useNavigate();

  // 경고를 없애기 위해 navigate를 의존성 배열에 포함
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);  // 의존성 배열에 navigate 추가

  const favoriteContests = contests.filter(item => favorites.includes(item.제목));

  return (
    <div className="contest-container">
      <a href="http://localhost:59408/" style={{ textDecoration: 'none', color: 'inherit' }}>
        공모전 리스트
      </a>
      {favoriteContests.length === 0 ? (
        <p style={{ textAlign: 'center' }}>즐겨찾기한 공모전이 없습니다.</p>
      ) : (
        <div className="contest-grid">
          {favoriteContests.map((item, index) => (
            <div className="contest-card" key={index}>
              {isLoggedIn ? (
                <button
                  className="favorite-btn active"
                  onClick={() => handleFavorite(item.제목)}
                  title="즐겨찾기 해제"
                >
                  ★
                </button>
              ) : (
                <button
                  className="favorite-btn inactive"
                  disabled
                  title="로그인 후 즐겨찾기 가능"
                >
                  ★
                </button>
              )}
              <img src={item.썸네일} alt="썸네일" onError={(e) => e.target.style.display = 'none'} />
              <h2>{item.제목}</h2>
              <a href={item.상세링크} target="_blank" rel="noopener noreferrer">상세보기</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
