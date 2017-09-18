using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using vincontrol.Application.Vinsocial.Forms.CustomerManagement;
using vincontrol.Application.Vinsocial.ViewModels.ReviewManagement;
using vincontrol.EmailHelper;

namespace FreewayIsuzu.Controllers
{
    public class EmailController : Controller
    {
        private IEmail _email;
        private IInsertFormsManagement _contact;
        const string TempName = "FreewayIsuzu Dealership";
        private static string _link = "http://www.freewayisuzu.com";

        public EmailController()
        {
            _email = new Email();
            _contact = new InsertFormsManagement();
        }

        [HttpPost]
        public void InsertCustomerInfo(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectContactUs(customerinformation), BodyContactUsInfo(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }

        public static string SubjectContactUs(ContactViewModel customerinfo)
        {

            string subject = "CONTACT REQUEST" + " - " + char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname + " have a question!";
            return subject;
        }

        public static string BodyContactUsInfo(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;


            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + " is asking for more information!</h2>";
            htmlBody += "<a href=\"http://apps.vincontrol.com\" target='_blank'><img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\"  height=\"45\" alt=\"\" style=\"float: right;\" /></a> </div>";

            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";

            if (customerinfo.address != null)
            {
                htmlBody += "<li><b>Address: </b>" + customerinfo.address + "</li>";
            }
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }

        [HttpPost]
        public void InsertRequestInfo(ContactViewModel customerinformation)
        {
            //_email.SendEmail(new List<string> { customerinformation.DealerEmail.Split(',')[0] }, SubjectRequestInfo(customerinformation), BodyRequestInfo(customerinformation), TempName);
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectRequestInfo(customerinformation), BodyRequestInfo(customerinformation), TempName);
            }
            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }

