// 성경 66권 메타데이터 (이름, 분류, 총 장수)
const BIBLE_METADATA = [
  // 구약성경 (1~39)
  { id: 1, name: "창세기", type: "OT", chapters: 50 },
  { id: 2, name: "출애굽기", type: "OT", chapters: 40 },
  { id: 3, name: "레위기", type: "OT", chapters: 27 },
  { id: 4, name: "민수기", type: "OT", chapters: 36 },
  { id: 5, name: "신명기", type: "OT", chapters: 34 },
  { id: 6, name: "여호수아", type: "OT", chapters: 24 },
  { id: 7, name: "사사기", type: "OT", chapters: 21 },
  { id: 8, name: "룻기", type: "OT", chapters: 4 },
  { id: 9, name: "사무엘상", type: "OT", chapters: 31 },
  { id: 10, name: "사무엘하", type: "OT", chapters: 24 },
  { id: 11, name: "열왕기상", type: "OT", chapters: 22 },
  { id: 12, name: "열왕기하", type: "OT", chapters: 25 },
  { id: 13, name: "역대상", type: "OT", chapters: 29 },
  { id: 14, name: "역대하", type: "OT", chapters: 36 },
  { id: 15, name: "에스라", type: "OT", chapters: 10 },
  { id: 16, name: "느헤미야", type: "OT", chapters: 13 },
  { id: 17, name: "에스더", type: "OT", chapters: 10 },
  { id: 18, name: "욥기", type: "OT", chapters: 42 },
  { id: 19, name: "시편", type: "OT", chapters: 150 },
  { id: 20, name: "잠언", type: "OT", chapters: 31 },
  { id: 21, name: "전도서", type: "OT", chapters: 12 },
  { id: 22, name: "아가", type: "OT", chapters: 8 },
  { id: 23, name: "이사야", type: "OT", chapters: 66 },
  { id: 24, name: "예레미야", type: "OT", chapters: 52 },
  { id: 25, name: "예레미야애가", type: "OT", chapters: 5 },
  { id: 26, name: "에스겔", type: "OT", chapters: 48 },
  { id: 27, name: "다니엘", type: "OT", chapters: 12 },
  { id: 28, name: "호세아", type: "OT", chapters: 14 },
  { id: 29, name: "요엘", type: "OT", chapters: 3 },
  { id: 30, name: "아모스", type: "OT", chapters: 9 },
  { id: 31, name: "오바디야", type: "OT", chapters: 1 },
  { id: 32, name: "요나", type: "OT", chapters: 4 },
  { id: 33, name: "미가", type: "OT", chapters: 7 },
  { id: 34, name: "나훔", type: "OT", chapters: 3 },
  { id: 35, name: "하박국", type: "OT", chapters: 3 },
  { id: 36, name: "스바냐", type: "OT", chapters: 3 },
  { id: 37, name: "학개", type: "OT", chapters: 2 },
  { id: 38, name: "스가랴", type: "OT", chapters: 14 },
  { id: 39, name: "말라기", type: "OT", chapters: 4 },
  
  // 신약성경 (40~66)
  { id: 40, name: "마태복음", type: "NT", chapters: 28 },
  { id: 41, name: "마가복음", type: "NT", chapters: 16 },
  { id: 42, name: "누가복음", type: "NT", chapters: 24 },
  { id: 43, name: "요한복음", type: "NT", chapters: 21 },
  { id: 44, name: "사도행전", type: "NT", chapters: 28 },
  { id: 45, name: "로마서", type: "NT", chapters: 16 },
  { id: 46, name: "고린도전서", type: "NT", chapters: 16 },
  { id: 47, name: "고린도후서", type: "NT", chapters: 13 },
  { id: 48, name: "갈라디아서", type: "NT", chapters: 6 },
  { id: 49, name: "에베소서", type: "NT", chapters: 6 },
  { id: 50, name: "빌립보서", type: "NT", chapters: 4 },
  { id: 51, name: "골로새서", type: "NT", chapters: 4 },
  { id: 52, name: "데살로니가전서", type: "NT", chapters: 5 },
  { id: 53, name: "데살로니가후서", type: "NT", chapters: 3 },
  { id: 54, name: "디모데전서", type: "NT", chapters: 6 },
  { id: 55, name: "디모데후서", type: "NT", chapters: 4 },
  { id: 56, name: "디도서", type: "NT", chapters: 3 },
  { id: 57, name: "빌레몬서", type: "NT", chapters: 1 },
  { id: 58, name: "히브리서", type: "NT", chapters: 13 },
  { id: 59, name: "야고보서", type: "NT", chapters: 5 },
  { id: 60, name: "베드로전서", type: "NT", chapters: 5 },
  { id: 61, name: "베드로후서", type: "NT", chapters: 3 },
  { id: 62, name: "요한1서", type: "NT", chapters: 5 },
  { id: 63, name: "요한2서", type: "NT", chapters: 1 },
  { id: 64, name: "요한3서", type: "NT", chapters: 1 },
  { id: 65, name: "유다서", type: "NT", chapters: 1 },
  { id: 66, name: "요한계시록", type: "NT", chapters: 22 }
];

// 역본 매핑 및 로드 상태 추적
const TRANSLATION_MAP = {
  KG: { name: "개역개정", isLoaded: true, varName: "BIBLE_66_DB_KG" },
  SB: { name: "새번역", isLoaded: true, varName: "BIBLE_66_DB_SB" },
  KH: { name: "개역한글", isLoaded: true, varName: "BIBLE_66_DB_KH" },
  
  HYUNDAI: { name: "현대인의 성경", isLoaded: false, varName: "BIBLE_DB_HYUNDAI", path: "bible_data/bible_db_hyundai.js" },
  EASY: { name: "쉬운성경", isLoaded: false, varName: "BIBLE_DB_EASY", path: "bible_data/bible_db_easy.js" },
  NIV: { name: "NIV (영어)", isLoaded: false, varName: "BIBLE_DB_NIV", path: "bible_data/bible_db_niv.js" },
  NLT: { name: "NLT (영어)", isLoaded: false, varName: "BIBLE_DB_NLT", path: "bible_data/bible_db_nlt.js" },
  NKJV: { name: "NKJV (영어)", isLoaded: false, varName: "BIBLE_DB_NKJV", path: "bible_data/bible_db_nkjv.js" },
  RSV: { name: "RSV (영어)", isLoaded: false, varName: "BIBLE_DB_RSV", path: "bible_data/bible_db_rsv.js" }
};

// 앱 상태 정의 (LocalStorage 연동)
let state = {
  currentBook: "창세기",
  currentChapter: 1,
  primaryTranslation: "KG",
  secondaryTranslation: "NONE",
  fontSize: 100,
  theme: "theme-sepia"
};

