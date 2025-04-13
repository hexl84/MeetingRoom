using MeetingRoom.Domain;
using MeetingRoom.DomainService;
using MeetingRoom.DTO.Request;
using MeetingRoom.Repository;
using Microsoft.EntityFrameworkCore;
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
            var options = new DbContextOptionsBuilder<MeetingRoomContext>()
                        .UseSqlite("DataSource=:memory:")
                        .Options;

            var context = new MeetingRoomContext(options);
            _roomService = new RoomService(_roomRepositoryMock.Object, context);
        }

        [Fact]
        public void AddRoom_ShouldAddRoom_WhenRoomDoesNotExist()
        {
            var request = new RoomRequest
            {
                Name = "Conference Room",
                Capacity = 10,
                Status = "Available",
                Type = "Large",
                Comment = "Main conference room"
            };

            _roomRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns((Room)null);

            _roomService.AddRoom(request);

            _roomRepositoryMock.Verify(repo => repo.Add(It.Is<Room>(r =>
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
            var request = new RoomRequest
            {
                Name = "Conference Room",
                Capacity = 10,
                Status = "Available",
                Type = "Large",
                Comment = "Main conference room"
            };

            var existingRoom = Room.Create(request.Name, request.Capacity, request.Status, request.Type, request.Comment);
            _roomRepositoryMock.Setup(repo => repo.GetByName(request.Name)).Returns(existingRoom);

            var exception = Assert.Throws<Exception>(() => _roomService.AddRoom(request));
            Assert.Equal("Room already exists", exception.Message);
        }

        [Fact]
        public void DeleteRoom_ShouldDeleteRoom_WhenRoomExists()
        {
            var roomId = 1;
            var existingRoom = Room.Create("Conference Room", 10, "Available", "Large", "Main conference room");
            _roomRepositoryMock.Setup(repo => repo.Get(roomId)).Returns(existingRoom);

            _roomService.DeleteRoom(roomId);

            _roomRepositoryMock.Verify(repo => repo.Delete(roomId), Times.Once);
        }

        [Fact]
        public void DeleteRoom_ShouldThrowException_WhenRoomDoesNotExist()
        {

            var roomId = 1;
            _roomRepositoryMock.Setup(repo => repo.Get(roomId)).Returns((Room)null);

            var exception = Assert.Throws<Exception>(() => _roomService.DeleteRoom(roomId));
            Assert.Equal("Room not found", exception.Message);
        }

        [Fact]
        public void EditRoom_ShouldUpdateRoom_WhenRoomExists()
        {
            var request = new RoomRequest
            {
                RoomId = 1,
                Name = "Updated Room",
                Capacity = 15,
                Status = "Occupied",
                Type = "Medium",
                Comment = "Updated details"
            };

            var existingRoom = Room.Create("Original Room", 10, "Available", "Large", "Original details");
            _roomRepositoryMock.Setup(repo => repo.Get(request.RoomId)).Returns(existingRoom);

            _roomService.EditRoom(request);

            _roomRepositoryMock.Verify(repo => repo.Update(It.Is<Room>(r =>
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
            var request = new RoomRequest
            {
                RoomId = 1,
                Name = "Updated Room",
                Capacity = 15,
                Status = "Occupied",
                Type = "Medium",
                Comment = "Updated details"
            };

            _roomRepositoryMock.Setup(repo => repo.Get(request.RoomId)).Returns((Room)null);

            var exception = Assert.Throws<Exception>(() => _roomService.EditRoom(request));
            Assert.Equal("Room not found", exception.Message);
        }
    }
}