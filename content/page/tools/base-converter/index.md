---
title: 进制转换器
layout: "tools"
slug: "base-converter"
comments: false
---

<div class="tool-page-header">
    <h2>进制转换器</h2>
    <p>支持二进制、八进制、十进制、十六进制之间的转换</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="input-value">输入值：</label>
            <div class="input-wrapper">
                <input type="text" id="input-value" placeholder="请输入要转换的值" class="modern-input">
                <span class="input-icon">🔢</span>
            </div>
        </div>
        <div class="input-group">
            <label for="from-base">从进制：</label>
            <div class="select-wrapper">
                <select id="from-base" class="modern-select">
                    <option value="2">二进制 (2)</option>
                    <option value="8">八进制 (8)</option>
                    <option value="10" selected>十进制 (10)</option>
                    <option value="16">十六进制 (16)</option>
                </select>
                <span class="select-icon">⬇️</span>
            </div>
        </div>
        <div class="input-group">
            <label for="to-base">到进制：</label>
            <div class="select-wrapper">
                <select id="to-base" class="modern-select">
                    <option value="2">二进制 (2)</option>
                    <option value="8">八进制 (8)</option>
                    <option value="10">十进制 (10)</option>
                    <option value="16" selected>十六进制 (16)</option>
                </select>
                <span class="select-icon">⬇️</span>
            </div>
        </div>
        <button id="convert-btn" class="convert-button modern-button" onclick="convertNumber()">
            <span class="button-icon">⚡</span>
            <span class="button-text">转换</span>
        </button>
        <div class="result-group">
            <label for="result-value">转换结果：</label>
            <div class="result-wrapper">
                <input type="text" id="result-value" readonly class="result-input">
                <span class="result-icon">✅</span>
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
        margin-bottom: 24px;
    }

    .input-group label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        transition: color 0.3s ease;
    }

    /* 输入框包装器 */
    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    /* 现代化输入框 */
    .modern-input {
        width: 100%;
        padding: 14px 50px 14px 16px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        font-size: 16px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .modern-input:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15), 0 4px 15px rgba(255, 183, 197, 0.2);
        transform: translateY(-1px);
    }

    /* 输入框图标 */
    .input-icon {
        position: absolute;
        right: 16px;
        font-size: 18px;
        color: #718096;
        transition: color 0.3s ease;
    }

    .input-wrapper:focus-within .input-icon {
        color: #FFB7C5;
        transform: scale(1.1);
    }

    /* 选择框包装器 */
    .select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    /* 现代化选择框 */
    .modern-select {
        width: 100%;
        padding: 14px 50px 14px 16px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        font-size: 16px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
    }

    .modern-select:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15), 0 4px 15px rgba(255, 183, 197, 0.2);
        transform: translateY(-1px);
    }

    /* 选择框图标 */
    .select-icon {
        position: absolute;
        right: 16px;
        font-size: 16px;
        color: #718096;
        transition: all 0.3s ease;
        pointer-events: none;
    }

    .select-wrapper:focus-within .select-icon {
        color: #FFB7C5;
        transform: rotate(180deg);
    }

    /* 现代化按钮 */
    .modern-button {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
    }

    .modern-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        background: linear-gradient(135deg, #45a049, #3d8b40);
    }

    .modern-button:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    }

    /* 按钮图标 */
    .button-icon {
        font-size: 18px;
        transition: transform 0.3s ease;
    }

    .modern-button:hover .button-icon {
        transform: scale(1.1) rotate(10deg);
    }

    /* 结果组样式 */
    .result-group {
        margin-top: 24px;
    }

    .result-group label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        transition: color 0.3s ease;
    }

    /* 结果包装器 */
    .result-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    /* 结果输入框 */
    .result-input {
        width: 100%;
        padding: 16px 50px 16px 16px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        background: linear-gradient(135deg, rgba(249, 249, 249, 0.9), rgba(249, 249, 249, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        box-sizing: border-box;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .result-input:focus {
        outline: none;
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15);
    }

    /* 结果图标 */
    .result-icon {
        position: absolute;
        right: 16px;
        font-size: 18px;
        color: #4CAF50;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* 暗黑模式适配 */
    .dark .modern-input,
    .dark .modern-select,
    .dark .result-input {
        border-color: rgba(255, 255, 255, 0.1);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .dark .modern-input:focus,
    .dark .modern-select:focus,
    .dark .result-input:focus {
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15), 0 4px 15px rgba(255, 183, 197, 0.2);
    }

    .dark .input-icon,
    .dark .select-icon {
        color: #a0aec0;
    }

    .dark .input-wrapper:focus-within .input-icon,
    .dark .select-wrapper:focus-within .select-icon {
        color: #FFB7C5;
    }

    .dark .modern-button {
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
    }

    .dark .modern-button:hover {
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
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
    // 进制转换器功能实现
    window.onload = function() {
        console.log('Window loaded, initializing converter');
        
        // 获取 DOM 元素
        const inputValue = document.getElementById('input-value');
        const fromBase = document.getElementById('from-base');
        const toBase = document.getElementById('to-base');
        const convertBtn = document.getElementById('convert-btn');
        const resultValue = document.getElementById('result-value');
        
        console.log('Converter elements:', {
            inputValue: !!inputValue,
            fromBase: !!fromBase,
            toBase: !!toBase,
            convertBtn: !!convertBtn,
            resultValue: !!resultValue
        });
        
        // 转换函数
        window.convertNumber = function() {
            console.log('Convert button clicked');
            const value = inputValue.value.trim();
            if (!value) {
                resultValue.value = '请输入要转换的值';
                console.log('No input value');
                return;
            }
            
            const from = parseInt(fromBase.value);
            const to = parseInt(toBase.value);
            
            console.log('Conversion details:', {
                value: value,
                from: from,
                to: to
            });
            
            try {
                // 将输入值转换为十进制
                const decimalValue = parseInt(value, from);
                if (isNaN(decimalValue)) {
                    throw new Error('输入值不是有效的' + from + '进制数');
                }
                
                // 将十进制转换为目标进制
                let result;
                if (to === 16) {
                    result = decimalValue.toString(16).toUpperCase();
                } else {
                    result = decimalValue.toString(to);
                }
                
                resultValue.value = result;
                console.log('Conversion result:', result);
            } catch (error) {
                resultValue.value = error.message;
                console.error('Conversion error:', error.message);
            }
        };
        
        // 按下回车键时自动转换
        if (inputValue) {
            inputValue.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    console.log('Enter key pressed');
                    window.convertNumber();
                }
            });
        }
        
        // 初始化代码复制功能
        initCodeCopy();
    };
    
    // 代码复制功能
    function initCodeCopy() {
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeBlock = this.previousElementSibling;
                const code = codeBlock.textContent;
                
                navigator.clipboard.writeText(code).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '已复制!';
                    this.style.backgroundColor = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                });
            });
        });
    }
