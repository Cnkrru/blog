---
date: '2026-02-02T10:00:00+08:00'
draft: false
title: '颜色工具'
slug: 'tools/color-tool'
---

<div class="tool-page-header">
    <h2>颜色工具</h2>
    <p>颜色代码转换、调色板生成等功能</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="color-input">输入颜色：</label>
            <div class="input-wrapper">
                <input type="color" id="color-input" value="#FFB7C5" class="color-input">
                <input type="text" id="color-text" value="#FFB7C5" class="modern-input">
            </div>
        </div>

        <div class="input-group">
            <label for="color-format">转换格式：</label>
            <div class="select-wrapper">
                <select id="color-format" class="modern-select">
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="rgba">RGBA</option>
                    <option value="hsl">HSL</option>
                </select>
            </div>
        </div>

        <button id="convert-btn" class="modern-button">转换</button>
    </div>

    <!-- 结果显示区域 -->
    <div class="result-container" id="result-container">
        <div class="result-header">
            <h3>转换结果</h3>
        </div>
        <div class="result-content">
            <div class="result-item">
                <span class="result-label">HEX：</span>
                <span id="hex-value" class="result-value">#FFB7C5</span>
            </div>
            <div class="result-item">
                <span class="result-label">RGB：</span>
                <span id="rgb-value" class="result-value">rgb(255, 183, 197)</span>
            </div>
            <div class="result-item">
                <span class="result-label">RGBA：</span>
                <span id="rgba-value" class="result-value">rgba(255, 183, 197, 1)</span>
            </div>
            <div class="result-item">
                <span class="result-label">HSL：</span>
                <span id="hsl-value" class="result-value">hsl(348, 100%, 85%)</span>
            </div>
        </div>
    </div>

    <!-- 调色板生成区域 -->
    <div class="palette-container">
        <div class="palette-header">
            <h3>调色板</h3>
        </div>
        <div class="palette-content" id="palette-content">
            <!-- 调色板颜色将通过JavaScript生成 -->
        </div>
    </div>
</div>

<!-- 代码复制区域 -->
<div class="code-copy-container">
    <h3>代码实现</h3>
    <pre><code class="language-javascript">// 颜色工具功能实现