        public static string SubjectRequestInfo(ContactViewModel customerinfo)
        {
            string subject = "";
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                subject = "INFO REQUEST" + " - " + customerinfo.ModelYear + " " +
                          customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim;
            }
            else
            {
                subject = "INFO REQUESTED";
            }
            return subject;
        }

        public static string BodyRequestInfo(ContactViewModel customerinfo)
        {
            // HTML file
            string htmlBody = "";
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                if (customerinfo.IsSolded)
                {
                    _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                else
                {
                    _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " +
                                  customerinfo.Model + " " + customerinfo.Trim + "</a>";
                htmlBody =
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                            " is asking for more information on a vehicle!</h2>";
                htmlBody +=
                    "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" /> </div>";
                htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                // htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

                htmlBody += "<li>" + moreInfo + "</a>";
                htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            }
            else
            {
                if (customerinfo.Make != null)
                {
                    htmlBody =
                        "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is interested in information about a new " + customerinfo.Make + " " + customerinfo.Model + "</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
                    htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                    htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                    htmlBody += "<li>" + customerinfo.Make + " " + customerinfo.Model + "</li></ul>";
                }
                else
                {
                    htmlBody =
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is asking for more information on a vehicle!</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
                }
            }
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        [HttpPost]
        public void InsertTestDrive(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectTestDrive(customerinformation), BodyTestDrive(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectTestDrive(ContactViewModel customerinfo)
        {
            string subject = "";
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                subject = "TEST DRIVE" + " - " + customerinfo.ModelYear + " " +
                          customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim;
            }
            else
            {
                subject = "TEST DRIVE";
            }

            return subject;
        }
        
        public static string BodyTestDrive(ContactViewModel customerinfo)
        {
            // HTML file
            string htmlBody = "";
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                if (customerinfo.IsSolded)
                {
                    _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                else
                {
                    _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " +
                                  customerinfo.Model + " " + customerinfo.Trim + "</a>";
                htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                            " is looking to test drive a vehicle!</h2>";
                htmlBody +=
                    "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
                htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                // htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

                htmlBody += "<li>" + moreInfo + "</a></li>";
                htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            }
            else
            {
                if (customerinfo.Make != null)
                {
                    htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is looking to test drive a vehicle!</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";

                    htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                    htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                    htmlBody += "<li>" + customerinfo.Make + " " + customerinfo.Model + "</li></ul>";
                }
                else
                {
                    htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is looking to test drive a vehicle!</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
                }

            }
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Date: </b>" + customerinfo.schedule_date.ToShortDateString() + "</li>";
            htmlBody += "<li><b>Time: </b>" + customerinfo.schedule_time + "</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        [HttpPost]
        public void InsertGetQuote(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectGetQuote(customerinformation), BodyGetQuote(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectGetQuote(ContactViewModel customerinfo)
        {
            string subject = "";
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                subject = "GET A QUOTE" + " - " + customerinfo.ModelYear + " " +
                          customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim;
            }
            else
            {
                subject = "GET A QUOTE";
            }

            return subject;
        }
        
        public static string BodyGetQuote(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;
            string htmlBody = "";
            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                if (customerinfo.IsSolded)
                {
                    _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                else
                {
                    _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") +
                             "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
                }
                string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " +
                                  customerinfo.Model + " " + customerinfo.Trim + "</a>";

                htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                            " is asking for get a quote on a vehicle!</h2>";
                htmlBody +=
                    "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";

                htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                // htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

                htmlBody += "<li>" + moreInfo + "</a>";
                htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            }
            else
            {
                if (customerinfo.Make != null)
                {
                    htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is interested in a quote for a new " + customerinfo.Make + " " + customerinfo.Model + "!</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";

                    htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                    htmlBody +=
                        "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                    htmlBody += "<li>" + customerinfo.Make + " " + customerinfo.Model + "</li></ul>";
                }
                else
                {
                    htmlBody +=
                    "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
                    htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName +
                                " is asking for get a quote on a vehicle!</h2>";
                    htmlBody +=
                        "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
                }
            }

            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        [HttpPost]
        public void InsertMakeOffer(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectMakeOffer(customerinformation), BodyMakeOffer(customerinformation), TempName);
            }


            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectMakeOffer(ContactViewModel customerinfo)
        {
            string subject = "MAKE OFFER" + " - " + customerinfo.ModelYear + " " +
                              customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim;
            return subject;
        }
        
        public static string BodyMakeOffer(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;

            if (customerinfo.IsSolded)
            {
                _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            else
            {
                _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</a>";
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + " has made an offer on a vehicle!</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
            //htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

            htmlBody += "<li>" + moreInfo + "</a>";
            htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Offer Amount: </b>" + customerinfo.offer_value + "$</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }

        [HttpPost]
        public void InsertShareFriends(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectShareFriends(customerinformation), BodyShareInfoNotification(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _email.SendEmail(new List<string> { customerinformation.friendemail }, SubjectShareFriends(customerinformation), BodyShareFriendMailTo(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectShareFriends(ContactViewModel customerinfo)
        {
            string subject = "VEHICLE SHARE NOTIFICATION" + " - " + customerinfo.ModelYear + " " +
                              customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim;
            return subject;
        }
        
        public static string BodyShareInfoNotification(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;

            if (customerinfo.IsSolded)
            {
                _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            else
            {
                _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</a>";
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + "  has shared a vehicle!</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Sharing Vehicle Information</h3>";
            // htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

            htmlBody += "<li>" + moreInfo + "</a>";
            htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Sharing Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Shared With:</b> " + customerinfo.friendname + " [" + customerinfo.friendemail + "]</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        public static string BodyShareFriendMailTo(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = customerinfo.firstname + " " + customerinfo.lastname;

            if (customerinfo.IsSolded)
            {
                _link += "/inventory/soldout/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            else
            {
                _link += "/inventory/detail/" + customerinfo.ModelYear + "-" + customerinfo.Make.Replace(" ", "-") + "-" + customerinfo.Model.Replace(" ", "-") + "/" + customerinfo.vinnumber;
            }
            string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</a>";
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + "  has shared a vehicle with you!</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";
            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Sharing Vehicle Information</h3>";
            // htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

            htmlBody += "<li>" + moreInfo + "</a>";
            htmlBody += "<li>Stock: #" + customerinfo.StockNumber + "</li></ul>";
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Your Friend Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";
            htmlBody += "<li><b>Contact Prefered: </b>" + customerinfo.contact_prefer + "</li>";
            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        [HttpPost]
        public void InsertValueTrade(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectValueTrade(customerinformation), BodyValueTrade(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectValueTrade(ContactViewModel customerinfo)
        {
            string subject = "VALUE MY TRADE" + " - " + char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname + " want to value his/her vehicle!";
            return subject;
        }
        
        public static string BodyValueTrade(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;


            //string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</a>";
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + " want to value a vehicle.!</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";

            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
            htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";
            htmlBody += "<li>Mileage: " + customerinfo.mileage + "<li>";
            htmlBody += "<li>Options: " + customerinfo.Options + "<li>";
            htmlBody += "<li>Condition: " + customerinfo.condition + "</li></ul>";
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";

            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }

        [HttpPost]
        public void InsertLocator(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectLocator(customerinformation), BodyLocator(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectLocator(ContactViewModel customerinfo)
        {
            string subject = "TRUCK LOCATOR" + " - " + char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname + " is looking for a truck!";
            return subject;
        }
        
        public static string BodyLocator(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;


            //string moreInfo = "<a href='" + _link + "'>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</a>";
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + " would like help finding a truck.</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" alt=\"\"/> </div>";

            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
            htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";

            htmlBody += "</ul>";
            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";

            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
        
        [HttpPost]
        public void InsertAppointment(ContactViewModel customerinformation)
        {
            var emailList = customerinformation.DealerEmail.Split(',');
            foreach (var email in emailList)
            {
                _email.SendEmail(new List<string> { email }, SubjectAppointment(customerinformation), BodyAppointment(customerinformation), TempName);
            }

            _email.SendEmail(new List<string> { customerinformation.email_address }, SubjectThanks(customerinformation), BodyThanks(customerinformation), TempName);
            _contact.AddNewContact(customerinformation);
        }
        
        public static string SubjectAppointment(ContactViewModel customerinfo)
        {
            string subject = "SERVICE APPOINTMENT" + " - " + char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname + " wants to make a Service Appointment!";
            return subject;
        }
        
        public static string BodyAppointment(ContactViewModel customerinfo)
        {
            // HTML file
            string customerName = char.ToUpper(customerinfo.firstname[0]) + customerinfo.firstname.Substring(1) + " " + customerinfo.lastname;
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + customerName + " wants to make an appointment for service of car.</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" /> </div>";

            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
            htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";
            htmlBody += "<li><b>Mileage: </b>" + customerinfo.mileage + "</li>";

            htmlBody += "</ul>";

            htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Schedule Time</h3>";
            htmlBody += "<li><b>Date: </b>" + customerinfo.schedule_date.ToShortDateString() + "</li>";
            htmlBody += "<li><b>Time: </b>" + customerinfo.schedule_time + "</li>";
            htmlBody += "<li><b>Service Needed: </b>" + customerinfo.ServiceType + "</li>";
            htmlBody += "</ul>";

            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Customer Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";

            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }

        public static string SubjectThanks(ContactViewModel customerinfo)
        {
            const string subject = " thanks you for submitting your contact information!";
            return subject;
        }
        
        public static string BodyThanks(ContactViewModel customerinfo)
        {
            // HTML file
            // string customerName = customerinfo.firstname + " " + customerinfo.lastname;
            string htmlBody = "<div style=\"width: 500px;\"><div style=\"padding: 6px; background: #eee; overflow: hidden\">";
            htmlBody += "<h2 style=\"margin: 0; float: left; width: 70%\">" + TempName + " thank you for submitting your contact information, we will reply to you as soon as possible!</h2>";
            htmlBody += "<img src=\"http://apps.vincontrol.com/Content/Images/logo-vincontrol.png\" height=\"45\" style=\"float: right;\" /> </div>";

            if (customerinfo.ModelYear != 0 && customerinfo.Make != "")
            {
                htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Vehicle Information</h3>";
                htmlBody += "<li><b>" + customerinfo.ModelYear + " " + customerinfo.Make + " " + customerinfo.Model + " " + customerinfo.Trim + "</b></li>";
                if (customerinfo.mileage != 0)
                {
                    htmlBody += "<li><b>Mileage: </b>" + customerinfo.mileage + "</li>";
                }

                if (!String.IsNullOrEmpty(customerinfo.Options))
                {
                    htmlBody += "<li><b>Options: </b>" + customerinfo.Options + "</li>";
                }

                if (!String.IsNullOrEmpty(customerinfo.condition))
                {
                    htmlBody += "<li><b>Condition: </b>" + customerinfo.condition + "</li>";
                }


                htmlBody += "</ul>";
            }

            if (!String.IsNullOrEmpty(customerinfo.schedule_time))
            {
                htmlBody += "<ul style=\"list-style-type: none; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Schedule Time</h3>";
                htmlBody += "<li><b>Date: </b>" + customerinfo.schedule_date.ToShortDateString() + "</li>";
                htmlBody += "<li><b>Time: </b>" + customerinfo.schedule_time + "</li>";
                if (!String.IsNullOrEmpty(customerinfo.ServiceType))
                {
                    htmlBody += "<li><b>Service Needed: </b>" + customerinfo.ServiceType + "</li>";
                }

                htmlBody += "</ul>";
            }
            if (!String.IsNullOrEmpty(customerinfo.friendname))
            {
                htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
                htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Your friend's Information</h3>";
                htmlBody += "<li><b>Name:</b> " + customerinfo.friendname + "</li>";
                htmlBody += "<li><b>Email:</b> " + customerinfo.friendemail + "</li>";
                htmlBody += "</ul>";
            }


            htmlBody += "<ul style=\"list-style-type: none; margin-top: 5px; margin-left: 0; padding-left: 0;\">";
            htmlBody += "<h3 style=\"background: #222222; color: white; padding: 5px;\">Your Information</h3>";
            htmlBody += "<li><b>First Name: </b>" + customerinfo.firstname + "</li>";
            htmlBody += "<li><b>Last Name: </b>" + customerinfo.lastname + "</li>";
            htmlBody += "<li><b>Email: </b>" + customerinfo.email_address + "</li>";
            htmlBody += "<li><b>Phone: </b>" + customerinfo.phone_number + "</li>";

            if (customerinfo.comment != null)
            {
                htmlBody += "<li><b>Comments: </b>" + customerinfo.comment + "</li>";
            }
            htmlBody += "</ul></div>";

            return htmlBody;
        }
    }
}
