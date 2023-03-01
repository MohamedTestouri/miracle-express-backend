const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const User = userModel.User;
require("dotenv").config();

describe('User authentication', () => {
    describe('login', () => {
        it('should return 404 if user is not found', async () => {
            const req = {
                body: {
                    email: 'fake@example.com',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({"message": "incorrect password"});
        });

        it('should return 401 if user is not active', async () => {
            const user = new User({
                email: 'test@example.com',
                password: bcrypt.hashSync('password'),
                isActive: false
            });
            await user.save();
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({"message": "not active"});
            await user.remove(); // Clean up after test
        });

        it('should return 200 if user is found and password is correct', async () => {
            const user = new User({
                email: 'test@example.com',
                password: bcrypt.hashSync('password'),
                isActive: true
            });
            await user.save();
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user.toObject());
            await user.remove(); // Clean up after test
        });

        it('should return 404 if password is incorrect', async () => {
            const user = new User({
                email: 'test@example.com',
                password: bcrypt.hashSync('password'),
                isActive: true
            });
            await user.save();
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'wrong_password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({"message": "incorrect password"});
            await user.remove(); // Clean up after test
        });
    });

    describe('register', () => {
        it('should create a new user and return 201', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await register(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
            const createdUser = await User.findOne({ email: 'test@example.com' });
            expect(createdUser).not.toBeNull();
            await createdUser.remove(); // Clean up after test
        });

        it('should return 404 if user already exists', async () => {

