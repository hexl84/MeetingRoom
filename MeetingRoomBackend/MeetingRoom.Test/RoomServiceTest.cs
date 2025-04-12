using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;
using Moq;
using Xunit;

namespace MeetingRoom.Test
{
    public class RoomServiceTest
    {
        private readonly Mock<IRoomRepository> _roomRepositoryMock;
        private readonly RoomService _roomService;

        public RoomServiceTest()
        {
            _roomRepositoryMock = new Mock<IRoomRepository>();
            _roomService = new RoomService(_roomRepositoryMock.Object);
        }

        [Fact]
        public void AddRoom_ShouldAddRoom_WhenRoomDoesNotExist()
        {
            // Arrange
            var request = new RoomRequest
            {
                Name = "Conference Room",
                Capacity = 10,
                Status = "Available",
                Type = "Large",
                Comment = "Main conference room"
            };

            _roomRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns((Domain.Room)null);

            // Act
            _roomService.AddRoom(request);

            // Assert
            _roomRepositoryMock.Verify(repo => repo.Add(It.Is<Domain.Room>(r =>
                r.Name == request.Name &&
                r.Capacity == request.Capacity &&
                r.Status == request.Status &&
                r.Type == request.Type &&
                r.Comment == request.Comment
            )), Times.Once);
        }

        [Fact]
        public void AddRoom_ShouldThrowException_WhenRoomAlreadyExists()
        {
            // Arrange
            var request = new RoomRequest
            {
                Name = "Conference Room",
                Capacity = 10,
                Status = "Available",
                Type = "Large",
                Comment = "Main conference room"
            };

            var existingRoom = Domain.Room.Create(request.Name, request.Capacity, request.Status, request.Type, request.Comment);
            _roomRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns(existingRoom);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _roomService.AddRoom(request));
            Assert.Equal("Room already exists", exception.Message);
        }

        [Fact]
        public void DeleteRoom_ShouldDeleteRoom_WhenRoomExists()
        {
            // Arrange
            var roomId = 1;
            var existingRoom = Domain.Room.Create("Conference Room", 10, "Available", "Large", "Main conference room");
            _roomRepositoryMock.Setup(repo => repo.Get(roomId)).Returns(existingRoom);

            // Act
            _roomService.DeleteRoom(roomId);

            // Assert
            _roomRepositoryMock.Verify(repo => repo.Delete(roomId), Times.Once);
        }

        [Fact]
        public void DeleteRoom_ShouldThrowException_WhenRoomDoesNotExist()
        {
            // Arrange
            var roomId = 1;
            _roomRepositoryMock.Setup(repo => repo.Get(roomId)).Returns((Domain.Room)null);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _roomService.DeleteRoom(roomId));
            Assert.Equal("Room not found", exception.Message);
        }

        [Fact]
        public void EditRoom_ShouldUpdateRoom_WhenRoomExists()
        {
            // Arrange
            var request = new RoomRequest
            {
                RoomId = 1,
                Name = "Updated Room",
                Capacity = 15,
                Status = "Occupied",
                Type = "Medium",
                Comment = "Updated details"
            };

            var existingRoom = Domain.Room.Create("Original Room", 10, "Available", "Large", "Original details");
            _roomRepositoryMock.Setup(repo => repo.Get(request.RoomId)).Returns(existingRoom);

            // Act
            _roomService.EditRoom(request);

            // Assert
            _roomRepositoryMock.Verify(repo => repo.Update(It.Is<Domain.Room>(r =>
                r.Name == request.Name &&
                r.Capacity == request.Capacity &&
                r.Status == request.Status &&
                r.Type == request.Type &&
                r.Comment == request.Comment
            )), Times.Once);
        }

        [Fact]
        public void EditRoom_ShouldThrowException_WhenRoomDoesNotExist()
        {
            // Arrange
            var request = new RoomRequest
            {
                RoomId = 1,
                Name = "Updated Room",
                Capacity = 15,
                Status = "Occupied",
                Type = "Medium",
                Comment = "Updated details"
            };

            _roomRepositoryMock.Setup(repo => repo.Get(request.RoomId)).Returns((Domain.Room)null);

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _roomService.EditRoom(request));
            Assert.Equal("Room not found", exception.Message);
        }
    }
}