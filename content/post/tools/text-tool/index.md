+++
date = '2026-02-02T10:00:00+08:00'
draft = false
title = '文本处理工具'
+++

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
                <textarea id="text-input" placeholder="请输入要处理的文本" class="modern-textarea"></textarea>
            </div>
        </div>

        <div class="tool-buttons">
            <button id="uppercase-btn" class="modern-button">转为大写</button>
            <button id="lowercase-btn" class="modern-button">转为小写</button>
            <button id="capitalize-btn" class="modern-button">首字母大写</button>
            <button id="trim-btn" class="modern-button">去除首尾空格</button>
            <button id="count-btn" class="modern-button">统计字符</button>
            <button id="clear-btn" class="modern-button">清空</button>
        </div>
    </div>

    <!-- 结果显示区域 -->
    <div class="result-container" id="result-container">
        <div class="result-header">
            <h3>处理结果</h3>
        </div>
        <div class="result-content">
            <div class="result-item">
                <span class="result-label">结果：</span>
                <span id="result-value" class="result-value">请输入文本并选择处理方式</span>
            </div>
        </div>
    </div>
</div>

<!-- 代码复制区域 -->
<div class="code-copy-container">
    <h3>代码实现</h3>
    <pre><code class="language-javascript">// 文本处理工具功能实现
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const resultValue = document.getElementById('result-value');
    const resultContainer = document.getElementById('result-container');

    // 转为大写
    document.getElementById('uppercase-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.toUpperCase();
        showResult(result);
    });

    // 转为小写
    document.getElementById('lowercase-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.toLowerCase();
        showResult(result);
    });

    // 首字母大写
    document.getElementById('capitalize-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.split(' ').map(word => {
            if (word.length === 0) return '';
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        showResult(result);
    });

    // 去除首尾空格
    document.getElementById('trim-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.trim();
        showResult(result);
    });

    // 统计字符
    document.getElementById('count-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const charCount = text.length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lineCount = text.split('\n').length;
        showResult(`字符数：${charCount}\n单词数：${wordCount}\n行数：${lineCount}`);
    });

    // 清空
    document.getElementById('clear-btn').addEventListener('click', function() {
        textInput.value = '';
        showResult('请输入文本并选择处理方式');
    });

    // 显示结果
    function showResult(result) {
        resultValue.textContent = result;
        resultContainer.classList.add('result-success');
        
        // 添加结果显示动画
        resultValue.classList.add('result-animation');
        setTimeout(() => {
            resultValue.classList.remove('result-animation');
        }, 500);
    }
});</code></pre>
    <button class="code-copy-button" data-code-target="code" aria-label="复制代码">
        <span class="copy-icon">📋</span>
        <span class="copy-text">复制代码</span>
    </button>
</div>

<script>
// 文本处理工具功能实现
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const resultValue = document.getElementById('result-value');
    const resultContainer = document.getElementById('result-container');

    // 转为大写
    document.getElementById('uppercase-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.toUpperCase();
        showResult(result);
    });

    // 转为小写
    document.getElementById('lowercase-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.toLowerCase();
        showResult(result);
    });

    // 首字母大写
    document.getElementById('capitalize-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.split(' ').map(word => {
            if (word.length === 0) return '';
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        showResult(result);
    });

    // 去除首尾空格
    document.getElementById('trim-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const result = text.trim();
        showResult(result);
    });

    // 统计字符
    document.getElementById('count-btn').addEventListener('click', function() {
        const text = textInput.value;
        if (!text) {
            showResult('请输入要处理的文本');
            return;
        }
        const charCount = text.length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lineCount = text.split('\n').length;
        showResult(`字符数：${charCount}\n单词数：${wordCount}\n行数：${lineCount}`);
    });

    // 清空
    document.getElementById('clear-btn').addEventListener('click', function() {
        textInput.value = '';
        showResult('请输入文本并选择处理方式');
    });

    // 显示结果
    function showResult(result) {
        resultValue.textContent = result;
        resultContainer.classList.add('result-success');
        
        // 添加结果显示动画
        resultValue.classList.add('result-animation');
        setTimeout(() => {
            resultValue.classList.remove('result-animation');
        }, 500);
    }
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

/* 现代文本域样式 */
.modern-textarea {
    width: 100%;
    height: 200px;
    padding: 12px 16px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #2d3748;
    resize: vertical;
}

.modern-textarea:focus {
    outline: none;
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
    background: rgba(255, 255, 255, 0.95);
}

.dark .modern-textarea {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(170, 210, 230, 0.3);
    color: #e2e8f0;
}

.dark .modern-textarea:focus {
    background: rgba(30, 30, 30, 0.95);
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
}

/* 工具按钮组 */
.tool-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
}

/* 现代按钮样式 */
.modern-button {
    padding: 12px 16px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
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
    align-items: flex-start;
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
    white-space: pre-wrap;
}

.dark .result-value {
    color: #e2e8f0;
}

/* 结果成功状态 */
.result-container.result-success {
    border-color: rgba(72, 187, 120, 0.3);
    animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
    }
}

.result-value.result-animation {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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

    .modern-textarea {
        padding: 10px 14px;
        font-size: 14px;
        height: 150px;
    }

    .tool-buttons {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 8px;
    }

    .modern-button {
        padding: 10px 12px;
        font-size: 13px;
    }

    .result-header {
        padding: 16px;
    }

    .result-header h3 {
        font-size: 16px;
    }

    .result-content {
        padding: 16px;
    }

    .result-value {
        font-size: 14px;
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

    .tool-buttons {
        grid-template-columns: 1fr;
    }

    .result-header {
        padding: 14px;
    }

    .result-header h3 {
        font-size: 14px;
    }

    .result-content {
        padding: 14px;
    }

    .code-copy-container pre {
        padding: 14px;
    }

    .code-copy-container code {
        font-size: 12px;
    }
}
</style>