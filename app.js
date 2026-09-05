// 성경 66권 목록
const BIBLE_BOOKS = [
  { name: "창세기", chapters: 50 }, { name: "출애굽기", chapters: 40 }, { name: "레위기", chapters: 27 },
  { name: "민수기", chapters: 36 }, { name: "신명기", chapters: 34 }, { name: "여호수아", chapters: 24 },
  { name: "사사기", chapters: 21 }, { name: "룻기", chapters: 4 }, { name: "사무엘상", chapters: 31 },
  { name: "사무엘하", chapters: 24 }, { name: "열왕기상", chapters: 22 }, { name: "열왕기하", chapters: 25 },
  { name: "역대상", chapters: 29 }, { name: "역대하", chapters: 36 }, { name: "에스라", chapters: 10 },
  { name: "느헤미야", chapters: 13 }, { name: "에스더", chapters: 10 }, { name: "욥기", chapters: 42 },
  { name: "시편", chapters: 150 }, { name: "잠언", chapters: 31 }, { name: "전도서", chapters: 12 },
  { name: "아가", chapters: 8 }, { name: "이사야", chapters: 66 }, { name: "예레미야", chapters: 52 },
  { name: "예레미야애가", chapters: 5 }, { name: "에스겔", chapters: 48 }, { name: "다니엘", chapters: 12 },
  { name: "호세아", chapters: 14 }, { name: "요엘", chapters: 3 }, { name: "아모스", chapters: 9 },
  { name: "오바디야", chapters: 1 }, { name: "요나", chapters: 4 }, { name: "미가", chapters: 7 },
  { name: "나훔", chapters: 3 }, { name: "하박국", chapters: 3 }, { name: "스바냐", chapters: 3 },
  { name: "학개", chapters: 2 }, { name: "스가랴", chapters: 14 }, { name: "말라기", chapters: 4 },
  { name: "마태복음", chapters: 28 }, { name: "마가복음", chapters: 16 }, { name: "누가복음", chapters: 24 },
  { name: "요한복음", chapters: 21 }, { name: "사도행전", chapters: 28 }, { name: "로마서", chapters: 16 },
  { name: "고린도전서", chapters: 16 }, { name: "고린도후서", chapters: 13 }, { name: "갈라디아서", chapters: 6 },
  { name: "에베소서", chapters: 6 }, { name: "빌립보서", chapters: 4 }, { name: "골로새서", chapters: 4 },
  { name: "데살로니가전서", chapters: 5 }, { name: "데살로니가후서", chapters: 3 }, { name: "디모데전서", chapters: 6 },
  { name: "디모데후서", chapters: 4 }, { name: "디도서", chapters: 3 }, { name: "빌레몬서", chapters: 1 },
  { name: "히브리서", chapters: 13 }, { name: "야고보서", chapters: 5 }, { name: "베드로전서", chapters: 5 },
  { name: "베드로후서", chapters: 3 }, { name: "요한1서", chapters: 5 }, { name: "요한2서", chapters: 1 },
  { name: "요한3서", chapters: 1 }, { name: "유다서", chapters: 1 }, { name: "요한계시록", chapters: 22 }
];

// 역본 정보 설정
const TRANSLATIONS = {
  KG: { name: "개역개정", varName: "BIBLE_66_DB_KG", path: null },
  SB: { name: "새번역", varName: "BIBLE_66_DB_SB", path: null },
  EASY: { name: "쉬운성경", varName: "BIBLE_DB_EASY", path: "bible_data/bible_db_easy.js" },
  HYUNDAI: { name: "현대인의 성경", varName: "BIBLE_DB_HYUNDAI", path: "bible_data/bible_db_hyundai.js" },
  NIV: { name: "NIV (영어)", varName: "BIBLE_DB_NIV", path: "bible_data/bible_db_niv.js" },
  NLT: { name: "NLT (영어)", varName: "BIBLE_DB_NLT", path: "bible_data/bible_db_nlt.js" },
  NKJV: { name: "NKJV (영어)", varName: "BIBLE_DB_NKJV", path: "bible_data/bible_db_nkjv.js" },
  RSV: { name: "RSV (영어)", varName: "BIBLE_DB_RSV", path: "bible_data/bible_db_rsv.js" }
};

// 현재 상태 (마지막 읽은 장 localStorage에서 복원)
const savedLastRead = JSON.parse(localStorage.getItem("bible_last_read_location") || "{}");
let state = {
  book: savedLastRead.book || "창세기",
  chapter: savedLastRead.chapter || 1,
  translation: savedLastRead.translation || "KG",
  secondaryTranslation: savedLastRead.secondaryTranslation || "NONE",
  selectedVerse: savedLastRead.selectedVerse || 1
};

function saveLastReadLocation() {
  localStorage.setItem("bible_last_read_location", JSON.stringify({
    book: state.book,
    chapter: state.chapter,
    translation: state.translation,
    secondaryTranslation: state.secondaryTranslation,
    selectedVerse: state.selectedVerse
  }));
}

// TTS 상태
let isTTSSpeaking = false;
let isTTSPaused = false;
let currentTTSIndex = 0;
let ttsSpeechItems = [];
let ttsRate = 1.0; // 1.0, 1.2, 1.5, 0.8
let repeatMode = 'CONTINUOUS'; // 'CONTINUOUS', 'CHAPTER', 'VERSE'