</script>

<!-- 代码复制区域 -->
<div class="code-copy-section">
    <h3>代码复制</h3>
    <p>以下是本工具的实现代码，你可以复制使用：</p>
    
    <div class="code-block">
        <h4>HTML 结构</h4>
        <div class="code-container">
            <pre><code>&lt;div class="tool-page-header"&gt;
    &lt;h2&gt;进制转换器&lt;/h2&gt;
    &lt;p&gt;支持二进制、八进制、十进制、十六进制之间的转换&lt;/p&gt;
&lt;/div&gt;

&lt;div class="tool-content-container"&gt;
    &lt;div class="tool-implementation"&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="input-value"&gt;输入值：&lt;/label&gt;
            &lt;input type="text" id="input-value" placeholder="请输入要转换的值"&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="from-base"&gt;从进制：&lt;/label&gt;
            &lt;select id="from-base"&gt;
                &lt;option value="2"&gt;二进制 (2)&lt;/option&gt;
                &lt;option value="8"&gt;八进制 (8)&lt;/option&gt;
                &lt;option value="10" selected&gt;十进制 (10)&lt;/option&gt;
                &lt;option value="16"&gt;十六进制 (16)&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="to-base"&gt;到进制：&lt;/label&gt;
            &lt;select id="to-base"&gt;
                &lt;option value="2"&gt;二进制 (2)&lt;/option&gt;
                &lt;option value="8"&gt;八进制 (8)&lt;/option&gt;
                &lt;option value="10"&gt;十进制 (10)&lt;/option&gt;
                &lt;option value="16" selected&gt;十六进制 (16)&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;button id="convert-btn" class="convert-button" onclick="convertNumber()"&gt;转换&lt;/button&gt;
        &lt;div class="result-group"&gt;
            &lt;label for="result-value"&gt;转换结果：&lt;/label&gt;
            &lt;input type="text" id="result-value" readonly&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class="tool-page-footer"&gt;
    &lt;a href="/blog/tools/" class="back-to-tools"&gt;← 返回工具列表&lt;/a&gt;
