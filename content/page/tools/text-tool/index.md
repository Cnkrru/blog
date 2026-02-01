---
title: 文本处理工具
layout: "tools"
slug: "tools/text-tool"
comments: false
---

<div class="tool-page-header">
    <h2>文本处理工具</h2>
    <p>文本格式化、大小写转换、字符统计等功能</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="text-input">输入文本：</label>
            <div class="input-wrapper">
                <textarea id="text-input" rows="6" placeholder="请输入要处理的文本" class="modern-input"></textarea>
                <span class="input-icon">📝</span>
            </div>
        </div>
        <div class="tool-controls">
            <button class="tool-button modern-button" onclick="convertToUppercase()">
                <span class="button-icon">🔠</span>
                <span class="button-text">转换为大写</span>
            </button>
            <button class="tool-button modern-button" onclick="convertToLowercase()">
                <span class="button-icon">🔡</span>
                <span class="button-text">转换为小写</span>
            </button>
            <button class="tool-button modern-button" onclick="capitalizeFirst()">
                <span class="button-icon">🔤</span>
                <span class="button-text">首字母大写</span>
            </button>
            <button class="tool-button modern-button" onclick="countCharacters()">
                <span class="button-icon">📊</span>
                <span class="button-text">字符统计</span>
            </button>
            <button class="tool-button modern-button" onclick="clearText()">
                <span class="button-icon">🗑️</span>
                <span class="button-text">清空</span>
            </button>
        </div>
        <div class="result-group">
            <label for="text-output">处理结果：</label>
            <div class="input-wrapper">
                <textarea id="text-output" rows="6" readonly class="result-input"></textarea>
                <span class="result-icon">📄</span>
            </div>
        </div>
        <div class="result-stats">
            <p id="text-stats">字符数: 0 | 单词数: 0 | 行数: 0</p>
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
        max-width: 800px;
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
        align-items: flex-start;
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
        resize: vertical;
        min-height: 120px;
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
        top: 16px;
        font-size: 18px;
        color: #718096;
        transition: color 0.3s ease;
    }

    .input-wrapper:focus-within .input-icon {
        color: #FFB7C5;
        transform: scale(1.1);
    }

    /* 工具控制按钮 */
    .tool-controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        margin-bottom: 24px;
    }

    /* 现代化按钮 */
    .modern-button {
        padding: 14px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
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
        font-size: 16px;
        transition: transform 0.3s ease;
    }

    .modern-button:hover .button-icon {
        transform: scale(1.1) rotate(10deg);
    }

    .button-text {
        font-size: 14px;
    }

    /* 结果组样式 */
    .result-group {
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .result-group label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        transition: color 0.3s ease;
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
        resize: vertical;
        min-height: 120px;
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
        top: 16px;
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

    /* 结果统计 */
    .result-stats {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .result-stats:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .result-stats p {
        margin: 0;
        color: #718096;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
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
        transition: all 0.3s ease;
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

    .dark .modern-input,
    .dark .result-input {
        border-color: rgba(255, 255, 255, 0.1);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .dark .modern-input:focus,
    .dark .result-input:focus {
        border-color: #FFB7C5;
        box-shadow: 0 0 0 4px rgba(255, 183, 197, 0.15), 0 4px 15px rgba(255, 183, 197, 0.2);
    }

    .dark .input-icon {
        color: #a0aec0;
    }

    .dark .input-wrapper:focus-within .input-icon {
        color: #FFB7C5;
    }

    .dark .modern-button {
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
    }

    .dark .modern-button:hover {
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
    }

    .dark .result-stats {
        background: rgba(255, 255, 255, 0.03);
        border-color: rgba(255, 255, 255, 0.05);
    }

    .dark .result-stats p {
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

        .input-group {
            margin-bottom: 20px;
        }

        .modern-input,
        .result-input {
            padding: 12px 40px 12px 12px;
            font-size: 14px;
            min-height: 100px;
        }

        .tool-controls {
            gap: 8px;
            margin-bottom: 20px;
        }

        .modern-button {
            padding: 12px;
            font-size: 13px;
        }

        .button-text {
            font-size: 13px;
        }

        .result-stats {
            padding: 12px;
        }

        .result-stats p {
            font-size: 13px;
        }

        .tool-page-footer {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
</style>

<script>
    // 文本处理工具功能实现
    window.onload = function() {
        console.log('Window loaded, initializing text tool');
        
        // 获取 DOM 元素
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        
        // 监听文本输入变化，自动更新统计信息
        if (textInput) {
            textInput.addEventListener('input', function() {
                updateTextStats();
            });
        }
        
        // 初始化代码复制功能
        initCodeCopy();
    };

    // 转换为大写
    function convertToUppercase() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        if (textInput && textOutput) {
            textOutput.value = textInput.value.toUpperCase();
            updateTextStats();
        }
    }

    // 转换为小写
    function convertToLowercase() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        if (textInput && textOutput) {
            textOutput.value = textInput.value.toLowerCase();
            updateTextStats();
        }
    }

    // 首字母大写
    function capitalizeFirst() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        if (textInput && textOutput) {
            const text = textInput.value;
            const capitalized = text.split(' ').map(word => {
                if (word.length === 0) return '';
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
            textOutput.value = capitalized;
            updateTextStats();
        }
    }

    // 字符统计
    function countCharacters() {
        updateTextStats();
    }

    // 清空文本
    function clearText() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        if (textInput && textOutput) {
            textInput.value = '';
            textOutput.value = '';
            updateTextStats();
        }
    }

    // 更新文本统计信息
    function updateTextStats() {
        const textInput = document.getElementById('text-input');
        const textStats = document.getElementById('text-stats');
        if (textInput && textStats) {
            const text = textInput.value;
            const charCount = text.length;
            const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            const lineCount = text.split('\n').length;
            
            textStats.textContent = `字符数: ${charCount} | 单词数: ${wordCount} | 行数: ${lineCount}`;
        }
    }
    
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
    &lt;h2&gt;文本处理工具&lt;/h2&gt;
    &lt;p&gt;文本格式化、大小写转换、字符统计等功能&lt;/p&gt;
&lt;/div&gt;

&lt;div class="tool-content-container"&gt;
    &lt;div class="tool-implementation"&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="text-input"&gt;输入文本：&lt;/label&gt;
            &lt;textarea id="text-input" rows="6" placeholder="请输入要处理的文本"&gt;&lt;/textarea&gt;
        &lt;/div&gt;
        &lt;div class="tool-controls"&gt;
            &lt;button class="tool-button" onclick="convertToUppercase()"&gt;转换为大写&lt;/button&gt;
            &lt;button class="tool-button" onclick="convertToLowercase()"&gt;转换为小写&lt;/button&gt;
            &lt;button class="tool-button" onclick="capitalizeFirst()"&gt;首字母大写&lt;/button&gt;
            &lt;button class="tool-button" onclick="countCharacters()"&gt;字符统计&lt;/button&gt;
            &lt;button class="tool-button" onclick="clearText()"&gt;清空&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class="result-group"&gt;
            &lt;label for="text-output"&gt;处理结果：&lt;/label&gt;
            &lt;textarea id="text-output" rows="6" readonly&gt;&lt;/textarea&gt;
        &lt;/div&gt;
        &lt;div class="result-stats"&gt;
            &lt;p id="text-stats"&gt;字符数: 0 | 单词数: 0 | 行数: 0&lt;/p&gt;
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
            <pre><code>// 文本处理工具功能实现
window.onload = function() {
    // 获取 DOM 元素
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    
    // 监听文本输入变化，自动更新统计信息
    if (textInput) {
        textInput.addEventListener('input', function() {
            updateTextStats();
        });
    }
};

// 转换为大写
function convertToUppercase() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    if (textInput && textOutput) {
        textOutput.value = textInput.value.toUpperCase();
        updateTextStats();
    }
}

// 转换为小写
function convertToLowercase() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    if (textInput && textOutput) {
        textOutput.value = textInput.value.toLowerCase();
        updateTextStats();
    }
}

// 首字母大写
function capitalizeFirst() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    if (textInput && textOutput) {
        const text = textInput.value;
        const capitalized = text.split(' ').map(word => {
            if (word.length === 0) return '';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        textOutput.value = capitalized;
        updateTextStats();
    }
}

// 字符统计
function countCharacters() {
    updateTextStats();
}

// 清空文本
function clearText() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    if (textInput && textOutput) {
        textInput.value = '';
        textOutput.value = '';
        updateTextStats();
    }
}

// 更新文本统计信息
function updateTextStats() {
    const textInput = document.getElementById('text-input');
    const textStats = document.getElementById('text-stats');
    if (textInput && textStats) {
        const text = textInput.value;
        const charCount = text.length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
        const lineCount = text.split('\\n').length;
        
        textStats.textContent = `字符数: ${charCount} | 单词数: ${wordCount} | 行数: ${lineCount}`;
    }
}</code></pre>
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