// DOM 요소
let quickBookSelect, quickChapterSelect, primaryTranslationSelect, secondaryTranslationSelect, btnPrevChapter, btnNextChapter, bibleViewerEl;
let btnAudioTTSPlay, btnAudioTTSPlay2, btnAudioTTSPrev, btnAudioTTSNext, btnTTSSpeed, btnTTSRepeat, btnAudioTTSStop, ttsPlayerBox;

function init() {
  quickBookSelect = document.getElementById("quickBookSelect");
  quickChapterSelect = document.getElementById("quickChapterSelect");
  primaryTranslationSelect = document.getElementById("primaryTranslation");
  secondaryTranslationSelect = document.getElementById("secondaryTranslation");
  btnPrevChapter = document.getElementById("btnPrevChapter");
  btnNextChapter = document.getElementById("btnNextChapter");
  bibleViewerEl = document.getElementById("bibleViewer");

  // 헤더 및 하단 플레이어 컨트롤
  btnAudioTTSPlay = document.getElementById("btnAudioTTSPlay");
  btnAudioTTSPlay2 = document.getElementById("btnAudioTTSPlay2");
  btnAudioTTSPrev = document.getElementById("btnAudioTTSPrev");
  btnAudioTTSNext = document.getElementById("btnAudioTTSNext");
  btnTTSSpeed = document.getElementById("btnTTSSpeed");
  btnTTSRepeat = document.getElementById("btnTTSRepeat");
  btnAudioTTSStop = document.getElementById("btnAudioTTSStop");
  ttsPlayerBox = document.getElementById("ttsPlayerBox");

  // 책 선택 드롭다운 채우기
  quickBookSelect.innerHTML = "";
  BIBLE_BOOKS.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.name;
    opt.textContent = b.name;
    quickBookSelect.appendChild(opt);
  });

  // 이벤트 연결
  quickBookSelect.addEventListener("change", (e) => {
    stopTTS();
    state.book = e.target.value;
    state.chapter = 1;
    state.selectedVerse = 1;
    updateChapterSelect();
    renderBible();
  });

  quickChapterSelect.addEventListener("change", (e) => {
    stopTTS();
    state.chapter = parseInt(e.target.value);
    state.selectedVerse = 1;
    renderBible();
  });

  primaryTranslationSelect.addEventListener("change", (e) => {
    state.translation = e.target.value;
    renderBible();
    if (isTTSSpeaking) {
      playFromVerse(state.selectedVerse);
    }
  });

  if (secondaryTranslationSelect) {
    secondaryTranslationSelect.addEventListener("change", (e) => {
      state.secondaryTranslation = e.target.value;
      renderBible();
    });
  }

  function gotoPrevChapter() {
    if (state.chapter > 1) {
      stopTTS();
      state.chapter--;
      state.selectedVerse = 1;
      updateChapterSelect();
      renderBible();
    } else {
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.name === state.book);
      if (currentBookIdx > 0) {
        const prevBook = BIBLE_BOOKS[currentBookIdx - 1];
        stopTTS();
        state.book = prevBook.name;
        state.chapter = prevBook.chapters;
        state.selectedVerse = 1;
        updateChapterSelect();
        renderBible();
      }
    }
  }

  function gotoNextChapter() {
    const bInfo = BIBLE_BOOKS.find(b => b.name === state.book);
    if (bInfo && state.chapter < bInfo.chapters) {
      stopTTS();
      state.chapter++;
      state.selectedVerse = 1;
      updateChapterSelect();
      renderBible();
    } else {
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.name === state.book);
      if (currentBookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentBookIdx + 1];
        stopTTS();
        state.book = nextBook.name;
        state.chapter = 1;
        state.selectedVerse = 1;
        updateChapterSelect();
        renderBible();
      }
    }
  }

  btnPrevChapter.addEventListener("click", gotoPrevChapter);
  btnNextChapter.addEventListener("click", gotoNextChapter);

  // 좌우 스와이프 장 넘기기 제스처 지원
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  bibleViewerEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  bibleViewerEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  }, { passive: true });

  function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // 수평 스와이프 조작 판별 (가로 이동거리가 60px 이상이고 세로 이동거리보다 큰 경우)
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        // 왼쪽으로 스와이프 -> 다음 장
        gotoNextChapter();
      } else {
        // 오른쪽으로 스와이프 -> 이전 장
        gotoPrevChapter();
      }
    }
  }

  // 재생 버튼 이벤트
  if (btnAudioTTSPlay) btnAudioTTSPlay.addEventListener("click", togglePlayTTS);
  if (btnAudioTTSPlay2) btnAudioTTSPlay2.addEventListener("click", togglePlayTTS);
  if (btnAudioTTSStop) btnAudioTTSStop.addEventListener("click", stopTTS);
  if (btnAudioTTSPrev) btnAudioTTSPrev.addEventListener("click", playPrevTTS);
  if (btnAudioTTSNext) btnAudioTTSNext.addEventListener("click", playNextTTS);
  if (btnTTSSpeed) btnTTSSpeed.addEventListener("click", toggleTTSSpeed);
  if (btnTTSRepeat) btnTTSRepeat.addEventListener("click", toggleRepeatMode);

  // 모달 & 페이지 탭 제어 요소
  const btnOpenSettings = document.getElementById("btnOpenSettings");
  const btnCloseSettings = document.getElementById("btnCloseSettings");
  const settingsModal = document.getElementById("settingsModal");

  const btnOpenBoardTab = document.getElementById("btnOpenBoardTab");
  const btnCloseBoardTab = document.getElementById("btnCloseBoardTab");
  const boardPageTab = document.getElementById("boardPageTab");

  const btnBottomToggleRead = document.getElementById("btnBottomToggleRead");
  if (btnBottomToggleRead) {
    btnBottomToggleRead.addEventListener("click", () => {
      toggleChapterRead(state.book, state.chapter);
    });
  }

  // 66권 성경 통독표 전용 메인 페이지 탭 열기/닫기
  if (btnOpenBoardTab) {
    btnOpenBoardTab.addEventListener("click", () => {
      boardPageTab.classList.remove("hidden");
      renderFullBoardPageTab();
    });
  }
  if (btnCloseBoardTab) {
    btnCloseBoardTab.addEventListener("click", () => {
      boardPageTab.classList.add("hidden");
    });
  }

  // 설정 모달 열기 / 닫기
  if (btnOpenSettings) {
    btnOpenSettings.addEventListener("click", () => {
      settingsModal.classList.remove("hidden");
      renderSettingsBoardGrid();
    });
  }
  if (btnCloseSettings) {
    btnCloseSettings.addEventListener("click", () => {
      settingsModal.classList.add("hidden");
    });
  }

  // 설정 모달 내 66권 읽은 장 격자표 아코디언 토글
  const btnToggleBoardGrid = document.getElementById("btnToggleBoardGrid");
  const boardGridWrapper = document.getElementById("boardGridWrapper");
  const boardAccordionArrow = document.getElementById("boardAccordionArrow");

  if (btnToggleBoardGrid && boardGridWrapper) {
    btnToggleBoardGrid.addEventListener("click", () => {
      const isHidden = boardGridWrapper.classList.contains("hidden");
      if (isHidden) {
        boardGridWrapper.classList.remove("hidden");
        if (boardAccordionArrow) boardAccordionArrow.textContent = "▲";
        renderSettingsBoardGrid();
      } else {
        boardGridWrapper.classList.add("hidden");
        if (boardAccordionArrow) boardAccordionArrow.textContent = "▼";
      }
    });
  }

  // 메모 모달 제어 이벤트
  const btnCloseNote = document.getElementById("btnCloseNote");
  const btnSaveNote = document.getElementById("btnSaveNote");
  const btnDeleteNote = document.getElementById("btnDeleteNote");
  const noteModal = document.getElementById("noteModal");
  const noteInputText = document.getElementById("noteInputText");

  if (btnCloseNote) {
    btnCloseNote.addEventListener("click", () => {
      noteModal.classList.add("hidden");
    });
  }

  if (btnSaveNote) {
    btnSaveNote.addEventListener("click", () => {
      if (currentEditingNoteKey && noteInputText) {
        const text = noteInputText.value.trim();
        if (text) {
          bibleNotes[currentEditingNoteKey] = text;
        } else {
          delete bibleNotes[currentEditingNoteKey];
        }
        saveBibleNotes();
        noteModal.classList.add("hidden");
        renderBible();
      }
    });
  }

  if (btnDeleteNote) {
    btnDeleteNote.addEventListener("click", () => {
      if (currentEditingNoteKey && confirm("작성하신 메모를 삭제하시겠습니까?")) {
        delete bibleNotes[currentEditingNoteKey];
        saveBibleNotes();
        noteModal.classList.add("hidden");
        renderBible();
      }
    });
  }

  // 글자 크기 조절
  const btnModalFontDec = document.getElementById("btnModalFontDec");
  const btnModalFontInc = document.getElementById("btnModalFontInc");
  const fontRatioLabel = document.getElementById("fontRatioLabel");

  let currentFontSize = 1.1; // 기본 rem
  const updateFontDisplay = () => {
    document.documentElement.style.setProperty("--verse-font-size", `${currentFontSize.toFixed(2)}rem`);
    if (fontRatioLabel) fontRatioLabel.textContent = `${currentFontSize.toFixed(1)}x`;
  };

  if (btnModalFontDec) {
    btnModalFontDec.addEventListener("click", () => {
      if (currentFontSize > 0.85) {
        currentFontSize -= 0.1;
        updateFontDisplay();
      }
    });
  }

  if (btnModalFontInc) {
    btnModalFontInc.addEventListener("click", () => {
      if (currentFontSize < 1.8) {
        currentFontSize += 0.1;
        updateFontDisplay();
      }
    });
  }

  // 맑게 / 어둡게 테마
  const btnThemeSepia = document.getElementById("btnThemeSepia");
  const btnThemeDark = document.getElementById("btnThemeDark");

  if (btnThemeSepia) {
    btnThemeSepia.addEventListener("click", () => {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-sepia");
      btnThemeSepia.classList.add("active");
      if (btnThemeDark) btnThemeDark.classList.remove("active");
    });
  }

  if (btnThemeDark) {
    btnThemeDark.addEventListener("click", () => {
      document.body.classList.remove("theme-sepia");
      document.body.classList.add("theme-dark");
      btnThemeDark.classList.add("active");
      if (btnThemeSepia) btnThemeSepia.classList.remove("active");
    });
  }

  // 통독 기록 초기화
  const btnResetHistory = document.getElementById("btnResetHistory");
  if (btnResetHistory) {
    btnResetHistory.addEventListener("click", () => {
      if (confirm("정말로 모든 성경 통독 기록을 초기화하시겠습니까?")) {
        readHistory = {};
        saveReadHistory();
        renderSettingsBoardGrid();
        updateReadBadgeState();
      }
    });
  }



  setupMediaSessionHandlers();

  updateChapterSelect();
  renderBible();
}

