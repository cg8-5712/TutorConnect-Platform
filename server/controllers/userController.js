import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// 创建用户
export const register = async (req, res) => {
    try {
        const { username, password, role, email, fullName } = req.body;

        // 检查用户是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            fullName,
            password: hashedPassword,
            role
        });

        await user.save();

        // 注册后自动登录并返回 JWT确认
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error during registration' });
    }
};

// 获取用户列表
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// 获取单个用户
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// 更新用户信息
export const updateUser = async (req, res) => {
    try {
        const { username, role, fullName, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, role, fullName, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// 删除用户
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// 用户注册（默认角色 student）
export const registerStudent = async (req, res) => {
    try {
        const { username, password, email, fullName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, fullName, password: hashedPassword, role: 'student' }); // 默认角色
        await user.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration' });
    }
};

// 用户登录（合并逻辑，兼容 passwordHash 字段和 password 字段）
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: '无效的邮箱或密码' });
        }

        // 2. 验证密码，兼容 passwordHash 和 password 字段
        let isMatch = false;
        if (user.passwordHash) {
            isMatch = await bcrypt.compare(password, user.passwordHash);
        } else if (user.password) {
            isMatch = await bcrypt.compare(password, user.password);
        }
        if (!isMatch) {
            return res.status(401).json({ error: '无效的邮箱或密码' });
        }

        // 3. 生成真正的 JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. 返回响应
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: '登录失败' });
    }
};