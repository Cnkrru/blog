---
date: '2026-02-02T10:00:00+08:00'
draft: false
title: '单位转换器'
slug: 'tools/unit-converter'
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
            <label for="unit-type">转换类型：</label>
            <div class="select-wrapper">
                <select id="unit-type" class="modern-select">
                    <option value="length">长度</option>
                    <option value="weight">重量</option>
                    <option value="temperature">温度</option>
                </select>
            </div>
        </div>

        <div class="input-group">
            <label for="input-value">输入值：</label>
            <div class="input-wrapper">
                <input type="number" id="input-value" placeholder="请输入要转换的值" class="modern-input">
            </div>
        </div>

        <div class="input-group">
            <label for="input-unit">输入单位：</label>
            <div class="select-wrapper">
                <select id="input-unit" class="modern-select">
                    <!-- 长度单位选项 -->
                    <option value="meter">米 (m)</option>
                    <option value="kilometer">千米 (km)</option>
                    <option value="centimeter">厘米 (cm)</option>
                    <option value="millimeter">毫米 (mm)</option>
                    <option value="mile">英里 (mi)</option>
                    <option value="foot">英尺 (ft)</option>
                    <option value="inch">英寸 (in)</option>
                </select>
            </div>
        </div>

        <div class="input-group">
            <label for="output-unit">输出单位：</label>
            <div class="select-wrapper">
                <select id="output-unit" class="modern-select">
                    <!-- 长度单位选项 -->
                    <option value="meter">米 (m)</option>
                    <option value="kilometer">千米 (km)</option>
                    <option value="centimeter">厘米 (cm)</option>
                    <option value="millimeter">毫米 (mm)</option>
                    <option value="mile">英里 (mi)</option>
                    <option value="foot">英尺 (ft)</option>
                    <option value="inch">英寸 (in)</option>
                </select>
            </div>
        </div>

        <button id="convert-btn" class="modern-button">转换</button>
    </div>

    <!-- 结果显示区域 -->
    <div class="result-container" id="result-container">
        <div class="result-header">
            <h3>转换结果</h3>
        </div>
        <div class="result-content">
            <div class="result-item">
                <span class="result-label">结果：</span>
                <span id="result-value" class="result-value">请输入值并点击转换按钮</span>
            </div>
        </div>
    </div>
</div>

<!-- 代码复制区域 -->
<div class="code-copy-container">
    <h3>代码实现</h3>
    <pre><code class="language-javascript">// 单位转换器功能实现
document.addEventListener('DOMContentLoaded', function() {
    const unitType = document.getElementById('unit-type');
    const inputValue = document.getElementById('input-value');
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultValue = document.getElementById('result-value');
    const resultContainer = document.getElementById('result-container');

    // 单位选项配置
    const unitOptions = {
        length: [
            { value: 'meter', label: '米 (m)' },
            { value: 'kilometer', label: '千米 (km)' },
            { value: 'centimeter', label: '厘米 (cm)' },
            { value: 'millimeter', label: '毫米 (mm)' },
            { value: 'mile', label: '英里 (mi)' },
            { value: 'foot', label: '英尺 (ft)' },
            { value: 'inch', label: '英寸 (in)' }
        ],
        weight: [
            { value: 'kilogram', label: '千克 (kg)' },
            { value: 'gram', label: '克 (g)' },
            { value: 'milligram', label: '毫克 (mg)' },
            { value: 'ton', label: '吨 (t)' },
            { value: 'pound', label: '磅 (lb)' },
            { value: 'ounce', label: '盎司 (oz)' }
        ],
        temperature: [
            { value: 'celsius', label: '摄氏度 (°C)' },
            { value: 'fahrenheit', label: '华氏度 (°F)' },
            { value: 'kelvin', label: '开尔文 (K)' }
        ]
    };

    // 单位转换因子（转换为基本单位）
    const conversionFactors = {
        // 长度：基本单位为米
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.34,
            foot: 0.3048,
            inch: 0.0254
        },
        // 重量：基本单位为千克
        weight: {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            ton: 1000,
            pound: 0.453592,
            ounce: 0.0283495
        }
    };

    // 当转换类型改变时，更新单位选项
    unitType.addEventListener('change', function() {
        const type = this.value;
        updateUnitOptions(type);
    });

    // 更新单位选项
    function updateUnitOptions(type) {
        const options = unitOptions[type];
        inputUnit.innerHTML = '';
        outputUnit.innerHTML = '';

        options.forEach(option => {
            const inputOption = document.createElement('option');
            inputOption.value = option.value;
            inputOption.textContent = option.label;
            inputUnit.appendChild(inputOption);

            const outputOption = document.createElement('option');
            outputOption.value = option.value;
            outputOption.textContent = option.label;
            outputUnit.appendChild(outputOption);
        });
    }

    // 转换按钮点击事件
    convertBtn.addEventListener('click', function() {
        const type = unitType.value;
        const value = parseFloat(inputValue.value);
        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;

        if (isNaN(value)) {
            showResult('请输入有效的数值');
            return;
        }

        let result;

        if (type === 'temperature') {
            // 温度转换
            result = convertTemperature(value, fromUnit, toUnit);
        } else {
            // 长度和重量转换
            result = convertUnit(value, fromUnit, toUnit, type);
        }

        showResult(result.toFixed(6));
    });

    // 转换单位（长度和重量）
    function convertUnit(value, fromUnit, toUnit, type) {
        const factors = conversionFactors[type];
        // 转换为基本单位
        const baseValue = value * factors[fromUnit];
        // 转换为目标单位
        return baseValue / factors[toUnit];
    }

    // 转换温度
    function convertTemperature(value, fromUnit, toUnit) {
        let celsius;

        // 转换为摄氏度
        switch(fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }

        // 转换为目标单位
        switch(toUnit) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return celsius * 9/5 + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
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
});</code></pre>
    <button class="code-copy-button" data-code-target="code" aria-label="复制代码">
        <span class="copy-icon">📋</span>
        <span class="copy-text">复制代码</span>
    </button>