function updateChapterSelect() {
  const bInfo = BIBLE_BOOKS.find(b => b.name === state.book);
  if (!bInfo) return;

  quickBookSelect.value = state.book;
  quickChapterSelect.innerHTML = "";
  const unit = state.book === "시편" ? "편" : "장";

  for (let i = 1; i <= bInfo.chapters; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i}${unit}`;
    quickChapterSelect.appendChild(opt);
  }
  quickChapterSelect.value = state.chapter;
}

// 통독 읽음 기록 persistence (localStorage)
let readHistory = JSON.parse(localStorage.getItem("bible_read_history") || "{}");

function saveReadHistory() {
  localStorage.setItem("bible_read_history", JSON.stringify(readHistory));
}

function isChapterRead(bookName, chapterNum) {
  return readHistory[bookName] && readHistory[bookName].includes(chapterNum);
}

function markChapterRead(bookName, chapterNum) {
  if (!readHistory[bookName]) {
    readHistory[bookName] = [];
  }
  if (!readHistory[bookName].includes(chapterNum)) {
    readHistory[bookName].push(chapterNum);
    saveReadHistory();
  }
  updateReadBadgeState();
  renderSettingsBoardGrid();
}

function toggleChapterRead(bookName, chapterNum) {
  if (!readHistory[bookName]) {
    readHistory[bookName] = [];
  }
  const idx = readHistory[bookName].indexOf(chapterNum);
  if (idx === -1) {
    readHistory[bookName].push(chapterNum);
  } else {
    readHistory[bookName].splice(idx, 1);
  }
  saveReadHistory();
  updateReadBadgeState();
  renderSettingsBoardGrid();
}

// 본문 하단 읽음 완료 버튼 상태 업데이트
function updateReadBadgeState() {
  const btn = document.getElementById("btnBottomToggleRead");
  const textEl = document.getElementById("bottomReadText");
  if (!btn) return;
  const isRead = isChapterRead(state.book, state.chapter);
  const unit = state.book === "시편" ? "편" : "장";

  if (isRead) {
    btn.classList.add("is-read");
    if (textEl) textEl.textContent = `${state.book} ${state.chapter}${unit} 읽음 완료! (클릭 시 취소)`;
  } else {
    btn.classList.remove("is-read");
    if (textEl) textEl.textContent = `${state.book} ${state.chapter}${unit} 읽음 완료 표시`;
  }
}

// 설정 모달 내 66권 성경 장별 음성/읽음 음색 식별 격자표 렌더링
function renderSettingsBoardGrid() {
  const container = document.getElementById("settingsBoardGrid");
  if (!container) return;
  container.innerHTML = "";

  let totalChapters = 1189;
  let readCountTotal = 0;

  BIBLE_BOOKS.forEach(book => {
    const bookRow = document.createElement("div");
    bookRow.className = "progress-book-row";

    const readList = readHistory[book.name] || [];
    readCountTotal += readList.length;
    const unit = book.name === "시편" ? "편" : "장";

    const title = document.createElement("div");
    title.className = "grid-book-name";
    title.textContent = `${book.name} (${readList.length}/${book.chapters}${unit})`;

    const flex = document.createElement("div");
    flex.className = "grid-dots-row";

    for (let i = 1; i <= book.chapters; i++) {
      const dot = document.createElement("div");
      const isRead = readList.includes(i);
      dot.className = `grid-dot ${isRead ? 'checked' : ''}`;
      dot.textContent = `${i}`;
      dot.title = `${book.name} ${i}${unit} ${isRead ? '(읽음 완료)' : '(미독)'}`;

      dot.addEventListener("click", () => {
        toggleChapterRead(book.name, i);
        renderSettingsBoardGrid();
      });

      flex.appendChild(dot);
    }

    bookRow.appendChild(title);
    bookRow.appendChild(flex);
    container.appendChild(bookRow);
  });

  const countEl = document.getElementById("completedChaptersCount");
  const pctEl = document.getElementById("progressPercentage");
  const barEl = document.getElementById("progressBarFill");

  if (countEl) countEl.textContent = readCountTotal;
  const ratio = ((readCountTotal / totalChapters) * 100).toFixed(1);
  if (pctEl) pctEl.textContent = `${ratio}%`;
  if (barEl) barEl.style.width = `${ratio}%`;
}

// 통독 계획 탭 콘텐츠 렌더링 (66권 통독표, 맥체인, 1년 1독)
function renderPlanTab(type) {
  const container = document.getElementById("planTabContent");
  if (!container) return;
  container.innerHTML = "";

  if (type === "BOARD") {
    // 66권 전체 통독표 대시보드
    renderProgressBoard(container);
  } else if (type === "MCHEYNE") {
    const mcheynePlans = [
      { title: "오늘의 맥체인 통독 (155일차 / 예시)", items: [
        { book: "창세기", ch: 1 },
        { book: "마태복음", ch: 1 },
        { book: "에스더", ch: 1 },
        { book: "사도행전", ch: 1 }
      ]},
      { title: "내일의 맥체인 통독 (156일차)", items: [
        { book: "창세기", ch: 2 },
        { book: "마태복음", ch: 2 },
        { book: "에스더", ch: 2 },
        { book: "사도행전", ch: 2 }
      ]}
    ];

    mcheynePlans.forEach(plan => {
      const card = document.createElement("div");
      card.className = "plan-card";
      let html = `<div class="plan-card-title"><span>${plan.title}</span></div><div class="plan-card-items" style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">`;
      plan.items.forEach(item => {
        html += `<button class="btn-plan-go" onclick="navigateFromPlan('${item.book}', ${item.ch})">${item.book} ${item.ch}장 📖</button>`;
      });
      html += `</div>`;
      card.innerHTML = html;
      container.appendChild(card);
    });
  } else if (type === "YEAR_ONE") {
    const card = document.createElement("div");
    card.className = "plan-card";
    card.innerHTML = `
      <div class="plan-card-title"><span>📖 1년 1독 추천 가이드</span></div>
      <p style="font-size:0.9rem; line-height:1.5; color:var(--text-color); margin-top:6px;">
        매일 구약 3장, 신약 1장씩 읽으시면 1년 안에 성경 66권을 완독하실 수 있습니다.
      </p>
      <div style="display:flex; gap:8px; margin-top:10px;">
        <button class="btn-plan-go" onclick="navigateFromPlan('창세기', 1)">오늘의 구약 (창 1~3장)</button>
        <button class="btn-plan-go" onclick="navigateFromPlan('마태복음', 1)">오늘의 신약 (마 1장)</button>
      </div>
    `;
    container.appendChild(card);
  }
}

