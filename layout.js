function renderLayout(title, content){
  document.body.innerHTML = `
  <header>
    <h1>Petasia Market Intelligence</h1>
    <p>대만 반려동물 시장 진출 전략 플랫폼</p>
  </header>

  <div class="container">
    <aside>
      <h2>리포트 메뉴</h2>
      <div class="menu">
        <a href="index.html">🏠 홈</a>
        <a href="market-analysis.html">📊 시장 분석</a>
        <a href="pet-category.html">🐶 반려동물 카테고리</a>
        <a href="korean-brands.html">🇰🇷 한국 브랜드</a>
        <a href="taiwan-market.html">🇹🇼 대만 시장 조사</a>
        <a href="ecommerce-data.html">🛒 이커머스 데이터</a>
        <a href="checklist.html">✅ 체크리스트</a>
        <a href="decision-report.html">📁 의사결정 리포트</a>
      </div>
    </aside>

    <main>
      <div class="card">
        <h2>${title}</h2>
        ${content}
      </div>
    </main>
  </div>

  <footer>
    Petasia Intelligence Platform · GitHub Pages
  </footer>
  `;
}
