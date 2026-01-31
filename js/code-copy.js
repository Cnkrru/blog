// 代码块复制功能
(document.addEventListener('DOMContentLoaded', function() {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        try {
            const pre = block.parentElement;
            
            // 检查是否已经存在复制按钮
            if (pre.querySelector('.copy-code-button')) {
                return;
            }
            
            // 创建复制按钮
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.textContent = '复制';
            button.title = '复制代码到剪贴板';
            
            // 添加按钮到代码块
            pre.appendChild(button);
            
            // 绑定点击事件
            button.addEventListener('click', function() {
                const code = block.textContent;
                
                // 复制到剪贴板
                navigator.clipboard.writeText(code)
                    .then(() => {
                        // 显示复制成功反馈
                        button.textContent = '已复制!';
                        button.style.backgroundColor = 'var(--accent-color)';
                        button.style.color = '#fff';
                        
                        // 2秒后恢复原状
                        setTimeout(() => {
                            button.textContent = '复制';
                            button.style.backgroundColor = '';
                            button.style.color = '';
                        }, 2000);
                    })
                    .catch(err => {
                        // 复制失败处理
                        console.warn('复制失败:', err);
                        button.textContent = '复制失败';
                        button.style.backgroundColor = '#ff4d4f';
                        button.style.color = '#fff';
                        
                        // 2秒后恢复原状
                        setTimeout(() => {
                            button.textContent = '复制';
                            button.style.backgroundColor = '';
                            button.style.color = '';
                        }, 2000);
                    });
            });
        } catch (error) {
            console.warn('添加复制按钮失败:', error);
        }
    });
}));
