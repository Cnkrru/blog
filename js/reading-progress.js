/**
 * 阅读进度条功能
 * 在页面顶部显示阅读进度条，随着用户滚动页面，进度条会相应更新
 */

document.addEventListener('DOMContentLoaded', function() {
  // 创建进度条元素
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  progressBar.id = 'reading-progress-bar';
  
  // 将进度条添加到页面顶部
  document.body.insertBefore(progressBar, document.body.firstChild);
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    // 计算滚动进度
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    
    // 更新进度条宽度
    progressBar.style.width = progress + '%';
  });
});
