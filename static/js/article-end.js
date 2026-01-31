// 文章结束分隔线初始化脚本
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 只在文章详情页添加分隔线
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
            // 检查是否已经存在分隔线
            const existingSeparator = document.querySelector('.article-end-separator');
            if (!existingSeparator) {
                const separator = document.createElement('div');
                separator.className = 'article-end-separator';
                separator.textContent = '本文结束';
                
                // 直接使用已缓存的articleContent
                articleContent.appendChild(separator);
            }
        }
    } catch (error) {
        console.warn('分隔线初始化失败:', error);
        // 初始化失败时不影响其他功能
    }
});