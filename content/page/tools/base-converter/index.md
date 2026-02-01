---
title: 进制转换器
slug: base-converter
layout: "page"
comments: false
---

<div class="tool-page-header">
    <h2>进制转换器</h2>
    <p>支持2-36进制之间的数值转换</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="input-number">输入数值：</label>
            <input type="text" id="input-number" placeholder="请输入要转换的数值" value="255">
        </div>
        <div class="input-group">
            <label for="from-base">源进制：</label>
            <select id="from-base">
                <option value="2">二进制 (2)</option>
                <option value="8">八进制 (8)</option>
                <option value="10" selected>十进制 (10)</option>
                <option value="16">十六进制 (16)</option>
                <option value="custom-from">自定义进制</option>
            </select>
        </div>
        <div class="input-group" id="custom-from-group" style="display: none;">
            <label for="custom-from-base">自定义源进制 (2-36)：</label>
            <input type="number" id="custom-from-base" min="2" max="36" value="10">
        </div>
        <div class="input-group">
            <label for="to-base">目标进制：</label>
            <select id="to-base">
                <option value="2">二进制 (2)</option>
                <option value="8">八进制 (8)</option>
                <option value="10">十进制 (10)</option>
                <option value="16" selected>十六进制 (16)</option>
                <option value="custom-to">自定义进制</option>
            </select>
        </div>
        <div class="input-group" id="custom-to-group" style="display: none;">
            <label for="custom-to-base">自定义目标进制 (2-36)：</label>
            <input type="number" id="custom-to-base" min="2" max="36" value="16">
        </div>
        <button id="convert-btn" class="tool-button">转换</button>
        <div class="result-group">
            <label for="result-number">转换结果：</label>
            <input type="text" id="result-number" readonly>
        </div>
        <div class="result-group">
            <label>常用进制对照：</label>
            <div id="common-bases" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                <div>二进制: <span id="binary-result">-</span></div>
                <div>八进制: <span id="octal-result">-</span></div>
                <div>十进制: <span id="decimal-result">-</span></div>
                <div>十六进制: <span id="hex-result">-</span></div>
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

    /* 常用进制对照样式 */
    #common-bases {
        background: rgba(255, 255, 255, 0.5);
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 14px;
    }

    #common-bases div {
        padding: 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
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

    .dark #common-bases {
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
    }

    .dark #common-bases div {
        background: rgba(255, 255, 255, 0.05);
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

        #common-bases {
            grid-template-columns: 1fr;
            font-size: 12px;
        }
    }
</style>

<script>
    // 进制转换器功能
    function initBaseConverter() {
        console.log('初始化进制转换器');
        
        // 获取 DOM 元素
        const inputNumber = document.getElementById('input-number');
        const fromBase = document.getElementById('from-base');
        const toBase = document.getElementById('to-base');
        const customFromGroup = document.getElementById('custom-from-group');
        const customToGroup = document.getElementById('custom-to-group');
        const customFromBase = document.getElementById('custom-from-base');
        const customToBase = document.getElementById('custom-to-base');
        const convertBtn = document.getElementById('convert-btn');
        const resultNumber = document.getElementById('result-number');
        const binaryResult = document.getElementById('binary-result');
        const octalResult = document.getElementById('octal-result');
        const decimalResult = document.getElementById('decimal-result');
        const hexResult = document.getElementById('hex-result');
        
        console.log('工具元素:', {
            inputNumber: !!inputNumber,
            fromBase: !!fromBase,
            toBase: !!toBase,
            convertBtn: !!convertBtn,
            resultNumber: !!resultNumber
        });
        
        if (!inputNumber || !fromBase || !toBase || !convertBtn || !resultNumber) {
            console.error('进制转换器：缺少必要的DOM元素');
            return;
        }
        
        // 显示/隐藏自定义进制输入
        function toggleCustomBase() {
            if (customFromGroup) {
                customFromGroup.style.display = fromBase.value === 'custom-from' ? 'block' : 'none';
            }
            if (customToGroup) {
                customToGroup.style.display = toBase.value === 'custom-to' ? 'block' : 'none';
            }
        }
        
        // 获取实际进制值
        function getActualBase(selectElement, customElement) {
            const value = selectElement.value;
            if (value === 'custom-from' || value === 'custom-to') {
                return parseInt(customElement.value) || 10;
            }
            return parseInt(value);
        }
        
        // 验证数字在指定进制下是否有效
        function isValidNumber(number, base) {
            const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
            return number.toUpperCase().split('').every(char => validChars.includes(char));
        }
        
        // 进制转换函数
        function convertBase() {
            console.log('进制转换按钮点击');
            const input = inputNumber.value.trim();
            
            if (!input) {
                resultNumber.value = '请输入数值';
                return;
            }
            
            try {
                const fromBaseValue = getActualBase(fromBase, customFromBase);
                const toBaseValue = getActualBase(toBase, customToBase);
                
                console.log('转换详情:', {
                    input: input,
                    fromBase: fromBaseValue,
                    toBase: toBaseValue
                });
                
                // 验证进制范围
                if (fromBaseValue < 2 || fromBaseValue > 36 || toBaseValue < 2 || toBaseValue > 36) {
                    resultNumber.value = '进制必须在2-36之间';
                    return;
                }
                
                // 验证输入数字在源进制下是否有效
                if (!isValidNumber(input, fromBaseValue)) {
                    resultNumber.value = `输入的数字在${fromBaseValue}进制下无效`;
                    return;
                }
                
                // 转换为十进制
                const decimalValue = parseInt(input, fromBaseValue);
                
                if (isNaN(decimalValue)) {
                    resultNumber.value = '无效的数字格式';
                    return;
                }
                
                // 转换为目标进制
                const result = decimalValue.toString(toBaseValue).toUpperCase();
                resultNumber.value = result;
                
                // 更新常用进制对照
                if (binaryResult) binaryResult.textContent = decimalValue.toString(2);
                if (octalResult) octalResult.textContent = decimalValue.toString(8);
                if (decimalResult) decimalResult.textContent = decimalValue.toString(10);
                if (hexResult) hexResult.textContent = decimalValue.toString(16).toUpperCase();
                
            } catch (error) {
                console.error('进制转换时出错:', error);
                resultNumber.value = '转换失败，请检查输入';
            }
        }
        
        // 绑定事件
        convertBtn.addEventListener('click', convertBase);
        
        // 进制选择变化时显示/隐藏自定义输入
        fromBase.addEventListener('change', toggleCustomBase);
        toBase.addEventListener('change', toggleCustomBase);
        
        // 输入时实时转换
        inputNumber.addEventListener('input', convertBase);
        if (customFromBase) customFromBase.addEventListener('input', convertBase);
        if (customToBase) customToBase.addEventListener('input', convertBase);
        fromBase.addEventListener('change', convertBase);
        toBase.addEventListener('change', convertBase);
        
        // 初始化
        toggleCustomBase();
        convertBase();
    }
    
    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBaseConverter);
    } else {
        initBaseConverter();
    }
    
    // PJAX兼容
    document.addEventListener('pjax:success', function() {
        console.log('PJAX加载完成，重新初始化进制转换器');
        setTimeout(initBaseConverter, 100);
    });
    
    // 传统window.onload作为备用
    window.addEventListener('load', function() {
        console.log('Window load事件，确保进制转换器初始化');
        setTimeout(initBaseConverter, 100);
    });
</script>