function renderProgressBoard(container) {
  let totalChapters = 1189;
  let readCountTotal = 0;

  BIBLE_BOOKS.forEach(book => {
    const bookRow = document.createElement("div");
    bookRow.className = "progress-book-row";

    const readList = readHistory[book.name] || [];
    readCountTotal += readList.length;

    const unit = book.name === "시편" ? "편" : "장";

    const title = document.createElement("div");
    title.className = "progress-book-name";
    title.textContent = `${book.name} (${readList.length} / ${book.chapters}${unit})`;

    const flex = document.createElement("div");
    flex.className = "progress-chapters-flex";

    for (let i = 1; i <= book.chapters; i++) {
      const dot = document.createElement("div");
      const isRead = readList.includes(i);
      dot.className = `progress-chapter-dot ${isRead ? 'checked' : ''}`;
      dot.textContent = `${i}`;

      dot.addEventListener("click", () => {
        toggleChapterRead(book.name, i);
        renderProgressBoard(container);
      });

      flex.appendChild(dot);
    }

    bookRow.appendChild(title);
    bookRow.appendChild(flex);
    container.appendChild(bookRow);
  });

  const countEl = document.getElementById("completedChaptersCount");
  const pctEl = document.getElementById("progressPercentage");
  const barEl = document.getElementById("progressBarFill");

  if (countEl) countEl.textContent = readCountTotal;
  const ratio = ((readCountTotal / totalChapters) * 100).toFixed(1);
  if (pctEl) pctEl.textContent = `${ratio}%`;
  if (barEl) barEl.style.width = `${ratio}%`;
}

