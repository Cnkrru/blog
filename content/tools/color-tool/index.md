---
title: 颜色工具
layout: "page"
comments: false
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
            <label for="color-input">颜色输入：</label>
            <input type="text" id="color-input" placeholder="请输入颜色代码（如 #FF0000、rgb(255,0,0)）" value="#FF0000">
        </div>
        <div class="input-group">
            <label for="color-format">输出格式：</label>
            <select id="color-format">
                <option value="hex">十六进制 (#RRGGBB)</option>
                <option value="rgb">RGB (rgb(r,g,b))</option>
                <option value="rgba">RGBA (rgba(r,g,b,a))</option>
                <option value="hsl">HSL (hsl(h,s,l))</option>
            </select>
        </div>
        <button id="convert-color-btn" class="tool-button">转换颜色</button>
        <div class="result-group">
            <label for="color-result">转换结果：</label>
            <input type="text" id="color-result" readonly>
        </div>
        <div class="result-group">
            <label>颜色预览：</label>
            <div id="color-preview" style="width: 100%; height: 100px; background-color: #FF0000; border-radius: 8px; transition: background-color 0.3s ease;"></div>
        </div>
        <div class="result-group">
            <label>调色板生成：</label>
            <div id="color-palette" style="display: flex; gap: 10px; margin-top: 10px;">
                <!-- 调色板将通过 JavaScript 生成 -->
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
        color: #4a5568;
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

    /* 结果组样式 */
    .result-group {
        margin-top: 20px;
    }

    .result-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #4a5568;
    }

    .result-group input,
    .result-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        font-size: 16px;
        background: rgba(249, 249, 249, 0.8);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        font-weight: 500;
        box-sizing: border-box;
    }

    /* 调色板样式 */
    .palette-color {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .palette-color:hover {
        transform: translateY(-5px);
    }

    .palette-color span {
        position: absolute;
        bottom: 5px;
        left: 5px;
        right: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 12px;
        padding: 3px;
        border-radius: 4px;
        text-align: center;
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
    .dark .result-group label {
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

        .convert-button,
        .tool-button {
            padding: 12px;
            font-size: 14px;
        }

        .tool-page-footer {
            margin-top: 30px;
            margin-bottom: 30px;
        }

        .palette-color {
            width: 80px;
            height: 80px;
        }

        .palette-color span {
            font-size: 10px;
        }
    }
</style>

<script>
    // 颜色工具功能
    function initColorTool() {
        console.log('初始化颜色工具');
        
        // 获取 DOM 元素
        const colorInput = document.getElementById('color-input');
        const colorFormat = document.getElementById('color-format');
        const convertColorBtn = document.getElementById('convert-color-btn');
        const colorResult = document.getElementById('color-result');
        const colorPreview = document.getElementById('color-preview');
        const colorPalette = document.getElementById('color-palette');
        
        console.log('工具元素:', {
            colorInput: !!colorInput,
            colorFormat: !!colorFormat,
            convertColorBtn: !!convertColorBtn,
            colorResult: !!colorResult,
            colorPreview: !!colorPreview,
            colorPalette: !!colorPalette
        });
        
        if (!colorInput || !colorFormat || !convertColorBtn || !colorResult) {
            console.error('颜色工具：缺少必要的DOM元素');
            return;
        }
        
        // 颜色转换函数
        function hexToRgb(hex) {
            hex = hex.replace('#', '');
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        }
        
        function rgbToHex(r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        }
        
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0;
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
            
            return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
        }
        
        function parseColor(color) {
            color = color.trim();
            
            // 处理十六进制颜色
            if (color.startsWith('#')) {
                if (color.length === 4) {
                    // 缩写形式 #RGB
                    color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
                }
                if (color.length === 7) {
                    const rgb = hexToRgb(color);
                    return { type: 'hex', value: color, rgb: rgb };
                }
            }
            
            // 处理 RGB 颜色
            if (color.startsWith('rgb(')) {
                const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                if (match) {
                    const r = parseInt(match[1]);
                    const g = parseInt(match[2]);
                    const b = parseInt(match[3]);
                    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                        return { type: 'rgb', value: color, rgb: { r, g, b } };
                    }
                }
            }
            
            // 处理 RGBA 颜色
            if (color.startsWith('rgba(')) {
                const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
                if (match) {
                    const r = parseInt(match[1]);
                    const g = parseInt(match[2]);
                    const b = parseInt(match[3]);
                    const a = parseFloat(match[4]);
                    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
                        return { type: 'rgba', value: color, rgb: { r, g, b, a } };
                    }
                }
            }
            
            // 处理 HSL 颜色
            if (color.startsWith('hsl(')) {
                const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
                if (match) {
                    const h = parseInt(match[1]);
                    const s = parseInt(match[2]);
                    const l = parseInt(match[3]);
                    if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
                        return { type: 'hsl', value: color, hsl: { h, s, l } };
                    }
                }
            }
            
            return null;
        }
        
        // 生成调色板
        function generatePalette(r, g, b) {
            if (!colorPalette) return;
            
            colorPalette.innerHTML = '';
            
            // 生成不同色调的颜色
            const colors = [
                rgbToHex(r, g, b), // 原始颜色
                rgbToHex(Math.max(0, r - 50), Math.max(0, g - 50), Math.max(0, b - 50)), // 变暗
                rgbToHex(Math.min(255, r + 50), Math.min(255, g + 50), Math.min(255, b + 50)), // 变亮
                rgbToHex(g, b, r), // 色调偏移
                rgbToHex(b, r, g) // 色调偏移
            ];
            
            colors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'palette-color';
                colorDiv.style.backgroundColor = color;
                
                const colorText = document.createElement('span');
                colorText.textContent = color;
                colorDiv.appendChild(colorText);
                
                // 点击复制颜色代码
                colorDiv.addEventListener('click', () => {
                    navigator.clipboard.writeText(color).then(() => {
                        const originalText = colorText.textContent;
                        colorText.textContent = '已复制!';
                        setTimeout(() => {
                            colorText.textContent = originalText;
                        }, 1500);
                    });
                });
                
                colorPalette.appendChild(colorDiv);
            });
        }
        
        // 转换颜色
        function convertColor() {
            console.log('转换颜色按钮点击');
            const input = colorInput.value;
            const format = colorFormat.value;
            
            const parsedColor = parseColor(input);
            if (!parsedColor) {
                colorResult.value = '请输入有效的颜色代码';
                return;
            }
            
            try {
                let result;
                const rgb = parsedColor.rgb;
                
                switch (format) {
                    case 'hex':
                        result = rgbToHex(rgb.r, rgb.g, rgb.b);
                        break;
                    case 'rgb':
                        result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                        break;
                    case 'rgba':
                        result = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                        break;
                    case 'hsl':
                        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                        result = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
                        break;
                    default:
                        result = input;
                }
                
                colorResult.value = result;
                if (colorPreview) colorPreview.style.backgroundColor = result;
                generatePalette(rgb.r, rgb.g, rgb.b);
                
            } catch (error) {
                console.error('转换颜色时出错:', error);
                colorResult.value = '转换颜色时出错，请重试';
            }
        }
        
        // 绑定事件
        convertColorBtn.addEventListener('click', convertColor);
        
        // 初始转换
        convertColor();
    }
    
    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initColorTool);
    } else {
        initColorTool();
    }
    
    // PJAX兼容
    document.addEventListener('pjax:success', function() {
        console.log('PJAX加载完成，重新初始化颜色工具');
        setTimeout(initColorTool, 100);
    });
    
    // 传统window.onload作为备用
    window.addEventListener('load', function() {
        console.log('Window load事件，确保颜色工具初始化');
        setTimeout(initColorTool, 100);
    });
</script>