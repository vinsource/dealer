using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class ComparisonController : BaseController
    {
        public ActionResult Index()
        {
            return View(@"~/Views/Comparison/Index.cshtml");
        }
    }
}
