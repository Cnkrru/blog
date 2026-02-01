---
title: 工具模板
layout: "tools"
slug: "tools/tool-template"
menu:
    main:
        params:
            icon: tools

comments: false
---

<div class="tool-page-header">
    <h2>工具名称</h2>
    <p>工具描述</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <!-- 工具功能实现代码 -->
        <!-- 示例：进制转换器 -->
        <!-- <div class="converter-container">
            <div class="converter-content">
                <div class="input-group">
                    <label for="input-value">输入值：</label>
                    <input type="text" id="input-value" placeholder="请输入要转换的值">
                </div>
                <div class="input-group">
                    <label for="from-base">从进制：</label>
                    <select id="from-base">
                        <option value="2">二进制 (2)</option>
                        <option value="8">八进制 (8)</option>
                        <option value="10" selected>十进制 (10)</option>
                        <option value="16">十六进制 (16)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="to-base">到进制：</label>
                    <select id="to-base">
                        <option value="2">二进制 (2)</option>
                        <option value="8">八进制 (8)</option>
                        <option value="10">十进制 (10)</option>
                        <option value="16" selected>十六进制 (16)</option>
                    </select>
                </div>
                <button id="convert-btn" class="convert-button">转换</button>
                <div class="result-group">
                    <label for="result-value">转换结果：</label>
                    <input type="text" id="result-value" readonly>
                </div>
            </div>
        </div> -->
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

    /* 工具特定样式可以在此添加 */
    /* 例如：密码生成器样式 */
    /* .password-generator {
        /* 特定样式 */
    /* } */
</style>

<script>
    // 工具功能实现脚本
    // 示例：进制转换器
    /*
    window.onload = function() {
        console.log('Window loaded, initializing tool');
        
        // 获取 DOM 元素
        const inputValue = document.getElementById('input-value');
        const fromBase = document.getElementById('from-base');
        const toBase = document.getElementById('to-base');
        const convertBtn = document.getElementById('convert-btn');
        const resultValue = document.getElementById('result-value');
        
        console.log('Tool elements:', {
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
    };
    */
</script>