+++
date = '2026-02-02T10:00:00+08:00'
draft = false
title = '密码生成器'
+++

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
                <input type="range" id="password-length" min="6" max="32" value="16" class="modern-range">
                <span id="length-value" class="range-value">16</span>
            </div>
        </div>

        <div class="options-group">
            <div class="option-item">
                <input type="checkbox" id="include-uppercase" checked class="modern-checkbox">
                <label for="include-uppercase">包含大写字母</label>
            </div>
            <div class="option-item">
                <input type="checkbox" id="include-lowercase" checked class="modern-checkbox">
                <label for="include-lowercase">包含小写字母</label>
            </div>
            <div class="option-item">
                <input type="checkbox" id="include-numbers" checked class="modern-checkbox">
                <label for="include-numbers">包含数字</label>
            </div>
            <div class="option-item">
                <input type="checkbox" id="include-symbols" checked class="modern-checkbox">
                <label for="include-symbols">包含特殊字符</label>
            </div>
        </div>

        <button id="generate-btn" class="modern-button">生成密码</button>
    </div>

    <!-- 结果显示区域 -->
    <div class="result-container" id="result-container">
        <div class="result-header">
            <h3>生成结果</h3>
        </div>
        <div class="result-content">
            <div class="result-item">
                <span class="result-label">密码：</span>
                <div class="password-result">
                    <span id="result-value" class="result-value">点击生成按钮生成密码</span>
                    <button id="copy-btn" class="copy-button" style="display: none;">
                        <span class="copy-icon">📋</span>
                        <span class="copy-text">复制</span>
                    </button>
                </div>
            </div>
            <div class="result-item">
                <span class="result-label">强度：</span>
                <span id="strength-value" class="strength-value">-</span>
            </div>
        </div>
    </div>
</div>

<!-- 代码复制区域 -->
<div class="code-copy-container">
    <h3>代码实现</h3>
    <pre><code class="language-javascript">// 密码生成器功能实现
document.addEventListener('DOMContentLoaded', function() {
    const passwordLength = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const resultValue = document.getElementById('result-value');
    const strengthValue = document.getElementById('strength-value');
    const copyBtn = document.getElementById('copy-btn');
    const resultContainer = document.getElementById('result-container');

    // 更新密码长度显示
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // 生成密码
    generateBtn.addEventListener('click', function() {
        const length = parseInt(passwordLength.value);
        const uppercase = includeUppercase.checked;
        const lowercase = includeLowercase.checked;
        const numbers = includeNumbers.checked;
        const symbols = includeSymbols.checked;

        if (!uppercase && !lowercase && !numbers && !symbols) {
            showResult('请至少选择一种字符类型');
            return;
        }

        const password = generatePassword(length, uppercase, lowercase, numbers, symbols);
        const strength = calculateStrength(password);

        showResult(password);
        showStrength(strength);
        copyBtn.style.display = 'inline-flex';
    });

    // 复制密码
    copyBtn.addEventListener('click', function() {
        const password = resultValue.textContent;
        if (password && password !== '点击生成按钮生成密码' && password !== '请至少选择一种字符类型') {
            navigator.clipboard.writeText(password).then(function() {
                const originalText = copyBtn.querySelector('.copy-text').textContent;
                copyBtn.querySelector('.copy-text').textContent = '已复制';
                setTimeout(function() {
                    copyBtn.querySelector('.copy-text').textContent = originalText;
                }, 2000);
            });
        }
    });

    // 生成密码函数
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        const charset = '' +
            (uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
            (lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '') +
            (numbers ? '0123456789' : '') +
            (symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '');

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // 计算密码强度
    function calculateStrength(password) {
        if (password.length < 8) return '弱';
        if (password.length < 12) return '中等';
        if (password.length < 16) return '强';
        return '极强';
    }

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

    // 显示强度
    function showStrength(strength) {
        strengthValue.textContent = strength;
        
        // 移除所有强度类
        strengthValue.className = 'strength-value';
        
        // 添加对应强度类
        switch(strength) {
            case '弱':
                strengthValue.classList.add('strength-weak');
                break;
            case '中等':
                strengthValue.classList.add('strength-medium');
                break;
            case '强':
                strengthValue.classList.add('strength-strong');
                break;
            case '极强':
                strengthValue.classList.add('strength-very-strong');
                break;
        }
    }
});</code></pre>
    <button class="code-copy-button" data-code-target="code" aria-label="复制代码">
        <span class="copy-icon">📋</span>
        <span class="copy-text">复制代码</span>
    </button>
</div>

<script>
// 密码生成器功能实现
document.addEventListener('DOMContentLoaded', function() {
    const passwordLength = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const resultValue = document.getElementById('result-value');
    const strengthValue = document.getElementById('strength-value');
    const copyBtn = document.getElementById('copy-btn');
    const resultContainer = document.getElementById('result-container');

    // 更新密码长度显示
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // 生成密码
    generateBtn.addEventListener('click', function() {
        const length = parseInt(passwordLength.value);
        const uppercase = includeUppercase.checked;
        const lowercase = includeLowercase.checked;
        const numbers = includeNumbers.checked;
        const symbols = includeSymbols.checked;

        if (!uppercase && !lowercase && !numbers && !symbols) {
            showResult('请至少选择一种字符类型');
            return;
        }

        const password = generatePassword(length, uppercase, lowercase, numbers, symbols);
        const strength = calculateStrength(password);

        showResult(password);
        showStrength(strength);
        copyBtn.style.display = 'inline-flex';
    });

    // 复制密码
    copyBtn.addEventListener('click', function() {
        const password = resultValue.textContent;
        if (password && password !== '点击生成按钮生成密码' && password !== '请至少选择一种字符类型') {
            navigator.clipboard.writeText(password).then(function() {
                const originalText = copyBtn.querySelector('.copy-text').textContent;
                copyBtn.querySelector('.copy-text').textContent = '已复制';
                setTimeout(function() {
                    copyBtn.querySelector('.copy-text').textContent = originalText;
                }, 2000);
            });
        }
    });

    // 生成密码函数
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        const charset = '' +
            (uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
            (lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '') +
            (numbers ? '0123456789' : '') +
            (symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '');

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // 计算密码强度
    function calculateStrength(password) {
        if (password.length < 8) return '弱';
        if (password.length < 12) return '中等';
        if (password.length < 16) return '强';
        return '极强';
    }

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

    // 显示强度
    function showStrength(strength) {
        strengthValue.textContent = strength;
        
        // 移除所有强度类
        strengthValue.className = 'strength-value';
        
        // 添加对应强度类
        switch(strength) {
            case '弱':
                strengthValue.classList.add('strength-weak');
                break;
            case '中等':
                strengthValue.classList.add('strength-medium');
                break;
            case '强':
                strengthValue.classList.add('strength-strong');
                break;
            case '极强':
                strengthValue.classList.add('strength-very-strong');
                break;
        }
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

/* 范围输入样式 */
.input-wrapper {
    position: relative;
}

.modern-range {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: linear-gradient(90deg, #FFB7C5, #AADCFF);
    outline: none;
    -webkit-appearance: none;
    margin: 10px 0;
}

.modern-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 183, 197, 0.5);
    transition: all 0.3s ease;
}

.modern-range::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(255, 183, 197, 0.8);
}

.modern-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 183, 197, 0.5);
    transition: all 0.3s ease;
    border: none;
}

.modern-range::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(255, 183, 197, 0.8);
}

