---
title: 颜色工具
slug: color-tool
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
            <label for="color-input">输入颜色值：</label>
            <input type="text" id="color-input" placeholder="例如: #FF5733, rgb(255,87,51), hsl(9,100%,60%)" value="#FF5733">
        </div>
        <div class="input-group">
            <label>颜色预览：</label>
            <div id="color-preview" style="width: 100%; height: 60px; border: 1px solid #ccc; border-radius: 8px; background-color: #FF5733;"></div>
        </div>
        <button id="convert-btn" class="tool-button">转换颜色</button>
        <div class="result-group">
            <label for="hex-result">HEX：</label>
            <input type="text" id="hex-result" readonly>
        </div>
        <div class="result-group">
            <label for="rgb-result">RGB：</label>
            <input type="text" id="rgb-result" readonly>
        </div>
        <div class="result-group">
            <label for="hsl-result">HSL：</label>
            <input type="text" id="hsl-result" readonly>
        </div>
        <div class="result-group">
            <label for="hsv-result">HSV：</label>
            <input type="text" id="hsv-result" readonly>
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
    }
</style>

<script>
    // 颜色工具功能
    function initColorTool() {
        console.log('初始化颜色工具');
        
        // 获取 DOM 元素
        const colorInput = document.getElementById('color-input');
        const colorPreview = document.getElementById('color-preview');
        const convertBtn = document.getElementById('convert-btn');
        const hexResult = document.getElementById('hex-result');
        const rgbResult = document.getElementById('rgb-result');
        const hslResult = document.getElementById('hsl-result');
        const hsvResult = document.getElementById('hsv-result');
        
        console.log('工具元素:', {
            colorInput: !!colorInput,
            colorPreview: !!colorPreview,
            convertBtn: !!convertBtn,
            hexResult: !!hexResult,
            rgbResult: !!rgbResult,
            hslResult: !!hslResult,
            hsvResult: !!hsvResult
        });
        
        if (!colorInput || !convertBtn || !hexResult) {
            console.error('颜色工具：缺少必要的DOM元素');
            return;
        }
        
        // 颜色转换函数
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
            
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        }
        
        function rgbToHsv(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, v = max;
            
            const d = max - min;
            s = max === 0 ? 0 : d / max;
            
            if (max === min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                v: Math.round(v * 100)
            };
        }
        
        // 解析颜色输入
        function parseColor(input) {
            input = input.trim();
            
            // HEX格式
            if (input.match(/^#?[0-9a-f]{6}$/i)) {
                if (!input.startsWith('#')) input = '#' + input;
                return hexToRgb(input);
            }
            
            // RGB格式
            const rgbMatch = input.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
            if (rgbMatch) {
                return {
                    r: parseInt(rgbMatch[1]),
                    g: parseInt(rgbMatch[2]),
                    b: parseInt(rgbMatch[3])
                };
            }
            
            // HSL格式
            const hslMatch = input.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i);
            if (hslMatch) {
                const h = parseInt(hslMatch[1]) / 360;
                const s = parseInt(hslMatch[2]) / 100;
                const l = parseInt(hslMatch[3]) / 100;
                
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                
                let r, g, b;
                if (s === 0) {
                    r = g = b = l;
                } else {
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1/3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1/3);
                }
                
                return {
                    r: Math.round(r * 255),
                    g: Math.round(g * 255),
                    b: Math.round(b * 255)
                };
            }
            
            return null;
        }
        
        // 转换颜色函数
        function convertColor() {
            console.log('转换颜色按钮点击');
            const input = colorInput.value;
            const rgb = parseColor(input);
            
            if (!rgb) {
                hexResult.value = '无效的颜色格式';
                rgbResult.value = '';
                hslResult.value = '';
                hsvResult.value = '';
                return;
            }
            
            try {
                // 更新预览
                const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                if (colorPreview) {
                    colorPreview.style.backgroundColor = hex;
                }
                
                // 转换到各种格式
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
                
                // 显示结果
                hexResult.value = hex.toUpperCase();
                rgbResult.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                hslResult.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
                hsvResult.value = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
                
            } catch (error) {
                console.error('转换颜色时出错:', error);
                hexResult.value = '转换失败，请检查输入格式';
            }
        }
        
        // 绑定事件
        convertBtn.addEventListener('click', convertColor);
        
        // 输入时实时预览
        colorInput.addEventListener('input', function() {
            const rgb = parseColor(this.value);
            if (rgb && colorPreview) {
                const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                colorPreview.style.backgroundColor = hex;
            }
        });
        
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