// 통독 완료 장 기록 (LocalStorage: 'my_bible_read_history')
let readHistory = {}; 

// 메모 데이터 (LocalStorage: 'my_bible_notes')
let notes = {};

// TTS 재생기 내부 상태
let isTTSSpeaking = false;
let isTTSPaused = false;
let currentTTSIndex = 0;
let ttsSpeechItems = []; 
const TTS_SPEEDS = [0.8, 1.0, 1.2, 1.5];
let currentTTSSpeedIndex = 1; 

// 전역 변수: 최근 통합 검색 결과 보관함 (실시간 역본 필터링용)
let lastSearchResults = [];

// 전역 변수: 재생 중 역본 변경 시 이어 재생할 구절 저장용 (요구사항)
let resumeTTSVerse = null;

// 전역 변수: 현재 낭독 동작 중인 SpeechSynthesisUtterance 객체 참조 (비동기 꼬임 방지용)
let activeUtterance = null;

// DOM 요소 참조
const quickBookSelect = document.getElementById("quickBookSelect");
const quickChapterSelect = document.getElementById("quickChapterSelect");
const btnBookSelectorModal = document.getElementById("btnBookSelectorModal");
const btnSettings = document.getElementById("btnSettings");
const btnSearch = document.getElementById("btnSearch");
const btnProgress = document.getElementById("btnProgress");
const bibleViewerEl = document.getElementById("bibleViewer");

const btnPrevChapter = document.getElementById("btnPrevChapter");
const btnNextChapter = document.getElementById("btnNextChapter");
const primaryTransSelect = document.getElementById("primaryTranslation");
const secondaryTransSelect = document.getElementById("secondaryTranslation");
const translationCompareBar = document.getElementById("translationCompareBar");

// 현재 장 완료 버튼
const btnMarkChapterRead = document.getElementById("btnMarkChapterRead");

// 헤더 TTS 컨트롤러 엘리먼트
const btnAudioTTSPlay = document.getElementById("btnAudioTTSPlay");
const btnAudioTTSPrev = document.getElementById("btnAudioTTSPrev");
const btnAudioTTSNext = document.getElementById("btnAudioTTSNext");
const btnAudioTTSSpeed = document.getElementById("btnAudioTTSSpeed");

// 모달 참조
const bookModal = document.getElementById("bookModal");
const btnCloseBookModal = document.getElementById("btnCloseBookModal");
const tabOT = document.getElementById("tabOT");
const tabNT = document.getElementById("tabNT");
const booksGrid = document.getElementById("booksGrid");
const chaptersView = document.getElementById("chaptersView");
const btnBackToBooks = document.getElementById("btnBackToBooks");
const selectedBookTitle = document.getElementById("selectedBookTitle");
const chaptersGrid = document.getElementById("chaptersGrid");

const settingsModal = document.getElementById("settingsModal");
const btnCloseSettingsModal = document.getElementById("btnCloseSettingsModal");
const btnFontSizeDecrease = document.getElementById("btnFontSizeDecrease");
const btnFontSizeIncrease = document.getElementById("btnFontSizeIncrease");
const fontSizeDisplay = document.getElementById("fontSizeDisplay");
const themeBtns = document.querySelectorAll(".theme-btn");
const btnExportNotes = document.getElementById("btnExportNotes");

const noteModal = document.getElementById("noteModal");
const btnCloseNoteModal = document.getElementById("btnCloseNoteModal");
const noteModalTitle = document.getElementById("noteModalTitle");
const selectedVerseText = document.getElementById("selectedVerseText");
const noteTextarea = document.getElementById("noteTextarea");
const btnDeleteNote = document.getElementById("btnDeleteNote");
const btnSaveNote = document.getElementById("btnSaveNote");

// 검색 모달 참조
const searchModal = document.getElementById("searchModal");
const btnCloseSearchModal = document.getElementById("btnCloseSearchModal");
const searchInput = document.getElementById("searchInput");
const btnExecuteSearch = document.getElementById("btnExecuteSearch");
const searchTranslationFilter = document.getElementById("searchTranslationFilter"); 
const searchResults = document.getElementById("searchResults");
const searchResultMeta = document.getElementById("searchResultMeta");

// 통독표 모달 참조
const progressModal = document.getElementById("progressModal");
const btnCloseProgressModal = document.getElementById("btnCloseProgressModal");
const progressPercentage = document.getElementById("progressPercentage");
const completedChaptersCount = document.getElementById("completedChaptersCount");
const progressBarFill = document.getElementById("progressBarFill");
const progressBooksContainer = document.getElementById("progressBooksContainer");
const btnResetHistory = document.getElementById("btnResetHistory");

// 현재 선택된 메모 타겟 구절 정보
let currentNoteTarget = { book: "", chapter: 0, verse: 0 };

// 백업/조회 모달 참조
const backupModal = document.getElementById("backupModal");
const btnCloseBackupModal = document.getElementById("btnCloseBackupModal");
const backupTextarea = document.getElementById("backupTextarea");
const btnCopyBackupText = document.getElementById("btnCopyBackupText");

// 시편 전용 단위 표기 교정 헬퍼 (요구사항 1)
function getChapterLabel(bookName) {
  return bookName === "시편" ? "편" : "장";
}

