using MeetingRoom.DomainService;
using MeetingRoom.QueryService;
using MeetingRoom.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace MeetingRoom.WebAPI.Controllers;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DbConnection") ?? "Data Source=MeetingRoom.db";
        //builder.Services.AddSqlite<MeetingRoomContext>(connectionString);

        builder.Services.AddDbContext<MeetingRoomContext>(options =>
            options.UseSqlite(connectionString));
        //builder.Services.AddDatabaseDeveloperPageExceptionFilter();

        //CreateDbIfNotExists(builder);

        builder.Services.AddScoped<IRoomRepository, RoomRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRoomService, RoomService>();
        builder.Services.AddScoped<IUserQueryService, UserQueryService>();
        builder.Services.AddScoped<IRoomQueryService, RoomQueryService>();

        builder.Services.AddControllers();
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

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

    //private static void CreateDbIfNotExists(WebApplicationBuilder host)
    //{
    //    using (var scope = host.Services.CreateScope())
    //    {
    //        var services = scope.ServiceProvider;
    //        try
    //        {
    //            var context = services.GetRequiredService<MeetingRoomContext>();
    //            DbInitializer.Initialize(context);
    //        }
    //        catch (Exception ex)
    //        {
    //            var logger = services.GetRequiredService<ILogger<Program>>();
    //            logger.LogError(ex, "An error occurred creating the DB.");
    //        }
    //    }
    //}
}