.range-value {
    position: absolute;
    right: 0;
    top: -30px;
    background: linear-gradient(135deg, #FFB7C5, #AADCFF);
    color: #333;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    min-width: 40px;
    text-align: center;
}

/* 选项组 */
.options-group {
    margin-bottom: 20px;
}

.option-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.option-item input[type="checkbox"] {
    margin-right: 10px;
}

/* 现代复选框样式 */
.modern-checkbox {
    width: 18px;
    height: 18px;
    accent-color: #FFB7C5;
    cursor: pointer;
}

/* 现代按钮样式 */
.modern-button {
    width: 100%;
    padding: 14px 20px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
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
    align-items: center;
    margin-bottom: 15px;
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
}

.dark .result-value {
    color: #e2e8f0;
}

/* 密码结果区域 */
.password-result {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
}

.copy-button {
    background: linear-gradient(135deg, rgba(255, 200, 210, 0.8), rgba(170, 210, 230, 0.8));
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
}

.copy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(170, 210, 230, 0.4);
}

/* 强度显示 */
.strength-value {
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
}

.strength-weak {
    background: rgba(255, 99, 132, 0.2);
    color: #ff4757;
    border: 1px solid rgba(255, 99, 132, 0.3);
}

.strength-medium {
    background: rgba(255, 193, 7, 0.2);
    color: #ffa502;
    border: 1px solid rgba(255, 193, 7, 0.3);
}

.strength-strong {
    background: rgba(72, 187, 120, 0.2);
    color: #2ed573;
    border: 1px solid rgba(72, 187, 120, 0.3);
}

.strength-very-strong {
    background: rgba(52, 152, 219, 0.2);
    color: #3742fa;
    border: 1px solid rgba(52, 152, 219, 0.3);
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

    .modern-range {
        height: 6px;
    }

    .modern-range::-webkit-slider-thumb {
        width: 16px;
        height: 16px;
    }

    .modern-range::-moz-range-thumb {
        width: 16px;
        height: 16px;
    }

    .range-value {
        font-size: 13px;
        padding: 3px 10px;
    }

    .option-item {
        font-size: 14px;
    }

    .modern-button {
        padding: 12px 16px;
        font-size: 14px;
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

    .copy-button {
        padding: 5px 10px;
        font-size: 13px;
    }

    .strength-value {
        padding: 3px 10px;
        font-size: 13px;
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