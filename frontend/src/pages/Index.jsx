import React, { useState } from 'react';

const Index = () => {
  const [clicks, setClicks] = useState(42); // Изначально 42 клика

  const handleClick = () => {
    setClicks(prev => prev + 1);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎮 Кликер Игра</h1>
        <div className="user-info">
          <span><strong>Имя пользователя</strong></span>
          <button className="logout-btn">Выйти</button>
        </div>
      </div>
      <div className="game-area">
        {/* Блок с кликами */}
        <div className="click-counter">
          <h2>Твои клики</h2>
          <div className="clicks-display">{clicks}</div>
          <button className="click-button" onClick={handleClick}>👆 КЛИКНИ!</button>
        </div>

        {/* Таблица топа */}
        <div className="leaderboard">
          <h2>🏆 Топ-10 игроков</h2>
          <ol>
            <li>
              <span className="rank">#1</span>
              <span className="username">bob</span>
              <span className="score">200 кликов</span>
            </li>
            <li>
              <span className="rank">#2</span>
              <span className="username">alice</span>
              <span className="score">150 кликов</span>
            </li>
            <li className="current-user">
              <span className="rank">#3</span>
              <span className="username">you</span>
              <span className="score">{clicks} кликов</span>
            </li>
            <li>
              <span className="rank">#4</span>
              <span className="username">charlie</span>
              <span className="score">75 кликов</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Index;