// 앱 로드 시 초기화
function init() {
  loadSettings();
  loadNotes();
  loadReadHistory();
  applySettings();
  initQuickSelectors(); 
  setupEventListeners();
  
  // 서비스 워커 등록 (비행기모드 오프라인 기능 작동 지원)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('ServiceWorker registered successfully:', reg))
        .catch(err => console.log('ServiceWorker registration failed:', err));
    });
  }

  // 모바일 테스트 스마트폰 접속용 QR코드 및 주소 출력 (요구사항)
  const mobileTestArea = document.getElementById("mobileTestArea");
  if (mobileTestArea) {
    const testUrl = "http://192.168.82.174:8080/개인성경앱/index.html";
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(testUrl)}`;
    mobileTestArea.innerHTML = `
      <div style="margin-bottom: 8px;">
        <img src="${qrApiUrl}" alt="접속 QR코드" style="border: 4px solid #fff; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 130px; height: 130px;">
      </div>
      <a href="${testUrl}" target="_blank" style="word-break: break-all; color: var(--accent-green); font-weight: bold; text-decoration: underline;">
        ${testUrl}
      </a>
    `;
  }
  
  // 초기 렌더링
  renderBible();
}

// 설정 로드
function loadSettings() {
  const savedSettings = localStorage.getItem("my_bible_settings");
  if (savedSettings) {
    try {
      state = { ...state, ...JSON.parse(savedSettings) };
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }
}

// 설정 저장
function saveSettings() {
  localStorage.setItem("my_bible_settings", JSON.stringify(state));
}

// 메모 로드
function loadNotes() {
  const savedNotes = localStorage.getItem("my_bible_notes");
  if (savedNotes) {
    try {
      notes = JSON.parse(savedNotes);
    } catch (e) {
      console.error("Error loading notes:", e);
    }
  }
}

// 메모 저장
function saveNotes() {
  localStorage.setItem("my_bible_notes", JSON.stringify(notes));
}

// 통독 완료 기록 로드
function loadReadHistory() {
  const savedHistory = localStorage.getItem("my_bible_read_history");
  if (savedHistory) {
    try {
      readHistory = JSON.parse(savedHistory);
    } catch (e) {
      console.error("Error loading read history:", e);
    }
  }
  BIBLE_METADATA.forEach(b => {
    if (!readHistory[b.name]) {
      readHistory[b.name] = [];
    }
  });
}

// 통독 완료 기록 저장
function saveReadHistory() {
  localStorage.setItem("my_bible_read_history", JSON.stringify(readHistory));
}

// 설정 화면 적용
function applySettings() {
  document.body.className = state.theme;
  themeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === state.theme);
  });
  
  document.documentElement.style.setProperty("--verse-font-size", `${state.fontSize / 100}rem`);
  fontSizeDisplay.textContent = `${state.fontSize}%`;
  
  primaryTransSelect.value = state.primaryTranslation;
  secondaryTransSelect.value = state.secondaryTranslation;
}

// 퀵 풀다운 셀렉터 세팅
function initQuickSelectors() {
  quickBookSelect.innerHTML = "";
  
  const otGroup = document.createElement("optgroup");
  otGroup.label = "구약성경";
  const ntGroup = document.createElement("optgroup");
  ntGroup.label = "신약성경";
  
  BIBLE_METADATA.forEach(book => {
    const opt = document.createElement("option");
    opt.value = book.name;
    opt.textContent = book.name;
    
    if (book.type === "OT") {
      otGroup.appendChild(opt);
    } else {
      ntGroup.appendChild(opt);
    }
  });
  
  quickBookSelect.appendChild(otGroup);
  quickBookSelect.appendChild(ntGroup);
  
  quickBookSelect.value = state.currentBook;
  updateQuickChapterSelector();
}

function updateQuickChapterSelector() {
  const book = BIBLE_METADATA.find(b => b.name === state.currentBook);
  if (!book) return;
  
  quickChapterSelect.innerHTML = "";
  const unit = getChapterLabel(state.currentBook); // 장/편 구분
  for (let i = 1; i <= book.chapters; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i}${unit}`;
    quickChapterSelect.appendChild(opt);
  }
  
  quickChapterSelect.value = state.currentChapter;
}

// 이벤트 리스너 세팅
function setupEventListeners() {
  // 퀵 드롭다운 체인지 이벤트
  quickBookSelect.addEventListener("change", (e) => {
    stopTTS();
    state.currentBook = e.target.value;
    state.currentChapter = 1; 
    updateQuickChapterSelector();
    saveSettings();
    renderBible();
  });

  quickChapterSelect.addEventListener("change", (e) => {
    stopTTS();
    state.currentChapter = parseInt(e.target.value);
    saveSettings();
    renderBible();
  });

  // 네비게이션
  btnPrevChapter.addEventListener("click", () => {
    stopTTS();
    navigateChapter(-1);
  });
  btnNextChapter.addEventListener("click", () => {
    stopTTS();
    navigateChapter(1);
  });
  
  // 역본 선택 변경 (재생 중일 경우 현재 읽던 구절 백업 후 이어 재생 연동)
  primaryTransSelect.addEventListener("change", (e) => {
    if (isTTSSpeaking) {
      resumeTTSVerse = ttsSpeechItems[currentTTSIndex] ? ttsSpeechItems[currentTTSIndex].verse : 1;
    } else {
      resumeTTSVerse = null;
    }
    stopTTS();
    state.primaryTranslation = e.target.value;
    saveSettings();
    renderBible();
  });
  
  secondaryTransSelect.addEventListener("change", (e) => {
    if (isTTSSpeaking) {
      resumeTTSVerse = ttsSpeechItems[currentTTSIndex] ? ttsSpeechItems[currentTTSIndex].verse : 1;
    } else {
      resumeTTSVerse = null;
    }
    stopTTS();
    state.secondaryTranslation = e.target.value;
    saveSettings();
    renderBible();
  });
  
  // 모달 열기/닫기
  btnBookSelectorModal.addEventListener("click", () => { stopTTS(); openBookModal(); });
  btnCloseBookModal.addEventListener("click", () => closeModal(bookModal));
  btnSettings.addEventListener("click", () => { stopTTS(); openSettingsModal(); });
  btnCloseSettingsModal.addEventListener("click", () => closeModal(settingsModal));
  btnCloseNoteModal.addEventListener("click", () => closeModal(noteModal));
  btnCloseBackupModal.addEventListener("click", () => closeModal(backupModal)); // 백업 모달 닫기
  
  // 검색 모달 제어
  btnSearch.addEventListener("click", () => { stopTTS(); openSearchModal(); });
  btnCloseSearchModal.addEventListener("click", () => closeModal(searchModal));
  btnExecuteSearch.addEventListener("click", executeSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") executeSearch();
  });
  
  // 검색된 결과 역본 필터 변경 이벤트 연동
  searchTranslationFilter.addEventListener("change", () => {
    renderSearchResultsList();
  });

  // 통독 현황 모달 제어
  btnProgress.addEventListener("click", () => { stopTTS(); openProgressModal(); });
  btnCloseProgressModal.addEventListener("click", () => closeModal(progressModal));
  btnResetHistory.addEventListener("click", resetHistoryAction);
  
  // 책 선택 모달 관련 탭
  tabOT.addEventListener("click", () => toggleOTNT("OT"));
  tabNT.addEventListener("click", () => toggleOTNT("NT"));
  btnBackToBooks.addEventListener("click", showBooksListInModal);
  
  // 설정 모달 기능
  btnFontSizeDecrease.addEventListener("click", () => adjustFontSize(-10));
  btnFontSizeIncrease.addEventListener("click", () => adjustFontSize(10));
  themeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      state.theme = e.target.dataset.theme;
      saveSettings();
      applySettings();
    });
  });
  btnExportNotes.addEventListener("click", exportNotesToClipboard);
  btnCopyBackupText.addEventListener("click", copyBackupTextAction); // 백업 텍스트 복사 버튼 연동
  
  // 메모 모달 기능
  btnSaveNote.addEventListener("click", saveNoteAction);
  btnDeleteNote.addEventListener("click", deleteNoteAction);
  
  // 현재 장 통독 완료 클릭
  btnMarkChapterRead.addEventListener("click", toggleCurrentChapterRead);

  // 음성 재생(TTS) 관련 클릭
  btnAudioTTSPlay.addEventListener("click", togglePlayTTS);
  btnAudioTTSPrev.addEventListener("click", playPrevTTS);
  btnAudioTTSNext.addEventListener("click", playNextTTS);
  btnAudioTTSSpeed.addEventListener("click", toggleTTSSpeed);

  // 바깥 영역 터치 시 모달 닫기
  window.addEventListener("click", (e) => {
    if (e.target === bookModal) closeModal(bookModal);
    if (e.target === settingsModal) closeModal(settingsModal);
    if (e.target === noteModal) closeModal(noteModal);
    if (e.target === searchModal) closeModal(searchModal);
    if (e.target === progressModal) closeModal(progressModal);
    if (e.target === backupModal) closeModal(backupModal);
  });
}

