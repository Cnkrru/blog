---
title: 密码生成器
slug: password-generator
layout: "page"
comments: false
---

<div class="tool-page-header">
    <h2>密码生成器</h2>
    <p>生成安全强度高的随机密码</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="password-length">密码长度：</label>
            <input type="number" id="password-length" min="6" max="128" value="16" placeholder="请输入密码长度">
        </div>
        <div class="input-group">
            <label>包含字符：</label>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 8px;">
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="checkbox" id="include-uppercase" checked>
                    大写字母
                </label>
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="checkbox" id="include-lowercase" checked>
                    小写字母
                </label>
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="checkbox" id="include-numbers" checked>
                    数字
                </label>
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="checkbox" id="include-symbols" checked>
                    特殊符号
                </label>
            </div>
        </div>
        <button id="generate-btn" class="tool-button">生成密码</button>
        <div class="result-group">
            <label for="password-result">生成的密码：</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="password-result" readonly style="flex: 1;">
                <button id="copy-btn" class="tool-button" style="flex: 0 0 100px; margin-bottom: 0;">复制</button>
            </div>
        </div>
        <div class="result-group">
            <label>密码强度：</label>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div id="strength-bar" style="flex: 1; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                    <div id="strength-fill" style="height: 100%; width: 0%; background-color: #4CAF50; transition: width 0.3s ease, background-color 0.3s ease;"></div>
                </div>
                <span id="strength-text">弱</span>
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
    // 密码生成器功能
    function initPasswordGenerator() {
        console.log('初始化密码生成器');
        
        // 获取 DOM 元素
        const passwordLength = document.getElementById('password-length');
        const includeUppercase = document.getElementById('include-uppercase');
        const includeLowercase = document.getElementById('include-lowercase');
        const includeNumbers = document.getElementById('include-numbers');
        const includeSymbols = document.getElementById('include-symbols');
        const generateBtn = document.getElementById('generate-btn');
        const passwordResult = document.getElementById('password-result');
        const copyBtn = document.getElementById('copy-btn');
        const strengthBar = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');
        
        console.log('工具元素:', {
            passwordLength: !!passwordLength,
            includeUppercase: !!includeUppercase,
            includeLowercase: !!includeLowercase,
            includeNumbers: !!includeNumbers,
            includeSymbols: !!includeSymbols,
            generateBtn: !!generateBtn,
            passwordResult: !!passwordResult,
            copyBtn: !!copyBtn,
            strengthBar: !!strengthBar,
            strengthText: !!strengthText
        });
        
        if (!passwordLength || !generateBtn || !passwordResult) {
            console.error('密码生成器：缺少必要的DOM元素');
            return;
        }
        
        // 字符集
        const charSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
        };
        
        // 计算密码强度
        function calculateStrength(password) {
            let strength = 0;
            const length = password.length;
            
            // 长度加分
            if (length >= 8) strength += 25;
            if (length >= 12) strength += 25;
            if (length >= 16) strength += 25;
            
            // 字符类型加分
            if (/[A-Z]/.test(password)) strength += 12.5;
            if (/[a-z]/.test(password)) strength += 12.5;
            if (/[0-9]/.test(password)) strength += 12.5;
            if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
            
            return Math.min(100, strength);
        }
        
        // 更新强度显示
        function updateStrength(password) {
            if (!strengthBar || !strengthText) return;
            
            const strength = calculateStrength(password);
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 25) {
                strengthBar.style.backgroundColor = '#f44336';
                strengthText.textContent = '弱';
            } else if (strength < 50) {
                strengthBar.style.backgroundColor = '#ff9800';
                strengthText.textContent = '中';
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#ffeb3b';
                strengthText.textContent = '强';
            } else {
                strengthBar.style.backgroundColor = '#4CAF50';
                strengthText.textContent = '非常强';
            }
        }
        
        // 生成密码函数
        function generatePassword() {
            console.log('生成密码按钮点击');
            const length = parseInt(passwordLength.value);
            
            // 构建字符集
            let charset = '';
            if (includeUppercase && includeUppercase.checked) charset += charSets.uppercase;
            if (includeLowercase && includeLowercase.checked) charset += charSets.lowercase;
            if (includeNumbers && includeNumbers.checked) charset += charSets.numbers;
            if (includeSymbols && includeSymbols.checked) charset += charSets.symbols;
            
            if (!charset) {
                passwordResult.value = '请至少选择一种字符类型';
                return;
            }
            
            // 生成密码
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            
            passwordResult.value = password;
            updateStrength(password);
        }
        
        // 复制密码函数
        function copyPassword() {
            console.log('复制密码按钮点击');
            passwordResult.select();
            document.execCommand('copy');
            
            // 显示复制成功提示
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '已复制';
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                }, 1500);
            }
        }
        
        // 绑定事件
        generateBtn.addEventListener('click', generatePassword);
        
        if (copyBtn) {
            copyBtn.addEventListener('click', copyPassword);
        }
        
        // 初始生成一个密码
        generatePassword();
    }
    
    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordGenerator);
    } else {
        initPasswordGenerator();
    }
    
    // PJAX兼容
    document.addEventListener('pjax:success', function() {
        console.log('PJAX加载完成，重新初始化密码生成器');
        setTimeout(initPasswordGenerator, 100);
    });
    
    // 传统window.onload作为备用
    window.addEventListener('load', function() {
        console.log('Window load事件，确保密码生成器初始化');
        setTimeout(initPasswordGenerator, 100);
    });
</script>