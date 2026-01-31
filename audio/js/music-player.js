/**
 * 音乐播放器脚本
 * 功能：
 * - 从JSON配置文件加载播放列表
 * - 支持播放/暂停、上一首/下一首
 * - 进度条拖拽功能
 * - 音量控制
 * - 响应式设计
 * - 暗黑模式支持
 * - 页面切换时保持播放状态
 * - 播放时保持音乐框显示
 */

// 全局变量
var player, toggleBtn, playBtn, prevBtn, nextBtn;
var progressBar, progressFill, progressHandle, currentTimeEl, totalTimeEl;
var volumeBtn, volumeBar, volumeFill, volumeHandle;
var playerTitle, playerArtist, playerCover;
var audio = null;
var playlist = [];
var currentIndex = 0;
var isPlayerVisible = false;

// 全局播放器状态存储
var playerState = {
  currentIndex: 0,
  currentTime: 0,
  isPlaying: false,
  volume: 0.7,
  isMuted: false
};

// 保存播放器状态到localStorage
function savePlayerState() {
  if (audio) {
    playerState.currentTime = audio.currentTime;
    playerState.isPlaying = !audio.paused;
    playerState.volume = audio.volume;
    playerState.isMuted = audio.muted;
    playerState.currentIndex = currentIndex;
    
    try {
      localStorage.setItem('musicPlayerState', JSON.stringify(playerState));
    } catch (error) {
      console.warn('Failed to save player state:', error);
    }
  }
}

// 从localStorage加载播放器状态
function loadPlayerState() {
  try {
    var savedState = localStorage.getItem('musicPlayerState');
    if (savedState) {
      var state = JSON.parse(savedState);
      playerState = {
        ...playerState,
        ...state
      };
      return true;
    }
  } catch (error) {
    console.warn('Failed to load player state:', error);
  }
  return false;
}

// 加载歌曲
function loadSong(index) {
  var song = playlist[index];
  if (!song) return;
  
  // 添加加载动画
  if (playerCover && playerCover.parentElement) {
    playerCover.parentElement.classList.add('loading');
  }
  
  // 预加载封面图片
  var img = new Image();
  img.onload = function() {
    if (playerCover) {
      playerCover.src = song.cover;
      if (playerCover.parentElement) {
        playerCover.parentElement.classList.remove('loading');
      }
      
      // 添加歌曲信息更新动画
      if (playerTitle && playerTitle.parentElement) {
        playerTitle.parentElement.classList.add('updated');
        setTimeout(function() {
          if (playerTitle && playerTitle.parentElement) {
            playerTitle.parentElement.classList.remove('updated');
          }
        }, 500);
      }
    }
  };
  img.onerror = function() {
    if (playerCover && playerCover.parentElement) {
      playerCover.parentElement.classList.remove('loading');
    }
  };
  img.src = song.cover;
  
  audio.src = song.url;
  if (playerTitle) playerTitle.textContent = song.name;
  if (playerArtist) playerArtist.textContent = song.artist;
  if (playerCover) playerCover.alt = song.name;
}

// 播放/暂停
function togglePlay() {
  if (audio.paused) {
    audio.play().catch(error => {
      console.warn('Play failed:', error);
    });
    if (playBtn) {
      playBtn.classList.add('playing');
      playBtn.setAttribute('aria-label', '暂停');
    }
    if (player) {
      player.classList.add('playing');
    }
  } else {
    audio.pause();
    if (playBtn) {
      playBtn.classList.remove('playing');
      playBtn.setAttribute('aria-label', '播放');
    }
    if (player) {
      player.classList.remove('playing');
    }
  }
  savePlayerState();
}

// 上一首
function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  if (!audio.paused) {
    audio.play().catch(error => {
      console.warn('Play failed:', error);
    });
  }
  savePlayerState();
}

// 下一首
function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  if (!audio.paused) {
    audio.play().catch(error => {
      console.warn('Play failed:', error);
    });
  }
  savePlayerState();
}

