﻿using MeetingRoom.DTO.Request;
using MeetingRoom.DTO.Response;
using MeetingRoom.Repository;

namespace MeetingRoom.DomainService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly MeetingRoomContext _context;

        public UserService(IUserRepository userRepository, MeetingRoomContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        public void AddUser(UserRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.GetByName(request.Name);
                if (existUser != null)
                {
                    throw new Exception("User already exists");
                }

                var newUser = Domain.User.Create(request.Name, request.Email, request.Phone, request.RoleId, request.Password);
                _userRepository.Add(newUser);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public void EditUser(UserRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.Get(request.UserId);
                if (existUser == null)
                {
                    throw new Exception("User not exists");
                }

                existUser.Update(request.Name, request.Email, request.Phone, request.RoleId, request.Password);
                _userRepository.Update(existUser);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public void DeleteUser(int id)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var existUser = _userRepository.Get(id);
                if (existUser == null)
                {
                    throw new Exception("User not exists");
                }

                _userRepository.Delete(id);

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public UserResponse Login(LoginRequest loginRequest)
        {
            try
            {
                var existUser = _userRepository.GetByEmailAndPassword(loginRequest.Email, loginRequest.Password);
                if (existUser == null)
                {
                    throw new Exception("User not exists");
                }

                return new UserResponse
                {
                    UserId = existUser.UserID,
                    Name = existUser.Name,
                    Email = existUser.Email,
                    Phone = existUser.Phone,
                    RoleId = existUser.RoleId
                };
            }
            catch
            {
                throw;
            }
        }
    }
}
