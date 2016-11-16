using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace shopsvc.Controllers
{
    [Route("name")]
    public class NameController : Controller
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            return System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription;
        }
    }
    
    [Route("host")]
    public class HostController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { 
                System.Runtime.InteropServices.RuntimeInformation.OSDescription,   
                Environment.MachineName,
                System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,   
                System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture.ToString(),   
            };
        }
    }
}