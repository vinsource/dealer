using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Caching;

namespace FreewayIsuzu.Extensions
{
    using System;
    using System.Web;
    using System.Web.Mvc;

    /// <summary>
    /// [OutputCache(Duration = 60, VaryByParam = "*", CachePolicy = CachePolicy.Server)]
    /// [OutputCache(Duration = 10, VaryByParam = "id", CachePolicy = CachePolicy.Server)]
    /// [OutputCache(Duration = 10, VaryByParam = "id;page", CachePolicy = CachePolicy.Server)]
    /// [OutputCache(Duration = 10, CachePolicy = CachePolicy.Client)]
    /// </summary>
    public class CacheFilterAttribute : ActionFilterAttribute
    {
        #region Public properties
        public int Duration { get; set; }
        public string VaryByParam { get; set; }
        public CachePolicy CachePolicy { get; set; }
        #endregion

        #region Private members
        private Cache _cache = null;
        private bool _cacheHit = false;
        private HttpContext _existingContext;
        private StringWriter _writer;
        #endregion

        public CacheFilterAttribute()
        {
            Duration = 30;
            VaryByParam = "*";
            CachePolicy = CachePolicy.Client;
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            // Client-side caching?
            if (CachePolicy == CachePolicy.Client || CachePolicy == CachePolicy.ClientAndServer)
            {
                if (Duration <= 0) return;

                HttpCachePolicyBase cache = filterContext.HttpContext.Response.Cache;
                TimeSpan cacheDuration = TimeSpan.FromSeconds(Duration);

                cache.SetCacheability(HttpCacheability.Public);
                cache.SetExpires(DateTime.Now.Add(cacheDuration));
                cache.SetMaxAge(cacheDuration);
                cache.AppendCacheExtension("must-revalidate, proxy-revalidate");
            }
        }

        //public override void OnResultExecuting(ResultExecutingContext filterContext)
        //{
        //    // Server-side caching?
        //    if (CachePolicy == CachePolicy.Server || CachePolicy == CachePolicy.ClientAndServer)
        //    {
        //        // Fetch Cache instance
        //        _cache = filterContext.HttpContext.Cache;

        //        // Fetch cached data
        //        object cachedData = _cache.Get(GenerateKey(filterContext));
        //        if (cachedData != null)
        //        {
        //            // Cache hit!
        //            _cacheHit = true;

        //            // Fix substitutions
        //            cachedData = ResolveSubstitutions(filterContext, (string)cachedData);

        //            // Return cached data
        //            filterContext.HttpContext.Response.Write(cachedData);
        //            filterContext.Cancel = true;
        //        }
        //        else
        //        {
        //            // Cache not hit.
        //            // Replace the current context with a new context that writes to a string writer
        //            _existingContext = System.Web.HttpContext.Current;
        //            _writer = new StringWriter();
        //            HttpResponse response = new HttpResponse(_writer);
        //            HttpContext context = new HttpContext(_existingContext.Request, response)
        //            {
        //                User = _existingContext.User
        //            };

        //            // Copy all items in the context (especially done for session availability in the component)
        //            foreach (var key in _existingContext.Items.Keys)
        //            {
        //                context.Items[key] = _existingContext.Items[key];
        //            }

        //            System.Web.HttpContext.Current = context;
        //        }
        //    }
        //}

        //public override void OnResultExecuted(ResultExecutedContext filterContext)
        //{
        //    // Server-side caching?
        //    if (CachePolicy == CachePolicy.Server || CachePolicy == CachePolicy.ClientAndServer)
        //    {
        //        if (!_cacheHit)
        //        {
        //            // Fetch output
        //            string output = _writer.ToString();

        //            // Restore the old context
        //            System.Web.HttpContext.Current = _existingContext;

        //            // Fix substitutions
        //            output = ResolveSubstitutions(filterContext, output);

        //            // Return rendered data
        //            _existingContext.Response.Write(output);

        //            // Add data to cache
        //            _cache.Add(
        //                GenerateKey(filterContext),
        //                _writer.ToString(),
        //                null,
        //                DateTime.Now.AddSeconds(Duration),
        //                Cache.NoSlidingExpiration,
        //                CacheItemPriority.Normal,
        //                null);
        //        }
        //    }
        //}

        #region Helper methods

        private string GenerateKey(ControllerContext filterContext)
        {
            StringBuilder cacheKey = new StringBuilder();

            // Controller + action
            cacheKey.Append(filterContext.Controller.GetType().FullName);
            if (filterContext.RouteData.Values.ContainsKey("action"))
            {
                cacheKey.Append("_");
                cacheKey.Append(filterContext.RouteData.Values["action"].ToString());
            }

            // Variation by parameters
            List<string> varyByParam = VaryByParam.Split(';').ToList();

            if (!string.IsNullOrEmpty(VaryByParam))
            {
                foreach (KeyValuePair<string, object> pair in filterContext.RouteData.Values)
                {
                    if (VaryByParam == "*" || varyByParam.Contains(pair.Key))
                    {
                        cacheKey.Append("_");
                        cacheKey.Append(pair.Key);
                        cacheKey.Append("=");
                        cacheKey.Append(pair.Value.ToString());
                    }
                }
            }

            return cacheKey.ToString();
        }

        private string ResolveSubstitutions(ControllerContext filterContext, string source)
        {
            // Any substitutions?
            if (source.IndexOf("<!--SUBSTITUTION:") == -1)
            {
                return source;
            }

            // Setup regular expressions engine
            MatchEvaluator replaceCallback = new MatchEvaluator(
                matchToHandle =>
                {
                    // Replacements
                    string tag = matchToHandle.Value;

                    // Parts
                    string[] parts = tag.Split(':');
                    string className = parts[1];
                    string methodName = parts[2].Replace("-->", "");

                    // Execute method
                    Type targetType = Type.GetType(className);
                    MethodInfo targetMethod = targetType.GetMethod(methodName, BindingFlags.Static | BindingFlags.Public);
                    return (string)targetMethod.Invoke(null, new object[] { filterContext });
                }
            );
            Regex templatePattern = new Regex(@"<!--SUBSTITUTION:[A-Za-z_\.]+:[A-Za-z_\.]+-->", RegexOptions.Multiline);

            // Fire up replacement engine!
            return templatePattern.Replace(source, replaceCallback);
        }

        #endregion
    }

    public enum CachePolicy
    {
        NoCache = 0,
        Client = 1,
        Server = 2,
        ClientAndServer = 3
    }
}