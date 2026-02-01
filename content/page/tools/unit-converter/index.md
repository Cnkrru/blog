---
title: 单位转换器
layout: "tools"
slug: "tools/unit-converter"
comments: false
---

<div class="tool-page-header">
    <h2>单位转换器</h2>
    <p>长度、重量、温度等单位之间的转换</p>
</div>

<!-- 工具内容容器 -->
<div class="tool-content-container">
    <!-- 工具功能实现区域 -->
    <div class="tool-implementation">
        <div class="input-group">
            <label for="conversion-type">转换类型：</label>
            <div class="select-wrapper">
                <select id="conversion-type" onchange="updateUnits()" class="modern-select">
                    <option value="length">长度</option>
                    <option value="weight">重量</option>
                    <option value="temperature">温度</option>
                    <option value="volume">体积</option>
                </select>
                <span class="select-icon">⬇️</span>
            </div>
        </div>
        <div class="input-group">
            <label for="input-value">输入值：</label>
            <div class="input-wrapper">
                <input type="number" id="input-value" step="any" placeholder="请输入要转换的值" class="modern-input">
                <span class="input-icon">🔢</span>
            </div>
        </div>
        <div class="input-group">
            <label for="from-unit">从单位：</label>
            <div class="select-wrapper">
                <select id="from-unit" class="modern-select">
                    <!-- 动态生成单位选项 -->
                </select>
                <span class="select-icon">⬇️</span>
            </div>
        </div>
        <div class="input-group">
            <label for="to-unit">到单位：</label>
            <div class="select-wrapper">
                <select id="to-unit" class="modern-select">
                    <!-- 动态生成单位选项 -->
                </select>
                <span class="select-icon">⬇️</span>
            </div>
        </div>
        <button class="tool-button modern-button" onclick="convertUnits()">
            <span class="button-icon">⚡</span>
            <span class="button-text">转换</span>
        </button>
        <div class="result-group">
            <label for="conversion-result">转换结果：</label>
            <div class="input-wrapper">
                <input type="text" id="conversion-result" readonly class="result-input">
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

    .button-text {
        font-size: 14px;
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
        .modern-select,
        .result-input {
            padding: 12px 40px 12px 12px;
            font-size: 14px;
        }

        .modern-button {
            padding: 14px;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .button-text {
            font-size: 13px;
        }

        .tool-page-footer {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
</style>

<script>
    // 单位转换器功能实现
    window.onload = function() {
        console.log('Window loaded, initializing unit converter');
        updateUnits(); // 初始化单位选项
        
        // 初始化代码复制功能
        initCodeCopy();
    };

    // 单位定义
    const unitDefinitions = {
        length: {
            units: ['米', '厘米', '毫米', '公里', '英寸', '英尺', '码', '英里'],
            conversions: {
                '米': 1,
                '厘米': 100,
                '毫米': 1000,
                '公里': 0.001,
                '英寸': 39.3701,
                '英尺': 3.28084,
                '码': 1.09361,
                '英里': 0.000621371
            }
        },
        weight: {
            units: ['千克', '克', '毫克', '吨', '磅', '盎司'],
            conversions: {
                '千克': 1,
                '克': 1000,
                '毫克': 1000000,
                '吨': 0.001,
                '磅': 2.20462,
                '盎司': 35.274
            }
        },
        temperature: {
            units: ['摄氏度', '华氏度', '开尔文'],
            // 温度转换需要特殊处理
            convert: function(value, fromUnit, toUnit) {
                if (fromUnit === toUnit) return value;
                
                // 先转换为摄氏度
                let celsius;
                switch (fromUnit) {
                    case '摄氏度':
                        celsius = value;
                        break;
                    case '华氏度':
                        celsius = (value - 32) * 5/9;
                        break;
                    case '开尔文':
                        celsius = value - 273.15;
                        break;
                }
                
                // 从摄氏度转换为目标单位
                switch (toUnit) {
                    case '摄氏度':
                        return celsius;
                    case '华氏度':
                        return celsius * 9/5 + 32;
                    case '开尔文':
                        return celsius + 273.15;
                }
            }
        },
        volume: {
            units: ['升', '毫升', '立方米', '立方厘米', '加仑', '夸脱', '品脱', '杯', '盎司'],
            conversions: {
                '升': 1,
                '毫升': 1000,
                '立方米': 0.001,
                '立方厘米': 1000,
                '加仑': 0.264172,
                '夸脱': 1.05669,
                '品脱': 2.11338,
                '杯': 4.22675,
                '盎司': 33.814
            }
        }
    };

    // 更新单位选项
    function updateUnits() {
        const conversionType = document.getElementById('conversion-type').value;
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        const units = unitDefinitions[conversionType].units;
        
        // 清空现有选项
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';
        
        // 添加新选项
        units.forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit;
            fromOption.textContent = unit;
            fromUnitSelect.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit;
            toOption.textContent = unit;
            toUnitSelect.appendChild(toOption);
        });
        
        // 设置默认值
        if (conversionType === 'length') {
            fromUnitSelect.value = '米';
            toUnitSelect.value = '厘米';
        } else if (conversionType === 'weight') {
            fromUnitSelect.value = '千克';
            toUnitSelect.value = '克';
        } else if (conversionType === 'temperature') {
            fromUnitSelect.value = '摄氏度';
            toUnitSelect.value = '华氏度';
        } else if (conversionType === 'volume') {
            fromUnitSelect.value = '升';
            toUnitSelect.value = '毫升';
        }
    }

    // 转换单位
    function convertUnits() {
        const conversionType = document.getElementById('conversion-type').value;
        const inputValue = parseFloat(document.getElementById('input-value').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;
        const resultInput = document.getElementById('conversion-result');
        
        if (isNaN(inputValue)) {
            resultInput.value = '请输入有效数值';
            return;
        }
        
        let result;
        
        // 处理温度转换
        if (conversionType === 'temperature') {
            result = unitDefinitions.temperature.convert(inputValue, fromUnit, toUnit);
        } else {
            // 处理其他单位转换
            const conversions = unitDefinitions[conversionType].conversions;
            // 先转换为基本单位，再转换为目标单位
            const baseValue = inputValue / conversions[fromUnit];
            result = baseValue * conversions[toUnit];
        }
        
        // 显示结果
        resultInput.value = result.toFixed(4);
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
    &lt;h2&gt;单位转换器&lt;/h2&gt;
    &lt;p&gt;长度、重量、温度等单位之间的转换&lt;/p&gt;
&lt;/div&gt;

&lt;div class="tool-content-container"&gt;
    &lt;div class="tool-implementation"&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="conversion-type"&gt;转换类型：&lt;/label&gt;
            &lt;select id="conversion-type" onchange="updateUnits()"&gt;
                &lt;option value="length"&gt;长度&lt;/option&gt;
                &lt;option value="weight"&gt;重量&lt;/option&gt;
                &lt;option value="temperature"&gt;温度&lt;/option&gt;
                &lt;option value="volume"&gt;体积&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="input-value"&gt;输入值：&lt;/label&gt;
            &lt;input type="number" id="input-value" step="any" placeholder="请输入要转换的值"&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="from-unit"&gt;从单位：&lt;/label&gt;
            &lt;select id="from-unit"&gt;
                &lt;!-- 动态生成单位选项 --&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class="input-group"&gt;
            &lt;label for="to-unit"&gt;到单位：&lt;/label&gt;
            &lt;select id="to-unit"&gt;
                &lt;!-- 动态生成单位选项 --&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;button class="tool-button" onclick="convertUnits()"&gt;转换&lt;/button&gt;
        &lt;div class="result-group"&gt;
            &lt;label for="conversion-result"&gt;转换结果：&lt;/label&gt;
            &lt;input type="text" id="conversion-result" readonly&gt;
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
            <pre><code>// 单位转换器功能实现
window.onload = function() {
    console.log('Window loaded, initializing unit converter');
    updateUnits(); // 初始化单位选项
};

// 单位定义
const unitDefinitions = {
    length: {
        units: ['米', '厘米', '毫米', '公里', '英寸', '英尺', '码', '英里'],
        conversions: {
            '米': 1,
            '厘米': 100,
            '毫米': 1000,
            '公里': 0.001,
            '英寸': 39.3701,
            '英尺': 3.28084,
            '码': 1.09361,
            '英里': 0.000621371
        }
    },
    weight: {
        units: ['千克', '克', '毫克', '吨', '磅', '盎司'],
        conversions: {
            '千克': 1,
            '克': 1000,
            '毫克': 1000000,
            '吨': 0.001,
            '磅': 2.20462,
            '盎司': 35.274
        }
    },
    temperature: {
        units: ['摄氏度', '华氏度', '开尔文'],
        // 温度转换需要特殊处理
        convert: function(value, fromUnit, toUnit) {
            if (fromUnit === toUnit) return value;
            
            // 先转换为摄氏度
            let celsius;
            switch (fromUnit) {
                case '摄氏度':
                    celsius = value;
                    break;
                case '华氏度':
                    celsius = (value - 32) * 5/9;
                    break;
                case '开尔文':
                    celsius = value - 273.15;
                    break;
            }
            
            // 从摄氏度转换为目标单位
            switch (toUnit) {
                case '摄氏度':
                    return celsius;
                case '华氏度':
                    return celsius * 9/5 + 32;
                case '开尔文':
                    return celsius + 273.15;
            }
        }
    },
    volume: {
        units: ['升', '毫升', '立方米', '立方厘米', '加仑', '夸脱', '品脱', '杯', '盎司'],
        conversions: {
            '升': 1,
            '毫升': 1000,
            '立方米': 0.001,
            '立方厘米': 1000,
            '加仑': 0.264172,
            '夸脱': 1.05669,
            '品脱': 2.11338,
            '杯': 4.22675,
            '盎司': 33.814
        }
    }
};

// 更新单位选项
function updateUnits() {
    const conversionType = document.getElementById('conversion-type').value;
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    const units = unitDefinitions[conversionType].units;
    
    // 清空现有选项
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // 添加新选项
    units.forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = unit;
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = unit;
        toUnitSelect.appendChild(toOption);
    });
    
    // 设置默认值
    if (conversionType === 'length') {
        fromUnitSelect.value = '米';
        toUnitSelect.value = '厘米';
    } else if (conversionType === 'weight') {
        fromUnitSelect.value = '千克';
        toUnitSelect.value = '克';
    } else if (conversionType === 'temperature') {
        fromUnitSelect.value = '摄氏度';
        toUnitSelect.value = '华氏度';
    } else if (conversionType === 'volume') {
        fromUnitSelect.value = '升';
        toUnitSelect.value = '毫升';
    }
}

// 转换单位
function convertUnits() {
    const conversionType = document.getElementById('conversion-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const resultInput = document.getElementById('conversion-result');
    
    if (isNaN(inputValue)) {
        resultInput.value = '请输入有效数值';
        return;
    }
    
    let result;
    
    // 处理温度转换
    if (conversionType === 'temperature') {
        result = unitDefinitions.temperature.convert(inputValue, fromUnit, toUnit);
    } else {
        // 处理其他单位转换
        const conversions = unitDefinitions[conversionType].conversions;
        // 先转换为基本单位，再转换为目标单位
        const baseValue = inputValue / conversions[fromUnit];
        result = baseValue * conversions[toUnit];
    }
    
    // 显示结果
    resultInput.value = result.toFixed(4);
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