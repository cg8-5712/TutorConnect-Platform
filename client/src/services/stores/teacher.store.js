import { defineStore } from 'pinia';
import TeacherService from '@/services/api/teacher.api';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    featuredTeachers: [],
    currentTeacher: null,
    searchResults: [],
    filters: {
      subject: '',
      minRating: 4.0,
      maxPrice: 500,
      availability: []
    },
    isLoading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 10
    }
  }),
  
  actions: {
    async fetchFeaturedTeachers() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const params = {
          featured: true,
          limit: 4
        };
        const response = await TeacherService.getTeachers(params);
        this.featuredTeachers = response.data;
      } catch (error) {
        this.error = error.message || '获取推荐教师失败';
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchTeacherById(teacherId) {
      this.isLoading = true;
      this.error = null;
      
      try {
        this.currentTeacher = await TeacherService.getTeacherById(teacherId);
      } catch (error) {
        this.error = error.message || '获取教师信息失败';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async searchTeachers(query = '') {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await TeacherService.searchTeachers(query, this.filters);
        this.searchResults = response.data;
        this.pagination = response.pagination;
      } catch (error) {
        this.error = error.message || '搜索教师失败';
      } finally {
        this.isLoading = false;
      }
    },
    
    async updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      await this.searchTeachers();
    },
    
    async fetchTeacherAvailability(teacherId) {
      if (!teacherId) return;
      
      try {
        return await TeacherService.getTeacherAvailability(teacherId);
      } catch (error) {
        console.error('获取教师可用时间失败:', error);
        throw error;
      }
    },
    
    async fetchTeacherReviews(teacherId) {
      if (!teacherId) return;
      
      try {
        return await TeacherService.getTeacherReviews(teacherId);
      } catch (error) {
        console.error('获取教师评价失败:', error);
        throw error;
      }
    },
    
    async addReview(teacherId, reviewData) {
      try {
        const newReview = await TeacherService.addTeacherReview(teacherId, reviewData);
        
        // 更新当前教师的评价
        if (this.currentTeacher && this.currentTeacher.id === teacherId) {
          this.currentTeacher.reviews = [...(this.currentTeacher.reviews || []), newReview];
          this.currentTeacher.rating = this.calculateAverageRating(this.currentTeacher.reviews);
        }
        
        return newReview;
      } catch (error) {
        console.error('添加评价失败:', error);
        throw error;
      }
    },
    
    calculateAverageRating(reviews) {
      if (!reviews || reviews.length === 0) return 0;
      
      const total = reviews.reduce((sum, review) => sum + review.rating, 0);
      return Math.round((total / reviews.length) * 10) / 10;
    },
    
    clearCurrentTeacher() {
      this.currentTeacher = null;
    }
  }
});