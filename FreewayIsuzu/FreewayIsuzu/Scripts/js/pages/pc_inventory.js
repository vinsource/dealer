$(function () {

});

function inventory_view(data) {
    
    var htmlO = '<div class="span12">';
    if (data.length == 0) {
        htmlO += '<div class="nocars">There is no cars available.</div>';
    }
    $.each(data, function (index, item) {
  
        if (!item.Mileage) {
            item.Mileage = "Not Specified";
        }

        if (!item.ExteriorColor) {
            item.ExteriorColor = "Not Specified";
        }

        if (!item.InteriorColor) {
            item.InteriorColor = "Not Specified";
        }

        var yMm = item.ModelYear + " " + item.Make + " " + item.Model + " " + item.Trim;
        if (item.Model) {
            item.Model = item.Model.replace("/", "_");
        }
        var urlDetail = FreewayIsuzuWebURL + "/" + page + "/" + item.ModelYear + "-" + item.Make + "-" + item.Model + "/" + item.Vin;
        urlDetail = urlDetail.replace(/\s/g, '-');
        urlDetail = urlDetail.replace('"', '');

        htmlO += '<div class="row vehicle-listing">';
        htmlO += '<div class="span3 listing-container">';
        htmlO += ' <div class="img">';
        htmlO += '<a href="' + urlDetail + '" class="thumbnail">';
        htmlO += '<table class="imageMid" style="vertical-align:middle;"><tbody><tr><td style="vertical-align:middle;">';

        var urlImg = '';
        var classImg = '';
        var cleanImgUrl;
        if (item.CarThumbnailImageUrl) {
            cleanImgUrl = item.CarThumbnailImageUrl.replace('|', ',');
            urlImg = cleanImgUrl.split(",")[0];
        } else if (item.CarImageUrl) {
            cleanImgUrl = item.CarThumbnailImageUrl.replace('|', ',');
            urlImg = cleanImgUrl.split(",")[0];
        } else {
            urlImg = FreewayIsuzuWebURL + "/Content/images/no-images.jpg";
            classImg = "imgDefault";
        }
        
        htmlO += '<img class="' + classImg + '" alt="' + yMm + '" src="' + urlImg + '">';
        htmlO += '</td></tr></tbody></table></a></div></div>';

        htmlO += '<div class="span9 listing-container"><div class="row">';
        htmlO += '<div class="span6 description">';
        htmlO += '<a href="' + urlDetail + '"><h3 class="name">' + item.ModelYear + " " + item.Make + " " + item.Model + '</h3></a>';

        htmlO += '<ul class="unstyled">';
        htmlO += '<li>Mileage: ' + CommaFormatted(item.Mileage) + '</li>';
        htmlO += '<li>Ext: ' + item.ExteriorColor + '</li>';
        htmlO += '<li>Int: ' + item.InteriorColor + '</li>';
        htmlO += '<li>Stock: #' + item.StockNumber + '</li>';
        htmlO += '<li>VIN: ' + item.Vin + '</li>';
        htmlO += '</ul>';
        htmlO += '</div>';
        htmlO += '<div class="span3 price">';
        if (item.Condition == "New") {
            if (!item.SalePrice || item.SalePrice == "00" || item.SalePrice == "$0") {
                htmlO += '<span class="internetPrice">Call for Price</span>';
            } else {
                htmlO += '<span class="labelinternetPrice">Internet Price : </span>';
                htmlO += '<span class="internetPrice"> ' + item.SalePrice + '</span>';
            }

            if (!item.MSRP || item.MSRP == "00" || item.MSRP == "$0") {
                //   htmlO += '<h2>Call for Price</h2>';
            } else {
                htmlO += '<h4 class="msrpPrice">MSRP: ' + item.MSRP + '</h2>';
            }

            if (!item.DealerDiscount || item.DealerDiscount == "00" || item.DealerDiscount == "$0") {
                //   htmlO += '<h2>Call for Price</h2>';
            } else {
                htmlO += '<h4 class="discountPrice">Discount: ' + item.DealerDiscount + '</h2>';
            }
        } else {
            if (!item.SalePrice || item.SalePrice == "00" || item.SalePrice == "$0") {
                htmlO += '<span class="internetPrice">Call for Price</span>';
            } else {
                if (item.WindowStickerPrice != "0") {
                    htmlO += '<div class="retailPriceHolder">';
                    htmlO += '<span class="labelretailPrice">Retail Price : </span>';
                    htmlO += '<span class="retailPrice"> ' + item.WindowStickerPrice + '</span>';
                    
                    htmlO += '</div>';
                   
                }
                htmlO += '<div class="internetPriceHolder">';
                htmlO += '<span class="labelinternetPrice">Internet Price : </span>';
                htmlO += '<span class="internetPrice"> ' + item.SalePrice + '</span>';
                htmlO += '</div>';

            }
        }


        htmlO += ' <a target="_blank" href="http://www.carfax.com/VehicleHistory/p/Report.cfx?vin='+item.Vin+ '"><img alt="' + yMm + '  Freeway Isuzu Carfax Report" src="/Content/images/carfax-large.jpg"></a>';
        htmlO += '</div></div>';
        if (item.Descriptions) {
            htmlO += '<p title="' + item.Descriptions + '">Description: ' + item.Descriptions.substr(0, 100) + '...!</p>';
        }
        htmlO += '</div></div>';

    });

    htmlO += '</div>';

    $("#inventory").html(htmlO);
}

