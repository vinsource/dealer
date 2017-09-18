using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreewayIsuzu.Controllers
{
    public class ServicePartsController : BaseController
    {
        public ActionResult ServiceInfo()
        {
            return View(@"~/Views/ServiceParts/ServiceInfo.cshtml");
        }
        
        public ActionResult Retail()
        {
            return View(@"~/Views/ServiceParts/Retail.cshtml");
        }
        
        public ActionResult Appointment()
        {
            return View(@"~/Views/ServiceParts/Appointment.cshtml");
        }

        [HttpGet]
        public ActionResult PrintCoupon(string urlImg, string title)
        {
            ViewData["urlImg"] = urlImg;
            ViewData["title"] = title;
            return View(@"~/Views/ServiceParts/PrintCoupon.cshtml");
        }
    }
}