// 更新进度条
function updateProgress() {
  if (!progressFill || !progressHandle || !currentTimeEl || !totalTimeEl) return;
  
  var duration = audio.duration || 0;
  var currentTime = audio.currentTime || 0;
  var progress = (currentTime / duration) * 100;
  
  progressFill.style.width = progress + '%';
  progressHandle.style.left = progress + '%';
  
  currentTimeEl.textContent = formatTime(currentTime);
  totalTimeEl.textContent = formatTime(duration);
  
  // 每2秒保存一次播放状态
  if (Math.floor(currentTime * 2) % 2 === 0) {
    savePlayerState();
  }
}

// 格式化时间
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// 拖动进度条
function seek(e) {
  if (!progressBar) return;
  
  var rect = progressBar.getBoundingClientRect();
  var pos = (e.clientX - rect.left) / rect.width;
  var duration = audio.duration || 0;
  audio.currentTime = pos * duration;
  updateProgress();
  savePlayerState();
}

// 拖动音量条
function adjustVolume(e) {
  if (!volumeBar) return;
  
  var rect = volumeBar.getBoundingClientRect();
  var pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.volume = pos;
  if (volumeFill) {
    volumeFill.style.width = pos * 100 + '%';
  }
  if (volumeHandle) {
    volumeHandle.style.left = pos * 100 + '%';
  }
  
  if (volumeBtn) {
    if (pos === 0) {
      volumeBtn.classList.add('muted');
      audio.muted = true;
    } else {
      volumeBtn.classList.remove('muted');
      audio.muted = false;
    }
  }
  savePlayerState();
}

// 切换播放器显示/隐藏
function togglePlayer() {
  // 只有在暂停时才允许隐藏
  if (audio && !audio.paused) {
    return;
  }
  
  isPlayerVisible = !isPlayerVisible;
  
  if (isPlayerVisible) {
    if (player) {
      player.classList.add('active');
    }
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-label', '关闭音乐播放器');
      toggleBtn.setAttribute('title', '关闭音乐播放器');
    }
  } else {
    if (player) {
      player.classList.remove('active');
    }
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-label', '音乐播放器');
      toggleBtn.setAttribute('title', '音乐播放器');
    }
  }
}

// 绑定事件
function bindEvents() {
  // 播放/暂停
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }
  
  // 上一首/下一首
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSong);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSong);
  }
  
  // 进度条事件
  var isDragging = false;
  if (progressBar) {
    progressBar.addEventListener('click', seek);
  }
  if (progressHandle) {
    progressHandle.addEventListener('mousedown', function() {
      isDragging = true;
    });
  }
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      seek(e);
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  
  // 音量控制
  var isDraggingVolume = false;
  if (volumeBtn) {
    volumeBtn.addEventListener('click', function() {
      audio.muted = !audio.muted;
      volumeBtn.classList.toggle('muted', audio.muted);
      savePlayerState();
    });
  }
  
  if (volumeBar) {
    volumeBar.addEventListener('click', adjustVolume);
  }
  if (volumeHandle) {
    volumeHandle.addEventListener('mousedown', function() {
      isDraggingVolume = true;
    });
  }
  
  document.addEventListener('mousemove', function(e) {
    if (isDraggingVolume) {
      adjustVolume(e);
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDraggingVolume = false;
  });
  
  // 按钮点击事件
  if (toggleBtn) {
    toggleBtn.addEventListener('click', togglePlayer);
  }
}

// 初始化播放器
function initializePlayer() {
  // 创建音频对象
  audio = new Audio();
  
  // 恢复保存的状态
  currentIndex = playerState.currentIndex || 0;
  audio.volume = playerState.volume || 0.7;
  audio.muted = playerState.isMuted || false;
  
  // 绑定音频事件
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', nextSong);
  audio.addEventListener('loadedmetadata', function() {
    updateProgress();
    // 加载完成后设置时间
    if (playerState.currentTime) {
      audio.currentTime = playerState.currentTime;
    }
  });
  
  // 当音频可以播放时尝试恢复播放
  audio.addEventListener('canplay', function() {
    // 恢复播放状态
    if (playerState.isPlaying && audio.paused) {
      audio.play().catch(error => {
        console.warn('Auto-play failed:', error);
      });
    }
  });
  
  // 播放时保持显示
  audio.addEventListener('play', function() {
    if (player) {
      player.classList.add('playing');
      player.classList.add('active');
    }
    if (toggleBtn) {
      toggleBtn.classList.add('active');
    }
    isPlayerVisible = true;
  });
  
  // 加载当前歌曲
  loadSong(currentIndex);
  
  // 立即恢复播放器UI状态
  if (playerState.isPlaying) {
    if (playBtn) {
      playBtn.classList.add('playing');
      playBtn.setAttribute('aria-label', '暂停');
    }
    if (player) {
      player.classList.add('playing');
      player.classList.add('active');
    }
    if (toggleBtn) {
      toggleBtn.classList.add('active');
    }
    isPlayerVisible = true;
  }
  
  // 绑定事件
  bindEvents();
}

