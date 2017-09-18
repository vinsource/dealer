using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FreewayIsuzu.Extensions;
using FreewayIsuzu.Handlers;
using vincontrol.Application.Forms.AccountManagement;

namespace FreewayIsuzu.Controllers
{
    //[WhitespaceFilter]
    public class BaseController : Controller
    {
        private readonly IAccountManagementForm _accountManagementForm;

        public BaseController()
        {
            _accountManagementForm = new AccountManagementForm();
            if (SessionHandler.Dealer == null) SessionHandler.Dealer = _accountManagementForm.GetDealer(37695);
        }

    }
}
