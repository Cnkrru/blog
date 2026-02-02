---
title: 工具
layout: "page"
menu:
    main:
        params:
            icon: tools

comments: false
---

<div style="text-align: center; margin-bottom: 50px;">
    <h2 style="color: #FFB7C5; font-size: 28px; margin-bottom: 15px; font-weight: 700;">实用工具</h2>
    <p style="color: #AAB2C0; font-size: 16px; margin: 0;">为你提供各种实用的在线工具</p>
</div>

<div class="tools-grid">
    <div class="tool-card" onclick="window.location.href='/blog/page/text-tool/'">
        <div class="tool-icon">📝</div>
        <h3>文本处理工具</h3>
        <p>提供文本格式化、大小写转换、字符统计等功能</p>
        <div class="tool-features">
            <span>大小写转换</span>
            <span>字符统计</span>
            <span>格式化</span>
        </div>
    </div>
    <div class="tool-card" onclick="window.location.href='/blog/page/color-tool/'">
        <div class="tool-icon">🎨</div>
        <h3>颜色工具</h3>
        <p>颜色代码转换、调色板生成等功能</p>
        <div class="tool-features">
            <span>格式转换</span>
            <span>颜色预览</span>
            <span>调色板</span>
        </div>
    </div>
    <div class="tool-card" onclick="window.location.href='/blog/page/base-converter/'">
        <div class="tool-icon">🔢</div>
        <h3>进制转换器</h3>
        <p>支持2-36进制之间的数值转换</p>
        <div class="tool-features">
            <span>多进制支持</span>
            <span>实时转换</span>
            <span>对照表</span>
        </div>
    </div>
</div>

<style>
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.tool-card {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.tool-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 183, 197, 0.05), rgba(170, 210, 230, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.tool-card:hover::before {
    opacity: 1;
}

.tool-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 183, 197, 0.2);
    border-color: rgba(255, 183, 197, 0.3);
}

.tool-icon {
    font-size: 36px;
    margin-bottom: 15px;
    display: block;
}

.tool-card h3 {
    color: #FFB7C5;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 600;
}

.tool-card p {
    color: #718096;
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 15px;
}

.tool-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

.tool-features span {
    background: rgba(255, 183, 197, 0.2);
    color: #4a5568;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
}

/* 暗黑模式适配 */
.dark .tool-card {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
    border-color: rgba(255, 255, 255, 0.1);
}

.dark .tool-card::before {
    background: linear-gradient(135deg, rgba(255, 183, 197, 0.1), rgba(170, 210, 230, 0.1));
}

.dark .tool-card h3 {
    color: #FFB7C5;
}

.dark .tool-card p {
    color: #a0aec0;
}

.dark .tool-features span {
    background: rgba(255, 183, 197, 0.1);
    color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .tools-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 0 16px;
    }
    
    .tool-card {
        padding: 25px;
    }
    
    .tool-icon {
        font-size: 40px;
        margin-bottom: 15px;
    }
    
    .tool-card h3 {
        font-size: 20px;
        margin-bottom: 12px;
    }
    
    .tool-card p {
        font-size: 13px;
        margin-bottom: 15px;
    }
}

@media (max-width: 480px) {
    .tool-card {
        padding: 20px;
    }
    
    .tool-icon {
        font-size: 36px;
    }
    
    .tool-card h3 {
        font-size: 18px;
    }
}

/* 点击效果 */
.tool-card:active {
    transform: translateY(-5px);
}

/* 加载动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tool-card {
    animation: fadeInUp 0.6s ease-out;
}

.tool-card:nth-child(1) { animation-delay: 0.1s; }
.tool-card:nth-child(2) { animation-delay: 0.2s; }
.tool-card:nth-child(3) { animation-delay: 0.3s; }
.tool-card:nth-child(4) { animation-delay: 0.4s; }
</style>

<script>
// 添加点击反馈效果
document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 添加点击波纹效果
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 183, 197, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
</script>