// 文章底部版权声明栏功能
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 缓存DOM元素，减少重复查询
        const articleContent = document.querySelector('.article-content');
        const articleEndSeparator = document.querySelector('.article-end-separator');
        
        if (articleContent && articleEndSeparator) {
            // 检查是否已经存在版权声明
            const existingCopyright = document.querySelector('.article-copyright');
            if (!existingCopyright) {
                // 获取文章标题和链接
                const articleTitleElement = document.querySelector('h1.article-title');
                const articleTitle = articleTitleElement ? articleTitleElement.innerText.trim() : '本文';
                const articleUrl = window.location.href;
                
                // 验证内容
                const sanitizedTitle = articleTitle || '本文';
                const sanitizedUrl = articleUrl || window.location.href;
                
                // 构建版权声明HTML
                const copyrightDiv = document.createElement('div');
                copyrightDiv.className = 'article-copyright';
                copyrightDiv.innerHTML = `
                    <div class="article-copyright__title">版权声明</div>
                    <p>本文为原创内容，著作权归作者所有。</p>
                    <p>标题：<strong>${sanitizedTitle}</strong></p>
                    <p>原文链接：<a href="${sanitizedUrl}" target="_blank" rel="noopener">${sanitizedUrl}</a></p>
                    <p>转载说明：如需转载，请注明原文链接及作者，禁止商用、禁止篡改内容。</p>
                `;
                
                // 插入到「本文结束」分隔线下方
                articleContent.insertBefore(copyrightDiv, articleEndSeparator.nextSibling);
            }
        }
    } catch (error) {
        console.warn('版权声明初始化失败:', error);
        // 初始化失败时，不影响其他功能
    }
});