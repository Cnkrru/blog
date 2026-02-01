/**
 * 工具页面脚本
 * 包含各种工具的交互功能
 */

// 进制转换器功能
function initBaseConverter() {
  console.log('Initializing base converter');
  const inputValue = document.getElementById('input-value');
  const fromBase = document.getElementById('from-base');
  const toBase = document.getElementById('to-base');
  const convertBtn = document.getElementById('convert-btn');
  const resultValue = document.getElementById('result-value');

  console.log('Converter elements:', {
    inputValue: !!inputValue,
    fromBase: !!fromBase,
    toBase: !!toBase,
    convertBtn: !!convertBtn,
    resultValue: !!resultValue
  });

  function convertNumber() {
    console.log('Converting number');
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
  }

  if (convertBtn) {
    convertBtn.addEventListener('click', convertNumber);
    console.log('Added click event listener to convert button');
  }

  if (inputValue) {
    // 按下回车键时自动转换
    inputValue.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        convertNumber();
      }
    });
    console.log('Added keypress event listener to input value');
  }
}

// 页面加载完成后初始化
if (typeof window !== 'undefined') {
  console.log('Window is defined, initializing tools');
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Document is ready, initializing base converter');
    initBaseConverter();
  } else {
    console.log('Document is not ready, adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', initBaseConverter);
  }
}
