import { h } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// 动态导入视图组件（代码分割）
const HomeView = () => import('@/views/HomeView.vue');
const TeacherListView = () => import('@/views/TeacherListView.vue');
const TeacherDetailView = () => import('@/views/TeacherDetailView.vue');
const BookingView = () => import('@/views/BookingView.vue');
const SubjectListView = () => import('@/views/SubjectListView.vue');
const PricingView = () => import('@/views/PricingView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');
const ProfileView = () => import('@/views/user/ProfileView.vue');
const BookingsView = () => import('@/views/user/BookingsView.vue');
const MessagesView = () => import('@/views/user/MessagesView.vue');
const NotFoundView = () => import('@/views/errors/NotFoundView.vue');

// 创建布局组件
const createLayoutComponent = (layout, component) => {
  return {
    render() {
      return h(layout, null, {
        default: () => h(component)
      });
    }
  };
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: createLayoutComponent(DefaultLayout, HomeView),
    meta: {
      title: '首页 - TutorConnect',
      breadcrumb: '首页'
    }
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: createLayoutComponent(DefaultLayout, TeacherListView),
    meta: {
      title: '找老师 - TutorConnect',
      breadcrumb: '教师列表',
      requiresAuth: false
    }
  },
  {
    path: '/teacher/:id',
    name: 'teacher-detail',
    component: createLayoutComponent(DefaultLayout, TeacherDetailView),
    props: true,
    meta: {
      title: '教师详情 - TutorConnect',
      breadcrumb: '教师详情',
      requiresAuth: false
    }
  },
  {
    path: '/book/:teacherId',
    name: 'booking',
    component: createLayoutComponent(DefaultLayout, BookingView),
    props: true,
    meta: {
      title: '预约课程 - TutorConnect',
      breadcrumb: '课程预约',
      requiresAuth: true
    }
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: createLayoutComponent(DefaultLayout, SubjectListView),
    meta: {
      title: '学科辅导 - TutorConnect',
      breadcrumb: '学科辅导',
      requiresAuth: false
    }
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: createLayoutComponent(DefaultLayout, PricingView),
    meta: {
      title: '收费标准 - TutorConnect',
      breadcrumb: '收费标准',
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: createLayoutComponent(DefaultLayout, AboutView),
    meta: {
      title: '关于我们 - TutorConnect',
      breadcrumb: '关于我们',
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: createLayoutComponent(AuthLayout, LoginView),
    meta: {
      title: '登录 - TutorConnect',
      breadcrumb: '登录',
      requiresAuth: false,
      hideForAuth: true // 已登录用户不应看到登录页
    }
  },
  {
    path: '/register',
    name: 'register',
    component: createLayoutComponent(AuthLayout, RegisterView),
    meta: {
      title: '注册 - TutorConnect',
      breadcrumb: '注册',
      requiresAuth: false,
      hideForAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: createLayoutComponent(DefaultLayout, ProfileView),
    meta: {
      title: '个人资料 - TutorConnect',
      breadcrumb: '个人资料',
      requiresAuth: true
    }
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: createLayoutComponent(DefaultLayout, BookingsView),
    meta: {
      title: '我的预约 - TutorConnect',
      breadcrumb: '我的预约',
      requiresAuth: true
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: createLayoutComponent(DefaultLayout, MessagesView),
    meta: {
      title: '消息中心 - TutorConnect',
      breadcrumb: '消息中心',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: createLayoutComponent(DefaultLayout, NotFoundView),
    meta: {
      title: '页面不存在 - TutorConnect',
      breadcrumb: '404'
    }
  }
];

export default routes;