&lt;/div&gt;</code></pre>
            <button class="copy-button">复制代码</button>
        </div>
    </div>
    
    <div class="code-block">
        <h4>JavaScript 代码</h4>
        <div class="code-container">
            <pre><code>// 进制转换器功能实现
window.onload = function() {
    // 获取 DOM 元素
    const inputValue = document.getElementById('input-value');
    const fromBase = document.getElementById('from-base');
    const toBase = document.getElementById('to-base');
    const convertBtn = document.getElementById('convert-btn');
    const resultValue = document.getElementById('result-value');
    
    // 转换函数
    window.convertNumber = function() {
        const value = inputValue.value.trim();
        if (!value) {
            resultValue.value = '请输入要转换的值';
            return;
        }
        
        const from = parseInt(fromBase.value);
        const to = parseInt(toBase.value);
        
        try {
            // 将输入值转换为十进制
            const decimalValue = parseInt(value, from);
            if (isNaN(decimalValue)) {
                throw new Error('输入值不是有效的' + from + '进制数');
            }
            
            // 将十进制转换为目标进制
            let result;
            if (to === 16) {
                result = decimalValue.toString(16).toUpperCase();
            } else {
                result = decimalValue.toString(to);
            }
            
            resultValue.value = result;
        } catch (error) {
            resultValue.value = error.message;
        }
    };
    
    // 按下回车键时自动转换
    if (inputValue) {
        inputValue.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.convertNumber();
            }
        });
    }
};</code></pre>
            <button class="copy-button">复制代码</button>
        </div>
    </div>
</div>

<style>
    /* 代码复制区域样式 */
    .code-copy-section {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
        margin-top: 60px;
        margin-bottom: 40px;
    }
    
    .code-copy-section h3 {
        color: #FFB7C5;
        font-size: 20px;
        margin-bottom: 15px;
        text-align: center;
    }
    
    .code-copy-section p {
        color: #718096;
        font-size: 14px;
        margin-bottom: 30px;
        text-align: center;
    }
    
    .code-block {
        margin-bottom: 30px;
    }
    
    .code-block h4 {
        color: #4a5568;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 600;
    }
    
    .code-container {
        position: relative;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
    }
    
    .code-container pre {
        margin: 0;
        padding: 20px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.4;
        color: #4a5568;
        background: transparent;
    }
    
    .code-container code {
        font-family: 'Courier New', monospace;
    }
    
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.1);
        color: #4a5568;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    
    /* 暗黑模式适配 */
    .dark .code-copy-section h3 {
        color: #FFB7C5;
    }
    
    .dark .code-copy-section p {
        color: #a0aec0;
    }
    
    .dark .code-block h4 {
        color: #e2e8f0;
    }
    
    .dark .code-container {
        background: rgba(255, 255, 255, 0.03);
        border-color: rgba(255, 255, 255, 0.05);
    }
    
    .dark .code-container pre {
        color: #e2e8f0;
    }
    
    .dark .copy-button {
        background: rgba(255, 255, 255, 0.05);
        color: #e2e8f0;
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .dark .copy-button:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .code-copy-section {
            padding: 0 16px;
            margin-top: 40px;
        }
        
        .code-copy-section h3 {
            font-size: 18px;
        }
        
        .code-container pre {
            padding: 16px;
            font-size: 12px;
        }
        
        .copy-button {
            padding: 4px 8px;
            font-size: 10px;
        }
    }
</style>