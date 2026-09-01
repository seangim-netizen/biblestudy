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
  translation: "KG",
  selectedVerse: 1 // 선택된 절 번호 (기본 1절)
};

// TTS 상태
let isTTSSpeaking = false;
let isTTSPaused = false;
let currentTTSIndex = 0;
let ttsSpeechItems = [];
let ttsRate = 1.0; // 1.0, 1.2, 1.5, 0.8
let repeatMode = 'CONTINUOUS'; // 'CONTINUOUS', 'CHAPTER', 'VERSE'

// DOM 요소
let quickBookSelect, quickChapterSelect, primaryTranslationSelect, btnPrevChapter, btnNextChapter, bibleViewerEl;
let btnAudioTTSPlay, btnAudioTTSPlay2, btnAudioTTSPrev, btnAudioTTSNext, btnTTSSpeed, btnTTSRepeat, btnAudioTTSStop, ttsPlayerBox;

function init() {
  quickBookSelect = document.getElementById("quickBookSelect");
  quickChapterSelect = document.getElementById("quickChapterSelect");
  primaryTranslationSelect = document.getElementById("primaryTranslation");
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
    // 역본을 변경해도 하이라이트(state.selectedVerse) 및 TTS 지점 유지
    state.translation = e.target.value;
    renderBible();
    if (isTTSSpeaking) {
      // 재생 중이면 역본 변경 시 선택 구절부터 재개
      playFromVerse(state.selectedVerse);
    }
  });

  btnPrevChapter.addEventListener("click", () => {
    if (state.chapter > 1) {
      stopTTS();
      state.chapter--;
      state.selectedVerse = 1;
      updateChapterSelect();
      renderBible();
    }
  });

  btnNextChapter.addEventListener("click", () => {
    const bInfo = BIBLE_BOOKS.find(b => b.name === state.book);
    if (bInfo && state.chapter < bInfo.chapters) {
      stopTTS();
      state.chapter++;
      state.selectedVerse = 1;
      updateChapterSelect();
      renderBible();
    }
  });

  // 재생 버튼 이벤트
  if (btnAudioTTSPlay) btnAudioTTSPlay.addEventListener("click", togglePlayTTS);
  if (btnAudioTTSPlay2) btnAudioTTSPlay2.addEventListener("click", togglePlayTTS);
  if (btnAudioTTSStop) btnAudioTTSStop.addEventListener("click", stopTTS);
  if (btnAudioTTSPrev) btnAudioTTSPrev.addEventListener("click", playPrevTTS);
  if (btnAudioTTSNext) btnAudioTTSNext.addEventListener("click", playNextTTS);
  if (btnTTSSpeed) btnTTSSpeed.addEventListener("click", toggleTTSSpeed);
  if (btnTTSRepeat) btnTTSRepeat.addEventListener("click", toggleRepeatMode);

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
    verses.forEach((rawText, idx) => {
      const verseNum = idx + 1;
      let cleanText = rawText.replace(/[○◯⚪🔴⚫\u25cb]/g, "").trim();
      const card = document.createElement("div");
      card.className = "verse-card";
      card.setAttribute("data-verse", verseNum);
      
      // 구절 터치/클릭 이벤트
      card.addEventListener("click", () => {
        onVerseClick(verseNum);
      });

      card.innerHTML = `<span class="verse-num">${verseNum}</span> ${cleanText}`;
      bibleViewerEl.appendChild(card);
    });

    // 선택된 구절 하이라이트 복원
    highlightVerse(state.selectedVerse);
  });
}

