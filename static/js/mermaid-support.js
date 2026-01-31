// Mermaid 图表支持模块
document.addEventListener('DOMContentLoaded', function () {
    // 初始化函数
    function initMermaid() {
        try {
            const isDark = document.documentElement.classList.contains('dark');
            mermaid.initialize({
                startOnLoad: true,
                theme: isDark ? 'dark' : 'default',
                securityLevel: 'loose'
            });
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        } catch (error) {
            console.warn('Mermaid 初始化失败:', error);
        }
    }
    
    // 初始加载
    initMermaid();

    // 监听主题切换，重新渲染 Mermaid
    function handleThemeChange() {
        // 防抖处理，避免频繁切换导致的性能问题
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(initMermaid, 100);
        };
    }

    // 使用防抖处理的主题切换监听器
    const debouncedThemeChange = handleThemeChange();
    
    // 监听主题切换事件
    document.addEventListener('themeChanged', debouncedThemeChange);

    // 同时保留 MutationObserver 作为备份
    const observer = new MutationObserver(function(mutations) {
        // 检查是否是主题相关的变化
        for (let mutation of mutations) {
            if (mutation.attributeName === 'class') {
                debouncedThemeChange();
                break;
            }
        }
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});