function groupData(data, preData) {
    var obj = {};
    $.each(data, function (index, item) {
        var count = 0;
        $.each(preData, function (a, b) {
            if (b == item) {
                count++;
            }
        });
        obj[item] = count;
    });

    return obj;
}

function appendDom(el, obj, text) {
    el.html('');
    switch (text) {
        case "make":
            el.append("<option value='0'>Select a Make</option>");
            break;
        case "model":
            el.append("<option value='0'>Select a Model</option>");
            break;
        case "trim":
            el.append("<option value='0'>Select a Trim</option>");
            break;
        case "year":
            el.append("<option value='0'>Select a Year</option>");
            break;
        case "price":
            el.append("<option value='0'>Select a Price</option>");
            break;
    }

    var arrayKey = [];
    var arrayValue = [];
    $.each(obj, function (index, item) {
        arrayKey.push(index);
    });
    arrayKey = _.sortBy(arrayKey, function (num) {
        return num;
    });

    for (var i = 0; i < arrayKey.length; i++) {
        $.each(obj, function (index, item) {
            if (index == arrayKey[i]) {
                arrayValue.push(item);
            }
        });
        // el.append("<option value='" + arrayKey[i] + "'>" + index + " (" +
        // item + ") </option>");
    }

    if (text == "make") {
        var html = "<ul>";
        for (var i = 0; i < arrayKey.length; i++) {
            html += '<li class="li_left ' + arrayKey[i] + '" al="' + arrayKey[i] + '">' + arrayKey[i] + '<nobr style="color:white !important;">' + ' (' + arrayValue[i] + ")" + '</nobr></li>';
        }

        html += "</ul>";

        $("#available_make").html(html);
    }
    for (var i = 0; i < arrayKey.length; i++) {

        if (arrayKey[i] == false || arrayKey[i] == "$0") {
            if (text == "price") {
                el.append("<option value='Call for Price'>Call for Price (" + arrayValue[i] + ") </option>");
            } else {
                el.append("<option value='Not Specified'>Not Specified (" + arrayValue[i] + ") </option>");

            }

        } else {
            if (text == "price") {
                var displayPrice = CommaFormatted(arrayKey[i]);
                el.append("<option value='" + arrayKey[i] + "'>" + displayPrice + " (" + arrayValue[i] + ") </option>");
            } else {
                el.append("<option value='" + arrayKey[i] + "'>" + arrayKey[i] + " (" + arrayValue[i] + ") </option>");
            }
        }
    }
}

function getData(obj, type) {
    var Arr = [];
    switch (type) {
        case "Make":
            $.each(obj, function (index, item) {
                Arr.push(item.Make);
            });
            // UniArr = _.uniq(Arr);
            break;
        case "Model":
            $.each(obj, function (index, item) {
                Arr.push(item.Model);
            });
            // UniArr = _.uniq(Arr);
            break;
        case "Trim":
            $.each(obj, function (index, item) {
                Arr.push(item.Trim);
            });
            // UniArr = _.uniq(Arr);
            break;
        case "Year":
            $.each(obj, function (index, item) {
                Arr.push(item.ModelYear);
            });
            // UniArr = _.uniq(Arr);
            break;
        case "Price":
            $.each(obj, function (index, item) {
                Arr.push(item.SalePrice);
            });
            // UniArr = _.uniq(Arr);
            break;
    }

    return Arr;
}

