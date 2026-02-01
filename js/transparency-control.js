/**
 * 透明度调节功能脚本
 * 功能：
 * - 显示/隐藏透明度调节面板
 * - 调节页面元素的透明度
 * - 保存透明度设置到localStorage
 * - 页面加载时恢复透明度设置
 */

// 全局变量
var transparencyPanel, transparencySlider, transparencyValue, transparencyButton;
var isTransparencyPanelVisible = false;
var currentOpacity = 0.8; // 默认透明度

// 初始化透明度调节功能
function initTransparencyControl() {
  console.log('初始化透明度调节功能');
  
  // 获取DOM元素
  transparencyButton = document.getElementById('transparency-toggle');
  transparencyPanel = document.getElementById('transparency-panel');
  transparencySlider = document.getElementById('transparency-slider');
  transparencyValue = document.getElementById('transparency-value');
  
  console.log('透明度调节元素:', {
    button: !!transparencyButton,
    panel: !!transparencyPanel,
    slider: !!transparencySlider,
    value: !!transparencyValue
  });
  
  // 检查是否所有元素都存在
  if (!transparencyButton || !transparencyPanel || !transparencySlider || !transparencyValue) {
    console.warn('透明度调节元素不存在，功能将不可用');
    return;
  }
  
  // 从localStorage加载保存的透明度设置
  loadTransparencySettings();
  
  // 设置初始值
  if (transparencySlider) {
    transparencySlider.value = currentOpacity * 100;
  }
  if (transparencyValue) {
    transparencyValue.textContent = Math.round(currentOpacity * 100) + '%';
  }
  
  // 应用初始透明度
  applyTransparency(currentOpacity);
  
  // 绑定事件
  bindTransparencyEvents();
}

// 从localStorage加载透明度设置
function loadTransparencySettings() {
  try {
    var savedOpacity = localStorage.getItem('transparencyOpacity');
    if (savedOpacity) {
      currentOpacity = parseFloat(savedOpacity);
      console.log('加载保存的透明度设置:', currentOpacity);
    }
  } catch (error) {
    console.warn('加载透明度设置失败:', error);
  }
}

// 保存透明度设置到localStorage
function saveTransparencySettings() {
  try {
    localStorage.setItem('transparencyOpacity', currentOpacity);
    console.log('保存透明度设置:', currentOpacity);
  } catch (error) {
    console.warn('保存透明度设置失败:', error);
  }
}

// 应用透明度设置
function applyTransparency(opacity) {
  console.log('应用透明度:', opacity);
  
  // 应用到播放器
  var player = document.getElementById('global-music-player');
  if (player) {
    player.style.background = `linear-gradient(135deg, rgba(2