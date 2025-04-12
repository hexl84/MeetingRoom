using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;
using Moq;
using Xunit;

namespace MeetingRoom.Test
{
    public class UserServiceTest
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly UserService _userService;

        public UserServiceTest()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _userService = new UserService(_userRepositoryMock.Object);
        }

        [Fact]
        public void AddUser_ShouldAddUser_WhenUserDoesNotExist()
        {
            // Arrange
            var request = new UserRequest
            {
                Name = "John Doe",
                Email = "john.doe@example.com",
                Phone = "1234567890",
                RoleId = 1
            };

            _userRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns((Domain.User)null);

            // Act
            _userService.AddUser(request);

            // Assert
            _userRepositoryMock.Verify(repo => repo.Add(It.Is<Domain.User>(u =>
                u.Name == request.Name &&
                u.Email == request.Email &&
                u.Phone == request.Phone &&
                u.RoleId == request.RoleId
            )), Times.Once);
        }

        [Fact]
        public void AddUser_ShouldThrowException_WhenUserAlreadyExists()
        {
            // Arrange
            var request = new UserRequest
            {
                Name = "John Doe",
                Email = "john.doe@example.com",
                Phone = "1234567890",
                RoleId = 1
            };

            var existingUser = Domain.User.Create(request.Name, request.Email, request.Phone, request.RoleId);
            _userRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns(existingUser);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _userService.AddUser(request));
            Assert.Equal("User already exists", exception.Message);
        }

        [Fact]
        public void EditUser_ShouldUpdateUser_WhenUserExists()
        {
            // Arrange
            var request = new UserRequest
            {
                UserId = 1,
                Name = "Updated Name",
                Email = "updated.email@example.com",
                Phone = "9876543210",
                RoleId = 2
            };

            var existingUser = Domain.User.Create("Original Name", "original.email@example.com", "1234567890", 1);
            _userRepositoryMock.Setup(repo => repo.Get(request.UserId)).Returns(existingUser);

            // Act
            _userService.EditUser(request);

            // Assert
            _userRepositoryMock.Verify(repo => repo.Update(It.Is<Domain.User>(u =>
                u.Name == request.Name &&
                u.Email == request.Email &&
                u.Phone == request.Phone &&
                u.RoleId == request.RoleId
            )), Times.Once);
        }

        [Fact]
        public void EditUser_ShouldThrowException_WhenUserDoesNotExist()
        {
            // Arrange
            var request = new UserRequest
            {
                UserId = 1,
                Name = "Updated Name",
                Email = "updated.email@example.com",
                Phone = "9876543210",
                RoleId = 2
            };

            _userRepositoryMock.Setup(repo => repo.Get(request.UserId)).Returns((Domain.User)null);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _userService.EditUser(request));
            Assert.Equal("User not exists", exception.Message);
        }

        [Fact]
        public void DeleteUser_ShouldDeleteUser_WhenUserExists()
        {
            // Arrange
            var userId = 1;
            var existingUser = Domain.User.Create("John Doe", "john.doe@example.com", "1234567890", 1);
            _userRepositoryMock.Setup(repo => repo.Get(userId)).Returns(existingUser);

            // Act
            _userService.DeleteUser(userId);

            // Assert
            _userRepositoryMock.Verify(repo => repo.Delete(userId), Times.Once);
        }

        [Fact]
        public void DeleteUser_ShouldThrowException_WhenUserDoesNotExist()
        {
            // Arrange
            var userId = 1;
            _userRepositoryMock.Setup(repo => repo.Get(userId)).Returns((Domain.User)null);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _userService.DeleteUser(userId));
            Assert.Equal("User not exists", exception.Message);
        }
    }
}