---
title: 文本处理工具
slug: text-tool
layout: "page"
comments: false
---

<div class="tool-page-header">
    <h2>文本处理工具</h2>
    <p>提供文本格式化、大小写转换、字符统计等功能</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="text-input">输入文本：</label>
            <textarea id="text-input" placeholder="请输入要处理的文本" rows="6"></textarea>
        </div>
        <div class="input-group">
            <label for="text-operation">操作类型：</label>
            <select id="text-operation">
                <option value="uppercase">转为大写</option>
                <option value="lowercase">转为小写</option>
                <option value="capitalize">首字母大写</option>
                <option value="count">字符统计</option>
                <option value="trim">去除首尾空格</option>
            </select>
        </div>
        <button id="process-btn" class="tool-button">处理文本</button>
        <div class="result-group">
            <label for="text-result">处理结果：</label>
            <textarea id="text-result" readonly rows="6"></textarea>
        </div>
        <div class="result-group" id="text-stats" style="display: none;">
            <label>统计信息：</label>
            <div id="stats-content">
                <p>字符数：<span id="char-count">0</span></p>
                <p>单词数：<span id="word-count">0</span></p>
                <p>行数：<span id="line-count">0</span></p>
            </div>
        </div>
    </div>
</div>

<div class="tool-page-footer">
    <a href="/blog/tools/" class="back-to-tools">← 返回工具列表</a>
</div>

<!-- 代码展示区域 -->
<div class="code-display-section">
    <div class="code-header">
        <h3>实现代码</h3>
        <p>查看此工具的实现代码</p>
        <button id="toggle-code-btn" class="toggle-code-btn">显示代码</button>
    </div>
    
    <div id="code-content" class="code-content" style="display: none;">
        <div class="code-tabs">
            <button class="code-tab active" data-lang="html">HTML</button>
            <button class="code-tab" data-lang="css">CSS</button>
            <button class="code-tab" data-lang="js">JavaScript</button>
        </div>
        
        <div class="code-panel active" id="html-code">
            <pre><code>&lt;div class="tool-implementation"&gt;
    &lt;div class="input-group"&gt;
        &lt;label for="text-input"&gt;输入文本：&lt;/label&gt;
        &lt;textarea id="text-input" placeholder="请输入要处理的文本" rows="6"&gt;&lt;/textarea&gt;
    &lt;/div&gt;
    &lt;div class="input-group"&gt;
        &lt;label for="text-operation"&gt;操作类型：&lt;/label&gt;
        &lt;select id="text-operation"&gt;
            &lt;option value="uppercase"&gt;转为大写&lt;/option&gt;
            &lt;option value="lowercase"&gt;转为小写&lt;/option&gt;
            &lt;option value="capitalize"&gt;首字母大写&lt;/option&gt;
            &lt;option value="count"&gt;字符统计&lt;/option&gt;
            &lt;option value="trim"&gt;去除首尾空格&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;
    &lt;button id="process-btn" class="tool-button"&gt;处理文本&lt;/button&gt;
    &lt;div class="result-group"&gt;
        &lt;label for="text-result"&gt;处理结果：&lt;/label&gt;
        &lt;textarea id="text-result" readonly rows="6"&gt;&lt;/textarea&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        
        <div class="code-panel" id="css-code">
            <pre><code>.tool-implementation {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 30px;
    backdrop-filter: blur(10px);
}

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

.tool-button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}</code></pre>
        </div>
        
        <div class="code-panel" id="js-code">
            <pre><code>function initTextTool() {
    const textInput = document.getElementById('text-input');
    const textOperation = document.getElementById('text-operation');
    const processBtn = document.getElementById('process-btn');
    const textResult = document.getElementById('text-result');
    
    processBtn.addEventListener('click', function() {
        const text = textInput.value;
        const operation = textOperation.value;
        let result = '';
        
        switch(operation) {
            case 'uppercase':
                result = text.toUpperCase();
                break;
            case 'lowercase':
                result = text.toLowerCase();
                break;
            case 'capitalize':
                result = text.split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
                break;
            case 'trim':
                result = text.trim();
                break;
        }
        
        textResult.value = result;
    });
}