function navigateFromPlan(book, chapter) {
  stopTTS();
  state.book = book;
  state.chapter = chapter;
  state.selectedVerse = 1;
  updateChapterSelect();
  renderBible();
  const settingsModal = document.getElementById("settingsModal");
  if (settingsModal) settingsModal.classList.add("hidden");
}

// 동적 역본 파일 로더
function ensureTranslationLoaded(tCode, callback) {
  const tInfo = TRANSLATIONS[tCode];
  if (!tInfo) return callback(false);

  if (window[tInfo.varName]) {
    return callback(true);
  }

  if (tInfo.path) {
    const script = document.createElement("script");
    script.src = tInfo.path;
    script.onload = () => callback(true);
    script.onerror = () => callback(false);
    document.body.appendChild(script);
  } else {
    callback(false);
  }
}

function renderBible() {
  bibleViewerEl.innerHTML = "";

  const unit = state.book === "시편" ? "편" : "장";
  const title = document.createElement("h2");
  title.className = "chapter-title";
  title.textContent = `${state.book} ${state.chapter}${unit}`;
  bibleViewerEl.appendChild(title);

  // 주역본 및 대조역본 로드
  ensureTranslationLoaded(state.translation, (pSuccess) => {
    const pInfo = TRANSLATIONS[state.translation] || TRANSLATIONS.KG;
    const pDb = window[pInfo.varName];

    if (!pSuccess || !pDb || !pDb[state.book] || !pDb[state.book][String(state.chapter)]) {
      const err = document.createElement("div");
      err.style.color = "red";
      err.style.textAlign = "center";
      err.style.padding = "20px";
      err.textContent = `[${pInfo.name}] 데이터를 불러올 수 없거나 로드 중입니다.`;
      bibleViewerEl.appendChild(err);
      return;
    }

    const pVerses = pDb[state.book][String(state.chapter)];

    const hasSecondary = state.secondaryTranslation && state.secondaryTranslation !== "NONE";
    if (hasSecondary) {
      ensureTranslationLoaded(state.secondaryTranslation, (sSuccess) => {
        const sInfo = TRANSLATIONS[state.secondaryTranslation];
        const sDb = sInfo ? window[sInfo.varName] : null;
        const sVerses = (sDb && sDb[state.book] && sDb[state.book][String(state.chapter)]) ? sDb[state.book][String(state.chapter)] : [];

        renderVerseCards(pVerses, sVerses);
      });
    } else {
      renderVerseCards(pVerses, null);
    }
    updateReadBadgeState();
    saveLastReadLocation();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

// 메모 데이터 Persistence (localStorage)
let bibleNotes = JSON.parse(localStorage.getItem("bible_user_notes") || "{}");

function saveBibleNotes() {
  localStorage.setItem("bible_user_notes", JSON.stringify(bibleNotes));
}

function getVerseNoteKey(book, chapter, verse) {
  return `${book}_${chapter}_${verse}`;
}

let currentEditingNoteKey = null;

function openNoteModal(book, chapter, verse, verseText) {
  const key = getVerseNoteKey(book, chapter, verse);
  currentEditingNoteKey = key;

  const noteModal = document.getElementById("noteModal");
  const noteModalTitle = document.getElementById("noteModalTitle");
  const noteVersePreview = document.getElementById("noteVersePreview");
  const noteInputText = document.getElementById("noteInputText");
  const btnDeleteNote = document.getElementById("btnDeleteNote");

  const unit = book === "시편" ? "편" : "장";
  if (noteModalTitle) noteModalTitle.textContent = `📝 ${book} ${chapter}${unit} ${verse}절 메모`;
  if (noteVersePreview) noteVersePreview.textContent = `${verse}절: ${verseText}`;

  const existingNote = bibleNotes[key] || "";
  if (noteInputText) noteInputText.value = existingNote;

  if (existingNote) {
    if (btnDeleteNote) btnDeleteNote.classList.remove("hidden");
  } else {
    if (btnDeleteNote) btnDeleteNote.classList.add("hidden");
  }

  if (noteModal) noteModal.classList.remove("hidden");
}

function renderVerseCards(pVerses, sVerses) {
  pVerses.forEach((rawText, idx) => {
    const verseNum = idx + 1;
    let cleanPrimary = rawText.replace(/[○◯⚪🔴⚫\u25cb]/g, "").trim();

    const card = document.createElement("div");
    card.className = "verse-card";
    card.setAttribute("data-verse", verseNum);

    // 단일 터치/클릭: 순수 구절 선택 및 하이라이트
    card.addEventListener("click", () => {
      onVerseClick(verseNum);
    });

    // 더블클릭/더블터치: 구절 메모 작성 창 열기
    card.addEventListener("dblclick", (e) => {
      e.preventDefault();
      openNoteModal(state.book, state.chapter, verseNum, cleanPrimary);
    });

    const noteKey = getVerseNoteKey(state.book, state.chapter, verseNum);
    const existingNote = bibleNotes[noteKey];

    let html = `<div class="verse-primary">
      <span class="verse-num">${verseNum}</span> ${cleanPrimary}`;

    if (existingNote) {
      html += ` <span class="verse-note-indicator" title="메모 있음">📝 메모</span>`;
    }
    html += `</div>`;

    if (existingNote) {
      html += `<div class="verse-note-text-snippet">💬 ${existingNote}</div>`;
    }

    if (sVerses && sVerses[idx]) {
      let cleanSecondary = sVerses[idx].replace(/[○◯⚪🔴⚫\u25cb]/g, "").trim();
      html += `<div class="verse-secondary">${cleanSecondary}</div>`;
    }

    card.innerHTML = html;
    bibleViewerEl.appendChild(card);
  });

  highlightVerse(state.selectedVerse);
}

// 구절 클릭/터치 시 동작
function onVerseClick(verseNum) {
  state.selectedVerse = verseNum;
  highlightVerse(verseNum);

  // 음성 낭독 모드(isTTSSpeaking)가 켜져 있으면, 터치한 구절부터 즉시 이어서 낭독
  if (isTTSSpeaking) {
    playFromVerse(verseNum);
  }
}

// 특정 구절 노란색 하이라이트
function highlightVerse(verseNum) {
  bibleViewerEl.querySelectorAll(".verse-card").forEach(card => {
    const v = parseInt(card.getAttribute("data-verse"));
    if (v === verseNum) {
      card.classList.add("selected-verse");
      card.classList.add("is-reading");
    } else {
      card.classList.remove("selected-verse");
      card.classList.remove("is-reading");
    }
  });
}

// -------------------------------------------------------------
// TTS 음성 낭독 컨트롤
// -------------------------------------------------------------
function togglePlayTTS() {
  if (!('speechSynthesis' in window)) {
    alert("이 브라우저는 음성 낭독(TTS)을 지원하지 않습니다.");
    return;
  }

  // iOS Safari touch unlock & 백그라운드 오디오 준비
  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.play().catch(e => {});
  }

  try {
    const unlockUtterance = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(unlockUtterance);
  } catch (e) {}

  if (isTTSSpeaking) {
    if (isTTSPaused) {
      resumeTTS();
    } else {
      pauseTTS();
    }
  } else {
    // 터치하거나 선택해둔 절부터 바로 재생 시작 및 플레이어 박스 열기
    playFromVerse(state.selectedVerse || 1);
  }
}

function playFromVerse(startVerse) {
  window.speechSynthesis.cancel();

  const cards = bibleViewerEl.querySelectorAll(".verse-card");
  if (cards.length === 0) return;

  ttsSpeechItems = [];
  cards.forEach(card => {
    const verseNum = parseInt(card.getAttribute("data-verse"));
    const primaryEl = card.querySelector(".verse-primary");
    let textToSpeak = primaryEl ? primaryEl.textContent : (card.textContent || "");

    textToSpeak = textToSpeak.replace(/\[[^\]]*\]/g, "");
    textToSpeak = textToSpeak.replace(/<[^>]*>/g, "");
    textToSpeak = textToSpeak.replace(/\([^)]*\)/g, "");
    textToSpeak = textToSpeak.replace(/[○◯⚪🔴⚫\u25cb]/g, "");
    textToSpeak = textToSpeak.replace(/^\s*(\d+)\s+/, "").trim();

    if (textToSpeak) {
      ttsSpeechItems.push({
        element: card,
        verse: verseNum,
        text: textToSpeak
      });
    }
  });

  if (ttsSpeechItems.length === 0) return;

  // startVerse에 해당하는 인덱스 찾기
  let startIndex = ttsSpeechItems.findIndex(item => item.verse === startVerse);
  if (startIndex === -1) startIndex = 0;

  isTTSSpeaking = true;
  isTTSPaused = false;
  currentTTSIndex = startIndex;

  if (ttsPlayerBox) ttsPlayerBox.classList.remove("hidden");
  updateTTSPlayButtons(true);

  speakNextTTS();
}

