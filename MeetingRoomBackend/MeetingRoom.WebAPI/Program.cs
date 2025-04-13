using MeetingRoom.DomainService;
using MeetingRoom.QueryService;
using MeetingRoom.Repository;
using Microsoft.EntityFrameworkCore;

namespace MeetingRoom.WebAPI.Controllers;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DbConnection") ?? "Data Source=MeetingRoom.db";
        builder.Services.AddSqlite<MeetingRoomContext>(connectionString);

        builder.Services.AddDbContext<MeetingRoomContext>(options =>
            options.UseSqlite(connectionString));

        builder.Services.AddScoped<IRoomRepository, RoomRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRoomService, RoomService>();
        builder.Services.AddScoped<IUserQueryService, UserQueryService>();
        builder.Services.AddScoped<IRoomQueryService, RoomQueryService>();

        builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = "https://your-auth-server.com"; // wait replace
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = "https://your-auth-server.com", // wait replace
                    ValidAudience = "meeting-room", 
                };
            });


        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<ExceptionFilter>();
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseDeveloperExceptionPage();
        }

        await using (var serviceScope = app.Services.CreateAsyncScope())
        await using (var dbContext = serviceScope.ServiceProvider.GetRequiredService<MeetingRoomContext>())
        {
            await dbContext.Database.EnsureCreatedAsync();
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

}

