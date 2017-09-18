using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class LocatorController : BaseController
    {
        public ActionResult TruckLocator()
        {
            return View(@"~/Views/Locator/TruckLocator.cshtml");
        }

    }
}
