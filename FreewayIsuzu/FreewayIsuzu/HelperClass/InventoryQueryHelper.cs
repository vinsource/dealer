using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FreewayIsuzu.Handlers;
using vincontrol.Data.Model;

namespace FreewayIsuzu.HelperClass
{
    public class InventoryQueryHelper
    {
        public static IEnumerable<int> GetDealerList(VincontrolEntities context)
        {
            return new List<int> { SessionHandler.Dealer.DealerId };
        }
    }
}