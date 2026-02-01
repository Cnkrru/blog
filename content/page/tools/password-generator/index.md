---
title: 密码生成器
layout: "tools"
slug: "tools/password-generator"
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
            <div class="input-wrapper">
                <input type="number" id="password-length" min="4" max="128" value="12" placeholder="请输入密码长度" class="modern-input">
                <span class="input-icon">🔢</span>
            </div>
        </div>
        <div class="input-group">
            <label>包含字符：</label>
            <div class="checkbox-group">
                <label><input type="checkbox" id="include-uppercase" checked> 大写字母 (A-Z)</label>
                <label><input type="checkbox" id="include-lowercase" checked> 小写字母 (a-z)</label>
                <label><input type="checkbox" id="include-numbers" checked> 数字 (0-9)</label>
                <label><input type="checkbox" id="include-symbols" checked> 特殊字符 (!@#$%^&*)</label>
            </div>
        </div>
        <button class="tool-button modern-button" onclick="generatePassword()">
            <span class="button-icon">🔐</span>
            <span class="button-text">生成密码</span>
        </button>
        <div class="result-group">
            <label for="generated-password">生成的密码：</label>
            <div class="password-output input-wrapper">
                <input type="text" id="generated-password" readonly class="result-input">
                <button class="copy-button modern-button small" onclick="copyPassword()">
                    <span class="button-icon">📋</span>
                    <span class="button-text">复制</span>
                </button>
            </div>
        </div>
        <div class="result-stats">
            <p id="password-strength">密码强度：-</p>
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

    /* 复选框组 */
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .checkbox-group label {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #2d3748;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 8px 12px;
        border-radius: 8px;
        margin: 0;
    }

    .checkbox-group label:hover {
        background: rgba(255, 183, 197, 0.1);
        transform: translateX(5px);
    }

    .checkbox-group input[type="checkbox"] {
        width: auto;
        margin-right: 10px;
        accent-color: #FFB7C5;
        transform: scale(1.1);
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

    /* 小按钮 */
    .modern-button.small {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 8px;
        margin: 0;
        width: auto;
    }

    /* 按钮图标 */
    .button-icon {
        font-size: 18px;
        transition: transform 0.3s ease;
    }

    .modern-button:hover .button-icon {
        transform: scale(1.1) rotate(10deg);
    }

    .button-text {
        font-size: 14px;
    }

    /* 密码输出区域 */
    .password-output {
        position: relative;
        display: flex;
    }

    .password-output input {
        flex: 1;
        padding-right: 120px;
    }

    /* 结果输入框 */
    .result-input {
        width: 100%;
        padding: 16px 120px 16px 16px;
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

    /* 结果组样式 */
    .result-group {
        margin-top: 24px;
    }

    .result-group label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #4a5568;
        transition: color 0.3s ease;
    }

    /* 结果统计 */
    .result-stats {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 24px;
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

    .dark .checkbox-group {
        background: rgba(255, 255, 255, 0.03);
        border-color: rgba(255, 255, 255, 0.05);
    }

    .dark .checkbox-group label {
        color: #e2e8f0;
    }

    .dark .checkbox-group label:hover {
        background: rgba(255, 183, 197, 0.1);
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
        }

        .password-output input {
            padding-right: 100px;
        }

        .modern-button {
            padding: 14px;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .modern-button.small {
            padding: 6px 12px;
            font-size: 12px;
        }

        .checkbox-group {
            padding: 12px;
            gap: 8px;
        }

        .checkbox-group label {
            font-size: 13px;
            padding: 6px 10px;
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
    // 密码生成器功能实现
    window.onload = function() {
        console.log('Window loaded, initializing password generator');
        
        // 初始化代码复制功能
        initCodeCopy();
    };

    // 生成密码
    function generatePassword() {
        const length = parseInt(document.getElementById('password-length').value);
        const includeUppercase = document.getElementById('include-uppercase').checked;
        const includeLowercase = document.getElementById('include-lowercase').checked;
        const includeNumbers = document.getElementById('include-numbers').checked;
        const includeSymbols = document.getElementById('include-symbols').checked;
        
        // 验证至少选择了一种字符类型
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert('请至少选择一种字符类型');
            return;
        }
        
        // 定义字符集
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';
        
        // 生成密码
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        // 显示密码
        document.getElementById('generated-password').value = password;
        
        // 更新密码强度
        updatePasswordStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    }

    // 复制密码
    function copyPassword() {
        const passwordInput = document.getElementById('generated-password');
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // 用于移动设备
        
        try {
            document.execCommand('copy');
            alert('密码已复制到剪贴板');
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        }
    }

    // 更新密码强度
    function updatePasswordStrength(password, length, hasUppercase, hasLowercase, hasNumbers, hasSymbols) {
        const strengthElement = document.getElementById('password-strength');
        let strength = 0;
        
        // 基于长度的强度
        if (length >= 8) strength += 1;
        if (length >= 12) strength += 1;
        if (length >= 16) strength += 1;
        
        // 基于字符类型的强度
        if (hasUppercase) strength += 1;
        if (hasLowercase) strength += 1;
        if (hasNumbers) strength += 1;
        if (hasSymbols) strength += 1;
        
        // 确定强度等级
        let strengthText = '';
        let strengthColor = '';
        
        if (strength <= 2) {
            strengthText = '弱';
            strengthColor = '#ff4757';
        } else if (strength <= 4) {
            strengthText = '中等';
            strengthColor = '#ffa502';
        } else if (strength <= 5) {
            strengthText = '强';
            strengthColor = '#2ed573';
        } else {
            strengthText = '非常强';
            strengthColor = '#1e90ff';
        }
        
        strengthElement.textContent = `密码强度：${strengthText}`;
        strengthElement.style.color = strengthColor;
    }
    
    // 代码复制功能
    function initCodeCopy() {
        const copyButtons = document.querySelectorAll('.code-copy-button');
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
    &lt;h2&gt;密码生成器&lt;/h2&gt;
    &lt;p&gt;生成安全强度高的随机密码&lt;/p&gt;
&lt;/div&gt;

&lt;div class="tool-content-container"&gt;
    &lt;div class="tool-implementation"&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="password-length"&gt;密码长度：&lt;/label&gt;
            &lt;input type="number" id="password-length" min="4" max="128" value="12" placeholder="请输入密码长度"&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label&gt;包含字符：&lt;/label&gt;
            &lt;div class="checkbox-group"&gt;
                &lt;label&gt;&lt;input type="checkbox" id="include-uppercase" checked&gt; 大写字母 (A-Z)&lt;/label&gt;
                &lt;label&gt;&lt;input type="checkbox" id="include-lowercase" checked&gt; 小写字母 (a-z)&lt;/label&gt;
                &lt;label&gt;&lt;input type="checkbox" id="include-numbers" checked&gt; 数字 (0-9)&lt;/label&gt;
                &lt;label&gt;&lt;input type="checkbox" id="include-symbols" checked&gt; 特殊字符 (!@#$%^&*))&lt;/label&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;button class="tool-button" onclick="generatePassword()"&gt;生成密码&lt;/button&gt;
        &lt;div class="result-group"&gt;
            &lt;label for="generated-password"&gt;生成的密码：&lt;/label&gt;
            &lt;div class="password-output"&gt;
                &lt;input type="text" id="generated-password" readonly&gt;
                &lt;button class="copy-button" onclick="copyPassword()"&gt;复制&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="result-stats"&gt;
            &lt;p id="password-strength"&gt;密码强度：-&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class="tool-page-footer"&gt;
    &lt;a href="/blog/tools/" class="back-to-tools"&gt;← 返回工具列表&lt;/a&gt;
&lt;/div&gt;</code></pre>
            <button class="code-copy-button">复制代码</button>
        </div>
    </div>
    
    <div class="code-block">
        <h4>JavaScript 代码</h4>
        <div class="code-container">
            <pre><code>// 密码生成器功能实现
window.onload = function() {
    console.log('Window loaded, initializing password generator');
};

// 生成密码
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    
    // 验证至少选择了一种字符类型
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('请至少选择一种字符类型');
        return;
    }
    
    // 定义字符集
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';
    
    // 生成密码
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    // 显示密码
    document.getElementById('generated-password').value = password;
    
    // 更新密码强度
    updatePasswordStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
}

// 复制密码
function copyPassword() {
    const passwordInput = document.getElementById('generated-password');
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999); // 用于移动设备
    
    try {
        document.execCommand('copy');
        alert('密码已复制到剪贴板');
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    }
}

// 更新密码强度
function updatePasswordStrength(password, length, hasUppercase, hasLowercase, hasNumbers, hasSymbols) {
    const strengthElement = document.getElementById('password-strength');
    let strength = 0;
    
    // 基于长度的强度
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (length >= 16) strength += 1;
    
    // 基于字符类型的强度
    if (hasUppercase) strength += 1;
    if (hasLowercase) strength += 1;
    if (hasNumbers) strength += 1;
    if (hasSymbols) strength += 1;
    
    // 确定强度等级
    let strengthText = '';
    let strengthColor = '';
    
    if (strength <= 2) {
        strengthText = '弱';
        strengthColor = '#ff4757';
    } else if (strength <= 4) {
        strengthText = '中等';
        strengthColor = '#ffa502';
    } else if (strength <= 5) {
        strengthText = '强';
        strengthColor = '#2ed573';
    } else {
        strengthText = '非常强';
        strengthColor = '#1e90ff';
    }
    
    strengthElement.textContent = `密码强度：${strengthText}`;
    strengthElement.style.color = strengthColor;
}</code></pre>
            <button class="code-copy-button">复制代码</button>
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
    
    .code-copy-button {
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
    
    .code-copy-button:hover {
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
    
    .dark .code-copy-button {
        background: rgba(255, 255, 255, 0.05);
        color: #e2e8f0;
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .dark .code-copy-button:hover {
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
        
        .code-copy-button {
            padding: 4px 8px;
            font-size: 10px;
        }
    }
</style>