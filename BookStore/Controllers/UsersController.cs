using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore;
using BookStore.Entities;
using NLog;
using BookStore.Controllers.Abstract;
using Microsoft.AspNetCore.Authorization;
using ILogger = NLog.ILogger;
using System.IdentityModel.Tokens.Jwt;
using BookStore.Token;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;

namespace BookStore.Controllers
{
    public class UsersController : AbstractController<User>
    {
        public UsersController(DbSets dbSets, ILogger logger) : base(dbSets, logger)
        {
        }

        [AllowAnonymous]
        [HttpPost("/token")]
        public IActionResult Token([FromBody] LoginPass loginPass)
        {
            var identity = GetIdentity(loginPass.Login, loginPass.Pass);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOption.ISSUER,
                    audience: AuthOption.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOption.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOption.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                userrole = identity.Claims.ToArray()[1].Value
            };

            //return JsonConvert.SerializeObject(response);
            return Ok(JsonConvert.SerializeObject(response));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            //User person = DbSet<User>.FirstOrDefault(x => x.Email == username && x.Password == password);
            List<User> persons = _context.Set<User>().Include(f => f.Role).Where(x => x.Name == username && x.Password == password).ToList();

            if (persons.Count() > 0)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, persons.First().Name),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, persons.First().Role.Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;

        }


        [AllowAnonymous]
        [HttpGet("/hello")]
        public string HelloWorld()
        {
            return "Hello World!";
        }

        [HttpPost]
        public async Task<ActionResult<object>> PostUser([FromBody] incData data)
        {

            User entity = new() { Name = data.EntityName, Password = data.UserPass, Role = _context.Set<Role>().Where(r => r.Name == data.UserRole).FirstOrDefault() };

            _context.Set<User>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetEntities()
        {
            return await _context.Set<User>().Include(c => c.Role).ToListAsync();
        }
    }

    public class incData
    {
        public string EntityName { get; set; }

        public string UserPass { get; set; }

        public string UserRole { get; set; }
    }
}
