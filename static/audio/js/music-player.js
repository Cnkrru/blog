/**
 * 音乐播放器脚本
 * 功能：
 * - 从JSON配置文件加载播放列表
 * - 支持播放/暂停、上一首/下一首
 * - 进度条拖拽功能
 * - 音量控制
 * - 响应式设计
 * - 暗黑模式支持
 * - 页面切换时保持音乐播放
 * - 播放时保持音乐框显示
 */

// 全局变量
var player, toggleBtn, playBtn, prevBtn, nextBtn, listBtn, randomBtn, playlistPanel, playlistCloseBtn, playlistItems;
var progressBar, progressFill, progressHandle, currentTimeEl, totalTimeEl;
var volumeBtn, volumeBar, volumeFill, volumeHandle;
var playerTitle, playerArtist, playerCover;
var audio = null;
var playlist = [];
var currentIndex = 0;
var isPlayerVisible = false;
var isRandomMode = false;
var isPlaylistVisible = false;
var saveStateInterval = null;

// 全局播放器状态存储
var playerState = {
  currentIndex: 0,
  currentTime: 0,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  isRandomMode: false
};

// 保存播放器状态到localStorage
function savePlayerState() {
  if (audio) {
    playerState.currentTime = audio.currentTime;
    playerState.isPlaying = !audio.paused;
    playerState.volume = audio.volume;
    playerState.isMuted = audio.muted;
    playerState.currentIndex = currentIndex;
    playerState.isRandomMode = isRandomMode;
    
    try {
      localStorage.setItem('musicPlayerState', JSON.stringify(playerState));
      console.log('Player state saved:', playerState);
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
      console.log('Player state loaded:', playerState);
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
  
  console.log('Loading song:', song);
  
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
  
  // 更频繁地保存播放状态，每0.5秒保存一次
  if (Math.floor(currentTime * 2) % 1 === 0) {
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
    // 隐藏多功能展开按钮
    const expandableContainer = document.querySelector('.expandable-controls-container');
    if (expandableContainer) {
      expandableContainer.style.opacity = '0';
      expandableContainer.style.pointerEvents = 'none';
      expandableContainer.style.visibility = 'hidden';
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
    // 显示多功能展开按钮
    const expandableContainer = document.querySelector('.expandable-controls-container');
    if (expandableContainer) {
      expandableContainer.style.opacity = '1';
      expandableContainer.style.pointerEvents = 'auto';
      expandableContainer.style.visibility = 'visible';
    }
  }
}

// 鼠标悬停在播放器区域时保持显示
function handlePlayerHover() {
  if (player) {
    player.classList.add('active');
  }
  if (toggleBtn) {
    toggleBtn.classList.add('active');
  }
}

// 鼠标离开播放器区域时自动收回
function handlePlayerLeave() {
  // 只有在暂停时才允许自动收回
  if (!audio || audio.paused) {
    if (player) {
      player.classList.remove('active');
    }
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
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
  
  // 音乐列表按钮点击事件
  if (listBtn) {
    listBtn.addEventListener('click', togglePlaylist);
  }
  
  // 随机播放按钮点击事件
  if (randomBtn) {
    randomBtn.addEventListener('click', toggleRandomMode);
  }
  
  // 播放列表关闭按钮点击事件
  if (playlistCloseBtn) {
    playlistCloseBtn.addEventListener('click', closePlaylist);
  }
  
  // 播放器区域鼠标事件 - 移除悬停显示，只通过点击控制
  if (player) {
    player.addEventListener('mouseenter', function() {
      // 鼠标悬停在播放器上时保持显示
      if (isPlayerVisible && player) {
        player.classList.add('active');
      }
    });
    player.addEventListener('mouseleave', function() {
      // 鼠标离开播放器时，隐藏播放器并重新显示多功能展开按钮
      if (isPlayerVisible && player) {
        player.classList.remove('active');
        isPlayerVisible = false;
        if (toggleBtn) {
          toggleBtn.classList.remove('active');
          toggleBtn.setAttribute('aria-label', '音乐播放器');
          toggleBtn.setAttribute('title', '音乐播放器');
        }
        // 显示多功能展开按钮
        const expandableContainer = document.querySelector('.expandable-controls-container');
        if (expandableContainer) {
          expandableContainer.style.opacity = '1';
          expandableContainer.style.pointerEvents = 'auto';
          expandableContainer.style.visibility = 'visible';
        }
      }
    });
  }
  
  // 点击页面其他地方关闭播放列表
  document.addEventListener('click', function(e) {
    if (isPlaylistVisible && playlistPanel && !playlistPanel.contains(e.target) && !listBtn.contains(e.target)) {
      closePlaylist();
    }
  });
  
  // 控制按钮鼠标事件 - 移除悬停显示，只通过点击控制
  if (toggleBtn) {
    // 移除鼠标悬停事件监听器，只保留点击事件
  }
}

// 初始化播放器
function initializePlayer() {
  console.log('Initializing player with state:', playerState);
  
  // 创建音频对象
  audio = new Audio();
  
  // 恢复保存的状态
  currentIndex = playerState.currentIndex || 0;
  audio.volume = playerState.volume || 0.7;
  audio.muted = playerState.isMuted || false;
  isRandomMode = playerState.isRandomMode || false;
  
  // 绑定音频事件
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', nextSong);
  audio.addEventListener('loadedmetadata', function() {
    console.log('Loaded metadata, duration:', audio.duration);
    updateProgress();
    // 加载完成后立即设置时间
    if (playerState.currentTime) {
      audio.currentTime = playerState.currentTime;
      console.log('Set current time:', playerState.currentTime);
    }
  });
  
  // 当音频可以播放时立即恢复播放
  audio.addEventListener('canplay', function() {
    console.log('Can play, attempting to resume:', playerState.isPlaying);
    // 恢复播放状态
    if (playerState.isPlaying && audio.paused) {
      audio.play().catch(error => {
        console.warn('Auto-play failed:', error);
      });
    }
  });
  
  // 当音频加载完成时立即恢复播放
  audio.addEventListener('canplaythrough', function() {
    console.log('Can play through, attempting to resume:', playerState.isPlaying);
    if (playerState.isPlaying && audio.paused) {
      audio.play().catch(error => {
        console.warn('Auto-play failed:', error);
      });
    }
  });
  
  // 播放时的处理
  audio.addEventListener('play', function() {
    console.log('Play event triggered');
    if (player) {
      player.classList.add('playing');
      // 不自动添加active，让用户通过按钮或悬停控制显示
    }
    if (toggleBtn) {
      // 不自动添加active，让用户通过按钮或悬停控制显示
    }
  });
  
  // 暂停时的处理
  audio.addEventListener('pause', function() {
    console.log('Pause event triggered');
    if (playBtn) {
      playBtn.classList.remove('playing');
    }
    if (player) {
      player.classList.remove('playing');
    }
  });
  
  // 加载当前歌曲
  loadSong(currentIndex);
  
  // 立即恢复播放器UI状态
  if (playerState.isPlaying) {
    console.log('Restoring UI state for playing');
    if (playBtn) {
      playBtn.classList.add('playing');
      playBtn.setAttribute('aria-label', '暂停');
    }
    if (player) {
      player.classList.add('playing');
      // 不自动添加active，让用户通过按钮或悬停控制显示
    }
    if (toggleBtn) {
      // 不自动添加active，让用户通过按钮或悬停控制显示
    }
    isPlayerVisible = false; // 默认隐藏
  } else {
    isPlayerVisible = false; // 默认隐藏
  }
  
  // 恢复随机模式状态
  if (isRandomMode) {
    if (randomBtn) {
      randomBtn.classList.add('active');
    }
  }
  
  // 生成播放列表
  generatePlaylist();
  
  // 绑定事件
  bindEvents();
  
  // 启动定期保存状态的定时器
  if (saveStateInterval) {
    clearInterval(saveStateInterval);
  }
  saveStateInterval = setInterval(savePlayerState, 500); // 每500毫秒保存一次状态
  console.log('Started save state interval');
}

// 页面加载完成后初始化
function initPlayer() {
  console.log('Init player called, document readyState:', document.readyState);
  
  // 获取播放器元素
  player = document.getElementById('global-music-player');
  toggleBtn = document.getElementById('music-player-toggle');
  playBtn = document.getElementById('player-play');
  prevBtn = document.getElementById('player-prev');
  nextBtn = document.getElementById('player-next');
  listBtn = document.getElementById('player-list-btn');
  randomBtn = document.getElementById('player-random-btn');
  playlistPanel = document.getElementById('player-playlist');
  playlistCloseBtn = document.getElementById('playlist-close-btn');
  playlistItems = document.getElementById('playlist-items');
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
    nextBtn: !!nextBtn,
    listBtn: !!listBtn,
    randomBtn: !!randomBtn,
    playlistPanel: !!playlistPanel,
    playlistCloseBtn: !!playlistCloseBtn,
    playlistItems: !!playlistItems,
    progressBar: !!progressBar,
    volumeBar: !!volumeBar
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

// 生成播放列表
function generatePlaylist() {
  if (!playlistItems || playlist.length === 0) return;
  
  // 清空现有列表
  playlistItems.innerHTML = '';
  
  // 生成新的列表项
  playlist.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
    listItem.dataset.index = index;
    
    listItem.innerHTML = `
      <div class="playlist-item-cover">
        <img src="${song.cover}" alt="${song.name} 封面" />
      </div>
      <div class="playlist-item-info">
        <h4 class="playlist-item-title">${song.name}</h4>
        <p class="playlist-item-artist">${song.artist}</p>
      </div>
      <div class="playlist-item-status">▶</div>
    `;
    
    // 添加点击事件
    listItem.addEventListener('click', function() {
      const selectedIndex = parseInt(this.dataset.index);
      if (selectedIndex !== currentIndex) {
        currentIndex = selectedIndex;
        loadSong(currentIndex);
        if (!audio.paused) {
          audio.play().catch(error => {
            console.warn('Play failed:', error);
          });
        }
        // 更新播放列表UI
        updatePlaylistUI();
        savePlayerState();
      }
    });
    
    playlistItems.appendChild(listItem);
  });
}

// 更新播放列表UI
function updatePlaylistUI() {
  if (!playlistItems) return;
  
  const items = playlistItems.querySelectorAll('.playlist-item');
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// 切换随机播放模式
function toggleRandomMode() {
  isRandomMode = !isRandomMode;
  
  if (randomBtn) {
    if (isRandomMode) {
      randomBtn.classList.add('active');
      randomBtn.setAttribute('aria-label', '关闭随机播放');
      randomBtn.setAttribute('title', '关闭随机播放');
    } else {
      randomBtn.classList.remove('active');
      randomBtn.setAttribute('aria-label', '随机播放');
      randomBtn.setAttribute('title', '随机播放');
    }
  }
  
  savePlayerState();
}

// 随机选择一首歌曲
function selectRandomSong() {
  if (playlist.length === 0) return;
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (randomIndex === currentIndex && playlist.length > 1);
  
  currentIndex = randomIndex;
  loadSong(currentIndex);
  if (!audio.paused) {
    audio.play().catch(error => {
      console.warn('Play failed:', error);
    });
  }
  // 更新播放列表UI
  updatePlaylistUI();
  savePlayerState();
}

// 切换播放列表面板
function togglePlaylist() {
  isPlaylistVisible = !isPlaylistVisible;
  
  if (playlistPanel) {
    if (isPlaylistVisible) {
      playlistPanel.classList.add('active');
    } else {
      playlistPanel.classList.remove('active');
    }
  }
}

// 关闭播放列表面板
function closePlaylist() {
  isPlaylistVisible = false;
  if (playlistPanel) {
    playlistPanel.classList.remove('active');
  }
}

// 重写nextSong函数，支持随机模式
function nextSong() {
  if (isRandomMode) {
    selectRandomSong();
  } else {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    if (!audio.paused) {
      audio.play().catch(error => {
        console.warn('Play failed:', error);
      });
    }
    // 更新播放列表UI
    updatePlaylistUI();
    savePlayerState();
  }
}

// 立即尝试初始化，不等待DOMContentLoaded
function tryInitPlayer() {
  console.log('Try init player called');
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPlayer();
  } else {
    // DOM还在加载中，监听DOMContentLoaded事件
    document.addEventListener('DOMContentLoaded', initPlayer);
    // 同时设置一个超时，确保即使DOMContentLoaded延迟也能初始化
    setTimeout(initPlayer, 100);
  }
}

// 立即尝试初始化播放器
tryInitPlayer();

// 添加缓存控制，确保资源不被缓存
if (typeof window !== 'undefined') {
  // 为播放器资源添加时间戳，避免缓存
  const timestamp = new Date().getTime();
  
  // 重新加载CSS文件，避免缓存
  const cssLink = document.querySelector('link[href="/blog/audio/css/music-player.css"]');
  if (cssLink) {
    cssLink.href = `/blog/audio/css/music-player.css?${timestamp}`;
  }
  
  // 重新加载配置文件，避免缓存
  const configUrl = `/blog/audio/js/music-config.json?${timestamp}`;
  
  // 覆盖默认的配置加载
  window.loadMusicConfig = function() {
    fetch(configUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded music config with timestamp:', data);
        // 修正路径，确保音频和封面文件路径正确
        playlist = data.playlist.map(song => {
          return {
            name: song.name,
            artist: song.artist,
            url: `/blog${song.url}?${timestamp}`,
            cover: `/blog${song.cover}?${timestamp}`
          };
        });
        console.log('Processed playlist with timestamp:', playlist);
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
            url: `/blog/audio/music/Stay With Me.mp3?${timestamp}`,
            cover: `/blog/audio/covers/stay-with-me.jpg?${timestamp}`
          },
          {
            name: "半点心",
            artist: "未知艺术家",
            url: `/blog/audio/music/半点心.mp3?${timestamp}`,
            cover: `/blog/audio/covers/ban-dian-xin.jpg?${timestamp}`
          },
          {
            name: "打上花火",
            artist: "未知艺术家",
            url: `/blog/audio/music/打上花火.mp3?${timestamp}`,
            cover: `/blog/audio/covers/da-shang-hua-huo.jpg?${timestamp}`
          },
          {
            name: "生生世世爱",
            artist: "未知艺术家",
            url: `/blog/audio/music/生生世世爱.mp3?${timestamp}`,
            cover: `/blog/audio/covers/sheng-sheng-shi-shi-ai.jpg?${timestamp}`
          },
          {
            name: "MY ALL",
            artist: "未知艺术家",
            url: `/blog/audio/music/MY ALL.mp3?${timestamp}`,
            cover: `/blog/audio/covers/my-all.jpg?${timestamp}`
          }
        ];
        console.log('Using default playlist with timestamp:', playlist);
        initializePlayer();
      });
  };
}

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
  console.log('Before unload, saving state');
  savePlayerState();
  if (saveStateInterval) {
    clearInterval(saveStateInterval);
  }
});