// 토스트 메시지
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}

// 폰트 크기 변경
function adjustFontSize(delta) {
  state.fontSize = Math.max(80, Math.min(200, state.fontSize + delta));
  saveSettings();
  applySettings();
}

// 모달 닫기 공통
function closeModal(modalEl) {
  modalEl.classList.remove("active");
}

// 설정 모달 열기
function openSettingsModal() {
  settingsModal.classList.add("active");
}

// 책 모달 열기
function openBookModal() {
  bookModal.classList.add("active");
  showBooksListInModal();
}

// 구약/신약 전환
function toggleOTNT(type) {
  tabOT.classList.toggle("active", type === "OT");
  tabNT.classList.toggle("active", type === "NT");
  renderBooksGrid(type);
}

// 모달 내 책 격자 그리기
function showBooksListInModal() {
  booksGrid.classList.remove("hidden");
  chaptersView.classList.add("hidden");
  const activeType = tabOT.classList.contains("active") ? "OT" : "NT";
  renderBooksGrid(activeType);
}

function renderBooksGrid(type) {
  booksGrid.innerHTML = "";
  const filtered = BIBLE_METADATA.filter(b => b.type === type);
  filtered.forEach(book => {
    const btn = document.createElement("button");
    btn.className = "btn-book";
    btn.textContent = book.name;
    btn.addEventListener("click", () => showChaptersListInModal(book));
    booksGrid.appendChild(btn);
  });
}

// 책의 장 격자 리스트 노출
function showChaptersListInModal(book) {
  booksGrid.classList.add("hidden");
  chaptersView.classList.remove("hidden");
  selectedBookTitle.textContent = book.name;
  
  chaptersGrid.innerHTML = "";
  for (let i = 1; i <= book.chapters; i++) {
    const btn = document.createElement("button");
    btn.className = "btn-chapter";
    const isRead = readHistory[book.name] && readHistory[book.name].includes(i);
    btn.textContent = isRead ? `${i} ✓` : `${i}`;
    if (isRead) btn.style.color = "var(--accent-green)";
    
    btn.addEventListener("click", () => {
      state.currentBook = book.name;
      state.currentChapter = i;
      saveSettings();
      closeModal(bookModal);
      renderBible();
    });
    chaptersGrid.appendChild(btn);
  }
}

// 장 네비게이션
function navigateChapter(direction) {
  const currentBookIndex = BIBLE_METADATA.findIndex(b => b.name === state.currentBook);
  if (currentBookIndex === -1) return;
  
  const book = BIBLE_METADATA[currentBookIndex];
  let targetChapter = state.currentChapter + direction;
  
  if (targetChapter < 1) {
    if (currentBookIndex > 0) {
      const prevBook = BIBLE_METADATA[currentBookIndex - 1];
      state.currentBook = prevBook.name;
      state.currentChapter = prevBook.chapters;
    } else {
      showToast("성경의 첫 시작(창세기 1장)입니다.");
      return;
    }
  } else if (targetChapter > book.chapters) {
    if (currentBookIndex < BIBLE_METADATA.length - 1) {
      const nextBook = BIBLE_METADATA[currentBookIndex + 1];
      state.currentBook = nextBook.name;
      state.currentChapter = 1;
    } else {
      showToast("성경의 마지막(요한계시록 22장)입니다.");
      return;
    }
  } else {
    state.currentChapter = targetChapter;
  }
  
  saveSettings();
  renderBible();
  document.querySelector(".app-content").scrollTop = 0;
}

// 현재 장 통독 완료 체크 토글
function toggleCurrentChapterRead() {
  const book = state.currentBook;
  const chapter = state.currentChapter;
  const unit = getChapterLabel(book);
  
  if (!readHistory[book]) {
    readHistory[book] = [];
  }
  
  const idx = readHistory[book].indexOf(chapter);
  if (idx === -1) {
    readHistory[book].push(chapter);
    showToast(`${book} ${chapter}${unit} 통독 체크 완료!`);
  } else {
    readHistory[book].splice(idx, 1);
    showToast(`${book} ${chapter}${unit} 통독 체크 해제.`);
  }
  
  saveReadHistory();
  updateReadCheckButtonState();
}

// 읽기 완료 버튼 디자인 상태 동기화
function updateReadCheckButtonState() {
  const book = state.currentBook;
  const chapter = state.currentChapter;
  const unit = getChapterLabel(book);
  const isRead = readHistory[book] && readHistory[book].includes(chapter);
  
  if (isRead) {
    btnMarkChapterRead.textContent = `현재 ${unit} 읽기 완료 상태 ✓ (누르면 취소)`;
    btnMarkChapterRead.classList.add("completed");
  } else {
    btnMarkChapterRead.textContent = `현재 ${unit} 읽기 완료 체크 ✓`;
    btnMarkChapterRead.classList.remove("completed");
  }
}

// 역본 데이터 동적 로드 헬퍼
function ensureTranslationLoaded(translationCode, callback) {
  const t = TRANSLATION_MAP[translationCode];
  if (!t) {
    callback(false);
    return;
  }
  
  if (t.isLoaded || window[t.varName]) {
    t.isLoaded = true;
    callback(true);
    return;
  }
  
  showToast(`${t.name} 데이터를 불러오는 중...`);
  const script = document.createElement("script");
  script.src = t.path;
  script.onload = () => {
    t.isLoaded = true;
    callback(true);
  };
  script.onerror = () => {
    showToast(`${t.name} 로드 실패. 경로를 확인하세요.`);
    callback(false);
  };
  document.body.appendChild(script);
}

