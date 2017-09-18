using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DapperExtensions;
using FreewayIsuzu.Models;
using vincontrol.Application.ViewModels.CommonManagement;

namespace FreewayIsuzu.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            //var tmp = DapperSqlHelper.GetAll<Models.Entity.Inventory>(Predicates.Field<Models.Entity.Inventory>(f => f.DealerId, Operator.Eq, 37695), new List<ISort>(){ Predicates.Sort<Models.Entity.Inventory>(f => f.InventoryId, true) });
            //var tmp2 = DapperSqlHelper.QueryText<Models.Entity.Inventory>("SELECT TOP 10 * FROM Inventory WHERE DealerId = @DealerId", new {DealerId = 37695});
            return View(@"~/Views/Home/Index.cshtml");
        }

        public ActionResult NewIndex()
        {
            return View(@"~/Views/Home/NewIndex.cshtml");
        }
    }
}
