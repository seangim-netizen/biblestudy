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

// 현재 상태
let state = {
  book: "창세기",
  chapter: 1,
  translation: "KG"
};

// DOM 요소
let quickBookSelect, quickChapterSelect, primaryTranslationSelect, btnPrevChapter, btnNextChapter, bibleViewerEl;

function init() {
  quickBookSelect = document.getElementById("quickBookSelect");
  quickChapterSelect = document.getElementById("quickChapterSelect");
  primaryTranslationSelect = document.getElementById("primaryTranslation");
  btnPrevChapter = document.getElementById("btnPrevChapter");
  btnNextChapter = document.getElementById("btnNextChapter");
  bibleViewerEl = document.getElementById("bibleViewer");

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
    state.book = e.target.value;
    state.chapter = 1;
    updateChapterSelect();
    renderBible();
  });

  quickChapterSelect.addEventListener("change", (e) => {
    state.chapter = parseInt(e.target.value);
    renderBible();
  });

  primaryTranslationSelect.addEventListener("change", (e) => {
    state.translation = e.target.value;
    renderBible();
  });

  btnPrevChapter.addEventListener("click", () => {
    if (state.chapter > 1) {
      state.chapter--;
      updateChapterSelect();
      renderBible();
    }
  });

  btnNextChapter.addEventListener("click", () => {
    const bInfo = BIBLE_BOOKS.find(b => b.name === state.book);
    if (bInfo && state.chapter < bInfo.chapters) {
      state.chapter++;
      updateChapterSelect();
      renderBible();
    }
  });

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

// 동적 역본 파일 로더
function ensureTranslationLoaded(tCode, callback) {
  const tInfo = TRANSLATIONS[tCode];
  if (!tInfo) return callback(false);

  // 이미 메모리에 로드되어 있으면 바로 실행
  if (window[tInfo.varName]) {
    return callback(true);
  }

  // 외부 파일 로드 (쉬운성경, 현대인, NIV, NLT, NKJV, RSV 등)
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

  ensureTranslationLoaded(state.translation, (success) => {
    const tInfo = TRANSLATIONS[state.translation] || TRANSLATIONS.KG;
    const db = window[tInfo.varName];

    if (!success || !db || !db[state.book] || !db[state.book][String(state.chapter)]) {
      const err = document.createElement("div");
      err.style.color = "red";
      err.style.textAlign = "center";
      err.style.padding = "20px";
      err.textContent = `[${tInfo.name}] 데이터를 불러올 수 없거나 로드 중입니다.`;
      bibleViewerEl.appendChild(err);
      return;
    }

    const verses = db[state.book][String(state.chapter)];
    verses.forEach((verseText, idx) => {
      const card = document.createElement("div");
      card.className = "verse-card";
      card.innerHTML = `<span class="verse-num">${idx + 1}</span> ${verseText}`;
      bibleViewerEl.appendChild(card);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  window.addEventListener("DOMContentLoaded", init);
}
