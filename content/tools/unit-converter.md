---
title: 单位转换器
layout: "page"
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
            <label for="unit-type">单位类型：</label>
            <select id="unit-type">
                <option value="length">长度</option>
                <option value="weight">重量</option>
                <option value="temperature">温度</option>
                <option value="time">时间</option>
                <option value="data">数据存储</option>
            </select>
        </div>
        <div class="input-group">
            <label for="input-value">输入值：</label>
            <input type="number" id="input-value" placeholder="请输入要转换的值" value="1">
        </div>
        <div class="input-group">
            <label for="from-unit">从单位：</label>
            <select id="from-unit">
                <!-- 长度单位 -->
                <option value="meter">米 (m)</option>
                <option value="kilometer">千米 (km)</option>
                <option value="centimeter">厘米 (cm)</option>
                <option value="millimeter">毫米 (mm)</option>
                <option value="inch">英寸 (in)</option>
                <option value="foot">英尺 (ft)</option>
                <option value="yard">码 (yd)</option>
                <option value="mile">英里 (mi)</option>
            </select>
        </div>
        <div class="input-group">
            <label for="to-unit">到单位：</label>
            <select id="to-unit">
                <!-- 长度单位 -->
                <option value="meter">米 (m)</option>
                <option value="kilometer">千米 (km)</option>
                <option value="centimeter">厘米 (cm)</option>
                <option value="millimeter">毫米 (mm)</option>
                <option value="inch">英寸 (in)</option>
                <option value="foot">英尺 (ft)</option>
                <option value="yard">码 (yd)</option>
                <option value="mile">英里 (mi)</option>
            </select>
        </div>
        <button id="convert-btn" class="tool-button">转换</button>
        <div class="result-group">
            <label for="convert-result">转换结果：</label>
            <input type="text" id="convert-result" readonly>
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
    // 单位转换器功能
    window.onload = function() {
        console.log('初始化单位转换器');
        
        // 获取 DOM 元素
        const unitType = document.getElementById('unit-type');
        const inputValue = document.getElementById('input-value');
        const fromUnit = document.getElementById('from-unit');
        const toUnit = document.getElementById('to-unit');
        const convertBtn = document.getElementById('convert-btn');
        const convertResult = document.getElementById('convert-result');
        
        console.log('工具元素:', {
            unitType: !!unitType,
            inputValue: !!inputValue,
            fromUnit: !!fromUnit,
            toUnit: !!toUnit,
            convertBtn: !!convertBtn,
            convertResult: !!convertResult
        });
        
        // 单位转换因子
        const conversionFactors = {
            length: {
                meter: 1,
                kilometer: 0.001,
                centimeter: 100,
                millimeter: 1000,
                inch: 39.3701,
                foot: 3.28084,
                yard: 1.09361,
                mile: 0.000621371
            },
            weight: {
                gram: 1,
                kilogram: 0.001,
                milligram: 1000,
                pound: 0.00220462,
                ounce: 0.035274,
                ton: 0.00000110231
            },
            temperature: {
                celsius: {
                    toKelvin: (c) => c + 273.15,
                    toFahrenheit: (c) => (c * 9/5) + 32
                },
                fahrenheit: {
                    toCelsius: (f) => (f - 32) * 5/9,
                    toKelvin: (f) => (f - 32) * 5/9 + 273.15
                },
                kelvin: {
                    toCelsius: (k) => k - 273.15,
                    toFahrenheit: (k) => (k - 273.15) * 9/5 + 32
                }
            },
            time: {
                second: 1,
                minute: 1/60,
                hour: 1/3600,
                day: 1/86400,
                week: 1/604800,
                month: 1/2628000,
                year: 1/31536000
            },
            data: {
                byte: 1,
                kilobyte: 0.001,
                megabyte: 0.000001,
                gigabyte: 0.000000001,
                terabyte: 0.000000000001
            }
        };
        
        // 单位选项
        const unitOptions = {
            length: [
                { value: 'meter', label: '米 (m)' },
                { value: 'kilometer', label: '千米 (km)' },
                { value: 'centimeter', label: '厘米 (cm)' },
                { value: 'millimeter', label: '毫米 (mm)' },
                { value: 'inch', label: '英寸 (in)' },
                { value: 'foot', label: '英尺 (ft)' },
                { value: 'yard', label: '码 (yd)' },
                { value: 'mile', label: '英里 (mi)' }
            ],
            weight: [
                { value: 'gram', label: '克 (g)' },
                { value: 'kilogram', label: '千克 (kg)' },
                { value: 'milligram', label: '毫克 (mg)' },
                { value: 'pound', label: '磅 (lb)' },
                { value: 'ounce', label: '盎司 (oz)' },
                { value: 'ton', label: '吨 (t)' }
            ],
            temperature: [
                { value: 'celsius', label: '摄氏度 (°C)' },
                { value: 'fahrenheit', label: '华氏度 (°F)' },
                { value: 'kelvin', label: '开尔文 (K)' }
            ],
            time: [
                { value: 'second', label: '秒 (s)' },
                { value: 'minute', label: '分钟 (min)' },
                { value: 'hour', label: '小时 (h)' },
                { value: 'day', label: '天 (d)' },
                { value: 'week', label: '周 (w)' },
                { value: 'month', label: '月 (mo)' },
                { value: 'year', label: '年 (y)' }
            ],
            data: [
                { value: 'byte', label: '字节 (B)' },
                { value: 'kilobyte', label: '千字节 (KB)' },
                { value: 'megabyte', label: '兆字节 (MB)' },
                { value: 'gigabyte', label: '吉字节 (GB)' },
                { value: 'terabyte', label: '太字节 (TB)' }
            ]
        };
        
        // 更新单位选项
        function updateUnitOptions() {
            const type = unitType.value;
            const options = unitOptions[type];
            
            // 清空现有选项
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            
            // 添加新选项
            options.forEach(option => {
                const fromOption = document.createElement('option');
                fromOption.value = option.value;
                fromOption.textContent = option.label;
                fromUnit.appendChild(fromOption);
                
                const toOption = document.createElement('option');
                toOption.value = option.value;
                toOption.textContent = option.label;
                toUnit.appendChild(toOption);
            });
            
            // 确保默认选项不同
            if (toUnit.options.length > 1) {
                toUnit.selectedIndex = 1;
            }
        }
        
        // 转换函数
        function convertUnit() {
            console.log('转换按钮点击');
            const type = unitType.value;
            const value = parseFloat(inputValue.value);
            const from = fromUnit.value;
            const to = toUnit.value;
            
            if (isNaN(value)) {
                convertResult.value = '请输入有效的数值';
                return;
            }
            
            try {
                let result;
                
                if (type === 'temperature') {
                    // 温度转换
                    if (from === 'celsius') {
                        if (to === 'fahrenheit') {
                            result = (value * 9/5) + 32;
                        } else if (to === 'kelvin') {
                            result = value + 273.15;
                        } else {
                            result = value;
                        }
                    } else if (from === 'fahrenheit') {
                        if (to === 'celsius') {
                            result = (value - 32) * 5/9;
                        } else if (to === 'kelvin') {
                            result = (value - 32) * 5/9 + 273.15;
                        } else {
                            result = value;
                        }
                    } else if (from === 'kelvin') {
                        if (to === 'celsius') {
                            result = value - 273.15;
                        } else if (to === 'fahrenheit') {
                            result = (value - 273.15) * 9/5 + 32;
                        } else {
                            result = value;
                        }
                    }
                } else {
                    // 其他单位转换
                    const factor = conversionFactors[type];
                    // 先转换为基准单位，再转换为目标单位
                    const baseValue = value / factor[from];
                    result = baseValue * factor[to];
                }
                
                convertResult.value = result.toFixed(6);
                
            } catch (error) {
                console.error('转换时出错:', error);
                convertResult.value = '转换时出错，请重试';
            }
        }
        
        // 绑定事件
        if (unitType) {
            unitType.addEventListener('change', updateUnitOptions);
        }
        
        if (convertBtn) {
            convertBtn.addEventListener('click', convertUnit);
        }
        
        // 初始化单位选项
        updateUnitOptions();
    };
</script>