// 전체 역본 백그라운드 병렬 로드 헬퍼
function ensureAllTranslationsLoaded(callback) {
  const codes = Object.keys(TRANSLATION_MAP);
  const promises = codes.map(code => {
    return new Promise((resolve) => {
      ensureTranslationLoaded(code, (success) => {
        resolve(success);
      });
    });
  });
  
  Promise.all(promises).then((results) => {
    const successCount = results.filter(Boolean).length;
    console.log(`Translations loaded: ${successCount} / ${codes.length}`);
    callback();
  });
}

// 성경 렌더링 메인 로직
function renderBible() {
  quickBookSelect.value = state.currentBook;
  updateQuickChapterSelector();
  
  const pCode = state.primaryTranslation;
  const sCode = state.secondaryTranslation;
  
  ensureTranslationLoaded(pCode, (pSuccess) => {
    if (!pSuccess) return;
    
    if (sCode !== "NONE") {
      ensureTranslationLoaded(sCode, (sSuccess) => {
        if (sSuccess) {
          executeRender();
        } else {
          state.secondaryTranslation = "NONE";
          saveSettings();
          applySettings();
          executeRender();
        }
      });
    } else {
      executeRender();
    }
  });
  
  updateReadCheckButtonState();
}

// 실제 화면에 렌더링 실행
function executeRender() {
  bibleViewerEl.innerHTML = "";
  
  const book = state.currentBook;
  const chapter = state.currentChapter;
  const chStr = String(chapter);
  
  const pCode = state.primaryTranslation;
  const sCode = state.secondaryTranslation;
  
  const unit = getChapterLabel(book); // 장/편 구분 표기 (요구사항 1)
  
  // 1. 본문 영역 상단에 큼직한 장 이름 타이틀 표기
  const titleEl = document.createElement("div");
  titleEl.className = "viewer-chapter-title";
  titleEl.textContent = `${book} ${chapter}${unit}`;
  bibleViewerEl.appendChild(titleEl);

  // 2. 상단 대조 역본 고정 바 표시 여부 조율
  if (sCode !== "NONE") {
    translationCompareBar.classList.remove("hidden");
    const pTag = translationCompareBar.querySelector(".primary-tag");
    const sTag = translationCompareBar.querySelector(".secondary-tag");
    pTag.textContent = TRANSLATION_MAP[pCode].name;
    sTag.textContent = TRANSLATION_MAP[sCode].name;
  } else {
    translationCompareBar.classList.add("hidden");
  }

  // 주역본
  const pVarName = TRANSLATION_MAP[pCode].varName;
  const pDb = window[pVarName];
  
  if (!pDb || !pDb[book] || !pDb[book][chStr]) {
    const errorEl = document.createElement("div");
    errorEl.className = "error-msg";
    errorEl.textContent = `해당 장의 데이터를 찾을 수 없습니다. (${TRANSLATION_MAP[pCode].name})`;
    bibleViewerEl.appendChild(errorEl);
    return;
  }
  
  const primaryVerses = pDb[book][chStr];
  const totalVerses = primaryVerses.length;
  
  // 대조역본
  let secondaryVerses = null;
  if (sCode !== "NONE") {
    const sVarName = TRANSLATION_MAP[sCode].varName;
    const sDb = window[sVarName];
    if (sDb && sDb[book] && sDb[book][chStr]) {
      secondaryVerses = sDb[book][chStr];
    }
  }
  
  // 구절별 루프
  for (let i = 0; i < totalVerses; i++) {
    const verseNum = i + 1;
    const primaryText = primaryVerses[i] || "";
    
    if (!primaryText && (!secondaryVerses || !secondaryVerses[i])) {
      continue;
    }
    
    const card = document.createElement("div");
    card.setAttribute("data-verse", verseNum);
    
    // 메모 존재 여부
    const noteKey = `${book}_${chapter}_${verseNum}`;
    const hasNote = notes[noteKey] ? true : false;
    
    // 카드 헤더 (메모 뱃지만 우측 구석에 작게 배치하며 1절 2절 텍스트는 영구 삭제)
    const headerHtml = hasNote ? `
      <div class="verse-header">
        <span class="note-indicator-dot">● 묵상메모</span>
      </div>
    ` : '';
    
    // 절 번호 인라인화 렌더링 (요구사항 2)
    const numBadgeHtml = `<span class="verse-num">${verseNum}</span>`;
    
    if (sCode !== "NONE" && secondaryVerses) {
      const secondaryText = secondaryVerses[i] || "";
      card.className = `verse-card compare-mode ${hasNote ? 'has-note' : ''}`;
      
      card.innerHTML = `
        ${headerHtml}
        <div class="verse-text-group">
          <div class="verse-translation-item primary">
            <span class="verse-text-container">${numBadgeHtml}${primaryText || "(해당 구절 없음)"}</span>
          </div>
          <div class="verse-translation-item secondary">
            <span class="verse-text-container">${secondaryText || "(해당 구절 없음)"}</span>
          </div>
        </div>
        ${hasNote ? `<div class="verse-note-display">${escapeHtml(notes[noteKey])}</div>` : ''}
      `;
    } else {
      card.className = `verse-card ${hasNote ? 'has-note' : ''}`;
      card.innerHTML = `
        ${headerHtml}
        <div class="verse-text-container">${numBadgeHtml}${primaryText}</div>
        ${hasNote ? `<div class="verse-note-display">${escapeHtml(notes[noteKey])}</div>` : ''}
      `;
    }
    
    card.addEventListener("click", (e) => {
      if (isTTSSpeaking) {
        jumpToTTSVerse(verseNum);
        e.stopPropagation();
      } else {
        openNoteModal(book, chapter, verseNum, primaryText);
      }
    });
    bibleViewerEl.appendChild(card);
  }
  
  if (bibleViewerEl.children.length <= 1) { 
    const infoEl = document.createElement("div");
    infoEl.className = "info-msg";
    infoEl.textContent = "해당 장에 렌더링할 구절이 없습니다.";
    bibleViewerEl.appendChild(infoEl);
  }

  // 재생 중 역본 변경 시, 렌더링 완료 시점에 해당 구절부터 자동 낭독 재개 (요구사항)
  if (resumeTTSVerse !== null) {
    const targetVerse = resumeTTSVerse;
    resumeTTSVerse = null; // 재진입 및 루프 예방용 클리어
    
    setTimeout(() => {
      startTTS();
      jumpToTTSVerse(targetVerse);
    }, 100);
  }
}

