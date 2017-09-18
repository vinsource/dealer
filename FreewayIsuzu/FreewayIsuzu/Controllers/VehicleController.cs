using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class VehicleController : BaseController
    {
        public ActionResult Value()
        {
            return View(@"~/Views/Vehicle/Value.cshtml");
        }
    }
}
