/**
 * 音乐播放器脚本
 * 功能：
 * - 从JSON配置文件加载播放列表
 * - 支持播放/暂停、上一首/下一首
 * - 进度条拖拽功能
 * - 音量控制
 * - 响应式设计
 * - 暗黑模式支持
 */

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
  
  // 播放器显示状态
  var isPlayerVisible = false;

  // 歌曲列表
  var playlist = [];

  // 当前播放索引
  var currentIndex = 0;
  var isPlaying = false;
  var isMuted = false;
  var volume = 0.7;

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
      if (playlist.length > 0) {
        loadSong(currentIndex);
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
      loadSong(currentIndex);
    });

  // 创建音频对象
  var audio = new Audio();
  audio.volume = volume;

  // 加载歌曲
  function loadSong(index) {
    var song = playlist[index];
    if (!song) return;
    
    // 添加加载动画
    playerCover.parentElement.classList.add('loading');
    
    // 预加载封面图片
    var img = new Image();
    img.onload = function() {
      playerCover.src = song.cover;
      playerCover.parentElement.classList.remove('loading');
      
      // 添加歌曲信息更新动画
      playerTitle.parentElement.classList.add('updated');
      setTimeout(function() {
        playerTitle.parentElement.classList.remove('updated');
      }, 500);
    };
    img.onerror = function() {
      playerCover.parentElement.classList.remove('loading');
    };
    img.src = song.cover;
    
    audio.src = song.url;
    playerTitle.textContent = song.name;
    playerArtist.textContent = song.artist;
    playerCover.alt = song.name;
  }

  // 播放/暂停
  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      playBtn.classList.remove('playing');
      player.classList.remove('playing');
      playBtn.setAttribute('aria-label', '播放');
    } else {
      audio.play();
      playBtn.classList.add('playing');
      player.classList.add('playing');
      playBtn.setAttribute('aria-label', '暂停');
    }
    isPlaying = !isPlaying;
  }

  // 上一首
  function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
    if (isPlaying) audio.play();
  }

  // 下一首
  function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    if (isPlaying) audio.play();
  }

  // 更新进度条
  function updateProgress() {
    var duration = audio.duration || 0;
    var currentTime = audio.currentTime || 0;
    var progress = (currentTime / duration) * 100;
    
    progressFill.style.width = progress + '%';
    progressHandle.style.left = progress + '%';
    
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
  }

  // 格式化时间
  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  // 拖动进度条
  var isDragging = false;

  function seek(e) {
    var rect = progressBar.getBoundingClientRect();
    var pos = (e.clientX - rect.left) / rect.width;
    var duration = audio.duration || 0;
    audio.currentTime = pos * duration;
    updateProgress();
  }

  // 拖动音量条
  var isDraggingVolume = false;

  function adjustVolume(e) {
    var rect = volumeBar.getBoundingClientRect();
    var pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    volume = pos;
    audio.volume = volume;
    volumeFill.style.width = pos * 100 + '%';
    volumeHandle.style.left = pos * 100 + '%';
    
    if (pos === 0) {
      volumeBtn.classList.add('muted');
      isMuted = true;
    } else {
      volumeBtn.classList.remove('muted');
      isMuted = false;
    }
  }

  // 切换播放器显示/隐藏
  function togglePlayer() {
    isPlayerVisible = !isPlayerVisible;
    
    if (isPlayerVisible) {
      player.classList.add('active');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-label', '关闭音乐播放器');
      toggleBtn.setAttribute('title', '关闭音乐播放器');
    } else {
      player.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-label', '音乐播放器');
      toggleBtn.setAttribute('title', '音乐播放器');
    }
  }

  // 事件监听
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);

  // 音频事件
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', nextSong);
  audio.addEventListener('loadedmetadata', updateProgress);

  // 进度条事件
  progressBar.addEventListener('click', seek);
  progressHandle.addEventListener('mousedown', function() {
    isDragging = true;
  });
  
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
  volumeBtn.addEventListener('click', function() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    volumeBtn.classList.toggle('muted', isMuted);
  });

  volumeBar.addEventListener('click', adjustVolume);
  volumeHandle.addEventListener('mousedown', function() {
    isDraggingVolume = true;
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDraggingVolume) {
      adjustVolume(e);
    }
  });

  // 播放时保持显示
  audio.addEventListener('play', function() {
    player.classList.add('playing');
    player.classList.add('active');
    toggleBtn.classList.add('active');
    isPlayerVisible = true;
  });

  audio.addEventListener('pause', function() {
    // 暂停时保持当前显示状态
  });

  // 按钮点击事件
  toggleBtn.addEventListener('click', togglePlayer);
});
