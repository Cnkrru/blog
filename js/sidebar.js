// 侧边栏功能脚本

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 侧边栏激活状态处理
function updateSidebarActiveState() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        // 获取链接的完整路径
        const href = link.getAttribute('href');
        const menuPath = href.startsWith('/') ? href : window.location.origin + href;
        const menuPathname = new URL(menuPath, window.location.origin).pathname;
        
        // 精确匹配路径
        const isActive = currentPath === menuPathname || 
                       (currentPath.startsWith(menuPathname) && menuPathname !== '/') ||
                       (menuPathname.startsWith(currentPath) && currentPath !== '/');
        
        if (isActive) {
            link.classList.add('current');
            link.parentElement.classList.add('current');
        } else {
            link.classList.remove('current');
            link.parentElement.classList.remove('current');
        }
    });
}

// 初始化侧边栏状态
function initSidebar() {
    // 初始更新激活状态
    updateSidebarActiveState();
    
    // 监听页面加载和哈希变化
    window.addEventListener('load', debounce(updateSidebarActiveState, 100));
    window.addEventListener('hashchange', debounce(updateSidebarActiveState, 100));
    
    // 监听PJAX事件（如果使用PJAX）
    if (window.pjax) {
        document.addEventListener('pjax:complete', debounce(updateSidebarActiveState, 100));
    }
    
    // 监听鼠标移动事件，解决栏目之间抖动问题
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.addEventListener('mousemove', debounce(function(e) {
            // 当鼠标在侧边栏内移动时，不触发状态更新
            // 只有当鼠标离开侧边栏或点击时才更新
        }, 50));
    }
    
    // 监听点击事件
    document.addEventListener('click', debounce(updateSidebarActiveState, 100));
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}