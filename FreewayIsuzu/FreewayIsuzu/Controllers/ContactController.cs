using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class ContactController : BaseController
    {
        public ActionResult DealerInfo()
        {
            return View(@"~/Views/Contact/DealerInfo.cshtml");
        }

        public ActionResult Fleet()
        {
            return View(@"~/Views/Contact/Fleet.cshtml");
        }

    }
}
