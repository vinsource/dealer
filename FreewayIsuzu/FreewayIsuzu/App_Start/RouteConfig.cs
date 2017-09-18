using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FreewayIsuzu
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "vehicleSpecials",
                url: "vehicle-specials",
                defaults: new { controller = "Specials", action = "VehicleSpecials" }
            );

            routes.MapRoute(
                name: "ServiceInfo",
                url: "service-info",
                defaults: new { controller = "ServiceParts", action = "ServiceInfo" }
            );

            routes.MapRoute(
                name: "ServiceRetail",
                url: "service-retail",
                defaults: new { controller = "ServiceParts", action = "Retail" }
            );

            routes.MapRoute(
                name: "Appointment",
                url: "service-parts/appointment",
                defaults: new { controller = "ServiceParts", action = "Appointment" }
            );

            routes.MapRoute(
                name: "DealerInfo",
                url: "dealership-information",
                defaults: new { controller = "Contact", action = "DealerInfo" }
            );

            routes.MapRoute(
             name: "testdrive",
             url: "test-drive",
             defaults: new { controller = "Finance", action = "TestDrive" }
            );

            routes.MapRoute(
             name: "newcars",
             url: "inventory/new-cars",
             defaults: new { controller = "Inventory", action = "NewCars" }
            );

            routes.MapRoute(
             name: "usecars",
             url: "inventory/used-cars",
             defaults: new { controller = "Inventory", action = "UsedCars" }
            );

            routes.MapRoute(
             name: "valuetrade",
             url: "vehicle/value-trade",
             defaults: new { controller = "Vehicle", action = "Value" }
            );

            routes.MapRoute(
             name: "locator",
             url: "truck-locator",
             defaults: new { controller = "Locator", action = "TruckLocator" }
            );

            routes.MapRoute(
             name: "comparison",
             url: "truck-comparison",
             defaults: new { controller = "Comparison", action = "Index" }
            );
            routes.MapRoute(
            name: "printCoupon",
            url: "print-coupon",
            defaults: new { controller = "ServiceParts", action = "PrintCoupon" }
           );

            routes.MapRoute(
              name: "Detail",
              url: "Showroom/Detail/{viewName}",
              defaults: new { controller = "Showroom", action = "Detail", viewName = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "InventoryDetail",
                url: "Inventory/Detail/{ymm}/{vin}",
                defaults: new { controller = "Inventory", action = "Detail", ymm = UrlParameter.Optional, vin = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            // Add this code to handle non-existing urls
            routes.MapRoute(
                name: "404-PageNotFound",
                // This will handle any non-existing urls
                url: "{*url}",
                // "Shared" is the name of your error controller, and "Error" is the action/page
                // that handles all your custom errors
                defaults: new { controller = "Error", action = "FileNotFound" }
            );

            routes.LowercaseUrls = true;

        }
    }
}