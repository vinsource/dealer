using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FreewayIsuzu.Handlers;
using vincontrol.Application.Forms.InventoryManagement;

namespace FreewayIsuzu.Controllers
{
    public class SpecialsController : BaseController
    {
        private readonly IInventoryManagementForm _inventoryManagementForm;

        public SpecialsController()
        {
            _inventoryManagementForm = new InventoryManagementForm();
        }

        public ActionResult VehicleSpecials()
        {
            var list = _inventoryManagementForm.GetFeaturedInventories(SessionHandler.Dealer.DealerId).ToList();
            return View(@"~/Views/Specials/VehicleSpecials.cshtml", list);
        }

        public ActionResult Lease()
        {
            return View(@"~/Views/Specials/Lease.cshtml");
        }

        public ActionResult Service()
        {
            return View(@"~/Views/Specials/Service.cshtml");
        }

        public ActionResult Parts()
        {
            return View(@"~/Views/Specials/Parts.cshtml");
        }
    }
}