let ttsKeepAliveTimer = null;

function speakNextTTS() {
  if (!isTTSSpeaking) return;

  if (currentTTSIndex >= ttsSpeechItems.length) {
    // 낭독 재생 완료 시 자동으로 해당 장 '읽음 완료' 처리
    markChapterRead(state.book, state.chapter);

    if (repeatMode === 'CHAPTER') {
      playFromVerse(1);
    } else if (repeatMode === 'CONTINUOUS') {
      const bInfo = BIBLE_BOOKS.find(b => b.name === state.book);
      if (bInfo && state.chapter < bInfo.chapters) {
        state.chapter++;
        state.selectedVerse = 1;
        updateChapterSelect();
        renderBible();
        setTimeout(() => {
          playFromVerse(1);
        }, 500);
      } else {
        stopTTS();
      }
    } else {
      stopTTS();
    }
    return;
  }

  const item = ttsSpeechItems[currentTTSIndex];
  state.selectedVerse = item.verse;

  highlightVerse(item.verse);
  if (item.element) {
    item.element.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // iOS Safari SpeechSynthesis 백그라운드 멈춤 타이머 해제
  if (ttsKeepAliveTimer) {
    clearInterval(ttsKeepAliveTimer);
    ttsKeepAliveTimer = null;
  }

  const utterance = new SpeechSynthesisUtterance(item.text);
  utterance.lang = (state.translation.startsWith("NI") || state.translation.startsWith("NL") || state.translation.startsWith("NK") || state.translation.startsWith("RS")) ? "en-US" : "ko-KR";
  utterance.rate = ttsRate;

  utterance.onend = () => {
    if (ttsKeepAliveTimer) {
      clearInterval(ttsKeepAliveTimer);
      ttsKeepAliveTimer = null;
    }
    if (isTTSSpeaking && !isTTSPaused) {
      if (repeatMode === 'VERSE') {
        speakNextTTS();
      } else {
        currentTTSIndex++;
        speakNextTTS();
      }
    }
  };

  utterance.onerror = (e) => {
    console.error("TTS Error:", e);
    if (ttsKeepAliveTimer) {
      clearInterval(ttsKeepAliveTimer);
      ttsKeepAliveTimer = null;
    }
    if (isTTSSpeaking && !isTTSPaused) {
      currentTTSIndex++;
      speakNextTTS();
    }
  };

  window.speechSynthesis.speak(utterance);

  // iOS Safari 백그라운드 재생 지속을 위한 무음 오디오 재개
  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio && bgAudio.paused) {
    bgAudio.play().catch(e => console.log("bgAudio play catch:", e));
  }

  // iOS 백그라운드에서 SpeechSynthesis 엔진 멈춤을 방지하는 1초 간격 킵어라이브 Watchdog
  ttsKeepAliveTimer = setInterval(() => {
    if (isTTSSpeaking && !isTTSPaused) {
      if (bgAudio && bgAudio.paused) {
        bgAudio.play().catch(e => {});
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.speaking) {
        clearInterval(ttsKeepAliveTimer);
        ttsKeepAliveTimer = null;
        speakNextTTS();
      }
    } else {
      clearInterval(ttsKeepAliveTimer);
      ttsKeepAliveTimer = null;
    }
  }, 1000);
}