function checkExistData(pri, detail_obj, make, model, trim, year, price) {
    switch (pri) {
        case "price":
            if (year.length > 0) {
                return year;
            } else {
                if (trim.length > 0) {
                    return trim;
                } else {
                    if (model.length > 0) {
                        return model;
                    } else {
                        if (make.length > 0) {
                            return make;
                        } else {
                            return detail_obj;
                        }

                    }
                }
            }
            break;
        case "year":
            if (trim.length > 0) {
                return trim;
            } else {
                if (model.length > 0) {
                    return model;
                } else {
                    if (make.length > 0) {
                        return make;
                    } else {
                        return detail_obj;
                    }
                }
            }
            break;

        case "trim":
            if (model.length > 0) {
                return model;
            } else {
                if (make.length > 0) {
                    return make;
                } else {
                    return detail_obj;
                }
            }
            break;

        case "model":
            if (make.length > 0) {
                return make;
            } else {
                return detail_obj;
            }
            break;

        default:
            return detail_obj;
            break;
    }
}

function triggerDataLoaded(detail_obj) {
    var template_content = "#content-template";
    var makeGroup = [];
    var modelGroup = [];
    var yearGroup = [];
    var priceGroup = [];
    var trimGroup = [];
    var currentData = detail_obj;

    makeGroup = getData(detail_obj, "Make");
    modelGroup = getData(detail_obj, "Model");
    yearGroup = getData(detail_obj, "Year");
    priceGroup = getData(detail_obj, "Price");
    trimGroup = getData(detail_obj, "Trim");

    var uniMakeGroup = _.uniq(makeGroup);
    var uniModelGroup = _.uniq(modelGroup);
    var uniYearGroup = _.uniq(yearGroup);
    var uniPriceGroup = _.uniq(priceGroup);
    var uniTrimGroup = _.uniq(trimGroup);

    // UnigArr = _.sortBy(UnigArr,function(num){return num;}).reverse();
    var makeObj = {};
    var modelObj = {};
    var yearObj = {};
    var priceObj = {};
    var trimObj = {};
    trimObj = groupData(uniTrimGroup, trimGroup);
    makeObj = groupData(uniMakeGroup, makeGroup);
    modelObj = groupData(uniModelGroup, modelGroup);
    priceObj = groupData(uniPriceGroup, priceGroup);
    yearObj = groupData(uniYearGroup, yearGroup);

    var makeDom = $("#makeDrp");
    var modelDom = $("#modelDrp");
    var trimDom = $("#trimDrp");
    var yearDom = $("#yearDrp");
    var priceDom = $("#priceDrp");

    appendDom(makeDom, makeObj, "make");
    appendDom(modelDom, modelObj, "model");
    appendDom(trimDom, trimObj, "trim");
    appendDom(yearDom, yearObj, "year");
    appendDom(priceDom, priceObj, "price");

    var arrayMake = [];
    var arrayModel = [];
    var arrayTrim = [];
    var arrayYear = [];
    var arrayPrice = [];

    makeDom.change(function () {
        arrayMake = [];
        arrayModel = [];
        arrayTrim = [];
        arrayYear = [];
        arrayPrice = [];
        var make = $(this).val();
        if (make == "0") {
            var makeDom = $("#makeDrp");
            var modelDom = $("#modelDrp");
            var trimDom = $("#trimDrp");
            var yearDom = $("#yearDrp");
            var priceDom = $("#priceDrp");

            appendDom(makeDom, makeObj, "make");
            appendDom(modelDom, modelObj, "model");
            appendDom(trimDom, trimObj, "trim");
            appendDom(yearDom, yearObj, "year");
            appendDom(priceDom, priceObj, "price");
            // ////load template///////
            currentData = detail_obj;
            inventory_view(detail_obj);

            return false;
        }
        $.each(detail_obj, function (index, item) {
            if (item.Make.indexOf(make) != -1) {
                arrayMake.push(item);
            }
        });

        currentData = arrayMake;

        var Model = [];
        var Year = [];
        var Trim = [];
        var Price = [];
        $.each(arrayMake, function (index, item) {
            Model.push(item.Model);
            Year.push(item.ModelYear);
            Trim.push(item.Trim);
            Price.push(item.SalePrice);
        });

        var UniModel = _.uniq(Model);
        var UniYear = _.uniq(Year);
        var UniTrim = _.uniq(Trim);
        var UniPrice = _.uniq(Price);
        var MObj = {};
        var YObj = {};
        var TrObj = {};
        var PObj = {};
        MObj = groupData(UniModel, Model);
        YObj = groupData(UniYear, Year);
        TrObj = groupData(UniTrim, Trim);
        PObj = groupData(UniPrice, Price);
        var modelDom = $("#modelDrp");
        var trimDom = $("#trimDrp");
        var yearDom = $("#yearDrp");
        var priceDom = $("#priceDrp");
        appendDom(modelDom, MObj, "model");
        appendDom(trimDom, TrObj, "trim");
        appendDom(yearDom, YObj, "year");
        appendDom(priceDom, PObj, "price");

        // ////load template///////
        inventory_view(arrayMake);
        // /////////end////////////
    });

    modelDom.change(function () {
        arrayModel = [];
        arrayTrim = [];
        arrayYear = [];
        arrayPrice = [];
        var model = $(this).val();
        if (model == "0") {
            var data = checkExistData("model", detail_obj, arrayMake);
            $.each(data, function (index, item) {
                arrayModel.push(item);
            });

            currentData = arrayModel;

            var Year = [];
            var Trim = [];
            var Price = [];
            $.each(arrayModel, function (index, item) {
                Year.push(item.ModelYear);
                Trim.push(item.Trim);
                Price.push(item.SalePrice);
            });

            var UniYear = _.uniq(Year);
            var UniTrim = _.uniq(Trim);
            var UniPrice = _.uniq(Price);

            var YObj = {};
            var TrObj = {};
            var PObj = {};

            YObj = groupData(UniYear, Year);
            TrObj = groupData(UniTrim, Trim);
            PObj = groupData(UniPrice, Price);

            var trimDom = $("#trimDrp");
            var yearDom = $("#yearDrp");
            var priceDom = $("#priceDrp");

            appendDom(trimDom, TrObj, "trim");
            appendDom(yearDom, YObj, "year");
            appendDom(priceDom, PObj, "price");

            // ////load template///////
            inventory_view(arrayModel);
            // /////////end////////////
            return false;
        } else {
            var data = checkExistData("model", detail_obj, arrayMake);

            if (model != "Not Specified") {
                $.each(data, function (index, item) {
                    /*
					 if (item.Model.indexOf(model) != -1) {
					 arrayModel.push(item);
					 }*/
                    if (item.Model == model) {
                        arrayModel.push(item);
                    }
                });
            } else {
                $.each(data, function (index, item) {
                    /*
					 if (item.Model.indexOf(model) != -1) {
					 arrayModel.push(item);
					 }*/
                    if (item.Model == "") {
                        arrayModel.push(item);
                    }
                });
            }

            currentData = arrayModel;

            var Year = [];
            var Trim = [];
            var Price = [];
            $.each(arrayModel, function (index, item) {
                Year.push(item.ModelYear);
                Trim.push(item.Trim);
                Price.push(item.SalePrice);
            });

            var UniYear = _.uniq(Year);
            var UniTrim = _.uniq(Trim);
            var UniPrice = _.uniq(Price);

            var YObj = {};
            var TrObj = {};
            var PObj = {};

            YObj = groupData(UniYear, Year);
            TrObj = groupData(UniTrim, Trim);
            PObj = groupData(UniPrice, Price);

            var trimDom = $("#trimDrp");
            var yearDom = $("#yearDrp");
            var priceDom = $("#priceDrp");

            appendDom(trimDom, TrObj, "trim");
            appendDom(yearDom, YObj, "year");
            appendDom(priceDom, PObj, "price");

            // ////load template///////
            inventory_view(arrayModel);
            // /////////end///////////
        }

    });

    trimDom.change(function () {
        arrayTrim = [];
        arrayYear = [];
        arrayPrice = [];
        if ($(this).val() == "0") {

            var data = checkExistData("trim", detail_obj, arrayMake, arrayModel);

            $.each(data, function (index, item) {
                arrayTrim.push(item);
            });

            currentData = arrayTrim;

            var Year = [];
            var Price = [];

            $.each(arrayTrim, function (index, item) {
                Year.push(item.ModelYear);
                Price.push(item.SalePrice);
            });

            var UniYear = _.uniq(Year);
            var UniPrice = _.uniq(Price);

            var YObj = {};
            var PObj = {};

            YObj = groupData(UniYear, Year);
            PObj = groupData(UniPrice, Price);

            var yearDom = $("#yearDrp");
            var priceDom = $("#priceDrp");

            appendDom(yearDom, YObj, "year");
            appendDom(priceDom, PObj, "price");

            // ////load template///////
            inventory_view(arrayTrim);
            // /////////end///////////
        } else {
            var trim = $(this).val();
            var data = checkExistData("trim", detail_obj, arrayMake, arrayModel);

            if (trim != "Not Specified") {
                $.each(data, function (index, item) {
                    if (trim == item.Trim) {
                        arrayTrim.push(item);
                    }
                });
            } else {
                $.each(data, function (index, item) {
                    if (item.Trim == "") {
                        arrayTrim.push(item);
                    }
                });
            }

            currentData = arrayTrim;

            var Year = [];
            var Price = [];

            $.each(arrayTrim, function (index, item) {
                Year.push(item.ModelYear);
                Price.push(item.SalePrice);
            });

            var UniYear = _.uniq(Year);
            var UniPrice = _.uniq(Price);

            var YObj = {};
            var PObj = {};

            YObj = groupData(UniYear, Year);
            PObj = groupData(UniPrice, Price);

            var yearDom = $("#yearDrp");
            var priceDom = $("#priceDrp");

            appendDom(yearDom, YObj, "year");
            appendDom(priceDom, PObj, "price");

            // ////load template///////
            inventory_view(arrayTrim);
            // /////////end/////////////
        }
    });

    yearDom.change(function () {
        arrayYear = [];
        arrayPrice = [];
        var year = $(this).val();
        var pObj;
        var data;
        var uniPrice;
        var price;
        if (year == "0") {
            data = checkExistData("year", detail_obj, arrayMake, arrayModel, arrayTrim);
            $.each(data, function (index, item) {
                arrayYear.push(item);
            });
            currentData = arrayYear;
            price = [];
            $.each(arrayYear, function (index, item) {
                price.push(item.SalePrice);
            });
            uniPrice = _.uniq(price);
            pObj = {};
            pObj = groupData(uniPrice, price);

            var priceDom = $("#priceDrp");

            appendDom(priceDom, pObj, "price");

            // ////load template///////
            inventory_view(arrayYear);
            // /////////end////////////
        } else {
            data = checkExistData("year", detail_obj, arrayMake, arrayModel, arrayTrim);
            $.each(data, function (index, item) {
                if (item.ModelYear.toString().indexOf(year) != -1) {
                    arrayYear.push(item);
                }
            });
            currentData = arrayYear;
            price = [];
            $.each(arrayYear, function (index, item) {
                price.push(item.SalePrice);
            });
            uniPrice = _.uniq(price);
            pObj = {};
            pObj = groupData(uniPrice, price);

            var priceDom = $("#priceDrp");

            appendDom(priceDom, pObj, "price");

            // ////load template///////
            inventory_view(arrayYear);
            // /////////end///////////////
        }

    });

    priceDom.change(function () {
        arrayPrice = [];
        var price = $(this).val();
        var data;
        if (price == "0") {
            data = checkExistData("price", detail_obj, arrayMake, arrayModel, arrayTrim, arrayYear);
            $.each(data, function (index, item) {
                arrayPrice.push(item);
            });

            currentData = arrayPrice;
            // ////load template///////
            inventory_view(arrayPrice);
            // /////////end///////////////
        } else {
            data = checkExistData("price", detail_obj, arrayMake, arrayModel, arrayTrim, arrayYear);
            if (price != "Call for Price") {
                $.each(data, function (index, item) {
                    if (item.SalePrice.indexOf(price) != -1) {
                        arrayPrice.push(item);
                    }
                });
            } else {
                $.each(data, function (index, item) {
                    if (!item.SalePrice || item.SalePrice == "$0") {
                        arrayPrice.push(item);
                    }
                });
            }

            currentData = arrayPrice;
            // ////load template///////
            inventory_view(arrayPrice);
            // /////////end///////////////
        }
    });

    // /////////////////////

    $("input[name='order']").on('click', function () {
        var getId = $(this).attr('id');
        var array;
        switch (getId) {
            case "order-saleprice":
                var listPrice = [];
                array = [];
                $.each(currentData, function (index, item) {
                    var value = parseFloat(item.SalePrice.replace(",", ".").replace("$", ""));
                    if (!value) {
                        value = 0;
                    }
                    listPrice.push(value);
                });

                listPrice = _.uniq(listPrice);
                listPrice = _.sortBy(listPrice, function (num) {
                    return num;
                }).reverse();

                $.each(listPrice, function (index, item) {
                    $.each(currentData, function (index1, item1) {
                        var vl = parseFloat(item1.SalePrice.replace(",", ".").replace("$", ""));
                        if (vl == item) {
                            array.push(item1);
                        }
                    });
                });

                inventory_view(array);

                break;

            case "order-year":
                var listYear = [];
                array = [];
                $.each(currentData, function (index, item) {
                    var value = parseInt(item.ModelYear);
                    listYear.push(value);
                });

                listYear = _.uniq(listYear);
                listYear = _.sortBy(listYear, function (num) {
                    return num;
                }).reverse();

                $.each(listYear, function (index, item) {
                    $.each(currentData, function (index1, item1) {
                        var vl = parseInt(item1.ModelYear);
                        if (vl == item) {
                            array.push(item1);
                        }
                    });
                });

                inventory_view(array);

                break;

            case "order-model":
                var listModel = [];
                array = [];
                $.each(currentData, function (index, item) {
                    var value = item.Model;
                    listModel.push(value);
                });

                listModel = _.uniq(listModel);
                listModel = _.sortBy(listModel, function (num) {
                    return num;
                });

                $.each(listModel, function (index, item) {
                    $.each(currentData, function (index1, item1) {
                        var vl = item1.Model;
                        if (vl == item) {
                            array.push(item1);
                        }
                    });
                });

                inventory_view(array);
                break;

            case "order-make":
                var listMake = [];
                array = [];
                $.each(currentData, function (index, item) {
                    var value = item.Make;
                    listMake.push(value);
                });

                listMake = _.uniq(listMake);
                listMake = _.sortBy(listMake, function (num) {
                    return num;
                });

                $.each(listMake, function (index, item) {
                    $.each(currentData, function (index1, item1) {
                        var vl = item1.Make;
                        if (vl == item) {
                            array.push(item1);
                        }
                    });
                });

                inventory_view(array);
                break;
        }

    });
}

