import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    // 布局状态
    isMobileMenuOpen: false,
    isSearchPanelOpen: false,
    
    // 通知系统
    notifications: [],
    
    // 加载状态
    loadingStack: [],
    
    // 模态框
    activeModal: null,
    modalProps: {},
    
    // 主题设置
    theme: localStorage.getItem('theme') || 'light',
    fontSize: localStorage.getItem('fontSize') || 'normal'
  }),
  
  getters: {
    isLoading: (state) => state.loadingStack.length > 0,
    currentModal: (state) => ({
      name: state.activeModal,
      props: state.modalProps
    })
  },
  
  actions: {
    // 布局操作
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    
    toggleSearchPanel() {
      this.isSearchPanelOpen = !this.isSearchPanelOpen;
    },
    
    // 通知系统
    showNotification(notification) {
      const id = Date.now().toString();
      const newNotification = {
        id,
        type: 'info',
        timeout: 5000,
        ...notification
      };
      
      this.notifications.push(newNotification);
      
      // 自动移除通知
      if (newNotification.timeout > 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, newNotification.timeout);
      }
      
      return id;
    },
    
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
    
    clearNotifications() {
      this.notifications = [];
    },
    
    // 加载状态
    startLoading() {
      this.loadingStack.push(true);
    },
    
    finishLoading() {
      if (this.loadingStack.length > 0) {
        this.loadingStack.pop();
      }
    },
    
    // 模态框管理
    openModal(name, props = {}) {
      this.activeModal = name;
      this.modalProps = props;
    },
    
    closeModal() {
      this.activeModal = null;
      this.modalProps = {};
    },
    
    // 主题设置
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      this.applyTheme();
    },
    
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    
    setFontSize(size) {
      const validSizes = ['small', 'normal', 'large'];
      if (validSizes.includes(size)) {
        this.fontSize = size;
        localStorage.setItem('fontSize', size);
        document.documentElement.style.fontSize = 
          size === 'small' ? '14px' : 
          size === 'large' ? '18px' : '16px';
      }
    },
    
    // 初始化UI设置
    initUISettings() {
      this.applyTheme();
      this.setFontSize(this.fontSize);
    }
  }
});