using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult Index()
        {
            Response.StatusCode = 500;
            return View();
        }
        
        public ActionResult FileNotFound()
        {
            Response.StatusCode = 404;
            return View();
        }

    }
}
