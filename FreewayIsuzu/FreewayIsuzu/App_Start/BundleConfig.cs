using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace FreewayIsuzu
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            var jquery = new ScriptBundle("~/bundles/jquery"/*, new JsMinify()*/);
            jquery
                .Include("~/Scripts/libraries/jquery-1.8.2.min.js")
                //.Include("~/Scripts/libraries/jquery-2.1.1.min.js")
                .Include("~/Scripts/libraries/jquery-ui-1.8.2.min.js")
                .Include("~/Scripts/js/bootstrap.min.js")
                .Include("~/Scripts/libraries/jquery.browser.js")
                .ForceOrdered();
            bundles.Add(jquery);

            var newJquery = new ScriptBundle("~/bundles/newJquery"/*, new JsMinify()*/);
            newJquery
                .Include("~/Scripts/libraries/jquery-2.1.1.min.js")
                .Include("~/Scripts/libraries/jquery-ui-1.8.2.min.js")
                .Include("~/Scripts/js/bootstrap-3.1.1.min.js")
                .Include("~/Scripts/libraries/jquery.browser.js")
                .ForceOrdered();
            bundles.Add(newJquery);

            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
            //            "~/Scripts/jquery-ui-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));
            
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            var commonJs = new ScriptBundle("~/bundles/jquerylib"/*, new JsMinify()*/);
            commonJs
                .Include("~/Scripts/libraries/css_browser_selector.js")
                .Include("~/Scripts/libraries/js.class.min.js")
                .Include("~/Scripts/libraries/underscore-min.js")
                
                .Include("~/Scripts/libraries/jquery.maskedinput-1.4.1.js")

                .Include("~/Scripts/libraries/placeholders.js")
                .Include("~/Scripts/libraries/DateFormmater.js")
                .Include("~/Scripts/js/bootstrap-dropdown.js")
                //.Include("~/Scripts/js/bxSlider/jquery.bxSlider.js")
                .Include("~/Scripts/js/json2.js")
                .Include("~/Scripts/js/jquery.upload-1.0.2.js")

                .Include("~/Scripts/fancybox/jquery.fancybox-2.1.7.pack.js")
                .ForceOrdered();
            bundles.Add(commonJs);

            //bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
            var commCss = new StyleBundle("~/bundles/commoncss");
            commCss.Include("~/Content/site.css");
            commCss.Include("~/Scripts/libraries/jquery-ui.css",
                            "~/Scripts/libraries/ui.theme.css",
                            "~/Scripts/fancybox/jquery.fancybox-2.1.7.css",
                            //"~/Scripts/js/bxSlider/jquery.bxslider.css",
                            "~/Content/css/bootstrap.css",
                            "~/Content/css/bootstrap.min.css",
                            "~/Content/css/style.css",
                            "~/Content/css/bodystyle.css");
            commCss.Transforms.Add(new CssMinify());
            bundles.Add(commCss);

            //bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
            //            "~/Content/themes/base/jquery.ui.core.css",
            //            "~/Content/themes/base/jquery.ui.resizable.css",
            //            "~/Content/themes/base/jquery.ui.selectable.css",
            //            "~/Content/themes/base/jquery.ui.accordion.css",
            //            "~/Content/themes/base/jquery.ui.autocomplete.css",
            //            "~/Content/themes/base/jquery.ui.button.css",
            //            "~/Content/themes/base/jquery.ui.dialog.css",
            //            "~/Content/themes/base/jquery.ui.slider.css",
            //            "~/Content/themes/base/jquery.ui.tabs.css",
            //            "~/Content/themes/base/jquery.ui.datepicker.css",
            //            "~/Content/themes/base/jquery.ui.progressbar.css",
            //            "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }

    internal class AsIsBundleOrderer : IBundleOrderer
    {
        public virtual IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }

    internal static class BundleExtensions
    {
        public static Bundle ForceOrdered(this Bundle sb)
        {
            sb.Orderer = new AsIsBundleOrderer();
            return sb;
        }
    }
}