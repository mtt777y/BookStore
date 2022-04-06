using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using BookStore.Token;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorizationController : ControllerBase
    {
        public AutorizationController()
        {

        }

        [AllowAnonymous]
        [HttpGet("/helloguys")]
        public string HelloWorld()
        {
            return "Hello World!";
        }
    }
}
