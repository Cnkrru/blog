---
title: 书籍
date: 2026-02-01
layout: "books"
slug: "books"
menu:
    main:
        weight: -60
        params:
            icon: book

comments: false
---

<div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #FFB7C5; font-size: 24px; margin-bottom: 10px;">我的书架</h2>
    <p style="color: #AAB2C0; font-size: 14px;">记录我读过的书籍</p>
</div>

<!-- 书籍列表 -->
<div class="books-container">
    <!-- 书籍项示例 -->
    <div class="book-item">
        <div class="book-cover">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20design%20for%20a%20programming%20book%20with%20modern%20clean%20design&image_size=square" alt="书籍封面" />
        </div>
        <div class="book-info">
            <h3 class="book-title">Hugo静态网站生成器实战</h3>
            <p class="book-author">作者: 张三</p>
            <p class="book-description">学习如何使用Hugo构建高性能静态网站的实用指南</p>
            <div class="book-meta">
                <span class="book-year">2026</span>
                <span class="book-status">已读</span>
            </div>
        </div>
    </div>

    <div class="book-item">
        <div class="book-cover">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20design%20for%20a%20web%20development%20book%20with%20modern%20clean%20design&image_size=square" alt="书籍封面" />
        </div>
        <div class="book-info">
            <h3 class="book-title">现代前端开发技术</h3>
            <p class="book-author">作者: 李四</p>
            <p class="book-description">探索现代前端开发的最新技术和最佳实践</p>
            <div class="book-meta">
                <span class="book-year">2025</span>
                <span class="book-status">已读</span>
            </div>
        </div>
    </div>

    <div class="book-item">
        <div class="book-cover">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20cover%20design%20for%20a%20design%20book%20with%20modern%20clean%20design&image_size=square" alt="书籍封面" />
        </div>
        <div class="book-info">
            <h3 class="book-title">设计思维与用户体验</h3>
            <p class="book-author">作者: 王五</p>
            <p class="book-description">学习如何应用设计思维创造出色的用户体验</p>
            <div class="book-meta">
                <span class="book-year">2026</span>
                <span class="book-status">在读</span>
            </div>
        </div>
    </div>
</div>

<style>
    /* 书籍页面样式 */
    .books-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .book-item {
        display: flex;
        gap: 20px;
        background: linear-gradient(135deg, rgba(255, 200, 210, 0.1), rgba(170, 210, 230, 0.1));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .book-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(170, 210, 230, 0.2);
    }

    .book-cover {
        flex-shrink: 0;
        width: 120px;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .book-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .book-item:hover .book-cover img {
        transform: scale(1.05);
    }

    .book-info {
        flex: 1;
        min-width: 0;
    }

    .book-title {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 700;
        color: #1a202c;
        line-height: 1.3;
    }

    .book-author {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #718096;
    }

    .book-description {
        margin: 0 0 16px 0;
        font-size: 14px;
        color: #4a5568;
        line-height: 1.5;
    }

    .book-meta {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .book-year {
        font-size: 12px;
        color: #718096;
        background: rgba(170, 210, 230, 0.2);
        padding: 4px 10px;
        border-radius: 12px;
    }

    .book-status {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
    }

    .book-status:contains("已读") {
        background: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
    }

    .book-status:contains("在读") {
        background: rgba(255, 193, 7, 0.2);
        color: #FFC107;
    }

    .book-status:contains("未读") {
        background: rgba(244, 67, 54, 0.2);
        color: #F44336;
    }

    /* 暗黑模式适配 */
    .dark .book-item {
        background: linear-gradient(135deg, rgba(255, 200, 210, 0.05), rgba(170, 210, 230, 0.05));
        border-color: rgba(255, 255, 255, 0.05);
    }

    .dark .book-item:hover {
        box-shadow: 0 10px 30px rgba(170, 210, 230, 0.1);
    }

    .dark .book-title {
        color: #ffffff;
    }

    .dark .book-author {
        color: #a0aec0;
    }

    .dark .book-description {
        color: #e2e8f0;
    }

    .dark .book-year {
        color: #a0aec0;
        background: rgba(170, 210, 230, 0.1);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .books-container {
            padding: 16px;
        }

        .book-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 16px;
        }

        .book-cover {
            width: 100px;
            height: 150px;
        }

        .book-info {
            width: 100%;
        }

        .book-title {
            font-size: 16px;
            margin-top: 12px;
        }

        .book-meta {
            justify-content: center;
        }
    }
</style>