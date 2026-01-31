// 增强版评论系统脚本
(document.addEventListener('DOMContentLoaded', function() {
    // 评论系统元素
    const commentsContainer = document.getElementById('comments-container');
    const commentsLoading = document.querySelector('.comments-loading');
    const commentsError = document.querySelector('.comments-error');
    const commentsRetry = document.querySelector('.comments-retry');
    
    if (!commentsContainer) return;
    
    // 初始化评论系统
    initCommentsSystem();
    
    // 初始化评论系统
    function initCommentsSystem() {
        // 监听评论系统加载完成
        setupCommentsLoadingListener();
        
        // 绑定重试按钮事件
        if (commentsRetry) {
            commentsRetry.addEventListener('click', retryLoadingComments);
        }
        
        // 处理暗黑模式切换
        setupDarkModeHandler();
        
        // 初始化评论计数
        setupCommentCount();
        
        // 初始化评论排序
        setupCommentSorting();
    }
    
    // 设置评论加载监听器
    function setupCommentsLoadingListener() {
        // 监听iframe加载完成（适用于Giscus、Utterances等）
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'IFRAME') {
                        handleIframeLoad(node);
                    }
                });
            });
        });
        
        observer.observe(commentsContainer, { childList: true, subtree: true });
        
        // 通用加载完成检测
        setTimeout(function() {
            if (commentsContainer.children.length > 0) {
                hideLoading();
            } else {
                showError();
            }
        }, 5000); // 5秒后如果还没加载完成，显示错误
    }
    
    // 处理iframe加载
    function handleIframeLoad(iframe) {
        iframe.onload = function() {
            hideLoading();
        };
        
        // 处理iframe加载错误
        iframe.onerror = function() {
            showError();
        };
    }
    
    // 隐藏加载动画
    function hideLoading() {
        if (commentsLoading) {
            commentsLoading.classList.add('hidden');
            setTimeout(function() {
                commentsLoading.style.display = 'none';
            }, 300);
        }
    }
    
    // 显示错误提示
    function showError() {
        if (commentsLoading) {
            commentsLoading.style.display = 'none';
        }
        
        if (commentsError) {
            commentsError.style.display = 'flex';
        }
    }
    
    // 重试加载评论
    function retryLoadingComments() {
        if (commentsError) {
            commentsError.style.display = 'none';
        }
        
        if (commentsLoading) {
            commentsLoading.style.display = 'flex';
            commentsLoading.classList.remove('hidden');
        }
        
        // 重新加载评论系统
        const provider = getCommentsProvider();
        if (provider) {
            reloadCommentsProvider(provider);
        }
    }
    
    // 获取评论系统提供商
    function getCommentsProvider() {
        // 从URL或配置中获取评论系统提供商
        // 这里可以根据实际情况调整
        return document.querySelector('.comments-provider')?.textContent.replace(/[()]/g, '') || '';
    }
    
    // 重新加载评论系统
    function reloadCommentsProvider(provider) {
        // 根据不同的评论系统执行不同的重载逻辑
        switch (provider.toLowerCase()) {
            case 'giscus':
                reloadGiscus();
                break;
            case 'utterances':
                reloadUtterances();
                break;
            case 'disqus':
                reloadDisqus();
                break;
            default:
                // 通用重载逻辑
                setTimeout(hideLoading, 1000);
                break;
        }
    }
    
    // 重新加载Giscus
    function reloadGiscus() {
        const giscus = document.querySelector('iframe.giscus-frame');
        if (giscus) {
            giscus.src = giscus.src;
        }
    }
    
    // 重新加载Utterances
    function reloadUtterances() {
        const utterances = document.querySelector('iframe.utterances-frame');
        if (utterances) {
            utterances.src = utterances.src;
        }
    }
    
    // 重新加载Disqus
    function reloadDisqus() {
        if (window.DISQUS) {
            window.DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.identifier = document.location.href;
                    this.page.url = document.location.href;
                }
            });
        }
    }
    
    // 设置暗黑模式处理器
    function setupDarkModeHandler() {
        // 监听主题变化
        window.addEventListener('onColorSchemeChange', handleColorSchemeChange);
        
        // 初始检查
        handleColorSchemeChange();
    }
    
    // 处理颜色方案变化
    function handleColorSchemeChange() {
        const isDark = document.documentElement.dataset.scheme === 'dark';
        
        // 处理Giscus主题
        handleGiscusTheme(isDark);
        
        // 处理Utterances主题
        handleUtterancesTheme(isDark);
        
        // 处理其他评论系统主题
        handleOtherCommentsTheme(isDark);
    }
    
    // 处理Giscus主题
    function handleGiscusTheme(isDark) {
        const giscus = document.querySelector('iframe.giscus-frame');
        if (giscus) {
            giscus.contentWindow.postMessage(
                {
                    giscus: {
                        setConfig: {
                            theme: isDark ? 'dark_dimmed' : 'light'
                        }
                    }
                },
                'https://giscus.app'
            );
        }
    }
    
    // 处理Utterances主题
    function handleUtterancesTheme(isDark) {
        const utterances = document.querySelector('iframe.utterances-frame');
        if (utterances) {
            const theme = isDark ? 'github-dark' : 'github-light';
            utterances.contentWindow.postMessage(
                { type: 'set-theme', theme: theme },
                'https://utteranc.es'
            );
        }
    }
    
    // 处理其他评论系统主题
    function handleOtherCommentsTheme(isDark) {
        // 这里可以添加其他评论系统的主题处理逻辑
    }
    
    // 评论计数功能
    function setupCommentCount() {
        const commentsCountNumber = document.getElementById('comments-count-number');
        if (!commentsCountNumber) return;
        
        // 初始显示0条评论
        commentsCountNumber.textContent = '0';
        
        // 监听评论系统事件（如果支持）
        setupCommentCountListener();
        
        // 检查是否有真实的评论系统加载
        checkRealComments();
    }
    
    // 检查是否有真实的评论
    function checkRealComments() {
        setTimeout(function() {
            const commentsContainer = document.getElementById('comments-container');
            if (commentsContainer) {
                // 检查是否有评论内容
                const hasComments = checkCommentsExistence();
                if (hasComments) {
                    // 如果有评论，显示真实计数
                    updateRealCommentCount();
                }
            }
        }, 2000);
    }
    
    // 检查评论是否存在
    function checkCommentsExistence() {
        // 检查是否有评论相关的元素
        const commentElements = document.querySelectorAll('[class*="comment"], [id*="comment"]');
        return commentElements.length > 0;
    }
    
    // 更新真实评论计数
    function updateRealCommentCount() {
        const commentsCountNumber = document.getElementById('comments-count-number');
        if (!commentsCountNumber) return;
        
        // 这里可以添加真实评论计数的获取逻辑
        // 例如从评论系统的API获取
        // 暂时显示1条评论作为示例
        commentsCountNumber.textContent = '1';
    }
    
    // 设置评论计数监听器
    function setupCommentCountListener() {
        // 这里可以添加评论系统的事件监听器
        // 例如监听评论提交、删除等事件来更新计数
    }
    
    // 评论排序功能
    function setupCommentSorting() {
        const sortSelect = document.getElementById('comments-sort-select');
        if (!sortSelect) return;
        
        // 绑定排序事件
        sortSelect.addEventListener('change', function(e) {
            const sortBy = e.target.value;
            handleCommentSorting(sortBy);
        });
    }
    
    // 处理评论排序
    function handleCommentSorting(sortBy) {
        console.log('Sort comments by:', sortBy);
        
        // 根据不同的评论系统执行不同的排序逻辑
        const provider = getCommentsProvider();
        switch (provider.toLowerCase()) {
            case 'giscus':
                sortGiscusComments(sortBy);
                break;
            case 'utterances':
                sortUtterancesComments(sortBy);
                break;
            case 'disqus':
                sortDisqusComments(sortBy);
                break;
            default:
                // 其他评论系统的排序逻辑
                break;
        }
    }
    
    // 排序Giscus评论
    function sortGiscusComments(sortBy) {
        const giscus = document.querySelector('iframe.giscus-frame');
        if (giscus) {
            // Giscus支持通过API排序
            // 这里可以添加排序逻辑
        }
    }
    
    // 排序Utterances评论
    function sortUtterancesComments(sortBy) {
        const utterances = document.querySelector('iframe.utterances-frame');
        if (utterances) {
            // Utterances支持通过API排序
            // 这里可以添加排序逻辑
        }
    }
    
    // 排序Disqus评论
    function sortDisqusComments(sortBy) {
        if (window.DISQUS) {
            // Disqus支持通过API排序
            // 这里可以添加排序逻辑
        }
    }
    
    // 错误处理
    function handleCommentsError(error) {
        console.error('Comments loading error:', error);
        showError();
    }
    
    // 全局错误处理
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'SCRIPT' && e.target.src.includes('comments')) {
            handleCommentsError(e);
        }
    });
    
    // 全局未捕获异常处理
    window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.message && e.reason.message.includes('comments')) {
            handleCommentsError(e.reason);
        }
    });
}));

// 评论系统主题切换辅助函数
function setCommentsTheme(theme) {
    // 触发颜色方案变化事件
    window.dispatchEvent(new Event('onColorSchemeChange'));
}

// 评论系统重载辅助函数
function reloadComments() {
    const commentsRetry = document.querySelector('.comments-retry');
    if (commentsRetry) {
        commentsRetry.click();
    }
}