// 구절 클릭/터치 시 동작
function onVerseClick(verseNum) {
  state.selectedVerse = verseNum;
  highlightVerse(verseNum);

  if (isTTSSpeaking) {
    // 재생 중 터치하면 터치한 구절부터 바로 낭독 시작
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

  // iOS Safari touch unlock
  try {
    const unlockUtterance = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(unlockUtterance);
  } catch (e) {}

  if (isTTSSpeaking) {
    if (isTTSPaused) {
      window.speechSynthesis.resume();
      isTTSPaused = false;
      updateTTSPlayButtons(true);
    } else {
      window.speechSynthesis.pause();
      isTTSPaused = true;
      updateTTSPlayButtons(false);
    }
  } else {
    // 터치하거나 선택해둔 절부터 재생 시작
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
    let textToSpeak = card.textContent || "";

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

function speakNextTTS() {
  if (!isTTSSpeaking) return;

  if (currentTTSIndex >= ttsSpeechItems.length) {
    // 장 종료 시 반복 모드 처리
    if (repeatMode === 'CHAPTER') {
      // 장 반복
      playFromVerse(1);
    } else if (repeatMode === 'CONTINUOUS') {
      // 연속 재생 (다음 장으로 넘어감)
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

  const utterance = new SpeechSynthesisUtterance(item.text);
  utterance.lang = (state.translation.startsWith("NI") || state.translation.startsWith("NL") || state.translation.startsWith("NK") || state.translation.startsWith("RS")) ? "en-US" : "ko-KR";
  utterance.rate = ttsRate;

  utterance.onend = () => {
    if (isTTSSpeaking && !isTTSPaused) {
      if (repeatMode === 'VERSE') {
        // 절 반복
        speakNextTTS();
      } else {
        currentTTSIndex++;
        speakNextTTS();
      }
    }
  };

  utterance.onerror = (e) => {
    console.error("TTS Error:", e);
    if (isTTSSpeaking && !isTTSPaused) {
      currentTTSIndex++;
      speakNextTTS();
    }
  };

  window.speechSynthesis.speak(utterance);
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
  const rates = [1.0, 1.2, 1.5, 0.8];
  let currIdx = rates.indexOf(ttsRate);
  let nextIdx = (currIdx + 1) % rates.length;
  ttsRate = rates[nextIdx];
  if (btnTTSSpeed) btnTTSSpeed.textContent = `🐢 ${ttsRate.toFixed(1)}x`;

  if (isTTSSpeaking && !isTTSPaused) {
    // 배속 변경 시 현재 구절부터 즉시 적용
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

function stopTTS() {
  window.speechSynthesis.cancel();
  isTTSSpeaking = false;
  isTTSPaused = false;
  currentTTSIndex = 0;
  ttsSpeechItems = [];
  updateTTSPlayButtons(false);
  if (ttsPlayerBox) ttsPlayerBox.classList.add("hidden");

  const bgAudio = document.getElementById('bgSilentAudio');
  if (bgAudio) {
    bgAudio.pause();
  }

  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = "none";
  }
}

function updateTTSPlayButtons(isPlaying) {
  const text = isPlaying ? "❚❚ 일시정지" : "▶ 재생";
  if (btnAudioTTSPlay) btnAudioTTSPlay.textContent = text;
  if (btnAudioTTSPlay2) btnAudioTTSPlay2.textContent = text;

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
        { src: 'app_logo.png', sizes: '512x512', type: 'image/png' }
      ]
    });
  }
}

function setupMediaSessionHandlers() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      togglePlayTTS();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      togglePlayTTS();
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      playPrevTTS();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      playNextTTS();
    });
  }
}

// 앱이 백그라운드로 내려가거나 정지 상태에서 앱 화면을 쓸어 올릴 때의 감지 및 iOS 엔진 복구
document.addEventListener('visibilitychange', function() {
  const bgAudio = document.getElementById('bgSilentAudio');
  if (document.hidden) {
    // 백그라운드 진입 시 재생 중이면 무음 오디오 재생 유지 및 TTS 재개
    if (isTTSSpeaking && !isTTSPaused) {
      if (bgAudio && bgAudio.paused) {
        bgAudio.play().catch(e => console.log("bgAudio play catch on hidden:", e));
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } else {
      if (bgAudio) {
        bgAudio.pause();
      }
    }
  } else {
    // 앱으로 다시 돌아올 때 TTS 멈춤 현상 자동 복구
    if (isTTSSpeaking && !isTTSPaused) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      if (!window.speechSynthesis.speaking) {
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