function playPrevTTS() {
  if (!isTTSSpeaking) return;
  if (currentTTSIndex > 0) {
    currentTTSIndex--;
    const item = ttsSpeechItems[currentTTSIndex];
    playFromVerse(item.verse);
  }
}

function playNextTTS() {
  if (!isTTSSpeaking) return;
  if (currentTTSIndex < ttsSpeechItems.length - 1) {
    currentTTSIndex++;
    const item = ttsSpeechItems[currentTTSIndex];
    playFromVerse(item.verse);
  }
}

function toggleTTSSpeed() {
  const rates = [0.8, 0.9, 1.0, 1.1, 1.2];
  let currIdx = rates.indexOf(ttsRate);
  let nextIdx = (currIdx + 1) % rates.length;
  ttsRate = rates[nextIdx];
  if (btnTTSSpeed) btnTTSSpeed.textContent = `🐢 ${ttsRate.toFixed(1)}x`;

  if (isTTSSpeaking && !isTTSPaused) {
    playFromVerse(state.selectedVerse);
  }
}

function toggleRepeatMode() {
  if (repeatMode === 'CONTINUOUS') {
    repeatMode = 'CHAPTER';
    if (btnTTSRepeat) {
      btnTTSRepeat.textContent = "🔁 장반복";
      btnTTSRepeat.classList.add("active");
    }
  } else if (repeatMode === 'CHAPTER') {
    repeatMode = 'VERSE';
    if (btnTTSRepeat) {
      btnTTSRepeat.textContent = "🔂 절반복";
      btnTTSRepeat.classList.add("active");
    }
  } else {
    repeatMode = 'CONTINUOUS';
    if (btnTTSRepeat) {
      btnTTSRepeat.textContent = "🔄 연속";
      btnTTSRepeat.classList.remove("active");
    }
  }
}

