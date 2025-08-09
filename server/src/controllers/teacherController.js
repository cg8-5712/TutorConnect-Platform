import Teacher from '../models/Teacher.js';

// 获取教师列表
export const getTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10, minRating, maxPrice, subject } = req.query;
    
    const filter = {};
    
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (maxPrice) filter.hourlyRate = { $lte: parseInt(maxPrice) };
    if (subject) filter.subjects = subject;
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: {
        path: 'user',
        select: 'fullName avatarUrl'
      },
      sort: { rating: -1 }
    };
    
    const result = await Teacher.paginate(filter, options);
    
    res.json({
      teachers: result.docs,
      total: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page
    });
  } catch (error) {
    res.status(500).json({ 
      message: '获取教师列表失败',
      error: error.message
    });
  }
};

// 获取单个教师详情
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user', 'fullName avatarUrl email phone')
      .populate({
        path: 'bookings',
        match: { status: 'completed' },
        select: 'startTime student review',
        populate: {
          path: 'student',
          select: 'fullName'
        },
        options: { limit: 5, sort: { startTime: -1 } }
      });
      
    if (!teacher) {
      return res.status(404).json({ message: '教师未找到' });
    }
    
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ 
      message: '获取教师信息失败',
      error: error.message
    });
  }
};

// 搜索教师
export const searchTeachers = async (req, res) => {
  try {
    const { query, filters } = req.body;
    
    const searchFilter = {
      $or: [
        { 'user.fullName': { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { subjects: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ],
      ...filters
    };
    
    const teachers = await Teacher.find(searchFilter)
      .populate('user', 'fullName avatarUrl')
      .limit(20);
      
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ 
      message: '搜索教师失败',
      error: error.message
    });
  }
};