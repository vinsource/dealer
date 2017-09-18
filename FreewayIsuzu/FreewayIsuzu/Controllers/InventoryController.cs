using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using FreewayIsuzu.Handlers;
using FreewayIsuzu.HelperClass;
using vincontrol.Application.Forms.InventoryManagement;
using vincontrol.Constant;
using vincontrol.Data.Model;
using vincontrol.DomainObject;
using vincontrol.Helper;

namespace FreewayIsuzu.Controllers
{
    public class InventoryController : BaseController
    {
        private readonly IInventoryManagementForm _inventoryManagementForm;

        public void Index(string text)
        {
            
        }

        public InventoryController()
        {
            _inventoryManagementForm = new InventoryManagementForm();
        }

        public ActionResult NewCars()
        {
            return View(@"~/Views/Inventory/NewCars.cshtml");
        }

        public ActionResult UsedCars()
        {
            return View(@"~/Views/Inventory/UsedCars.cshtml");
        }

        public ActionResult Detail(string ymm, string vin)
        {
            ViewData["CARTITLE"] = String.Format("{0} {1}", ymm.Replace("-", " "), vin);
            return View(@"~/Views/Inventory/Detail.cshtml");
        }

        public String GetCarDetail(string vin)
        {
            var list = _inventoryManagementForm.GetFullInventoryDetail(SessionHandler.Dealer.DealerId,vin);
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }

        public String GetUsedInventory()
        {
            var list = _inventoryManagementForm.GetUsedInventories(SessionHandler.Dealer.DealerId).ToList();
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }

        public String GetSimilarMake(string vin, string make)
        {
            var list = _inventoryManagementForm.GetSimilarMake(SessionHandler.Dealer.DealerId, vin, make).ToList();
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }

        public String GetSimilarModel(string vin, string model)
        {
            var list = _inventoryManagementForm.GetSimilarModel(SessionHandler.Dealer.DealerId, vin, model).ToList();
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }

        public String GetSimilarBodyType(string vin, string body)
        {
            var list = _inventoryManagementForm.GetSimilarBodyType(SessionHandler.Dealer.DealerId, vin, body).ToList();
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }

        public String GetNewInventory()
        {
            var list = _inventoryManagementForm.GetNewInventories(SessionHandler.Dealer.DealerId).ToList();
            var parser = new JavaScriptSerializer();
            string result = parser.Serialize(list);
            return result;
        }
      
        public JsonResult LoadSearchConditions()
        {
            var years = _inventoryManagementForm.GetUsedYears(SessionHandler.Dealer.DealerId);
            var makes = _inventoryManagementForm.GetUsedMakes(SessionHandler.Dealer.DealerId);
            var models = _inventoryManagementForm.GetUsedModels(SessionHandler.Dealer.DealerId);

            return Json(new { years, makes, models }, JsonRequestBehavior.AllowGet);
        }

        #region GetFullTextResult

        public class LargeJsonResult : JsonResult
        {
            private const string JsonRequestGetNotAllowed =
                "This request has been blocked because sensitive information could be disclosed to third party web sites when this is used in a GET request. To allow GET requests, set JsonRequestBehavior to AllowGet.";

            public LargeJsonResult()
            {
                MaxJsonLength = Int32.MaxValue;
                RecursionLimit = 10000;
            }

            public int MaxJsonLength { get; set; }
            public int RecursionLimit { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                if (context == null)
                    throw new ArgumentNullException("context");

                if (JsonRequestBehavior == JsonRequestBehavior.DenyGet &&
                    String.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
                    throw new InvalidOperationException(JsonRequestGetNotAllowed);

                var response = context.HttpContext.Response;
                response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

                if (ContentEncoding != null)
                    response.ContentEncoding = ContentEncoding;

                if (Data != null)
                {
                    var serializer = new JavaScriptSerializer
                    {
                        MaxJsonLength = MaxJsonLength,
                        RecursionLimit = RecursionLimit
                    };
                    response.Write(serializer.Serialize(Data));
                }
            }
        }

        public ActionResult FullTextSearchWithFullResult(string searchTerm)
        {
            using (var context = new VincontrolEntities())
            {
                var vehicleQuery = GetVehicleQuery(searchTerm, context, QueryBuilderHelper.GetFullTextVehicleQuery);

                var query = string.Format("SELECT * FROM ( {0}) RESULT ORDER BY DealerId, Year DESC, Make, Model, Trim", vehicleQuery.InventoryQuery);

                return new LargeJsonResult
                {
                    Data = BuildFullTextSearchResult(query, context)
                };
            }
        }

        private static VehicleQuery GetVehicleQuery(string searchTerm, VincontrolEntities context, Func<string, List<string>, IEnumerable<int>, string> getQueryFunc)
        {
            var dealerIdList = InventoryQueryHelper.GetDealerList(context).ToList();
            var termList =
                searchTerm.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(i => i.Trim()).ToList();

            return new VehicleQuery()
            {
                AppraisalQuery = getQueryFunc("AppraisalCar", termList, dealerIdList),
                InventoryQuery = getQueryFunc("InventoryCar", termList, dealerIdList),
                SoldoutQuery = getQueryFunc("SoldoutInventoryCar", termList, dealerIdList)
            };
        }

        private List<VehicleResult> BuildFullTextSearchResult(string query, VincontrolEntities context)
        {
            var result = context.ExecuteStoreQuery<VehicleResult>(query).ToList();

            foreach (var item in result)
            {
                if (item.ThumbnailUrl != null)
                {
                    item.ThumbnailUrl =
                        item.ThumbnailUrl.Split(new[] { ",", "|" }, StringSplitOptions.RemoveEmptyEntries)
                            .FirstOrDefault();
                    item.PhotoUrl = item.ThumbnailUrl;
                }
                else if (item.PhotoUrl != null && item.VehicleStatus != Constanst.VehicleStatus.SoldOut)
                {
                    item.PhotoUrl =
                        item.PhotoUrl.Split(new[] { ",", "|" }, StringSplitOptions.RemoveEmptyEntries)
                            .FirstOrDefault();
                }
                else
                {
                    item.PhotoUrl = item.DefaultStockImage;
                }
            }

            return result;

        }
        #endregion
    }
}
