// 主题切换功能
console.log('=== 主题切换脚本加载 ===');

// 等待所有脚本执行完成后再执行
setTimeout(function() {
  console.log('=== 延迟执行主题初始化 ===');
  
  // 获取根元素
  const root = document.documentElement;
  
  // 初始化主题为亮色模式
  function initTheme() {
    console.log('=== 初始化主题 ===');
    root.dataset.scheme = 'light';
    console.log('初始化为亮色模式');
    console.log('data-scheme:', root.dataset.scheme);
  }
  
  // 切换主题的函数
  function toggleTheme() {
    console.log('=== 主题切换函数被调用 ===');
    
    // 切换data-scheme属性
    if (root.dataset.scheme === 'dark') {
      // 切换到亮色模式
      root.dataset.scheme = 'light';
      console.log('切换到亮色模式');
    } else {
      // 切换到暗黑模式
      root.dataset.scheme = 'dark';
      console.log('切换到暗黑模式');
    }
    
    console.log('切换后data-scheme:', root.dataset.scheme);
    
    // 强制重新渲染
    setTimeout(function() {
      console.log('强制重新渲染');
      root.style.display = 'none';
      root.offsetHeight;
      root.style.display = '';
      console.log('主题切换完成');
    }, 50);
  }
  
  // 初始化主题
  initTheme();
  
  // 绑定事件
  const btn = document.getElementById('theme-toggle-button');
  if (btn) {
    console.log('找到主题切换按钮，绑定点击事件');
    // 使用click事件监听器，确保能够捕获到点击事件
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      toggleTheme();
    });
    console.log('事件监听器已绑定');
  } else {
    console.log('未找到主题切换按钮');
  }
  
  // 暴露toggleTheme函数到全局
  window.toggleTheme = toggleTheme;
  
  console.log('=== 主题切换脚本初始化完成 ===');
}, 1000); // 延迟1秒执行，确保Hugo主题的默认脚本已经执行完毕
