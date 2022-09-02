using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demor.Controllers
{
    public class OnetoOneChat : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
