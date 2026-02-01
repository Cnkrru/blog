---
title: 颜色工具
layout: "tools"
slug: "color-tool"
comments: false
---

<div class="tool-page-header">
    <h2>RGB调色工具</h2>
    <p>输入RGB数值，实时预览颜色效果</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <!-- RGB输入区域 -->
        <div class="rgb-inputs">
            <div class="input-group">
                <label for="rgb-r">红色 (R)：</label>
                <div class="rgb-input-container">
                    <input type="range" id="rgb-r" min="0" max="255" value="255" class="rgb-slider">
                    <input type="number" id="rgb-r-value" min="0" max="255" value="255" class="rgb-number-input">
                </div>
            </div>
            <div class="input-group">
                <label for="rgb-g">绿色 (G)：</label>
                <div class="rgb-input-container">
                    <input type="range" id="rgb-g" min="0" max="255" value="183" class="rgb-slider">
                    <input type="number" id="rgb-g-value" min="0" max="255" value="183" class="rgb-number-input">
                </div>
            </div>
            <div class="input-group">
                <label for="rgb-b">蓝色 (B)：</label>
                <div class="rgb-input-container">
                    <input type="range" id="rgb-b" min="0" max="255" value="197" class="rgb-slider">
                    <input type="number" id="rgb-b-value" min="0" max="255" value="197" class="rgb-number-input">
                </div>
            </div>
        </div>
        
        <!-- 颜色预览区域 -->
        <div class="color-preview">
            <label>颜色预览：</label>
            <div id="color-preview-box" class="color-preview-box"></div>
        </div>
        
        <!-- 颜色代码输出区域 -->
        <div class="result-group">
            <label>颜色代码：</label>
            <div class="color-outputs">
                <div class="color-output-item">
                    <span class="output-label">HEX：</span>
                    <input type="text" id="hex-output" readonly>
                    <button class="copy-button" onclick="copyColor('hex-output')">复制</button>
                </div>
                <div class="color-output-item">
                    <span class="output-label">RGB：</span>
                    <input type="text" id="rgb-output" readonly>
                    <button class="copy-button" onclick="copyColor('rgb-output')">复制</button>
                </div>
                <div class="color-output-item">
                    <span class="output-label">HSL：</span>
                    <input type="text" id="hsl-output" readonly>
                    <button class="copy-button" onclick="copyColor('hsl-output')">复制</button>
                </div>
            </div>
        </div>
        
        <!-- 相似颜色区域 -->
        <div class="color-palette">
            <label>相似颜色：</label>
            <div id="color-palette-container" class="color-palette-container">
                <!-- 动态生成相似颜色 -->
            </div>
        </div>
    </div>
</div>

<div class="tool-page-footer">
    <a href="/blog/tools/" class="back-to-tools">← 返回工具列表</a>
</div>