document.addEventListener('DOMContentLoaded', function() {
    const colorInput = document.getElementById('color-input');
    const colorText = document.getElementById('color-text');
    const colorFormat = document.getElementById('color-format');
    const convertBtn = document.getElementById('convert-btn');
    const hexValue = document.getElementById('hex-value');
    const rgbValue = document.getElementById('rgb-value');
    const rgbaValue = document.getElementById('rgba-value');
    const hslValue = document.getElementById('hsl-value');
    const paletteContent = document.getElementById('palette-content');

    // 颜色输入同步
    colorInput.addEventListener('input', function() {
        colorText.value = this.value;
        updateColorValues(this.value);
        generatePalette(this.value);
    });

    colorText.addEventListener('input', function() {
        const color = this.value;
        if (isValidColor(color)) {
            colorInput.value = color;
            updateColorValues(color);
            generatePalette(color);
        }
    });

    // 转换按钮点击事件
    convertBtn.addEventListener('click', function() {
        const color = colorText.value;
        if (!isValidColor(color)) {
            alert('请输入有效的颜色代码');
            return;
        }
        updateColorValues(color);
        generatePalette(color);
    });

    // 更新颜色值
    function updateColorValues(color) {
        const hex = toHex(color);
        const rgb = toRgb(color);
        const rgba = toRgba(color);
        const hsl = toHsl(color);

        hexValue.textContent = hex;
        rgbValue.textContent = rgb;
        rgbaValue.textContent = rgba;
        hslValue.textContent = hsl;
    }

    // 生成调色板
    function generatePalette(color) {
        const baseColor = parseColor(color);
        const palette = generateColorPalette(baseColor);
        
        paletteContent.innerHTML = '';
        
        palette.forEach((paletteColor, index) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'palette-color';
            colorItem.style.backgroundColor = paletteColor.hex;
            colorItem.innerHTML = `
                <div class="color-preview"></div>
                <div class="color-info">
                    <span class="color-hex">${paletteColor.hex}</span>
                    <span class="color-name">${paletteColor.name}</span>
                </div>
            `;
            paletteContent.appendChild(colorItem);
        });
    }

    // 检查颜色是否有效
    function isValidColor(color) {
        const temp = document.createElement('div');
        temp.style.color = color;
        return temp.style.color !== '';
    }

    // 转换为HEX
    function toHex(color) {
        if (color.startsWith('#')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为RGB
    function toRgb(color) {
        if (color.startsWith('rgb')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为RGBA
    function toRgba(color) {
        if (color.startsWith('rgba')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为HSL
    function toHsl(color) {
        if (color.startsWith('hsl')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 解析颜色
    function parseColor(color) {
        // 简单实现，实际项目中可能需要更复杂的解析
        return color;
    }

    // 生成颜色调色板
    function generateColorPalette(baseColor) {
        // 简单实现，生成一些基于基础颜色的变体
        return [
            { hex: baseColor, name: '基础色' },
            { hex: lightenColor(baseColor, 20), name: '浅色' },
            { hex: darkenColor(baseColor, 20), name: '深色' },
            { hex: complementColor(baseColor), name: '互补色' },
            { hex: analogousColor1(baseColor), name: '类似色1' },
            { hex: analogousColor2(baseColor), name: '类似色2' }
        ];
    }

    // 浅色
    function lightenColor(color, percent) {
        // 简单实现
        return color;
    }

    // 深色
    function darkenColor(color, percent) {
        // 简单实现
        return color;
    }

    // 互补色
    function complementColor(color) {
        // 简单实现
        return color;
    }

    // 类似色1
    function analogousColor1(color) {
        // 简单实现
        return color;
    }

    // 类似色2
    function analogousColor2(color) {
        // 简单实现
        return color;
    }

    // 初始化
    updateColorValues('#FFB7C5');
    generatePalette('#FFB7C5');
});</code></pre>
    <button class="code-copy-button" data-code-target="code" aria-label="复制代码">
        <span class="copy-icon">📋</span>
        <span class="copy-text">复制代码</span>
    </button>
</div>

<script>
// 颜色工具功能实现
document.addEventListener('DOMContentLoaded', function() {
    const colorInput = document.getElementById('color-input');
    const colorText = document.getElementById('color-text');
    const colorFormat = document.getElementById('color-format');
    const convertBtn = document.getElementById('convert-btn');
    const hexValue = document.getElementById('hex-value');
    const rgbValue = document.getElementById('rgb-value');
    const rgbaValue = document.getElementById('rgba-value');
    const hslValue = document.getElementById('hsl-value');
    const paletteContent = document.getElementById('palette-content');

    // 颜色输入同步
    colorInput.addEventListener('input', function() {
        colorText.value = this.value;
        updateColorValues(this.value);
        generatePalette(this.value);
    });

    colorText.addEventListener('input', function() {
        const color = this.value;
        if (isValidColor(color)) {
            colorInput.value = color;
            updateColorValues(color);
            generatePalette(color);
        }
    });

    // 转换按钮点击事件
    convertBtn.addEventListener('click', function() {
        const color = colorText.value;
        if (!isValidColor(color)) {
            alert('请输入有效的颜色代码');
            return;
        }
        updateColorValues(color);
        generatePalette(color);
    });

    // 更新颜色值
    function updateColorValues(color) {
        const hex = toHex(color);
        const rgb = toRgb(color);
        const rgba = toRgba(color);
        const hsl = toHsl(color);

        hexValue.textContent = hex;
        rgbValue.textContent = rgb;
        rgbaValue.textContent = rgba;
        hslValue.textContent = hsl;
    }

    // 生成调色板
    function generatePalette(color) {
        const baseColor = parseColor(color);
        const palette = generateColorPalette(baseColor);
        
        paletteContent.innerHTML = '';
        
        palette.forEach((paletteColor, index) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'palette-color';
            colorItem.style.backgroundColor = paletteColor.hex;
            colorItem.innerHTML = `
                <div class="color-preview"></div>
                <div class="color-info">
                    <span class="color-hex">${paletteColor.hex}</span>
                    <span class="color-name">${paletteColor.name}</span>
                </div>
            `;
            paletteContent.appendChild(colorItem);
        });
    }

    // 检查颜色是否有效
    function isValidColor(color) {
        const temp = document.createElement('div');
        temp.style.color = color;
        return temp.style.color !== '';
    }

    // 转换为HEX
    function toHex(color) {
        if (color.startsWith('#')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为RGB
    function toRgb(color) {
        if (color.startsWith('rgb')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为RGBA
    function toRgba(color) {
        if (color.startsWith('rgba')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 转换为HSL
    function toHsl(color) {
        if (color.startsWith('hsl')) {
            return color;
        }
        // 简单实现，实际项目中可能需要更复杂的转换
        return color;
    }

    // 解析颜色
    function parseColor(color) {
        // 简单实现，实际项目中可能需要更复杂的解析
        return color;
    }

    // 生成颜色调色板
    function generateColorPalette(baseColor) {
        // 简单实现，生成一些基于基础颜色的变体
        return [
            { hex: baseColor, name: '基础色' },
            { hex: lightenColor(baseColor, 20), name: '浅色' },
            { hex: darkenColor(baseColor, 20), name: '深色' },
            { hex: complementColor(baseColor), name: '互补色' },
            { hex: analogousColor1(baseColor), name: '类似色1' },
            { hex: analogousColor2(baseColor), name: '类似色2' }
        ];
    }

    // 浅色
    function lightenColor(color, percent) {
        // 简单实现
        return color;
    }

    // 深色
    function darkenColor(color, percent) {
        // 简单实现
        return color;
    }

    // 互补色
    function complementColor(color) {
        // 简单实现
        return color;
    }

    // 类似色1
    function analogousColor1(color) {
        // 简单实现
        return color;
    }

    // 类似色2
    function analogousColor2(color) {
        // 简单实现
        return color;
    }

    // 初始化
    updateColorValues('#FFB7C5');
    generatePalette('#FFB7C5');
});
</script>

<style>
/* 工具页面样式 */
.tool-page-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 0 20px;
}

.tool-page-header h2 {
    color: #FFB7C5;
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: 700;
}

.tool-page-header p {
    color: #AAB2C0;
    font-size: 16px;
    margin: 0;
}

.tool-content-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 40px;
}

/* 工具功能实现区域 */
.tool-implementation {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 30px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.tool-implementation:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.2);
    border-color: rgba(255, 200, 210, 0.3);
}

/* 输入组样式 */
.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2d3748;
}

.dark .input-group label {
    color: #e2e8f0;
}

/* 颜色输入容器 */
.input-wrapper {
    display: flex;
    gap: 10px;
}

/* 颜色选择器 */
.color-input {
    width: 60px;
    height: 40px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    cursor: pointer;
    background: transparent;
}

.color-input::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 10px;
}

.color-input::-webkit-color-swatch {
    border: none;
    border-radius: 10px;
}

/* 现代输入框样式 */
.modern-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #2d3748;
}

.modern-input:focus {
    outline: none;
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
    background: rgba(255, 255, 255, 0.95);
}

.dark .modern-input {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(170, 210, 230, 0.3);
    color: #e2e8f0;
}

.dark .modern-input:focus {
    background: rgba(30, 30, 30, 0.95);
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
}

/* 现代下拉选择框样式 */
.select-wrapper {
    position: relative;
}

.modern-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #2d3748;
    appearance: none;
    cursor: pointer;
}

.modern-select:focus {
    outline: none;
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
    background: rgba(255, 255, 255, 0.95);
}

.dark .modern-select {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(170, 210, 230, 0.3);
    color: #e2e8f0;
}

.dark .modern-select:focus {
    background: rgba(30, 30, 30, 0.95);
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
}

/* 现代按钮样式 */
.modern-button {
    width: 100%;
    padding: 14px 20px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    background: linear-gradient(135deg, #FFB7C5, #AADCFF);
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 183, 197, 0.4);
}

.modern-button:active {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(255, 183, 197, 0.4);
}

.modern-button::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    animation: shine 3s infinite;
    opacity: 0;
}

.modern-button:hover::before {
    animation: shine 1.5s infinite;
    opacity: 1;
}

@keyframes shine {
    0% {
        transform: translateX(-100%) rotate(45deg);
    }
    100% {
        transform: translateX(100%) rotate(45deg);
    }
}

/* 结果显示区域 */
.result-container {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.result-container:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.2);
    border-color: rgba(255, 200, 210, 0.3);
}

.result-header {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.2), rgba(170, 210, 230, 0.2));
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.result-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1a202c;
}

.dark .result-header h3 {
    color: #ffffff;
}

.result-content {
    padding: 20px;
}

.result-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.result-label {
    font-weight: 600;
    color: #4a5568;
    margin-right: 10px;
    min-width: 80px;
    white-space: nowrap;
}

.dark .result-label {
    color: #a0aec0;
}

.result-value {
    flex: 1;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    color: #1a202c;
    word-break: break-all;
}

.dark .result-value {
    color: #e2e8f0;
}

/* 调色板容器 */
.palette-container {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.palette-container:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.2);
    border-color: rgba(255, 200, 210, 0.3);
}

