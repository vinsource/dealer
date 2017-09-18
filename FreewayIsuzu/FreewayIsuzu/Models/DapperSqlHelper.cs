using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using DapperExtensions;

namespace FreewayIsuzu.Models
{
    public static class DapperSqlHelper
    {
        private static readonly string VinControlConnectionString = ConfigurationManager.ConnectionStrings["VincontrolConnection"].ConnectionString;

        public static bool Insert<T>(T parameter, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    
                    try
                    {
                        connection.Insert(parameter);
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
                
                connection.Close();
                return true;
            }
        }

        public static int InsertWithReturnId<T>(T parameter, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                var recordId = connection.Insert(parameter);
                connection.Close();
                return recordId;
            }
        }

        public static bool Update<T>(T parameter, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                connection.Update(parameter);
                connection.Close();
                return true;
            }
        }

        public static bool Delete<T>(PredicateGroup predicate, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                connection.Delete<T>(predicate);
                connection.Close();
                return true;
            }
        }
        
        public static IList<T> GetAll<T>(IFieldPredicate predicate = null, IList<ISort> sort = null, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                var result = connection.GetList<T>(predicate, sort);
                connection.Close();
                return result.ToList();
            }
        }

        public static T Find<T>(IFieldPredicate predicate, IList<ISort> sort = null, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                var result = connection.GetList<T>(predicate, sort).FirstOrDefault();
                connection.Close();
                return result;
            }
        }

        public static IEnumerable<T> QueryStore<T>(string storedProcedure, dynamic param = null, dynamic outParam = null, SqlTransaction transaction = null, bool buffered = true, int? commandTimeout = null, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                var output = connection.Query<T>(storedProcedure, param: (object)param, transaction: transaction, buffered: buffered, commandTimeout: commandTimeout, commandType: CommandType.StoredProcedure);
                connection.Close();
                return output;
            }
            
        }

        public static IEnumerable<T> QueryText<T>(string storedProcedure, dynamic param = null, dynamic outParam = null, SqlTransaction transaction = null, bool buffered = true, int? commandTimeout = null, string connectionString = null) where T : class
        {
            using (var connection = new SqlConnection(connectionString ?? VinControlConnectionString))
            {
                connection.Open();
                var output = connection.Query<T>(storedProcedure, param: (object)param, transaction: transaction, buffered: buffered, commandTimeout: commandTimeout, commandType: CommandType.Text);
                connection.Close();
                return output;
            }

        }
    }
}