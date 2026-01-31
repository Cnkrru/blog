/**
 * PJAX 实现 - 页面切换不刷新技术
 * 用于实现音乐播放器在页面切换时不中断
 */

class PJAX {
  constructor() {
    this.container = '.main';
    this.selectors = 'a[href^="/"]:not([href^="//"]):not([target="_blank"]):not([data-no-pjax])';
    this.isLoading = false;
    this.cache = new Map(); // 添加缓存
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateState();
  }

  bindEvents() {
    // 绑定链接点击事件
    document.addEventListener('click', (e) => {
      const link = e.target.closest(this.selectors);
      if (link && !this.isLoading) {
        e.preventDefault();
        this.loadPage(link.href);
      }
    });

    // 绑定浏览器历史事件
    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.loadPage(location.href, false);
      }
    });
  }

  loadPage(url, pushState = true) {
    this.isLoading = true;
    this.showLoading();

    // 检查缓存
    if (this.cache.has(url)) {
      console.log('PJAX: Loading from cache:', url);
      const html = this.cache.get(url);
      this.updateContent(html);
      if (pushState) {
        history.pushState({ url }, '', url);
      }
      this.updateState();
      this.triggerEvents();
      this.hideLoading();
      this.isLoading = false;
      return;
    }

    fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/html, application/xhtml+xml, application/xml'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        // 缓存页面内容
        this.cache.set(url, html);
        // 限制缓存大小
        if (this.cache.size > 20) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
        }
        
        this.updateContent(html);
        if (pushState) {
          history.pushState({ url }, '', url);
        }
        this.updateState();
        this.triggerEvents();
        
        // 预加载可能的下一页
        this.preloadPages();
      })
      .catch(error => {
        console.error('PJAX error:', error);
        // 错误时直接跳转
        window.location.href = url;
      })
      .finally(() => {
        this.hideLoading();
        this.isLoading = false;
      });
  }
  
  // 预加载页面
  preloadPages() {
    console.log('PJAX: Preloading pages');
    const links = document.querySelectorAll(this.selectors);
    const currentUrl = window.location.pathname;
    
    // 只预加载前3个链接
    const linksToPreload = Array.from(links)
      .filter(link => link.getAttribute('href') !== currentUrl)
      .slice(0, 3);
    
    linksToPreload.forEach(link => {
      const url = link.href;
      if (!this.cache.has(url)) {
        console.log('PJAX: Preloading:', url);
        fetch(url, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'text/html, application/xhtml+xml, application/xml'
          }
        })
        .then(response => response.text())
        .then(html => {
          this.cache.set(url, html);
        })
        .catch(error => {
          console.warn('PJAX: Preload failed:', error);
        });
      }
    });
  }

  updateContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newContent = doc.querySelector(this.container);
    
    if (newContent) {
      const container = document.querySelector(this.container);
      container.innerHTML = newContent.innerHTML;
      
      // 更新页面标题
      const newTitle = doc.querySelector('title');
      if (newTitle) {
        document.title = newTitle.textContent;
      }
    }
  }

  updateState() {
    // 更新活动链接状态
    document.querySelectorAll('a').forEach(link => {
      if (link.href === location.href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  showLoading() {
    // 添加加载指示器
    const loader = document.createElement('div');
    loader.className = 'pjax-loader';
    loader.innerHTML = '<div class="loader"><div class="loader-spinner"></div><div class="loader-text">加载中...</div></div>';
    document.body.appendChild(loader);
    
    // 添加淡入动画
    setTimeout(() => {
      loader.style.opacity = '1';
    }, 10);
  }

  hideLoading() {
    // 移除加载指示器
    const loader = document.querySelector('.pjax-loader');
    if (loader) {
      // 添加淡出动画
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 300);
    }
  }
  
  // 添加页面过渡动画
  addPageTransition() {
    console.log('PJAX: Adding page transition');
    const container = document.querySelector(this.container);
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  triggerEvents() {
    // 触发页面加载完成事件
    const event = new CustomEvent('pjax:complete', {
      detail: {
        url: location.href
      }
    });
    document.dispatchEvent(event);

    // 添加页面过渡动画
    this.addPageTransition();

    // 重新初始化页面脚本
    this.reinitScripts();
  }

  reinitScripts() {
    // 重新初始化需要的脚本
    console.log('PJAX: Reinitializing scripts');
    
    // 重新初始化代码高亮
    if (typeof hljs !== 'undefined') {
      console.log('PJAX: Reinitializing highlight.js');
      hljs.highlightAll();
    }
    
    // 重新初始化图片懒加载
    if (typeof initLazyLoad === 'function') {
      console.log('PJAX: Reinitializing lazy load');
      initLazyLoad();
    }
    
    // 重新初始化评论系统
    if (typeof initComments === 'function') {
      console.log('PJAX: Reinitializing comments');
      initComments();
    }
    
    // 重新初始化阅读进度条
    if (typeof initReadingProgress === 'function') {
      console.log('PJAX: Reinitializing reading progress');
      initReadingProgress();
    }
    
    // 重新初始化图片画廊
    if (typeof initGallery === 'function') {
      console.log('PJAX: Reinitializing gallery');
      initGallery();
    }
    
    // 重新初始化社交分享
    if (typeof initSocialShare === 'function') {
      console.log('PJAX: Reinitializing social share');
      initSocialShare();
    }
    
    // 重新初始化文章版权信息
    if (typeof initArticleCopyright === 'function') {
      console.log('PJAX: Reinitializing article copyright');
      initArticleCopyright();
    }
    
    // 重新初始化代码复制功能
    if (typeof initCodeCopy === 'function') {
      console.log('PJAX: Reinitializing code copy');
      initCodeCopy();
    }
    
    // 重新初始化文章结束标记
    if (typeof initArticleEnd === 'function') {
      console.log('PJAX: Reinitializing article end');
      initArticleEnd();
    }
    
    // 重新初始化菜单高亮状态
    this.updateMenuActiveState();
  }
  
  // 更新菜单活动状态
  updateMenuActiveState() {
    console.log('PJAX: Updating menu active state');
    const currentUrl = window.location.pathname;
    document.querySelectorAll('.menu-link').forEach(link => {
      const linkUrl = link.getAttribute('href');
      if (linkUrl === currentUrl) {
        link.classList.add('current');
      } else {
        link.classList.remove('current');
      }
    });
  }
}

// 初始化PJAX
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.pjax = new PJAX();
    console.log('PJAX initialized');
  });
}

// 添加PJAX加载样式
const style = document.createElement('style');
style.textContent = `
/* PJAX加载指示器 */
.pjax-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.dark .pjax-loader {
  background: rgba(30, 30, 30, 0.9);
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.loader-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #4a6fa5;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(74, 111, 165, 0.3);
}

.dark .loader-spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid #6c8ebf;
  box-shadow: 0 0 20px rgba(108, 142, 191, 0.3);
}

.loader-text {
  font-size: 16px;
  color: #4a6fa5;
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;
}

.dark .loader-text {
  color: #6c8ebf;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* PJAX链接样式 */
[data-pjax] {
  cursor: pointer;
  transition: all 0.2s ease;
}

[data-pjax]:hover {
  text-decoration: underline;
}

/* 页面过渡动画 */
.main {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
`;
document.head.appendChild(style);