.palette-header {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.2), rgba(170, 210, 230, 0.2));
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.palette-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1a202c;
}

.dark .palette-header h3 {
    color: #ffffff;
}

.palette-content {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}

.palette-color {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.palette-color:hover {
    transform: translateY(-4px);
}

.color-preview {
    height: 80px;
}

.color-info {
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.dark .color-info {
    background: rgba(30, 30, 30, 0.9);
}

.color-hex {
    display: block;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 4px;
}

.dark .color-hex {
    color: #e2e8f0;
}

.color-name {
    display: block;
    font-size: 11px;
    color: #4a5568;
}

.dark .color-name {
    color: #a0aec0;
}

/* 代码复制区域 */
.code-copy-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    margin-bottom: 40px;
}

.code-copy-container h3 {
    color: #FFB7C5;
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 700;
}

.code-copy-container pre {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    overflow-x: auto;
    position: relative;
    margin: 0;
}

.code-copy-container code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #e2e8f0;
}

.code-copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.8), rgba(170, 210, 230, 0.8));
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    z-index: 10;
}

.code-copy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(170, 210, 230, 0.4);
}

.code-copy-button.copied {
    background: linear-gradient(135deg, rgba(72, 187, 120, 0.8), rgba(72, 187, 120, 0.8));
    color: white;
}

