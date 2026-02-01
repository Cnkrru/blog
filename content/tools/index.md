---
title: 工具
layout: "page"
menu:
    main:
        params:
            icon: tools

comments: false
---

<div class="tools-header">
    <h2>实用工具</h2>
    <p>为你提供各种实用的在线工具</p>
</div>

<div class="tools-card-container">
  <div class="tool-card">
    <a href="/blog/tools/text-tool/" class="tool-card-link" data-pjax="false">
      <div class="tool-card-icon">📝</div>
      <div class="tool-card-content">
        <h3>文本处理工具</h3>
        <p>文本格式化、大小写转换、字符统计等功能</p>
      </div>
      <div class="tool-card-arrow">→</div>
    </a>
  </div>

  <div class="tool-card">
    <a href="/blog/tools/password-generator/" class="tool-card-link" data-pjax="false">
      <div class="tool-card-icon">🔒</div>
      <div class="tool-card-content">
        <h3>密码生成器</h3>
        <p>生成安全强度高的随机密码</p>
      </div>
      <div class="tool-card-arrow">→</div>
    </a>
  </div>

  <div class="tool-card">
    <a href="/blog/tools/unit-converter/" class="tool-card-link" data-pjax="false">
      <div class="tool-card-icon">📏</div>
      <div class="tool-card-content">
        <h3>单位转换器</h3>
        <p>长度、重量、温度等单位之间的转换</p>
      </div>
      <div class="tool-card-arrow">→</div>
    </a>
  </div>

  <div class="tool-card">
    <a href="/blog/tools/color-tool/" class="tool-card-link" data-pjax="false">
      <div class="tool-card-icon">🎨</div>
      <div class="tool-card-content">
        <h3>颜色工具</h3>
        <p>颜色代码转换、调色板生成等功能</p>
      </div>
      <div class="tool-card-arrow">→</div>
    </a>
  </div>
</div>

<style>
.tools-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
}

.tools-header h2 {
  color: #FFB7C5;
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 700;
}

.tools-header p {
  color: #AAB2C0;
  font-size: 14px;
  margin: 0;
}

.tools-card-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.tool-card {
  background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(170, 210, 230, 0.2);
  border-color: rgba(255, 200, 210, 0.3);
}

.tool-card-link {
  display: block;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-card-icon {
  font-size: 48px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.tool-card:hover .tool-card-icon {
  transform: scale(1.1);
}

.tool-card-content {
  margin-bottom: 16px;
  flex: 1;
}

.tool-card-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  transition: color 0.3s ease;
}

.tool-card-content p {
  margin: 0;
  font-size: 14px;
  color: #718096;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.tool-card-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #4a5568;
  transition: all 0.3s ease;
}

.tool-card:hover .tool-card-arrow {
  transform: translateX(5px);
  color: #FFB7C5;
}

.dark .tool-card {
  background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
  border-color: rgba(255, 255, 255, 0.05);
}

.dark .tool-card:hover {
  box-shadow: 0 15px 35px rgba(170, 210, 230, 0.1);
  border-color: rgba(255, 200, 210, 0.2);
}

.dark .tool-card-content h3 {
  color: #ffffff;
}

.dark .tool-card-content p {
  color: #a0aec0;
}

.dark .tool-card-arrow {
  color: #a0aec0;
}

.dark .tool-card:hover .tool-card-arrow {
  color: #FFB7C5;
}

@media (max-width: 1200px) {
  .tools-card-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  
  .tool-card {
    height: 180px;
  }
}

@media (max-width: 992px) {
  .tools-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .tools-header {
    margin-bottom: 30px;
  }

  .tools-header h2 {
    font-size: 20px;
  }

  .tools-card-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 16px;
    gap: 12px;
    margin-bottom: 30px;
  }

  .tool-card {
    height: 160px;
  }

  .tool-card-link {
    padding: 20px;
  }

  .tool-card-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }

  .tool-card-content h3 {
    font-size: 16px;
  }

  .tool-card-content p {
    font-size: 13px;
  }

  .tool-card-arrow {
    font-size: 16px;
    bottom: 16px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .tools-card-container {
    grid-template-columns: 1fr;
  }
  
  .tool-card {
    height: 140px;
  }
}
</style>