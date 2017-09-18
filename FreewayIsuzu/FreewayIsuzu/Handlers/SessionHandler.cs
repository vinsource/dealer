using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using vincontrol.Application.ViewModels.AccountManagement;

namespace FreewayIsuzu.Handlers
{
    public static class SessionHandler
    {
        private const string _dealer = "Dealer";

        public static DealerViewModel Dealer
        {
            get
            {
                return (DealerViewModel)HttpContext.Current.Session[_dealer];
            }
            set
            {
                HttpContext.Current.Session[_dealer] = value;
            }
        }
    }
}