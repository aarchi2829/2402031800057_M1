// ── DATA ──
const songs = [
  { id:1, name:"Thinking Of You",   artist:"A.P.Dhillon",            duration:"3:45", img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&q=80",  file:"songs/thinkingofyou.mp3" },
  { id:2, name:"Love Story",        artist:"Taylor Swift",    duration:"4:12", img:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&q=80",  file:"" },
  { id:3, name:"Perfect",           artist:"Ed Sheeran",      duration:"3:56", img:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=80&q=80",  file:"" },
  { id:4, name:"Shape Of You",      artist:"Ed Sheeran",      duration:"3:20", img:"https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=80&q=80",  file:"" },
  { id:5, name:"Senorita",          artist:"Shawn Mendes",    duration:"4:05", img:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&q=80",  file:"" },
  { id:6, name:"Blinding Lights",   artist:"The Weeknd",      duration:"3:20", img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&q=80",  file:"" },
  { id:7, name:"Levitating",        artist:"Dua Lipa",        duration:"3:24", img:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=80&q=80",  file:"" },
];

const recentData = [
  { name:"Daily Mix 1",    sub:"Based on your taste",         img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80", songIdx:0 },
  { name:"Chill Hits",     sub:"Perfect for relaxing",        img:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80", songIdx:1 },
  { name:"Energy Boost",   sub:"Power up your day",           img:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&q=80", songIdx:2 },
  { name:"Late Night",     sub:"Vibes for the dark hours",    img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80", songIdx:5 },
  { name:"Pop Classics",   sub:"Timeless pop bangers",        img:"https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=200&q=80", songIdx:3 },
  { name:"R&B Smooth",     sub:"Smooth grooves all day",      img:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=200&q=80", songIdx:6 },
];

const artistsData = [
  { name:"Ed Sheeran",    type:"Pop / Folk",    img:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=120&q=80" },
  { name:"The Weeknd",    type:"R&B / Pop",     img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&q=80" },
  { name:"Dua Lipa",      type:"Pop / Dance",   img:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=120&q=80" },
  { name:"Kygo",          type:"Tropical House",img:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=120&q=80" },
  { name:"Shawn Mendes",  type:"Pop",           img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&q=80" },
  { name:"Taylor Swift",  type:"Pop / Country", img:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=120&q=80" },
];

// ── STATE ──
let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isLoop    = false;
let isMuted   = false;
let likedSongs = new Set();
const audio   = new Audio();
audio.volume  = 0.8;

// ── ELEMENTS ──
const masterPlay    = document.getElementById('masterPlay');
const progressBar   = document.getElementById('myProgressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalDurEl    = document.getElementById('totalDuration');
const masterSongName= document.getElementById('masterSongName');
const masterArtist  = document.getElementById('masterArtistName');
const nowPlayingImg = document.getElementById('nowPlayingImg');
const shuffleBtn    = document.getElementById('shuffleBtn');
const loopBtn       = document.getElementById('loopBtn');
const prevBtn       = document.getElementById('prevBtn');
const nextBtn       = document.getElementById('nextBtn');
const muteBtn       = document.getElementById('muteBtn');
const volControl    = document.getElementById('volumeControl');
const playerEl      = document.getElementById('player');
const playerFav     = document.getElementById('playerFav');
const likedToggle   = document.getElementById('likedToggle');
const likedSection  = document.getElementById('likedSection');
const likedList     = document.getElementById('likedList');
const mainSongList  = document.getElementById('mainSongList');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const srList        = document.getElementById('srList');
const toastEl       = document.getElementById('toast');



// ── FORMAT TIME ──
function fmtTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60);
  return `${m}:${sec.toString().padStart(2,'0')}`;
}

// ── RANGE FILL ──
function updateRangeFill(el, val, max) {
  const pct = (val/max)*100;
  el.style.backgroundSize = `${pct}% 100%`;
}

// ── RENDER SONGS ──
function renderSongList(container, list) {
  container.innerHTML = '';
  list.forEach((song, i) => {
    const div = document.createElement('div');
    div.className = 'song-item' + (songIndex === i && isPlaying ? ' playing' : '');
    div.dataset.idx = i;
    div.innerHTML = `
      <div class="eq-bars">
        <div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div>
      </div>
      <span class="song-num">${i+1}</span>
      <img src="${song.img}" alt="">
      <div class="song-item-info">
        <div class="song-item-name">${song.name}</div>
        <div class="song-item-artist">${song.artist}</div>
      </div>
      <span class="song-item-duration">${song.duration}</span>
      <div class="song-item-actions">
        <button class="song-fav ${likedSongs.has(song.id)?'active':''}" data-id="${song.id}">
          <i class="fa${likedSongs.has(song.id)?'-solid':'-regular'} fa-heart"></i>
        </button>
        <button class="song-play-btn">
          <i class="fa-solid fa-${songIndex===i&&isPlaying?'pause':'play'}"></i>
        </button>
      </div>
    `;
    div.addEventListener('click', e => {
      if (e.target.closest('.song-fav')) {
        toggleLike(song.id, e.target.closest('.song-fav'));
        return;
      }
      if (songIndex === i && isPlaying) { pauseSong(); }
      else { songIndex = i; playSong(); }
    });
    container.appendChild(div);
  });
}

function renderRecent() {
  const g = document.getElementById('recentGrid');
  g.innerHTML = '';
  recentData.forEach(r => {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <img src="${r.img}" alt="">
      <div class="card-name">${r.name}</div>
      <div class="card-sub">${r.sub}</div>
      <button class="card-play"><i class="fa fa-play"></i></button>
    `;
    d.addEventListener('click', () => {
      songIndex = r.songIdx;
      playSong();
    });
    g.appendChild(d);
  });
}

function renderArtists() {
  const g = document.getElementById('artistsGrid');
  g.innerHTML = '';
  artistsData.forEach(a => {
    const d = document.createElement('div');
    d.className = 'artist-card';
    d.innerHTML = `
      <img src="${a.img}" alt="${a.name}">
      <div class="artist-name">${a.name}</div>
      <div class="artist-type">${a.type}</div>
      <div class="neon-badge">FOLLOW</div>
    `;
    g.appendChild(d);
  });
}

// ── PLAY/PAUSE ──
function playSong() {
  const s = songs[songIndex];
  if (s.file) {
    audio.src = s.file;
  } else {
    // No real file: simulate playback with a silent oscillator
    if (!window._silentCtx) {
      window._silentCtx = new (window.AudioContext||window.webkitAudioContext)();
    }
    // Reset fake progress
    audio.src = '';
    startFakeProgress(parseDur(s.duration));
  }
  masterSongName.textContent = s.name;
  masterArtist.textContent   = s.artist;
  nowPlayingImg.src          = s.img;
  isPlaying = true;
  masterPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
  playerEl.classList.add('playing');
  renderSongList(mainSongList, songs);
  updatePlayerFav();
  if (s.file) audio.play().catch(()=>{});
}

function pauseSong() {
  isPlaying = false;
  masterPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
  playerEl.classList.remove('playing');
  clearFakeProgress();
  if (audio.src) audio.pause();
  renderSongList(mainSongList, songs);
}

masterPlay.addEventListener('click', () => {
  if (isPlaying) pauseSong(); else playSong();
});

// ── NEXT / PREV ──
function nextSong() {
  if (isShuffle) {
    let r;
    do { r = Math.floor(Math.random()*songs.length); } while (r===songIndex && songs.length>1);
    songIndex = r;
  } else {
    songIndex = (songIndex+1)%songs.length;
  }
  playSong();
}
function prevSong() {
  if (audio.currentTime > 3 || fakeProgress.elapsed > 3) {
    audio.currentTime = 0;
    fakeProgress.elapsed = 0;
    return;
  }
  songIndex = (songIndex-1+songs.length)%songs.length;
  playSong();
}
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// ── SHUFFLE / LOOP ──
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
  showToast(isShuffle ? '🔀 Shuffle On' : 'Shuffle Off');
});
loopBtn.addEventListener('click', () => {
  isLoop = !isLoop;
  loopBtn.classList.toggle('active', isLoop);
  audio.loop = isLoop;
  showToast(isLoop ? '🔁 Loop On' : 'Loop Off');
});

// ── VOLUME ──
volControl.addEventListener('input', () => {
  audio.volume = volControl.value/100;
  updateRangeFill(volControl, volControl.value, 100);
  isMuted = false;
  muteBtn.innerHTML = volControl.value==0 ?
    '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
});
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  muteBtn.innerHTML = isMuted ?
    '<i class="fa-solid fa-volume-xmark"></i>' :
    '<i class="fa-solid fa-volume-high"></i>';
});
updateRangeFill(volControl, 80, 100);

// ── AUDIO PROGRESS ──
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime/audio.duration)*100;
  progressBar.value = pct;
  updateRangeFill(progressBar, pct, 100);
  currentTimeEl.textContent = fmtTime(audio.currentTime);
  totalDurEl.textContent    = fmtTime(audio.duration);
});
progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value/100)*audio.duration;
  } else {
    fakeProgress.current = (progressBar.value/100)*fakeProgress.total;
    fakeProgress.elapsed = fakeProgress.current;
  }
  updateRangeFill(progressBar, progressBar.value, 100);
});
audio.addEventListener('ended', () => {
  if (!isLoop) nextSong();
});

// ── FAKE PROGRESS (no real audio files) ──
const fakeProgress = { timer:null, elapsed:0, total:0, current:0 };
function parseDur(str) {
  const [m,s] = str.split(':').map(Number);
  return m*60+s;
}
function startFakeProgress(total) {
  clearFakeProgress();
  fakeProgress.total   = total;
  fakeProgress.elapsed = 0;
  totalDurEl.textContent = fmtTime(total);
  fakeProgress.timer = setInterval(() => {
    if (!isPlaying) return;
    fakeProgress.elapsed += 0.25;
    if (fakeProgress.elapsed >= total) {
      clearFakeProgress();
      if (isLoop) { fakeProgress.elapsed=0; startFakeProgress(total); }
      else nextSong();
      return;
    }
    const pct = (fakeProgress.elapsed/total)*100;
    progressBar.value = pct;
    updateRangeFill(progressBar, pct, 100);
    currentTimeEl.textContent = fmtTime(fakeProgress.elapsed);
  }, 250);
}
function clearFakeProgress() {
  clearInterval(fakeProgress.timer);
}

// ── LIKE ──
function toggleLike(id, btn) {
  if (likedSongs.has(id)) {
    likedSongs.delete(id);
    if (btn) { btn.classList.remove('active'); btn.innerHTML='<i class="fa-regular fa-heart"></i>'; }
    showToast('Removed from Liked Songs');
  } else {
    likedSongs.add(id);
    if (btn) { btn.classList.add('active'); btn.innerHTML='<i class="fa-solid fa-heart"></i>'; }
    showToast('❤️ Added to Liked Songs');
  }
  updatePlayerFav();
  renderSongList(mainSongList, songs);
  renderLiked();
}
function updatePlayerFav() {
  const cur = songs[songIndex];
  if (!cur) return;
  if (likedSongs.has(cur.id)) {
    playerFav.classList.add('active-fav');
    playerFav.innerHTML='<i class="fa-solid fa-heart"></i>';
  } else {
    playerFav.classList.remove('active-fav');
    playerFav.innerHTML='<i class="fa-regular fa-heart"></i>';
  }
}
playerFav.addEventListener('click', () => {
  const cur = songs[songIndex];
  if (cur) toggleLike(cur.id, null);
});

// ── LIKED SECTION ──
likedToggle.addEventListener('click', () => {
  const open = likedSection.style.display === 'block';
  likedSection.style.display = open ? 'none' : 'block';
  likedToggle.classList.toggle('active', !open);
  if (!open) renderLiked();
});
function renderLiked() {
  const liked = songs.filter(s => likedSongs.has(s.id));
  if (!liked.length) {
    likedList.innerHTML = '<div style="color:var(--text-dim);padding:16px">No liked songs yet. Tap the ♥ on any song!</div>';
    return;
  }
  renderSongList(likedList, liked);
}

// ── SEARCH ──
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.style.display='none'; return; }
  const matches = songs.filter(s =>
    s.name.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
  );
  srList.innerHTML = '';
  if (!matches.length) {
    srList.innerHTML='<div style="color:var(--text-dim);font-size:.85rem;padding:6px">No results found</div>';
  } else {
    matches.forEach(s => {
      const d = document.createElement('div');
      d.className='sr-item';
      d.innerHTML=`<img src="${s.img}" alt=""><div><div class="sr-item-name">${s.name}</div><div class="sr-item-artist">${s.artist}</div></div>`;
      d.addEventListener('click', () => {
        songIndex = songs.indexOf(s);
        playSong();
        searchResults.style.display='none';
        searchInput.value='';
      });
      srList.appendChild(d);
    });
  }
  searchResults.style.display='block';
});
document.addEventListener('click', e => {
  if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults'))
    searchResults.style.display='none';
});

// ── ADD SONG ──
document.getElementById('addSongBtn').addEventListener('click', () => {
  const name = document.getElementById('inSongName').value.trim();
  const artist = document.getElementById('inArtist').value.trim();
  const dur  = document.getElementById('inDuration').value.trim();
  if (!name) { showToast('Please enter a song name'); return; }
  songs.push({
    id: Date.now(), name, artist:artist||'Unknown', duration:dur||'0:00',
    img:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&q=80', file:''
  });
  document.getElementById('inSongName').value='';
  document.getElementById('inArtist').value='';
  document.getElementById('inDuration').value='';
  renderSongList(mainSongList, songs);
  showToast('✅ Song added!');
});

// ── SLIDER ──
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(() => goToSlide(currentSlide+1), 4000);
dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.dataset.dot)));
document.querySelectorAll('.play-banner').forEach(btn => {
  btn.addEventListener('click', () => {
    songIndex = +btn.dataset.song;
    playSong();
  });
});

// ── NAV LINKS ──
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

// ── INIT ──
renderSongList(mainSongList, songs);
renderRecent();
renderArtists();
updateRangeFill(progressBar, 0, 100);