// HTML 이스케이프 헬퍼
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 메모 모달 열기
function openNoteModal(book, chapter, verse, primaryText) {
  currentNoteTarget = { book, chapter, verse };
  const unit = getChapterLabel(book);
  noteModalTitle.textContent = `${book} ${chapter}${unit} ${verse}절 메모`;
  selectedVerseText.textContent = primaryText || "(본문 없음)";
  
  const noteKey = `${book}_${chapter}_${verse}`;
  noteTextarea.value = notes[noteKey] || "";
  
  btnDeleteNote.style.display = notes[noteKey] ? "block" : "none";
  noteModal.classList.add("active");
  
  setTimeout(() => {
    noteTextarea.focus();
  }, 100);
}

// 메모 저장 액션
function saveNoteAction() {
  const { book, chapter, verse } = currentNoteTarget;
  const text = noteTextarea.value.trim();
  const noteKey = `${book}_${chapter}_${verse}`;
  
  if (text) {
    notes[noteKey] = text;
    showToast("메모가 저장되었습니다.");
  } else {
    delete notes[noteKey];
    showToast("메모가 삭제되었습니다.");
  }
  
  saveNotes();
  closeModal(noteModal);
  renderBible();
}

// 메모 삭제 액션
function deleteNoteAction() {
  if (confirm("정말로 이 메모를 삭제하시겠습니까?")) {
    const { book, chapter, verse } = currentNoteTarget;
    const noteKey = `${book}_${chapter}_${verse}`;
    delete notes[noteKey];
    saveNotes();
    closeModal(noteModal);
    renderBible();
    showToast("메모가 삭제되었습니다.");
  }
}

// 전체 메모 복사/백업
// 전체 메모 복사/백업 (구절 본문 자동 병합 및 조회 창 팝업 기능 추가 - 요구사항)
function exportNotesToClipboard() {
  const keys = Object.keys(notes);
  if (keys.length === 0) {
    showToast("저장된 메모가 없습니다.");
    return;
  }
  
  let exportStr = "[개인 성경앱 묵상메모 백업]\n\n";
  const db = window.BIBLE_66_DB_KG; // 본문 추출용 개역개정 성경 DB 참조
  
  keys.sort().forEach(key => {
    const parts = key.split("_");
    const book = parts[0];
    const chapter = parts[1];
    const verse = parseInt(parts[2]);
    const unit = getChapterLabel(book);
    
    // 개역개정 DB에서 본문 구절 말씀 추출
    let verseText = "";
    if (db && db[book] && db[book][String(chapter)]) {
      verseText = db[book][String(chapter)][verse - 1] || "";
    }
    
    exportStr += `▶ ${book} ${chapter}${unit} ${verse}절\n`;
    if (verseText) {
      exportStr += `본문: ${verseText.trim()}\n`;
    }
    exportStr += `메모: ${notes[key].trim()}\n`;
    exportStr += `----------------------------------------\n\n`;
  });
  
  const finalBackupText = exportStr.trim();
  
  // 백업/조회 창 텍스트 주입 및 활성화 (요구사항 2)
  backupTextarea.value = finalBackupText;
  backupModal.classList.add("active");
  
  // 동시에 클립보드 일괄 복사 병행 처리
  navigator.clipboard.writeText(finalBackupText).then(() => {
    showToast("전체 메모가 클립보드에 복사되었으며 조회창이 열렸습니다.");
  }).catch(err => {
    showToast("조회창이 열렸으나 자동 클립보드 복사는 실패했습니다.");
  });
}

// 백업 모달 내 수동 클립보드 복사 버튼 액션
function copyBackupTextAction() {
  const text = backupTextarea.value.trim();
  if (!text) {
    showToast("복사할 백업 데이터가 없습니다.");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast("백업 데이터가 클립보드에 복사되었습니다!");
  }).catch(err => {
    showToast("클립보드 복사 실패.");
  });
}


/* ==========================================================================
   🔊 낭독 (TTS) 엔진 및 자연어 음성 설정 구현
   ========================================================================== */

let speechVoices = [];

// 시스템 음성 목록 비동기 캐싱 및 갱신
function loadVoices() {
  if ('speechSynthesis' in window) {
    speechVoices = window.speechSynthesis.getVoices();
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function togglePlayTTS() {
  if (!('speechSynthesis' in window)) {
    alert("이 브라우저는 음성 재생(TTS) 기능을 지원하지 않습니다.");
    return;
  }

  if (isTTSSpeaking) {
    if (isTTSPaused) {
      window.speechSynthesis.resume();
      isTTSPaused = false;
      btnAudioTTSPlay.textContent = "❚❚ 일시정지";
    } else {
      window.speechSynthesis.pause();
      isTTSPaused = true;
      btnAudioTTSPlay.textContent = "▶ 재생";
    }
  } else {
    startTTS();
  }
}

function startTTS() {
  // 비동기로 로드되는 목소리 리스트가 유실되지 않도록 낭독 직전 리로딩 및 검사
  if (!speechVoices || speechVoices.length === 0) {
    loadVoices();
  }

  if (!speechVoices || speechVoices.length === 0) {
    // 목소리 목록이 로컬 기기 환경에서 아직 다 안 읽힌 경우 250ms 대기 후 재생 시작 (요구사항)
    showToast("음성 엔진을 준비하고 있습니다...");
    setTimeout(() => {
      loadVoices();
      executeStartTTS();
    }, 250);
  } else {
    executeStartTTS();
  }
}

function executeStartTTS() {
  const cards = bibleViewerEl.querySelectorAll(".verse-card");
  if (cards.length === 0) return;

  ttsSpeechItems = [];
  cards.forEach(card => {
    const verseNum = card.getAttribute("data-verse");
    
    let textToSpeak = "";
    const primaryTextEl = card.querySelector(".verse-translation-item.primary .verse-text-container");
    if (primaryTextEl) {
      textToSpeak = primaryTextEl.textContent;
    } else {
      const singleTextEl = card.querySelector(".verse-text-container");
      textToSpeak = singleTextEl ? singleTextEl.textContent : "";
    }
    
    // 대괄호 [], 꺾쇠 <>, 소괄호 () 및 내부 소제목/텍스트를 완전 제거하여 순수 성경 본문만 낭독
    textToSpeak = textToSpeak.replace(/\[[^\]]*\]/g, "");
    textToSpeak = textToSpeak.replace(/<[^>]*>/g, "");
    textToSpeak = textToSpeak.replace(/\([^)]*\)/g, "");
    // 본문 앞부분에 삽입된 절 번호 숫자("1", "2" 등) 제거
    textToSpeak = textToSpeak.replace(/^\d+\s*/, "").trim();
    
    if (textToSpeak) {
      ttsSpeechItems.push({
        element: card,
        verse: parseInt(verseNum),
        text: textToSpeak // 절 번호("1절.")를 읽지 않고 순수 본문만 낭독 (요구사항 1)
      });
    }
  });

  if (ttsSpeechItems.length === 0) return;

  isTTSSpeaking = true;
  isTTSPaused = false;
  currentTTSIndex = 0;
  
  btnAudioTTSPrev.classList.remove("hidden");
  btnAudioTTSNext.classList.remove("hidden");
  btnAudioTTSSpeed.classList.remove("hidden");
  btnAudioTTSPlay.textContent = "❚❚ 일시정지";

  initTTSHeartbeat();
  speakNextTTS();
}

