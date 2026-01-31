// 文章图片灯箱 Lightbox 功能
document.addEventListener('DOMContentLoaded', function() {
    try {
        const lightbox = document.getElementById('image-lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbLoader = document.querySelector('.lb-loader');
        const lbCounter = document.querySelector('.lb-counter');
        const lbClose = document.querySelector('.lb-close');
        const lbPrev = document.querySelector('.lb-prev');
        const lbNext = document.querySelector('.lb-next');
        
        // 检查必要元素是否存在
        if (!lightbox || !lbImg || !lbLoader || !lbCounter || !lbClose || !lbPrev || !lbNext) {
            throw new Error('灯箱必要元素不存在');
        }
        
        // 只获取文章内容区的图片
        const imgList = Array.from(document.querySelectorAll('.content img'));
        let currentIndex = 0;

        // 更新计数器
        function updateCounter() {
            try {
                if (imgList.length > 0) {
                    lbCounter.textContent = `${currentIndex + 1} / ${imgList.length}`;
                } else {
                    lbCounter.textContent = '0 / 0';
                }
            } catch (error) {
                console.warn('更新计数器失败:', error);
            }
        }

        // 打开灯箱
        function openLightbox(index) {
            try {
                if (!imgList[index]) {
                    console.warn('无效的图片索引:', index);
                    return;
                }
                
                currentIndex = index;
                
                // 显示加载动画
                lbLoader.classList.add('show');
                lbImg.classList.add('loading');
                
                // 预加载图片
                const img = new Image();
                img.onload = function() {
                    try {
                        lbImg.src = img.src;
                        lbImg.alt = imgList[index].alt || '图片预览';
                        lbLoader.classList.remove('show');
                        lbImg.classList.remove('loading');
                        updateCounter();
                    } catch (error) {
                        console.warn('图片加载完成处理失败:', error);
                        lbLoader.classList.remove('show');
                        lbImg.classList.remove('loading');
                    }
                };
                img.onerror = function() {
                    try {
                        lbLoader.classList.remove('show');
                        lbImg.classList.remove('loading');
                        lbImg.src = '';
                        lbImg.alt = '图片加载失败';
                    } catch (error) {
                        console.warn('图片加载失败处理失败:', error);
                    }
                };
                img.src = imgList[index].src;
                
                lightbox.classList.add('show');
                
                // 阻止页面滚动
                try {
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                } catch (error) {
                    console.warn('阻止页面滚动失败:', error);
                }
            } catch (error) {
                console.warn('打开灯箱失败:', error);
                try {
                    lbLoader.classList.remove('show');
                    lbImg.classList.remove('loading');
                } catch (e) {
                    // 忽略错误
                }
            }
        }

        // 关闭灯箱
        function closeLightbox() {
            try {
                lightbox.classList.remove('show');
                
                // 恢复页面滚动
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            } catch (error) {
                console.warn('关闭灯箱失败:', error);
            }
        }

        // 切换上一张/下一张
        function switchImg(direction) {
            try {
                if (imgList.length === 0) return;
                let newIndex = currentIndex + direction;
                if (newIndex < 0) newIndex = imgList.length - 1;
                if (newIndex >= imgList.length) newIndex = 0;
                openLightbox(newIndex);
            } catch (error) {
                console.warn('切换图片失败:', error);
            }
        }

        // 绑定文章图片点击
        try {
            // 使用事件委托，减少事件监听器数量
            const contentContainer = document.querySelector('.content');
            if (contentContainer) {
                contentContainer.addEventListener('click', (e) => {
                    if (e.target.tagName === 'IMG') {
                        const imgIndex = imgList.indexOf(e.target);
                        if (imgIndex !== -1) {
                            openLightbox(imgIndex);
                        }
                    }
                });
            } else {
                // 降级方案：如果没有content容器，使用原来的方法
                imgList.forEach((img, idx) => {
                    img.addEventListener('click', () => openLightbox(idx));
                });
            }
        } catch (error) {
            console.warn('绑定图片点击事件失败:', error);
        }

        // 关闭事件
        try {
            lbClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') switchImg(-1);
                if (e.key === 'ArrowRight') switchImg(1);
                if (e.key === 'PageUp') switchImg(-1);
                if (e.key === 'PageDown') switchImg(1);
            });
        } catch (error) {
            console.warn('绑定关闭事件失败:', error);
        }

        // 切换按钮
        try {
            lbPrev.addEventListener('click', () => switchImg(-1));
            lbNext.addEventListener('click', () => switchImg(1));
        } catch (error) {
            console.warn('绑定切换按钮事件失败:', error);
        }
        
        // 触摸支持
        try {
            let touchStartX = 0;
            let touchEndX = 0;
            
            lightbox.addEventListener('touchstart', (e) => {
                try {
                    touchStartX = e.changedTouches[0].screenX;
                } catch (error) {
                    console.warn('触摸开始事件处理失败:', error);
                }
            }, false);
            
            lightbox.addEventListener('touchend', (e) => {
                try {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                } catch (error) {
                    console.warn('触摸结束事件处理失败:', error);
                }
            }, false);
            
            function handleSwipe() {
                try {
                    const swipeThreshold = 50;
                    if (touchEndX < touchStartX - swipeThreshold) {
                        // 向左滑动
                        switchImg(1);
                    }
                    if (touchEndX > touchStartX + swipeThreshold) {
                        // 向右滑动
                        switchImg(-1);
                    }
                } catch (error) {
                    console.warn('滑动处理失败:', error);
                }
            }
        } catch (error) {
            console.warn('绑定触摸事件失败:', error);
        }
    } catch (error) {
        console.warn('灯箱初始化失败:', error);
        // 初始化失败时不影响其他功能
    }
});