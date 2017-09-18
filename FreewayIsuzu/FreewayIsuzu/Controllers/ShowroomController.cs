using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class ShowroomController : BaseController
    {
        public ActionResult Index()
        {
            return View(@"~/Views/Showroom/Index.cshtml");
        }

        public ActionResult Detail(string viewName)
        {
            return View(viewName);
        }
    }
}