function speakNextTTS() {
  if (!isTTSSpeaking) return;

  if (currentTTSIndex >= ttsSpeechItems.length) {
    stopTTS();
    showToast("현재 장의 낭독이 완료되었습니다.");
    return;
  }

  bibleViewerEl.querySelectorAll(".is-reading-speaking").forEach(el => {
    el.classList.remove("is-reading-speaking");
  });

  const item = ttsSpeechItems[currentTTSIndex];
  item.element.classList.add("is-reading-speaking");
  item.element.scrollIntoView({ behavior: "smooth", block: "center" });

  // 이전 재생 건의 비동기 콜백 강제 차단
  if (activeUtterance) {
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
  }

  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(item.text);
  activeUtterance = utterance; // 현재 재생 중인 인스턴스 백업
  
  utterance.rate = TTS_SPEEDS[currentTTSSpeedIndex];
  
  // 한글 문자가 포함되어 있지 않다면 100% 영어 성경으로 판별 (세미콜론, 대쉬 등 모든 부호 예외 완벽 포용)
  const isEnglish = !/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(item.text);
  
  if (isEnglish) {
    utterance.lang = "en-US";
    // 자연스러운 영어 목소리 우선순위 매핑 (요구사항 2)
    if (speechVoices.length > 0) {
      const preferredEnVoices = [
        "Google US English",
        "Microsoft David",
        "Microsoft Zira",
        "en-US",
        "en"
      ];
      let selectedVoice = null;
      for (const pref of preferredEnVoices) {
        selectedVoice = speechVoices.find(v => v.name.includes(pref) || v.lang.includes(pref));
        if (selectedVoice) break;
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
  } else {
    utterance.lang = "ko-KR";
    // 가장 자연스러운 한국어 목소리 우선순위 매핑
    if (speechVoices.length > 0) {
      const preferredKoVoices = [
        "Google 한국어",
        "Microsoft Heami",
        "ko-KR",
        "ko"
      ];
      let selectedVoice = null;
      for (const pref of preferredKoVoices) {
        selectedVoice = speechVoices.find(v => v.name.includes(pref) || v.lang.includes(pref));
        if (selectedVoice) break;
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
  }

  // 중복 비동기 콜백 트리거 차단용 로컬 플래그 (요구사항)
  let callbackTriggered = false;

  utterance.onend = () => {
    if (callbackTriggered) return;
    callbackTriggered = true;
    
    if (!isTTSPaused && isTTSSpeaking) {
      currentTTSIndex++;
      speakNextTTS();
    }
  };

  utterance.onerror = (e) => {
    if (e.error === "interrupted") return; // 수동 정지/점프에 의한 중단 이벤트는 그냥 무시
    if (callbackTriggered) return;
    callbackTriggered = true;
    
    if (isTTSSpeaking) {
      currentTTSIndex++;
      speakNextTTS();
    }
  };

  window.speechSynthesis.speak(utterance);
}

function jumpToTTSVerse(verseNum) {
  const targetIdx = ttsSpeechItems.findIndex(item => item.verse === verseNum);
  if (targetIdx !== -1) {
    currentTTSIndex = targetIdx;
    isTTSPaused = false;
    btnAudioTTSPlay.textContent = "❚❚ 일시정지";
    
    // 점프하기 전 이전 utterance 비동기 콜백 무효화 (레이스 컨디션 차단)
    if (activeUtterance) {
      activeUtterance.onend = null;
      activeUtterance.onerror = null;
    }
    
    speakNextTTS();
  }
}

// 낭독 정지
function stopTTS() {
  isTTSSpeaking = false;
  isTTSPaused = false;
  
  // 정지하기 전 이전 utterance 비동기 콜백 무효화
  if (activeUtterance) {
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
  }
  
  window.speechSynthesis.cancel();
  activeUtterance = null;
  
  if (window.ttsHeartbeatInterval) {
    clearInterval(window.ttsHeartbeatInterval);
    window.ttsHeartbeatInterval = null;
  }

  btnAudioTTSPrev.classList.add("hidden");
  btnAudioTTSNext.classList.add("hidden");
  btnAudioTTSSpeed.classList.add("hidden");
  btnAudioTTSPlay.textContent = "▶ 재생";

  bibleViewerEl.querySelectorAll(".is-reading-speaking").forEach(el => {
    el.classList.remove("is-reading-speaking");
  });
}

function playPrevTTS() {
  if (currentTTSIndex > 0) {
    currentTTSIndex--;
    speakNextTTS();
  }
}

function playNextTTS() {
  if (currentTTSIndex < ttsSpeechItems.length - 1) {
    currentTTSIndex++;
    speakNextTTS();
  }
}

function toggleTTSSpeed() {
  currentTTSSpeedIndex = (currentTTSSpeedIndex + 1) % TTS_SPEEDS.length;
  const speed = TTS_SPEEDS[currentTTSSpeedIndex];
  btnAudioTTSSpeed.textContent = `${speed.toFixed(1)}x`;
  
  if (isTTSSpeaking && !isTTSPaused) {
    speakNextTTS();
  }
}

function initTTSHeartbeat() {
  if (window.ttsHeartbeatInterval) clearInterval(window.ttsHeartbeatInterval);
  window.ttsHeartbeatInterval = setInterval(() => {
    if (isTTSSpeaking && !isTTSPaused) {
      window.speechSynthesis.resume();
    }
  }, 10000);
}


/* ==========================================================================
   🔍 실시간 다중 역본 통합 검색 엔진
   ========================================================================== */

function openSearchModal() {
  searchModal.classList.add("active");
  searchInput.focus();
}

function executeSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    showToast("검색어를 입력해 주세요.");
    return;
  }
  
  searchResults.innerHTML = '<p class="search-placeholder">모든 역본 데이터를 로드하고 있습니다...</p>';
  searchResultMeta.textContent = "";

  ensureAllTranslationsLoaded(() => {
    searchResults.innerHTML = '<p class="search-placeholder">모든 역본에서 키워드를 고속 스캔하고 있습니다...</p>';
    
    setTimeout(() => {
      const startTime = performance.now();
      lastSearchResults = []; 
      const queryRegex = new RegExp(escapeRegex(query), "gi");
      
      Object.keys(TRANSLATION_MAP).forEach(code => {
        const t = TRANSLATION_MAP[code];
        const db = window[t.varName];
        if (!db) return; 
        
        BIBLE_METADATA.forEach(book => {
          const bookName = book.name;
          const chaptersData = db[bookName];
          if (!chaptersData) return;
          
          Object.keys(chaptersData).forEach(chStr => {
            const chapter = parseInt(chStr);
            const verses = chaptersData[chStr];
            if (!verses) return;
            
            verses.forEach((verseText, idx) => {
              if (!verseText) return;
              
              if (verseText.includes(query)) {
                const verseNum = idx + 1;
                const highlightedText = verseText.replace(queryRegex, match => `<mark>${match}</mark>`);
                lastSearchResults.push({
                  book: bookName,
                  chapter: chapter,
                  verse: verseNum,
                  translationCode: code,
                  translationName: t.name,
                  text: highlightedText
                });
              }
            });
          });
        });
      });
      
      const endTime = performance.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      renderSearchResultsList(duration);
    }, 50);
  });
}

// 검색 리스트 결과 렌더링 및 역본 필터링 적용
function renderSearchResultsList(durationTimeStr) {
  const selectedFilter = searchTranslationFilter.value; 
  
  const filtered = selectedFilter === "ALL" 
    ? lastSearchResults 
    : lastSearchResults.filter(item => item.translationCode === selectedFilter);
    
  if (durationTimeStr !== undefined) {
    searchResultMeta.setAttribute("data-duration", durationTimeStr);
  }
  const duration = searchResultMeta.getAttribute("data-duration") || "0.0";
  searchResultMeta.textContent = `검색 결과: 총 ${filtered.length}건 / 전체 ${lastSearchResults.length}건 (${duration}초 소요)`;

  if (filtered.length === 0) {
    searchResults.innerHTML = '<p class="search-placeholder">검색 결과가 없습니다.</p>';
    return;
  }

  searchResults.innerHTML = "";
  
  const maxRender = Math.min(filtered.length, 300);
  for (let i = 0; i < maxRender; i++) {
    const item = filtered[i];
    const div = document.createElement("div");
    div.className = "search-item";
    
    let badgeClass = "badge-eng";
    const code = item.translationCode;
    if (code === "KG") badgeClass = "badge-kg";
    else if (code === "SB") badgeClass = "badge-sb";
    else if (code === "KH") badgeClass = "badge-kh";
    else if (code === "HYUNDAI") badgeClass = "badge-hyundai";
    else if (code === "EASY") badgeClass = "badge-easy";
    
    const unit = getChapterLabel(item.book); // 장/편 구분
    
    div.innerHTML = `
      <div class="search-item-header">
        <span class="search-item-title">${item.book} ${item.chapter}${unit} ${item.verse}절</span>
        <span class="search-translation-badge ${badgeClass}">${item.translationName}</span>
      </div>
      <div class="search-item-text">${item.text}</div>
    `;
    
    div.addEventListener("click", () => {
      state.currentBook = item.book;
      state.currentChapter = item.chapter;
      saveSettings();
      closeModal(searchModal);
      
      renderBible();
      
      setTimeout(() => {
        const card = bibleViewerEl.querySelector(`.verse-card[data-verse="${item.verse}"]`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("is-reading-speaking");
          setTimeout(() => {
            if (!isTTSSpeaking || currentTTSIndex !== (item.verse - 1)) {
              card.classList.remove("is-reading-speaking");
            }
          }, 2000);
        }
      }, 300);
    });
    
    searchResults.appendChild(div);
  }

  if (filtered.length > 300) {
    const info = document.createElement("p");
    info.className = "search-placeholder";
    info.style.padding = "20px 0";
    info.textContent = "결과가 너무 많아 상위 300건만 표시됩니다. 더 상세한 검색어를 입력해 보세요.";
    searchResults.appendChild(info);
  }
}

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}


/* ==========================================================================
   📊 통독 현황표 대시보드
   ========================================================================== */

function openProgressModal() {
  progressModal.classList.add("active");
  renderProgressBoard();
}

function renderProgressBoard() {
  progressBooksContainer.innerHTML = "";
  
  let totalChapters = 1189;
  let readChapters = 0;
  
  BIBLE_METADATA.forEach(book => {
    const bookRow = document.createElement("div");
    bookRow.className = "progress-book-row";
    
    const title = document.createElement("div");
    title.className = "progress-book-name";
    
    const readList = readHistory[book.name] || [];
    const readCount = readList.length;
    readChapters += readCount;
    
    const unit = getChapterLabel(book.name); // 장/편 구분
    title.textContent = `${book.name} (${readCount} / ${book.chapters}${unit})`;
    
    const flex = document.createElement("div");
    flex.className = "progress-chapters-flex";
    
    for (let i = 1; i <= book.chapters; i++) {
      const dot = document.createElement("div");
      const isRead = readList.includes(i);
      dot.className = `progress-chapter-dot ${isRead ? 'checked' : ''}`;
      dot.textContent = `${i}`;
      
      dot.addEventListener("click", () => {
        toggleProgressChapter(book.name, i);
        renderProgressBoard();
      });
      
      flex.appendChild(dot);
    }
    
    bookRow.appendChild(title);
    bookRow.appendChild(flex);
    progressBooksContainer.appendChild(bookRow);
  });
  
  completedChaptersCount.textContent = readChapters;
  const ratio = ((readChapters / totalChapters) * 100).toFixed(1);
  progressPercentage.textContent = `${ratio}%`;
  progressBarFill.style.width = `${ratio}%`;
}

function toggleProgressChapter(bookName, chapterNum) {
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
  
  if (state.currentBook === bookName && state.currentChapter === chapterNum) {
    updateReadCheckButtonState();
  }
}

function resetHistoryAction() {
  if (confirm("정말로 모든 성경 통독 기록을 초기화하시겠습니까? (복구할 수 없습니다.)")) {
    readHistory = {};
    BIBLE_METADATA.forEach(b => {
      readHistory[b.name] = [];
    });
    saveReadHistory();
    renderProgressBoard();
    updateReadCheckButtonState();
    showToast("모든 통독 기록이 초기화되었습니다.");
  }
}

window.addEventListener("DOMContentLoaded", init);
