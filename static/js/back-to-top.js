// 回到顶部按钮功能
window.addEventListener('load', function() {
    try {
        console.log('开始初始化回到顶部按钮');
        const backToTop = document.getElementById('back-to-top');
        
        if (!backToTop) {
            throw new Error('回到顶部按钮未找到');
        }
        
        console.log('找到回到顶部按钮:', backToTop);

        // 滚动显示/隐藏
        function handleScroll() {
            try {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            } catch (error) {
                console.warn('滚动事件处理失败:', error);
            }
        }

        // 使用防抖函数优化滚动事件
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

        window.addEventListener('scroll', debounce(handleScroll, 16));  

        // 点击平滑回到顶部
        backToTop.addEventListener('click', function() {
            try {
                // 检查浏览器是否支持平滑滚动
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // 降级方案：使用传统滚动
                    window.scrollTo(0, 0);
                }
            } catch (error) {
                console.warn('回到顶部失败:', error);
                // 降级方案
                window.scrollTo(0, 0);
            }
        });
    } catch (error) {
        console.warn('回到顶部按钮初始化失败:', error);
        // 初始化失败时不影响其他功能
    }
});