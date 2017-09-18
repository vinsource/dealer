using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class FinanceController : BaseController
    {
        public ActionResult Index()
        {
            return View(@"~/Views/Finance/Index.cshtml");
        }
        
        public ActionResult Quote()
        {
            return View(@"~/Views/Finance/Quote.cshtml");
        }
        
        public ActionResult TestDrive()
        {
            return View(@"~/Views/Finance/TestDrive.cshtml");
        }
    }
}