</div>

<script>
// 单位转换器功能实现
document.addEventListener('DOMContentLoaded', function() {
    const unitType = document.getElementById('unit-type');
    const inputValue = document.getElementById('input-value');
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultValue = document.getElementById('result-value');
    const resultContainer = document.getElementById('result-container');

    // 单位选项配置
    const unitOptions = {
        length: [
            { value: 'meter', label: '米 (m)' },
            { value: 'kilometer', label: '千米 (km)' },
            { value: 'centimeter', label: '厘米 (cm)' },
            { value: 'millimeter', label: '毫米 (mm)' },
            { value: 'mile', label: '英里 (mi)' },
            { value: 'foot', label: '英尺 (ft)' },
            { value: 'inch', label: '英寸 (in)' }
        ],
        weight: [
            { value: 'kilogram', label: '千克 (kg)' },
            { value: 'gram', label: '克 (g)' },
            { value: 'milligram', label: '毫克 (mg)' },
            { value: 'ton', label: '吨 (t)' },
            { value: 'pound', label: '磅 (lb)' },
            { value: 'ounce', label: '盎司 (oz)' }
        ],
        temperature: [
            { value: 'celsius', label: '摄氏度 (°C)' },
            { value: 'fahrenheit', label: '华氏度 (°F)' },
            { value: 'kelvin', label: '开尔文 (K)' }
        ]
    };

    // 单位转换因子（转换为基本单位）
    const conversionFactors = {
        // 长度：基本单位为米
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.34,
            foot: 0.3048,
            inch: 0.0254
        },
        // 重量：基本单位为千克
        weight: {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            ton: 1000,
            pound: 0.453592,
            ounce: 0.0283495
        }
    };

    // 当转换类型改变时，更新单位选项
    unitType.addEventListener('change', function() {
        const type = this.value;
        updateUnitOptions(type);
    });

    // 更新单位选项
    function updateUnitOptions(type) {
        const options = unitOptions[type];
        inputUnit.innerHTML = '';
        outputUnit.innerHTML = '';

        options.forEach(option => {
            const inputOption = document.createElement('option');
            inputOption.value = option.value;
            inputOption.textContent = option.label;
            inputUnit.appendChild(inputOption);

            const outputOption = document.createElement('option');
            outputOption.value = option.value;
            outputOption.textContent = option.label;
            outputUnit.appendChild(outputOption);
        });
    }

    // 转换按钮点击事件
    convertBtn.addEventListener('click', function() {
        const type = unitType.value;
        const value = parseFloat(inputValue.value);
        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;

        if (isNaN(value)) {
            showResult('请输入有效的数值');
            return;
        }

        let result;

        if (type === 'temperature') {
            // 温度转换
            result = convertTemperature(value, fromUnit, toUnit);
        } else {
            // 长度和重量转换
            result = convertUnit(value, fromUnit, toUnit, type);
        }

        showResult(result.toFixed(6));
    });

    // 转换单位（长度和重量）
    function convertUnit(value, fromUnit, toUnit, type) {
        const factors = conversionFactors[type];
        // 转换为基本单位
        const baseValue = value * factors[fromUnit];
        // 转换为目标单位
        return baseValue / factors[toUnit];
    }

    // 转换温度
    function convertTemperature(value, fromUnit, toUnit) {
        let celsius;

        // 转换为摄氏度
        switch(fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }

        // 转换为目标单位
        switch(toUnit) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return celsius * 9/5 + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
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

/* 现代输入框样式 */
.modern-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #2d3748;
}

.modern-input:focus {
    outline: none;
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
    background: rgba(255, 255, 255, 0.95);
}

.dark .modern-input {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(170, 210, 230, 0.3);
    color: #e2e8f0;
}

.dark .modern-input:focus {
    background: rgba(30, 30, 30, 0.95);
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
}

/* 现代下拉选择框样式 */
.select-wrapper {
    position: relative;
}

.modern-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(170, 210, 230, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #2d3748;
    appearance: none;
    cursor: pointer;
}

.modern-select:focus {
    outline: none;
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
    background: rgba(255, 255, 255, 0.95);
}

.dark .modern-select {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(170, 210, 230, 0.3);
    color: #e2e8f0;
}

.dark .modern-select:focus {
    background: rgba(30, 30, 30, 0.95);
    border-color: #FFB7C5;
    box-shadow: 0 0 0 3px rgba(255, 183, 197, 0.2);
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

    .modern-input,
    .modern-select {
        padding: 10px 14px;
        font-size: 14px;
    }

    .modern-button {
        padding: 12px 18px;
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