$(document).ready(function () {
    var wkData = {
        //"dealerId" : dealerId,
        //"page" : page,
        //"orderBy" : "price",
        //"isAsc" : "1",
    };

    var detailObj = "";
    $.ajax({
        type: "POST",
        url: inventoryUrl,
        data: wkData,
        dataType: "json",
        cache: false,
        success: function (data) {
            detailObj = data;
            inventory_view(detailObj);
            $("#loading-select").hide();
            triggerDataLoaded(detailObj);
        }
    });

    $("a.display-all-cars").click(function () {
        $("#makeDrp").val("0");
        $("#makeDrp").trigger("change");
        $(".orderbtns").attr("checked", false);
    });

    $("li.li_left").on("click", function () {
        var val = $(this).attr("al");
        $("#makeDrp").val(val);
        $("#makeDrp").trigger("change");
    });

    //////////////////for scroll page////////////
    $(document).scroll(function () {
        var t = $(document).scrollTop();
        if (t >= 140) {
            $("#sidebar").css("position", "fixed");
            $("#sidebar").css("top", "0px");
            $("#sidebar").css("margin-left", "720px");

        } else {
            $("#sidebar").css("position", "fixed");
            $("#sidebar").css("margin-left", "720px");
            $("#sidebar").css("top", "150px");

        }
    });
});