// 页面加载完成后初始化
function initPlayer() {
  console.log('Initializing player...');
  
  // 获取播放器元素
  player = document.getElementById('global-music-player');
  toggleBtn = document.getElementById('music-player-toggle');
  playBtn = document.getElementById('player-play');
  prevBtn = document.getElementById('player-prev');
  nextBtn = document.getElementById('player-next');
  progressBar = document.querySelector('.progress-bar');
  progressFill = document.getElementById('progress-fill');
  progressHandle = document.getElementById('progress-handle');
  currentTimeEl = document.getElementById('current-time');
  totalTimeEl = document.getElementById('total-time');
  volumeBtn = document.getElementById('player-volume-btn');
  volumeBar = document.querySelector('.volume-bar');
  volumeFill = document.getElementById('volume-fill');
  volumeHandle = document.getElementById('volume-handle');
  playerTitle = document.getElementById('player-title');
  playerArtist = document.getElementById('player-artist');
  playerCover = document.getElementById('player-cover');
  
  console.log('Player elements:', {
    player: !!player,
    toggleBtn: !!toggleBtn,
    playBtn: !!playBtn,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn
  });
  
  // 加载保存的播放器状态
  loadPlayerState();
  
  // 从 JSON 文件加载播放列表
  fetch('/blog/audio/js/music-config.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Loaded music config:', data);
      // 修正路径，确保音频和封面文件路径正确
      playlist = data.playlist.map(song => {
        return {
          name: song.name,
          artist: song.artist,
          url: '/blog' + song.url,
          cover: '/blog' + song.cover
        };
      });
      console.log('Processed playlist:', playlist);
      if (playlist.length > 0) {
        initializePlayer();
      }
    })
    .catch(error => {
      console.error('Error loading music config:', error);
      // 如果加载失败，使用默认播放列表
      playlist = [
        {
          name: "Stay With Me",
          artist: "未知艺术家",
          url: "/blog/audio/music/Stay With Me.mp3",
          cover: "/blog/audio/covers/stay-with-me.jpg"
        },
        {
          name: "半点心",
          artist: "未知艺术家",
          url: "/blog/audio/music/半点心.mp3",
          cover: "/blog/audio/covers/ban-dian-xin.jpg"
        },
        {
          name: "打上花火",
          artist: "未知艺术家",
          url: "/blog/audio/music/打上花火.mp3",
          cover: "/blog/audio/covers/da-shang-hua-huo.jpg"
        },
        {
          name: "生生世世爱",
          artist: "未知艺术家",
          url: "/blog/audio/music/生生世世爱.mp3",
          cover: "/blog/audio/covers/sheng-sheng-shi-shi-ai.jpg"
        },
        {
          name: "MY ALL",
          artist: "未知艺术家",
          url: "/blog/audio/music/MY ALL.mp3",
          cover: "/blog/audio/covers/my-all.jpg"
        }
      ];
      console.log('Using default playlist:', playlist);
      initializePlayer();
    });
}

// 检查DOM是否已经加载完成
if (document.readyState === 'loading') {
  // DOM还在加载中，监听DOMContentLoaded事件
  document.addEventListener('DOMContentLoaded', initPlayer);
} else {
  // DOM已经加载完成，直接执行初始化
  initPlayer();
}

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
  savePlayerState();
});

// 监听链接点击事件，保存播放状态
window.addEventListener('click', function(e) {
  // 检查点击的是否是链接
  var target = e.target;
  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  
  if (target && target.tagName === 'A') {
    // 检查是否是内部链接
    var href = target.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('./') || href.startsWith('../'))) {
      // 保存播放状态
      savePlayerState();
    }
  }
});