<style>
    /* 工具页面头部 */
    .tool-page-header {
        text-align: center;
        margin-bottom: 40px;
        padding: 0 20px;
    }

    .tool-page-header h2 {
        color: #FFB7C5;
        font-size: 24px;
        margin-bottom: 10px;
        font-weight: 700;
    }

    .tool-page-header p {
        color: #AAB2C0;
        font-size: 14px;
        margin: 0;
    }

    /* 工具内容容器 */
    .tool-content-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
        margin-bottom: 40px;
    }

    /* 工具实现区域 */
    .tool-implementation {
        background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 30px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        margin-bottom: 30px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    /* 输入组样式 */
    .input-group {
        margin-bottom: 20px;
    }

    .input-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
    }

    .input-group input,
    .input-group select,
    .input-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        transition: all 0.3s ease;
        box-sizing: border-box;
    }

    .input-group input:focus,
    .input-group select:focus,
    .input-group textarea:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.1);
    }

    /* 按钮样式 */
    .convert-button,
    .tool-button {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 20px;
    }

    .convert-button:hover,
    .tool-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }

    /* RGB输入区域 */
    .rgb-inputs {
        margin-bottom: 24px;
    }

    .rgb-input-container {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .rgb-input-container:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .rgb-slider {
        flex: 1;
        height: 10px;
        -webkit-appearance: none;
        appearance: none;
        background: linear-gradient(90deg, #000, #fff);
        border-radius: 5px;
        outline: none;
        transition: all 0.3s ease;
    }

    #rgb-r.rgb-slider {
        background: linear-gradient(90deg, #000, #ff0000);
    }

    #rgb-g.rgb-slider {
        background: linear-gradient(90deg, #000, #00ff00);
    }

    #rgb-b.rgb-slider {
        background: linear-gradient(90deg, #000, #0000ff);
    }

    .rgb-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        background: white;
        border: 3px solid #FFB7C5;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .rgb-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 0 15px rgba(255, 183, 197, 0.6);
    }

    .rgb-number-input {
        width: 90px;
        padding: 10px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .rgb-number-input:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15);
        transform: translateY(-1px);
    }

    /* 颜色输出区域 */
    .color-outputs {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .color-output-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .color-output-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .output-label {
        width: 70px;
        font-size: 14px;
        font-weight: 600;
        color: #2d3748;
        transition: color 0.3s ease;
    }

    .color-output-item input {
        flex: 1;
        padding: 12px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .color-output-item input:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15);
        transform: translateY(-1px);
    }

    .copy-button {
        padding: 8px 16px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
    }

    .copy-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        background: linear-gradient(135deg, #45a049, #3d8b40);
    }

    .copy-button:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    }

    /* 暗黑模式适配 */
    .dark .rgb-number-input,
    .dark .color-output-item input {
        border-color: rgba(255, 255, 255, 0.1);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .dark .rgb-number-input:focus,
    .dark .color-output-item input:focus {
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15);
    }

    .dark .output-label {
        color: #e2e8f0;
    }

    .dark .rgb-input-container,
    .dark .color-output-item {
        background: rgba(255, 255, 255, 0.03);
        border-color: rgba(255, 255, 255, 0.05);
    }

    .dark .color-preview-box {
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .dark .color-palette-item {
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .dark .color-palette-item::after {
        color: #a0aec0;
    }

    .dark .color-palette-item:hover::after {
        color: #FFB7C5;
    }

    /* 颜色预览 */
    .color-preview {
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .color-preview label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        transition: color 0.3s ease;
    }

    .color-preview-box {
        width: 100%;
        height: 120px;
        border-radius: 12px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
    }

    .color-preview-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
        z-index: 1;
        pointer-events: none;
    }

    .color-preview-box:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border-color: #FFB7C5;
    }

    /* 颜色调色板 */
    .color-palette {
        margin-top: 24px;
    }

    .color-palette label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        transition: color 0.3s ease;
    }

    .color-palette-container {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .color-palette-item {
        width: 70px;
        height: 70px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
        position: relative;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .color-palette-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
        z-index: 1;
        pointer-events: none;
    }

    .color-palette-item:hover {
        transform: scale(1.2) translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        border-color: #FFB7C5;
    }

    .color-palette-item::after {
        content: attr(data-color);
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        font-weight: 500;
        color: #718096;
        white-space: nowrap;
        transition: color 0.3s ease;
        z-index: 2;
    }

    .color-palette-item:hover::after {
        color: #FFB7C5;
    }

    /* 工具页面底部 */
    .tool-page-footer {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .back-to-tools {
        display: inline-block;
        color: #4CAF50;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.3s ease;
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(76, 175, 80, 0.1);
    }

    .back-to-tools:hover {
        color: #45a049;
        background: rgba(76, 175, 80, 0.2);
        transform: translateX(-3px);
    }

    /* 暗黑模式适配 */
    .dark .tool-implementation {
        background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
        border-color: rgba(255, 255, 255, 0.05);
    }

    .dark .input-group label,
    .dark .result-group label,
    .dark .color-preview label,
    .dark .color-palette label {
        color: #e2e8f0;
    }

    .dark .input-group input,
    .dark .input-group select,
    .dark .input-group textarea,
    .dark .result-group input,
    .dark .result-group textarea {
        border-color: rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
    }

    .dark .input-group input:focus,
    .dark .input-group select:focus,
    .dark .input-group textarea:focus {
        border-color: #FFB7C5;
        box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.1);
    }

    .dark .color-preview-box {
        border-color: rgba(255, 255, 255, 0.1);
    }

    .dark .color-palette-item {
        border-color: rgba(255, 255, 255, 0.1);
    }

    .dark .color-palette-item::after {
        color: #a0aec0;
    }

    .dark .back-to-tools {
        color: #4CAF50;
        background: rgba(76, 175, 80, 0.1);
    }

    .dark .back-to-tools:hover {
        color: #45a049;
        background: rgba(76, 175, 80, 0.2);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .tool-page-header {
            margin-bottom: 30px;
        }

        .tool-page-header h2 {
            font-size: 20px;
        }

        .tool-content-container {
            padding: 0 16px;
        }

        .tool-implementation {
            padding: 20px;
        }

        .input-group input,
        .input-group select,
        .input-group textarea,
        .result-group input,
        .result-group textarea {
            padding: 10px;
            font-size: 14px;
        }

        .color-output input {
            padding-right: 80px;
        }

        .copy-button {
            padding: 4px 8px;
            font-size: 12px;
        }

        .color-preview-box {
            height: 80px;
        }

        .color-palette-item {
            width: 50px;
            height: 50px;
        }

        .color-palette-item::after {
            font-size: 10px;
            bottom: -20px;
        }

        .convert-button,
        .tool-button {
            padding: 12px;
            font-size: 14px;
        }

        .tool-page-footer {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
</style>

<script>
    // RGB调色工具功能实现
    window.onload = function() {
        console.log('Window loaded, initializing RGB color tool');
        initColorTool(); // 初始化颜色工具
    };

    // 初始化颜色工具
    function initColorTool() {
        // 获取DOM元素
        const rSlider = document.getElementById('rgb-r');
        const gSlider = document.getElementById('rgb-g');
        const bSlider = document.getElementById('rgb-b');
        const rInput = document.getElementById('rgb-r-value');
        const gInput = document.getElementById('rgb-g-value');
        const bInput = document.getElementById('rgb-b-value');
        const colorPreviewBox = document.getElementById('color-preview-box');
        const hexOutput = document.getElementById('hex-output');
        const rgbOutput = document.getElementById('rgb-output');
        const hslOutput = document.getElementById('hsl-output');
        
        // 添加事件监听器
        rSlider.addEventListener('input', updateColor);
        gSlider.addEventListener('input', updateColor);
        bSlider.addEventListener('input', updateColor);
        rInput.addEventListener('input', updateFromNumberInput);
        gInput.addEventListener('input', updateFromNumberInput);
        bInput.addEventListener('input', updateFromNumberInput);
        
        // 初始化颜色
        updateColor();
    }

    // 从滑块更新颜色
    function updateColor() {
        const r = parseInt(document.getElementById('rgb-r').value);
        const g = parseInt(document.getElementById('rgb-g').value);
        const b = parseInt(document.getElementById('rgb-b').value);
        
        // 更新数字输入框
        document.getElementById('rgb-r-value').value = r;
        document.getElementById('rgb-g-value').value = g;
        document.getElementById('rgb-b-value').value = b;
        
        // 更新颜色预览
        updateColorPreview(r, g, b);
    }

    // 从数字输入框更新颜色
    function updateFromNumberInput(e) {
        const id = e.target.id;
        let value = parseInt(e.target.value);
        
        // 限制数值范围
        value = Math.max(0, Math.min(255, value));
        e.target.value = value;
        
        // 更新对应的滑块
        if (id === 'rgb-r-value') {
            document.getElementById('rgb-r').value = value;
        } else if (id === 'rgb-g-value') {
            document.getElementById('rgb-g').value = value;
        } else if (id === 'rgb-b-value') {
            document.getElementById('rgb-b').value = value;
        }
        
        // 更新颜色预览
        const r = parseInt(document.getElementById('rgb-r').value);
        const g = parseInt(document.getElementById('rgb-g').value);
        const b = parseInt(document.getElementById('rgb-b').value);
        updateColorPreview(r, g, b);
    }

    // 更新颜色预览和输出
    function updateColorPreview(r, g, b) {
        const colorPreviewBox = document.getElementById('color-preview-box');
        const hexOutput = document.getElementById('hex-output');
        const rgbOutput = document.getElementById('rgb-output');
        const hslOutput = document.getElementById('hsl-output');
        
        // 计算颜色代码
        const hexColor = rgbToHex(r, g, b);
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        const hslColor = rgbToHslString(r, g, b);
        
        // 更新颜色预览
        colorPreviewBox.style.backgroundColor = rgbColor;
        
        // 更新输出框
        hexOutput.value = hexColor;
        rgbOutput.value = rgbColor;
        hslOutput.value = hslColor;
        
        // 生成相似颜色
        generateSimilarColors({ r, g, b });
    }

    // RGB 转 HEX
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // RGB 转 HSL 字符串
    function rgbToHslString(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // 灰色
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    // 生成相似颜色
    function generateSimilarColors(baseColor) {
        const container = document.getElementById('color-palette-container');
        container.innerHTML = '';
        
        // 生成不同亮度的颜色
        const variations = [-30, -15, 0, 15, 30];
        
        variations.forEach(variation => {
            // 转换为 HSL
            const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
            // 调整亮度
            let newL = Math.max(0, Math.min(1, hsl.l + variation / 100));
            // 转换回 RGB
            const newRgb = hslToRgb(hsl.h, hsl.s, newL);
            // 转换为 HEX
            const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
            
            // 创建颜色项
            const colorItem = document.createElement('div');
            colorItem.className = 'color-palette-item';
            colorItem.style.backgroundColor = hexColor;
            colorItem.setAttribute('data-color', hexColor);
            colorItem.title = hexColor;
            
            // 添加点击事件
            colorItem.addEventListener('click', function() {
                const rgb = hexToRgb(hexColor);
                document.getElementById('rgb-r').value = rgb.r;
                document.getElementById('rgb-g').value = rgb.g;
                document.getElementById('rgb-b').value = rgb.b;
                updateColor();
            });
            
            container.appendChild(colorItem);
        });
    }

    // HEX 转 RGB
    function hexToRgb(hex) {
        // 移除 # 号
        hex = hex.replace('#', '');
        
        // 处理简写形式
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return { r, g, b };
    }

    // RGB 转 HSL
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // 灰色
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s, l };
    }

    // HSL 转 RGB
    function hslToRgb(h, s, l) {
        h /= 360;
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // 灰色
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    // 复制颜色代码
    function copyColor(outputId) {
        const colorInput = document.getElementById(outputId);
        colorInput.select();
        colorInput.setSelectionRange(0, 99999); // 用于移动设备
        
        try {
            document.execCommand('copy');
            // 显示复制成功提示
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '已复制!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        }
    }
</script>

<!-- 代码复制部分 -->
<div class="code-copy-section">
    <h3>代码复制</h3>
    <p>复制以下代码到你的项目中使用</p>
    
    <!-- HTML 代码块 -->
    <div class="code-block">
        <div class="code-header">
            <span>HTML</span>
            <button class="code-copy-button" data-code-target="html-code">复制</button>
        </div>
        <pre id="html-code"><code class="language-html">&lt;div class="tool-content-container"&gt;
    &lt;div class="tool-implementation"&gt;
        &lt;!-- RGB输入区域 --&gt;
        &lt;div class="rgb-inputs"&gt;
            &lt;div class="input-group"&gt;
                &lt;label for="rgb-r"&gt;红色 (R)：&lt;/label&gt;
                &lt;div class="rgb-input-container"&gt;
                    &lt;input type="range" id="rgb-r" min="0" max="255" value="255" class="rgb-slider"&gt;
                    &lt;input type="number" id="rgb-r-value" min="0" max="255" value="255" class="rgb-number-input"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="input-group"&gt;
                &lt;label for="rgb-g"&gt;绿色 (G)：&lt;/label&gt;
                &lt;div class="rgb-input-container"&gt;
                    &lt;input type="range" id="rgb-g" min="0" max="255" value="183" class="rgb-slider"&gt;
                    &lt;input type="number" id="rgb-g-value" min="0" max="255" value="183" class="rgb-number-input"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="input-group"&gt;
                &lt;label for="rgb-b"&gt;蓝色 (B)：&lt;/label&gt;
                &lt;div class="rgb-input-container"&gt;
                    &lt;input type="range" id="rgb-b" min="0" max="255" value="197" class="rgb-slider"&gt;
                    &lt;input type="number" id="rgb-b-value" min="0" max="255" value="197" class="rgb-number-input"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        
        &lt;!-- 颜色预览区域 --&gt;
        &lt;div class="color-preview"&gt;
            &lt;label&gt;颜色预览：&lt;/label&gt;
            &lt;div id="color-preview-box" class="color-preview-box"&gt;&lt;/div&gt;
        &lt;/div&gt;
        
        &lt;!-- 颜色代码输出区域 --&gt;
        &lt;div class="result-group"&gt;
            &lt;label&gt;颜色代码：&lt;/label&gt;
            &lt;div class="color-outputs"&gt;
                &lt;div class="color-output-item"&gt;
                    &lt;span class="output-label"&gt;HEX：&lt;/span&gt;
                    &lt;input type="text" id="hex-output" readonly&gt;
                    &lt;button class="copy-button" onclick="copyColor('hex-output')"&gt;复制&lt;/button&gt;
                &lt;/div&gt;
                &lt;div class="color-output-item"&gt;
                    &lt;span class="output-label"&gt;RGB：&lt;/span&gt;
                    &lt;input type="text" id="rgb-output" readonly&gt;
                    &lt;button class="copy-button" onclick="copyColor('rgb-output')"&gt;复制&lt;/button&gt;
                &lt;/div&gt;
                &lt;div class="color-output-item"&gt;
                    &lt;span class="output-label"&gt;HSL：&lt;/span&gt;
                    &lt;input type="text" id="hsl-output" readonly&gt;
                    &lt;button class="copy-button" onclick="copyColor('hsl-output')"&gt;复制&lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        
        &lt;!-- 相似颜色区域 --&gt;
        &lt;div class="color-palette"&gt;
            &lt;label&gt;相似颜色：&lt;/label&gt;
            &lt;div id="color-palette-container" class="color-palette-container"&gt;
                &lt;!-- 动态生成相似颜色 --&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
    </div>
    
    <!-- JavaScript 代码块 -->
    <div class="code-block">
        <div class="code-header">
            <span>JavaScript</span>
            <button class="code-copy-button" data-code-target="js-code">复制</button>
        </div>
        <pre id="js-code"><code class="language-javascript">// RGB调色工具功能实现
window.onload = function() {
    console.log('Window loaded, initializing RGB color tool');
    initColorTool(); // 初始化颜色工具
};

// 初始化颜色工具
function initColorTool() {
    // 获取DOM元素
    const rSlider = document.getElementById('rgb-r');
    const gSlider = document.getElementById('rgb-g');
    const bSlider = document.getElementById('rgb-b');
    const rInput = document.getElementById('rgb-r-value');
    const gInput = document.getElementById('rgb-g-value');
    const bInput = document.getElementById('rgb-b-value');
    const colorPreviewBox = document.getElementById('color-preview-box');
    const hexOutput = document.getElementById('hex-output');
    const rgbOutput = document.getElementById('rgb-output');
    const hslOutput = document.getElementById('hsl-output');
    
    // 添加事件监听器
    rSlider.addEventListener('input', updateColor);
    gSlider.addEventListener('input', updateColor);
    bSlider.addEventListener('input', updateColor);
    rInput.addEventListener('input', updateFromNumberInput);
    gInput.addEventListener('input', updateFromNumberInput);
    bInput.addEventListener('input', updateFromNumberInput);
    
    // 初始化颜色
    updateColor();
}

// 从滑块更新颜色
function updateColor() {
    const r = parseInt(document.getElementById('rgb-r').value);
    const g = parseInt(document.getElementById('rgb-g').value);
    const b = parseInt(document.getElementById('rgb-b').value);
    
    // 更新数字输入框
    document.getElementById('rgb-r-value').value = r;
    document.getElementById('rgb-g-value').value = g;
    document.getElementById('rgb-b-value').value = b;
    
    // 更新颜色预览
    updateColorPreview(r, g, b);
}

// 从数字输入框更新颜色
function updateFromNumberInput(e) {
    const id = e.target.id;
    let value = parseInt(e.target.value);
    
    // 限制数值范围
    value = Math.max(0, Math.min(255, value));
    e.target.value = value;
    
    // 更新对应的滑块
    if (id === 'rgb-r-value') {
        document.getElementById('rgb-r').value = value;
    } else if (id === 'rgb-g-value') {
        document.getElementById('rgb-g').value = value;
    } else if (id === 'rgb-b-value') {
        document.getElementById('rgb-b').value = value;
    }
    
    // 更新颜色预览
    const r = parseInt(document.getElementById('rgb-r').value);
    const g = parseInt(document.getElementById('rgb-g').value);
    const b = parseInt(document.getElementById('rgb-b').value);
    updateColorPreview(r, g, b);
}

// 更新颜色预览和输出
function updateColorPreview(r, g, b) {
    const colorPreviewBox = document.getElementById('color-preview-box');
    const hexOutput = document.getElementById('hex-output');
    const rgbOutput = document.getElementById('rgb-output');
    const hslOutput = document.getElementById('hsl-output');
    
    // 计算颜色代码
    const hexColor = rgbToHex(r, g, b);
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    const hslColor = rgbToHslString(r, g, b);
    
    // 更新颜色预览
    colorPreviewBox.style.backgroundColor = rgbColor;
    
    // 更新输出框
    hexOutput.value = hexColor;
    rgbOutput.value = rgbColor;
    hslOutput.value = hslColor;
    
    // 生成相似颜色
    generateSimilarColors({ r, g, b });
}

// RGB 转 HEX
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// RGB 转 HSL 字符串
function rgbToHslString(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // 灰色
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// 生成相似颜色
function generateSimilarColors(baseColor) {
    const container = document.getElementById('color-palette-container');
    container.innerHTML = '';
    
    // 生成不同亮度的颜色
    const variations = [-30, -15, 0, 15, 30];
    
    variations.forEach(variation => {
        // 转换为 HSL
        const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
        // 调整亮度
        let newL = Math.max(0, Math.min(1, hsl.l + variation / 100));
        // 转换回 RGB
        const newRgb = hslToRgb(hsl.h, hsl.s, newL);
        // 转换为 HEX
        const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        
        // 创建颜色项
        const colorItem = document.createElement('div');
        colorItem.className = 'color-palette-item';
        colorItem.style.backgroundColor = hexColor;
        colorItem.setAttribute('data-color', hexColor);
        colorItem.title = hexColor;
        
        // 添加点击事件
        colorItem.addEventListener('click', function() {
            const rgb = hexToRgb(hexColor);
            document.getElementById('rgb-r').value = rgb.r;
            document.getElementById('rgb-g').value = rgb.g;
            document.getElementById('rgb-b').value = rgb.b;
            updateColor();
        });
        
        container.appendChild(colorItem);
    });
}

// HEX 转 RGB
function hexToRgb(hex) {
    // 移除 # 号
    hex = hex.replace('#', '');
    
    // 处理简写形式
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

// RGB 转 HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // 灰色
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s, l };
}

// HSL 转 RGB
function hslToRgb(h, s, l) {
    h /= 360;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // 灰色
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// 复制颜色代码
function copyColor(outputId) {
    const colorInput = document.getElementById(outputId);
    colorInput.select();
    colorInput.setSelectionRange(0, 99999); // 用于移动设备
    
    try {
        document.execCommand('copy');
        // 显示复制成功提示
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '已复制!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    }
}
</code></pre>
    </div>
</div>

<!-- 代码复制功能 -->
<script>
    // 代码复制功能
    document.addEventListener('DOMContentLoaded', function() {
        const copyButtons = document.querySelectorAll('.code-copy-button');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeTarget = this.getAttribute('data-code-target');
                const codeElement = document.getElementById(codeTarget);
                const codeText = codeElement.textContent;
                
                navigator.clipboard.writeText(codeText).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '已复制!';
                    this.classList.add('copied');
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                    this.textContent = '复制失败';
                    
                    setTimeout(() => {
                        this.textContent = '复制';
                    }, 2000);
                });
            });
        });
    });