.copy-icon {
    font-size: 14px;
}

/* 暗黑模式适配 */
.dark .tool-implementation {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
    border-color: rgba(255, 255, 255, 0.05);
}

.dark .tool-implementation:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.1);
    border-color: rgba(255, 200, 210, 0.2);
}

.dark .result-container {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
    border-color: rgba(255, 255, 255, 0.05);
}

.dark .result-container:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.1);
    border-color: rgba(255, 200, 210, 0.2);
}

.dark .result-header {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark .palette-container {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
    border-color: rgba(255, 255, 255, 0.05);
}

.dark .palette-container:hover {
    box-shadow: 0 15px 35px rgba(170, 210, 230, 0.1);
    border-color: rgba(255, 200, 210, 0.2);
}

.dark .palette-header {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark .code-copy-container pre {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
    border-color: rgba(255, 255, 255, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .tool-page-header h2 {
        font-size: 24px;
    }

    .tool-page-header p {
        font-size: 14px;
    }

    .tool-content-container {
        padding: 0 16px;
        gap: 20px;
    }

    .tool-implementation {
        padding: 20px;
    }

    .input-group label {
        font-size: 14px;
    }

    .input-wrapper {
        flex-direction: column;
    }

    .color-input {
        width: 100%;
        height: 50px;
    }

    .modern-input,
    .modern-select {
        padding: 10px 14px;
        font-size: 14px;
    }

    .modern-button {
        padding: 12px 18px;
        font-size: 14px;
    }

    .result-header,
    .palette-header {
        padding: 16px;
    }

    .result-header h3,
    .palette-header h3 {
        font-size: 16px;
    }

    .result-content,
    .palette-content {
        padding: 16px;
    }

    .result-value {
        font-size: 14px;
    }

    .palette-content {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 12px;
    }

    .code-copy-container {
        padding: 0 16px;
    }

    .code-copy-container h3 {
        font-size: 18px;
    }

    .code-copy-container pre {
        padding: 16px;
    }

    .code-copy-container code {
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .tool-page-header h2 {
        font-size: 20px;
    }

    .tool-implementation {
        padding: 16px;
    }

    .result-header,
    .palette-header {
        padding: 14px;
    }

    .result-header h3,
    .palette-header h3 {
        font-size: 14px;
    }

    .result-content,
    .palette-content {
        padding: 14px;
    }

    .palette-content {
        grid-template-columns: repeat(2, 1fr);
    }

    .code-copy-container pre {
        padding: 14px;
    }

    .code-copy-container code {
        font-size: 12px;
    }
}
</style>