// 监听页面显示事件，尝试恢复播放
window.addEventListener('pageshow', function() {
  console.log('Page show event, attempting to restore playback');
  if (audio && playerState.isPlaying && audio.paused) {
    audio.play().catch(error => {
      console.warn('Resume play on pageshow failed:', error);
    });
  }
});

// 监听PJAX相关事件
if (typeof window !== 'undefined') {
  // 监听PJAX开始事件
  document.addEventListener('pjax:start', function() {
    console.log('PJAX start, saving player state');
    savePlayerState();
  });

  // 监听PJAX完成事件
  document.addEventListener('pjax:complete', function() {
    console.log('PJAX complete, reinitializing player UI');
    // 重新初始化播放器UI元素
    reinitPlayerUI();
    // 恢复播放状态
    if (audio && playerState.isPlaying && audio.paused) {
      audio.play().catch(error => {
        console.warn('Resume play on PJAX complete failed:', error);
      });
    }
  });
}

// 重新初始化播放器UI元素
function reinitPlayerUI() {
  console.log('Reinitializing player UI elements');
  
  // 重新获取播放器元素
  player = document.getElementById('global-music-player');
  toggleBtn = document.getElementById('music-player-toggle');
  playBtn = document.getElementById('player-play');
  prevBtn = document.getElementById('player-prev');
  nextBtn = document.getElementById('player-next');
  listBtn = document.getElementById('player-list-btn');
  randomBtn = document.getElementById('player-random-btn');
  playlistPanel = document.getElementById('player-playlist');
  playlistCloseBtn = document.getElementById('playlist-close-btn');
  playlistItems = document.getElementById('playlist-items');
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
  
  console.log('Reinitialized player elements:', {
    player: !!player,
    toggleBtn: !!toggleBtn,
    playBtn: !!playBtn,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    listBtn: !!listBtn,
    randomBtn: !!randomBtn,
    playlistPanel: !!playlistPanel,
    playlistCloseBtn: !!playlistCloseBtn,
    playlistItems: !!playlistItems,
    progressBar: !!progressBar,
    volumeBar: !!volumeBar
  });
  
  // 重新生成播放列表
  generatePlaylist();
  
  // 重新绑定事件
  bindEvents();
  
  // 更新播放器UI状态
  if (playerState.isPlaying) {
    if (playBtn) {
      playBtn.classList.add('playing');
      playBtn.setAttribute('aria-label', '暂停');
    }
    if (player) {
      player.classList.add('playing');
    }
  }
  
  // 更新随机模式状态
  if (randomBtn) {
    if (isRandomMode) {
      randomBtn.classList.add('active');
      randomBtn.setAttribute('aria-label', '关闭随机播放');
      randomBtn.setAttribute('title', '关闭随机播放');
    } else {
      randomBtn.classList.remove('active');
      randomBtn.setAttribute('aria-label', '随机播放');
      randomBtn.setAttribute('title', '随机播放');
    }
  }
  
  // 更新播放信息
  if (playerTitle && playerArtist && playerCover && playlist[currentIndex]) {
    var song = playlist[currentIndex];
    playerTitle.textContent = song.name;
    playerArtist.textContent = song.artist;
    playerCover.src = song.cover;
  }
}
