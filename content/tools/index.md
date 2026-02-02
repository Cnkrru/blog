---
title: 工具
layout: "page"
comments: false
_build:
  list: false
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
    background: linear-gradient(135deg, #FFB7C5, #FFD1DC);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(255, 183, 197, 0.3);
}

.tool-card:hover::before {
    opacity: 0.1;
}

.tool-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.tool-card h3 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
}

.tool-card p {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
    line-height: 1.4;
}

.tool-features {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
}

.tool-features span {
    background: rgba(255, 183, 197, 0.2);
    color: #FFB7C5;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

@media (max-width: 768px) {
    .tools-grid {
        grid-template-columns: 1fr;
        gap: 15px;
        padding: 0 15px;
    }
    
    .tool-card {
        padding: 15px;
    }
    
    .tool-icon {
        font-size: 2.5rem;
    }
}
</style>

<script src="/blog/js/tools.js"></script>