function pauseTTS() {
  if (!isTTSSpeaking) return;
  isTTSPaused = true;
  try {
    window.speechSynthesis.pause();
  } catch (e) {}
  
  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.pause();
  }
  
  updateTTSPlayButtons(false);
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = "paused";
  }
}

function resumeTTS() {
  if (!isTTSSpeaking) return;
  isTTSPaused = false;
  
  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.play().catch(e => {});
  }
  
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else if (!window.speechSynthesis.speaking) {
      speakNextTTS();
    }
  } catch (e) {
    speakNextTTS();
  }
  
  updateTTSPlayButtons(true);
  if (ttsPlayerBox) ttsPlayerBox.classList.remove("hidden");
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = "playing";
  }
}

function stopTTS() {
  isTTSSpeaking = false;
  isTTSPaused = false;

  if (ttsKeepAliveTimer) {
    clearInterval(ttsKeepAliveTimer);
    ttsKeepAliveTimer = null;
  }

  try {
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
  } catch (e) {}

  currentTTSIndex = 0;
  ttsSpeechItems = [];

  updateTTSPlayButtons(false);
  if (ttsPlayerBox) ttsPlayerBox.classList.add("hidden");

  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.pause();
    try { bgAudio.currentTime = 0; } catch (e) {}
  }

  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = "none";
  }
}

function updateTTSPlayButtons(isPlaying) {
  const icon = isPlaying ? "❚❚" : "▶";
  if (btnAudioTTSPlay) btnAudioTTSPlay.textContent = icon;
  if (btnAudioTTSPlay2) btnAudioTTSPlay2.textContent = icon;

  const bgAudio = document.getElementById('bgSilentAudio');
  if (isPlaying && !isTTSPaused) {
    if (bgAudio && bgAudio.paused) {
      bgAudio.play().catch(e => console.log("bgAudio play catch:", e));
    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = "playing";
    }
  } else {
    if (bgAudio) {
      bgAudio.pause();
    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  }
  updateMediaSession();
}

function updateMediaSession() {
  if ('mediaSession' in navigator && window.MediaMetadata) {
    const unit = state.book === "시편" ? "편" : "장";
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `${state.book} ${state.chapter}${unit} ${state.selectedVerse || 1}절`,
      artist: `성경 낭독 (${TRANSLATIONS[state.translation]?.name || "개역개정"})`,
      album: "개인용 성경앱",
      artwork: [
        { src: 'symbol_logo.png', sizes: '512x512', type: 'image/png' }
      ]
    });
  }
}

function setupMediaSessionHandlers() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      resumeTTS();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      pauseTTS();
    });
    navigator.mediaSession.setActionHandler('stop', () => {
      stopTTS();
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      playPrevTTS();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      playNextTTS();
    });
  }

  // 블루투스 이어폰 탈착 및 사운드 출력 장치 해제 감지 (iOS / Android 공통)
  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.addEventListener('pause', () => {
      // 오디오가 멈췄을 때 TTS가 계속 작동 중이면 무음 오디오 재개
      if (isTTSSpeaking && !isTTSPaused) {
        bgAudio.play().catch(e => {});
      }
    });
  }
}

// 백그라운드 전환 시 오디오 세션 유지
window.addEventListener('pagehide', () => {
  if (isTTSSpeaking && !isTTSPaused) {
    const bgAudio = document.getElementById('bgSilentAudio');
    if (bgAudio && bgAudio.paused) {
      bgAudio.play().catch(e => {});
    }
  }
});

// 앱이 백그라운드로 내려가거나 화면이 꺼질 때 iOS 음성 엔진 복구 및 지속 유지
document.addEventListener('visibilitychange', function() {
  const bgAudio = document.getElementById('bgSilentAudio');
  if (document.hidden) {
    if (isTTSSpeaking && !isTTSPaused) {
      if (bgAudio && bgAudio.paused) {
        bgAudio.play().catch(e => console.log("bgAudio play catch on hidden:", e));
      }
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }
  } else {
    if (isTTSSpeaking && !isTTSPaused) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        if (!window.speechSynthesis.speaking) {
          speakNextTTS();
        }
      } catch (e) {
        speakNextTTS();
      }
    }
  }
});

if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  window.addEventListener("DOMContentLoaded", init);
}
