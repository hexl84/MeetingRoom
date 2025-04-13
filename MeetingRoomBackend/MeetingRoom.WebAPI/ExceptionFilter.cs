using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MeetingRoom.WebAPI
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var response = new
            {
                Message = context.Exception.Message,
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Detail = context.Exception.StackTrace
            };

            context.Result = new JsonResult(response)
            {
                StatusCode = response.StatusCode
            };

            context.ExceptionHandled = true;
        }
    }
}
