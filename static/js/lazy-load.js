// 图片懒加载实现
document.addEventListener('DOMContentLoaded', function() {
    // 检查浏览器是否支持 Intersection Observer
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // 替换 src 属性
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    // 替换 srcset 属性（如果有）
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    // 添加加载完成类
                    img.classList.add('loaded');
                    // 停止观察
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // 提前 200px 开始加载
            threshold: 0.01
        });
        
        // 观察所有带有 lazy 类的图片
        document.querySelectorAll('img.lazy').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // 降级方案：直接加载所有图片
        document.querySelectorAll('img.lazy').forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
        });
    }
    
    // 为现有图片添加懒加载属性
    document.querySelectorAll('.content img:not([loading])').forEach(img => {
        if (!img.classList.contains('lazy')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});