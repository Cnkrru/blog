---
title: 文本处理工具
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
    // 文本处理工具功能
    window.onload = function() {
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
                        charCount.textContent = text.length;
                        wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
                        lineCount.textContent = text.split('\n').length;
                        textStats.style.display = 'block';
                        break;
                    case 'trim':
                        result = text.trim();
                        break;
                    default:
                        result = text;
                }
                
                textResult.value = result;
                
                // 如果不是统计操作，隐藏统计信息
                if (operation !== 'count') {
                    textStats.style.display = 'none';
                }
                
            } catch (error) {
                console.error('处理文本时出错:', error);
                textResult.value = '处理文本时出错，请重试';
            }
        }
        
        // 绑定事件
        if (processBtn) {
            processBtn.addEventListener('click', processText);
        }
    };
</script>