initTextTool();</code></pre>
        </div>
    </div>
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

    /* 代码展示区域样式 */
    .code-display-section {
        max-width: 1000px;
        margin: 40px auto;
        padding: 0 20px;
    }

    .code-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .code-header h3 {
        color: #FFB7C5;
        font-size: 20px;
        margin-bottom: 8px;
        font-weight: 600;
    }

    .code-header p {
        color: #AAB2C0;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .toggle-code-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .toggle-code-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .code-content {
        background: #2d3748;
        border-radius: 12px;
        overflow: hidden;
        margin-top: 20px;
    }

    .code-tabs {
        display: flex;
        background: #1a202c;
        border-bottom: 1px solid #4a5568;
    }

    .code-tab {
        background: none;
        border: none;
        color: #a0aec0;
        padding: 12px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
    }

    .code-tab.active {
        background: #2d3748;
        color: #ffffff;
        border-bottom: 2px solid #667eea;
    }

    .code-tab:hover {
        background: #2d3748;
        color: #ffffff;
    }

    .code-panel {
        display: none;
        padding: 0;
    }

    .code-panel.active {
        display: block;
    }

    .code-panel pre {
        margin: 0;
        padding: 20px;
        background: #2d3748;
        color: #e2e8f0;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.5;
        overflow-x: auto;
    }

    .code-panel code {
        background: none;
        color: inherit;
        padding: 0;
        font-size: inherit;
    }

    /* 暗黑模式下的代码展示 */
    .dark .code-header h3 {
        color: #FFB7C5;
    }

    .dark .code-header p {
        color: #a0aec0;
    }

    @media (max-width: 768px) {
        .code-display-section {
            padding: 0 16px;
        }

        .code-tabs {
            flex-wrap: wrap;
        }

        .code-tab {
            flex: 1;
            min-width: 80px;
            padding: 10px 15px;
            font-size: 13px;
        }

        .code-panel pre {
            padding: 15px;
            font-size: 12px;
        }
    }
</style>

<script>
    // 文本处理工具功能
    function initTextTool() {
        console.log('初始化文本处理工具');
        
        // 获取 DOM 元素
        const textInput = document.getElementById('text-input');
        const textOperation = document.getElementById('text-operation');
        const processBtn = document.getElementById('process-btn');
        const textResult = document.getElementById('text-result');
        const textStats = document.getElementById('text-stats');
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        const lineCount = document.getElementById('line-count');
        
        console.log('工具元素:', {
            textInput: !!textInput,
            textOperation: !!textOperation,
            processBtn: !!processBtn,
            textResult: !!textResult,
            textStats: !!textStats
        });
        
        if (!textInput || !textOperation || !processBtn || !textResult) {
            console.error('文本工具：缺少必要的DOM元素');
            return;
        }
        
        // 处理文本函数
        function processText() {
            console.log('处理文本按钮点击');
            const text = textInput.value;
            const operation = textOperation.value;
            let result = '';
            
            console.log('处理详情:', {
                text: text,
                operation: operation
            });
            
            try {
                switch(operation) {
                    case 'uppercase':
                        result = text.toUpperCase();
                        break;
                    case 'lowercase':
                        result = text.toLowerCase();
                        break;
                    case 'capitalize':
                        result = text.split(' ').map(word => {
                            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                        }).join(' ');
                        break;
                    case 'count':
                        result = text;
                        // 显示统计信息
                        if (charCount) charCount.textContent = text.length;
                        if (wordCount) wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
                        if (lineCount) lineCount.textContent = text.split('\n').length;
                        if (textStats) textStats.style.display = 'block';
                        break;
                    case 'trim':
                        result = text.trim();
                        break;
                    default:
                        result = text;
                }
                
                textResult.value = result;
                
                // 如果不是统计操作，隐藏统计信息
                if (operation !== 'count' && textStats) {
                    textStats.style.display = 'none';
                }
                
            } catch (error) {
                console.error('处理文本时出错:', error);
                textResult.value = '处理文本时出错，请重试';
            }
        }
        
        // 绑定事件
        processBtn.addEventListener('click', processText);
    }
    
    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTextTool);
    } else {
        initTextTool();
    }
    
    // PJAX兼容
    document.addEventListener('pjax:success', function() {
        console.log('PJAX加载完成，重新初始化文本工具');
        setTimeout(initTextTool, 100);
    });
    
    // 传统window.onload作为备用
    window.addEventListener('load', function() {
        console.log('Window load事件，确保文本工具初始化');
        setTimeout(initTextTool, 100);
    });

    // 代码展示功能
    function initCodeDisplay() {
        const toggleBtn = document.getElementById('toggle-code-btn');
        const codeContent = document.getElementById('code-content');
        const codeTabs = document.querySelectorAll('.code-tab');
        const codePanels = document.querySelectorAll('.code-panel');

        if (toggleBtn && codeContent) {
            toggleBtn.addEventListener('click', function() {
                if (codeContent.style.display === 'none') {
                    codeContent.style.display = 'block';
                    toggleBtn.textContent = '隐藏代码';
                } else {
                    codeContent.style.display = 'none';
                    toggleBtn.textContent = '显示代码';
                }
            });
        }

        // 代码标签页切换
        codeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                
                // 更新标签页状态
                codeTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 更新面板显示
                codePanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(lang + '-code').classList.add('active');
            });
        });
    }

    // 初始化代码展示
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeDisplay);
    } else {
        initCodeDisplay();
    }
</script>