</script>

<style>
    /* 代码复制部分样式 */
    .code-copy-section {
        max-width: 1000px;
        margin: 40px auto 0;
        padding: 0 20px;
    }
    
    .code-copy-section h3 {
        color: #FFB7C5;
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 700;
        text-align: center;
    }
    
    .code-copy-section p {
        color: #AAB2C0;
        font-size: 14px;
        margin-bottom: 30px;
        text-align: center;
    }
    
    .code-block {
        margin-bottom: 20px;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
    }
    
    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: rgba(255, 200, 210, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .code-header span {
        font-size: 14px;
        font-weight: 500;
        color: #4a5568;
    }
    
    .code-copy-button {
        padding: 6px 12px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .code-copy-button:hover {
        background: #45a049;
        transform: translateY(-1px);
    }
    
    .code-copy-button.copied {
        background: #4CAF50;
    }
    
    .code-block pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        background: rgba(255, 255, 255, 0.95);
    }
    
    .code-block code {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }
    
    /* 暗黑模式支持 */
    .dark .code-block {
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.05);
    }
    
    .dark .code-header {
        background: rgba(255, 200, 210, 0.05);
        border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    
    .dark .code-header span {
        color: #e2e8f0;
    }
    
    .dark .code-block pre {
        background: rgba(0, 0, 0, 0.5);
    }
    
    .dark .code-block code {
        color: #e2e8f0;
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .code-copy-section {
            padding: 0 16px;
            margin-top: 30px;
        }
        
        .code-copy-section h3 {
            font-size: 18px;
        }
        
        .code-header {
            padding: 10px 12px;
        }
        
        .code-header span {
            font-size: 13px;
        }
        
        .code-copy-button {
            padding: 4px 8px;
            font-size: 11px;
        }
        
        .code-block pre {
            padding: 12px;
        }
        
        .code-block code {
            font-size: 12px;
        }
    }
</style>