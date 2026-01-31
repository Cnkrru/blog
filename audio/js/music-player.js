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

// 全局播放器状态存储
var playerState = {
  currentIndex: 0,
  currentTime: 0,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  playlist: []
};

// 保存播放器状态到localStorage
function savePlayerState() {
  if (window.audio) {
    playerState.currentTime = window.audio.currentTime;
    playerState.isPlaying = !window.audio.paused;
    playerState.volume = window.audio.volume;
    playerState.isMuted = window.audio.muted;
    playerState.currentIndex = window.currentIndex;
    
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

// 全局变量
var audio = null;
var playlist = [];
var currentIndex = 0;
var isPlayerVisible = false;

// 初始化播放器
document.addEventListener('DOMContentLoaded', function() {
  // 播放器元素
  var player = document.getElementById('global-music-player');
  var toggleBtn = document.getElementById('music-player-toggle');
  var playBtn = document.getElementById('player-play');
  var prevBtn = document.getElementById('player-prev');
  var nextBtn = document.getElementById('player-next');
  var progressBar = document.querySelector('.progress-bar');
  var progressFill = document.getElementById('progress-fill');
  var progressHandle = document.getElementById('progress-handle');
  var currentTimeEl = document.getElementById('current-time');
  var totalTimeEl = document.getElementById('total-time');
  var volumeBtn = document.getElementById('player-volume-btn');
  var volumeBar = document.querySelector('.volume-bar');
  var volumeFill = document.getElementById('volume-fill');
  var volumeHandle = document.getElementById('volume-handle');
  var playerTitle = document.getElementById('player-title');
  var playerArtist = document.getElementById('player-artist');
  var playerCover = document.getElementById('player-cover');
  
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
      // 修正路径，确保音频和封面文件路径正确
      playlist = data.playlist.map(song => {
        return {
          name: song.name,
          artist: song.artist,
          url: '/blog' + song.url,
          cover: '/blog' + song.cover
        };
      });
      playerState.playlist = playlist;
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
      playerState.playlist = playlist;
      initializePlayer();
    });
  
  // 初始化播放器
function initializePlayer() {
    // 创建音频对象
    audio = new Audio();
    window.audio = audio;
    
    // 恢复保存的状态
    currentIndex = playerState.currentIndex;
    window.currentIndex = currentIndex;
    
    audio.volume = playerState.volume;
    audio.muted = playerState.isMuted;
    
    // 加载当前歌曲
    loadSong(currentIndex);
    
    // 立即恢复播放器UI状态
    if (playerState.isPlaying) {
      if (document.getElementById('player-play')) {
        document.getElementById('player-play').classList.add('playing');
        document.getElementById('player-play').setAttribute('aria-label', '暂停');
      }
      if (document.getElementById('global-music-player')) {
        document.getElementById('global-music-player').classList.add('playing');
        document.getElementById('global-music-player').classList.add('active');
      }
      if (document.getElementById('music-player-toggle')) {
        document.getElementById('music-player-toggle').classList.add('active');
      }
      isPlayerVisible = true;
    }
    
    // 绑定事件
    bindEvents();
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
  
  // 绑定事件
  function bindEvents() {
    // 播放/暂停
    if (playBtn) {
      playBtn.addEventListener('click', togglePlay);
    }
    
    // 上一首/下一首
    if (prevBtn) prevBtn.addEventListener('click', prevSong);
    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    
    // 音频事件
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', function() {
      updateProgress();
      // 加载完成后设置时间和恢复播放状态
      if (playerState.currentTime) {
        audio.currentTime = playerState.currentTime;
      }
      // 恢复播放状态
      if (playerState.isPlaying) {
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
      isDraggingVolume = false;
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
    
    // 按钮点击事件
    if (toggleBtn) {
      toggleBtn.addEventListener('click', togglePlayer);
    }
  }
  
  // 播放/暂停
  function togglePlay() {
    if (audio.paused) {
      audio.play().catch(error => {
        console.warn('Play failed:', error);
      });
      if (playBtn) {
        playBtn.classList.add('playing');
      }
      if (player) {
        player.classList.add('playing');
      }
      if (playBtn) {
        playBtn.setAttribute('aria-label', '暂停');
      }
    } else {
      audio.pause();
      if (playBtn) {
        playBtn.classList.remove('playing');
      }
      if (player) {
        player.classList.remove('playing');
      }
      if (playBtn) {
        playBtn.setAttribute('aria-label', '播放');
      }
    }
    savePlayerState();
  }
  
  // 上一首
  function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    window.currentIndex = currentIndex;
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
    window.currentIndex = currentIndex;
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
    if (!progressFill || !progressHandle || !currentTimeEl || !totalTimeEl) {
      return;
    }
    
    var duration = audio.duration || 0;
    var currentTime = audio.currentTime || 0;
    var progress = (currentTime / duration) * 100;
    
    progressFill.style.width = progress + '%';
    progressHandle.style.left = progress + '%';
    
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
    
    // 定期保存播放状态（每2秒保存一次，更频繁以确保进度不丢失）
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
    if (!audio.paused) {
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
});

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
  savePlayerState();
});

// 监听所有链接点击事件，确保在页面切换前保存状态
document.addEventListener('click', function(e) {
  // 检查点击的是否是链接
  var target = e.target;
  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  
  if (target && target.tagName === 'A') {
    // 检查是否是内部链接（同域）
    var href = target.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.includes(window.location.hostname))) {
      // 保存播放状态
      savePlayerState();
    }
  }
});
