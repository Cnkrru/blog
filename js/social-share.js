// 社交分享功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 创建社交分享容器
    function createSocialShare() {
        // 只在文章页面添加分享功能
        if (document.querySelector('.article-content')) {
            const articleContent = document.querySelector('.article-content');
            const articleEnd = document.querySelector('.article-end-separator');
            
            if (articleContent && articleEnd) {
                // 检查是否已经存在分享容器
                if (!document.querySelector('.social-share')) {
                    const shareContainer = document.createElement('div');
                    shareContainer.className = 'social-share';
                    shareContainer.innerHTML = `
                        <h4 class="social-share__title">分享本文</h4>
                        <div class="social-share__buttons">
                            <a href="#" class="social-share__button social-share__button--wechat" data-platform="wechat" title="分享到微信">
                                <i class="fab fa-weixin"></i>
                                <span>微信</span>
                            </a>
                            <a href="#" class="social-share__button social-share__button--qq" data-platform="qq" title="分享到QQ">
                                <i class="fab fa-qq"></i>
                                <span>QQ</span>
                            </a>
                            <button class="social-share__button social-share__button--copy" data-action="copy" title="复制链接">
                                <i class="fas fa-link"></i>
                                <span>复制链接</span>
                            </button>
                            <!-- 其他分享平台已注释掉 -->
                            <!-- <a href="#" class="social-share__button social-share__button--weibo" data-platform="weibo" title="分享到微博">
                                <i class="fab fa-weibo"></i>
                                <span>微博</span>
                            </a>
                            <a href="#" class="social-share__button social-share__button--twitter" data-platform="twitter" title="分享到Twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="#" class="social-share__button social-share__button--facebook" data-platform="facebook" title="分享到Facebook">
                                <i class="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </a>
                            <a href="#" class="social-share__button social-share__button--linkedin" data-platform="linkedin" title="分享到LinkedIn">
                                <i class="fab fa-linkedin-in"></i>
                                <span>LinkedIn</span>
                            </a> -->
                        </div>
                    `;
                    
                    // 插入到文章结束分隔线之前
                    articleContent.insertBefore(shareContainer, articleEnd);
                    
                    // 绑定分享事件
                    bindShareEvents();
                }
            }
        }
    }
    
    // 绑定分享事件
    function bindShareEvents() {
        const buttons = document.querySelectorAll('.social-share__button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.dataset.platform;
                const action = this.dataset.action;
                
                if (action === 'copy') {
                    copyLink();
                } else if (platform) {
                    shareToPlatform(platform);
                }
            });
        });
    }
    
    // 复制链接
    function copyLink() {
        const url = window.location.href;
        
        navigator.clipboard.writeText(url)
            .then(() => {
                showToast('链接复制成功！');
            })
            .catch(err => {
                console.error('复制失败:', err);
                showToast('复制失败，请手动复制链接');
            });
    }
    
    // 分享到指定平台
    function shareToPlatform(platform) {
        const title = document.querySelector('h1.article-title')?.textContent || document.title;
        const url = window.location.href;
        const text = document.querySelector('meta[name="description"]')?.content || '';
        
        let shareUrl = '';
        
        switch (platform) {
            case 'wechat':
                // 微信需要生成二维码，这里简化处理
                showToast('请使用微信扫码分享');
                return;
            case 'weibo':
                shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(text)}`;
                break;
            case 'qq':
                shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    // 显示提示信息
    function showToast(message) {
        // 检查是否已经存在提示
        let toast = document.querySelector('.social-share__toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'social-share__toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 0.8rem 1.2rem;
                border-radius: var(--border-radius-md);
                font-size: 0.9rem;
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: var(--shadow-heavy);
            `;
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.transform = 'translateX(0)';
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
        }, 3000);
    }
    
    // 初始化社交分享
    createSocialShare();
});