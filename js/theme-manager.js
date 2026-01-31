// 系统深浅色自动同步博客主题功能
document.addEventListener('DOMContentLoaded', function() {
    // 主题管理类
    class ThemeManager {
        constructor() {
            this.isDark = false;
            this.savedTheme = null;
            this.themeToggle = null;
            this.init();
        }
        
        // 初始化主题
        init() {
            try {
                // 获取用户手动切换的缓存（优先级更高）
                this.savedTheme = localStorage.getItem('stack-theme');
                
                // 检测系统主题偏好
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                // 1. 有用户手动选择的主题 → 优先使用
                if (this.savedTheme) {
                    this.setTheme(this.savedTheme);
                } 
                // 2. 无手动选择 → 跟随系统主题
                else {
                    this.setTheme(isSystemDark ? 'dark' : 'light');
                }
                
                // 缓存主题切换按钮，避免重复查询
                this.themeToggle = document.querySelector('.theme-toggle');
                
                // 监听系统主题变化（实时同步）
                this.listenToSystemChanges();
                
                // 监听手动主题切换
                this.listenToManualToggle();
            } catch (error) {
                console.warn('主题初始化失败:', error);
                // 初始化失败时，默认使用浅色主题
                this.setTheme('light');
            }
        }
        
        // 核心切换逻辑
        setTheme(theme) {
            try {
                const shouldBeDark = theme === 'dark';
                
                // 避免重复切换相同主题
                if (shouldBeDark === this.isDark) {
                    return;
                }
                
                // 应用主题类
                if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                
                this.isDark = shouldBeDark;
                
                // 保存用户偏好
                localStorage.setItem('stack-theme', theme);
                
                // 同步主题切换按钮状态（兼容Stack原生按钮）
                this.syncToggleButton(theme);
                
                // 只有在必要时触发主题变更事件
                // 例如，当有组件需要响应主题变化时（如Mermaid图表）
                this.triggerThemeChangeEvent(theme);
            } catch (error) {
                console.warn('主题切换失败:', error);
            }
        }
        
        // 同步切换按钮状态
        syncToggleButton(theme) {
            try {
                if (this.themeToggle) {
                    this.themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
                    // 更新按钮图标状态
                    if (this.themeToggle.querySelector('i')) {
                        const icon = this.themeToggle.querySelector('i');
                        if (theme === 'dark') {
                            icon.className = 'fas fa-sun';
                        } else {
                            icon.className = 'fas fa-moon';
                        }
                    }
                }
            } catch (error) {
                // 按钮同步失败不影响主题切换
            }
        }
        
        // 监听系统主题变化
        listenToSystemChanges() {
            try {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                
                // 使用防抖处理，避免频繁触发
                const debouncedHandleChange = this.debounce((e) => {
                    // 只有用户未手动切换过，才跟随系统变化
                    if (!this.savedTheme) {
                        this.setTheme(e.matches ? 'dark' : 'light');
                    }
                }, 200);
                
                // 添加事件监听器
                if (mediaQuery.addEventListener) {
                    mediaQuery.addEventListener('change', debouncedHandleChange);
                } else if (mediaQuery.addListener) {
                    // 兼容旧版浏览器
                    mediaQuery.addListener(debouncedHandleChange);
                }
            } catch (error) {
                console.warn('监听系统主题变化失败:', error);
            }
        }
        
        // 监听手动主题切换
        listenToManualToggle() {
            try {
                if (this.themeToggle) {
                    // 使用事件委托，减少事件监听器数量
                    this.themeToggle.addEventListener('click', () => {
                        const newTheme = this.isDark ? 'light' : 'dark';
                        this.setTheme(newTheme);
                    });
                }
            } catch (error) {
                console.warn('监听手动主题切换失败:', error);
            }
        }
        
        // 触发主题变更事件
        triggerThemeChangeEvent(theme) {
            try {
                const event = new CustomEvent('themeChanged', {
                    detail: {
                        theme: theme,
                        isDark: theme === 'dark'
                    }
                });
                document.dispatchEvent(event);
            } catch (error) {
                console.warn('触发主题变更事件失败:', error);
            }
        }
        
        // 防抖函数
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    }
    
    // 初始化主题管理器
    window.themeManager = new ThemeManager();
});