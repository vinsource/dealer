$(function() {

	var numOnlyCheck = /^\d+$/;
	var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var whitespace = / /g;
	var specialChar = /[^0-9a-zA-Z]/;
	var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
	var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;

});

var globalData = {};
var carDescription = "";

function loadSlideImg(data, page) {
    var windowsize = $(window).width();

    /////////////////////////
	var htmlO = "";
	var countId = 0;
	for (var i = 0; i < data.length; i = i + 4) {
		if (i == page) {
			htmlO += '<div class="slide-images slide-images-active">';
		} else {
			htmlO += '<div class="slide-images slide-images-inactive">';
		}

		for (var j = i; j < i + 4; j++) {
		    if (data[j]) {
		        if (windowsize >= 500) {
		            htmlO += '<a href="' + data[j] + '" class="fancybox" rel="group1" id="img' + countId + '"><div class="detail-slide-image">';
		        } else {
		            htmlO += '<a href="javascript:void(0);" class="fancybox" rel="group1" id="img' + countId + '"><div class="detail-slide-image">';
		        }
		        
		        htmlO += '<img alt="' + carDescription + '" src="' + data[j] + '" />';
				htmlO += '</div></a>';
				countId++;
			} else {
				htmlO += '<a href="#showLargeImg"><div class="detail-slide-image">';
				htmlO += '</div></a>';
			}
		}
		htmlO += '</div>';
	}

	$("#holder-slide-images").html(htmlO);

    // leo responsive
	
	if (windowsize >= 500) {
	    $('.fancybox').fancybox({
	        'onStart': function () {
	            $("html, body").animate({
	                scrollTop: $('#banner').offset().top
	            }, 0);
	        },
	    	'onComplete' : function() {
	    		//resizeImgFancybox();
	    		$("#fancybox-outer").css("width", "100%");
	    	},
	    	'onClosed' : function() {
	    		$("#fancybox-outer").css("width", "100%");
	    	}
	    });
	}
    // end leo responsive

	
}

function showSlideImg(page) {
	var list = $("div.slide-images");
	for (var i = 0; i < list.length; i++) {
		var item = $(list[i]);
		if (i == page) {
			item.removeClass("slide-images-inactive").addClass("slide-images-active");
		} else {
			item.removeClass("slide-images-active").addClass("slide-images-inactive");
		}
	}
}

var urlGlobal = window.location.href.split("/");
var Vin = urlGlobal[urlGlobal.length - 1];

$(document).ready(function() {
    $("#carfax-link").attr("href", "http://www.carfax.com/VehicleHistory/p/Report.cfx?vin="+Vin);
	var arrayUrl = "";
	var wkData = {
		
		"vin" : Vin,
		
	};
	$.ajax({
		type : "POST",
		url: detailUrl,
		data : wkData,
		dataType : "json",
		cache : false,
		success : function(data) {
		    globalData = data;

		    if (globalData.Condition == "Used") {
		        $("div.mn-used").addClass("nav-active");
		    } else {
		        $("div.mn-new").addClass("nav-active");
		    }

			showPage(data);

			var similiarData = {

			    "vin": Vin,
			    "make": globalData.Make
			};

			$.ajax({
			    async: true,
			    type: "POST",
			    url: similarMakeUrl,
			    data: similiarData,
			    dataType: "json",
			    cache: false,
			    success: function (sData) {
			        appendSimilar(sData, "Make");
			    }
			});
		}
	});

	

	selectSimilarCars();
});

function appendSimilar(data, type) {
	var html = '';

	$.each(data, function(index, item) {
		if(index > 2){
			return false;
		}
		if (!item.SalePrice || item.SalePrice == "$" || parseInt(item.SalePrice) == 0 || item.SalePrice == "$0") {
			item.SalePrice = "Call for Price";
		} else {
			item.SalePrice = CommaFormatted(item.SalePrice);
		}

		html += '<div class="span3 listing-container" style="margin-left: 0 !important; margin-right: 0px; margin-bottom: 8px;">';
		html += '<table class="imageMid" style="vertical-align:middle;">';
		html += '<tbody><tr>';
		
		var urlDetail = "";
		if(item.Condition == "New"){
		    urlDetail = FreewayIsuzuWebURL + page + item.ModelYear + "-" + item.Make + "-" + item.Model + "-" + item.Trim + "/" + item.Vin;
		}else{
		    urlDetail = FreewayIsuzuWebURL + page + item.ModelYear + "-" + item.Make + "-" + item.Model + "-" + item.Trim + "/" + item.Vin;
		}

	    var title = item.ModelYear + " " + item.Make + " " + item.Model;
		urlDetail = urlDetail.replace(/\s/g, '-');

		var urlImg = '';
	    var noImgSimilar = '';
		if (item.CarThumbnailImageUrl) {
			urlImg = item.CarThumbnailImageUrl.split(",")[0];
		} else if (item.CarImageUrl) {
			urlImg = item.CarImageUrl.split(",")[0];
		} else {
		    urlImg = FreewayIsuzuWebURL + "/Content/images/no-images.jpg";
		    noImgSimilar = "noImgSimilar";
		}

		html += '<td style="vertical-align:middle;"><a href="' + urlDetail + '" class="imageMid" style="background-color: #ffffff !important;"><img class="' + noImgSimilar + '" alt="' + title + '" src="' + urlImg + '"></a></td>';
		html += '</tr></tbody></table>';

		html += '<div class="span3 description" style="margin:0; padding-top: 3px;">';
		html += '<a href="' + urlDetail + '"><h3 class="simi-ymm" style="color: red !important;" class="name" title="' + item.ModelYear + " " + item.Make + " " + item.Model + '">' + item.ModelYear + " " + item.Make + " " + item.Model + '</h3></a>';
		html += '<h4 style="color: green; font-size: 1.3em; margin-top: 3px;">' + item.SalePrice + '</h4></div></div>';
	});

	if (data.length == 0) {
		html = '<label style="font-style: italic;padding-top: 10px;color: #333!important;">There are no cars with similar ' + type + ' !</label>';
	}

	$("#similar").children(".SimWrap").html(html);

}

function selectSimilarCars() {
	$("input[name='similar_type']").click(function() {

	    $("#similar").children(".SimWrap").html('<div id="loading-holder" style="width: 100%;height: 100%;"><img src="/Content/images/ajax-loader.gif" style="margin-left: 40%;width: 100px;height: 100px;border: none;margin-top: 6%;" alt="Loading"></div>');

		var id = $(this).attr("id");
		var api = "";
		var similiar_data = {};
		var type = "";
		switch(id) {
			case "similar_make":
				type = "Make";
				api = similarMakeUrl;
				similiar_data = {
				    "vin": Vin,
				    "make": globalData.Make
				};
				break;
			case "similar_model":
				type = "Model";
				api = similarModelUrl;
				similiar_data = {
				    "vin": Vin,
				    "model": globalData.Model
				};
				break;
			case "similar_body":
				type = "Body Style";
				api = similarBodyTypeUrl;
				similiar_data = {
					
					"body" : globalData.BodyType,
					"vin": Vin,
					
				};
				break;
		
		}

		$.ajax({
			async : true,
			type : "POST",
			url : api,
			data : similiar_data,
			dataType : "json",
			cache : false,
			success : function(sData) {
				appendSimilar(sData, type);
			}
		});
	});
}

function showPage(data) {
    
	if (data.CarImageUrl) {
		data.logo_url = data.CarImageUrl.split(",");
	} else {
	    data.logo_url = [FreewayIsuzuWebURL + "/Content/images/no-images.jpg"];
	}

	var imgLink = "<a href='javascript:void(0);' value='img0'>";
	imgLink += "<div id=\"main-image\">";
	imgLink += "<img alt=\"\" src=\"" + data.logo_url[0] + "\">";
	imgLink += "</div></a>";

	$("#detail-left").prepend(imgLink);

	data.Mileage = CommaFormatted(data.Mileage);
	var carInfo = "<li>";
	carInfo += "<b>Miles:</b>&nbsp;" + data.Mileage;
	carInfo += "</li>";

	carInfo += "<li>";
	carInfo += "<b>Stock:</b>&nbsp;#" + data.StockNumber;
	carInfo += "</li>";

	carInfo += "<li>";
	carInfo += "<b>VIN:</b>&nbsp;" + data.Vin;
	carInfo += "</li>";

	carInfo += "<li>";
	if (data.ExteriorColor) {
		carInfo += "<b>ExteriorColor:</b>&nbsp;" + data.ExteriorColor;
	} else {
		carInfo += "<b>ExteriorColor:</b>&nbsp;Not Specified.";
	}
	carInfo += "</li>";

	carInfo += "<li>";
	if (data.InteriorColor) {
		carInfo += "<b>InteriorColor:</b>&nbsp;" + data.InteriorColor;
	} else {
		carInfo += "<b>InteriorColor:</b>&nbsp;Not Specified.";
	}
	carInfo += "</li>";

	carInfo += "<li>";
	if (data.Tranmission) {
		carInfo += "<b>Transmission:</b>&nbsp;" + data.Tranmission;
	} else {
		carInfo += "<b>Transmission:</b>&nbsp;Not Specified.";
	}
	carInfo += "</li>";

	carInfo += "<li>";
	if (!data.BodyType) {
		data.BodyType = "Not specified";
	}
	carInfo += "<b>Body Style:</b>&nbsp;" + data.BodyType;
	carInfo += "</li>";

	carInfo += "<li>";
	carInfo += "<b>Engine:</b>&nbsp;" + data.Cylinder + "&nbsp;Cylinder,&nbsp;" + data.Litters + "L";
	carInfo += "</li>";

	carInfo += "<li>";
	carInfo += "<b>Location:</b>&nbsp;" + "Freeway Isuzu";
	carInfo += "</li>";

	var carRelation = "<span>" + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " Whittier, CA | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " Buena Park, CA | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " Bellflower, CA | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " Aliso Viejo, CA | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " Riverside, CA | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " 91125 | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " 92692 | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " 91701 | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " 90632 | " + data.ModelYear + "&nbsp;" + data.Make + "&nbsp;" + data.Model + " 93539 |</span>";
	var carTitle = data.ModelYear + " " + data.Make + " " + data.Model;
    carDescription = "<b>Freeway Isuzu - " + carTitle + "</b>";

	//data.SalePrice = CommaFormatted(data.SalePrice);

	if (data.SalePrice) {
		data.SalePrice = data.SalePrice;
	} else {
		data.SalePrice = "<p style='font-size:26px;margin-top:30px;color:green !important;'>Call for Price!</p>";
	}
	
	if (data.Condition == "New") {
	    if (!data.MSRP || data.MSRP == "00" || data.MSRP == "$0") {
	        //   htmlO += '<h2>Call for Price</h2>';
	    } else {
	        $(".msrpPrice").html("MSRP: " + data.MSRP);
	    }

	    if (!data.DealerDiscount || data.DealerDiscount == "00" || data.DealerDiscount == "$0") {
	        //   htmlO += '<h2>Call for Price</h2>';
	    } else {
	        $(".discountPrice").html("Discount: " + data.DealerDiscount);
	    }
	}
	
	
	
	$('h2.price').html(data.SalePrice);


	
	$('h1.name').html(carTitle);

	if (!data.CarsOptions) {
		$('.well').html("There is no Options yet.");
	} else {
		var optionsList = data.CarsOptions.split(',');

		var htmlO = "";
		htmlO += "<em>* Options listed are factory standard. One or more of these options may have been removed, altered or have expired since its first purchase. Please check with a sales rep for more information. *</em>";
		htmlO += "<ul>";

		$.each(optionsList, function(index, item) {
			htmlO += "<li>" + item + "</li>";
		});

		htmlO += "</ul>";

		$('.well').html(htmlO);
	}

	$("ul.unstyled").append(carInfo);

	$("#hidden_carid").val(dealerId);
	$("#hidden_make").val(data.Make);
	$("#hidden_model").val(data.Model);
	$("#hidden_year").val(data.ModelYear);

	var carfaxHtml = "";
	
    var serviceRecords = 0;
	if (data.CarFax) {
	    if (!data.CarFax.ServiceRecords) {
	        data.CarFax.ServiceRecords = 0;
	    } else {
	        serviceRecords = data.CarFax.ServiceRecords;
	    }
	}
	
	if (data.CarFaxOwner == 1) {
		// carfax_html += '<div class="carfax-logo">';
		// carfax_html += '<div id="carfax_link">';
		// carfax_html += '<a href="http://www.carfax.com/VehicleHistory/p/Report.cfx?vin='+data.Vin+'" target="_blank">';
		// carfax_html += '<img src="http://www.carfaxonline.com/phoenix/img/one_owner_logo_bw.jpg" />';
		// carfax_html += '</a>';
		// carfax_html += '</div>';
		// carfax_html += '<div class="carfax-title">';
		// carfax_html += '<span style="font-size: 1.8em; font-weight: bold; position: relative; top: -5px; margin-left: 4px;">Carfax Vehicle History Report</span>';
		// carfax_html += '</div>';
		// carfax_html += '<div class="service-rep">';
		// carfax_html += '<label class="service-count">2</label>';
		// carfax_html += '<div class="service-title">Service Records</div>';
		// carfax_html += '</div>';
		// carfax_html += '</div>';

		carfaxHtml += '<div style=" margin-top: 4px; font-size: .75em !important; margin-bottom: 4px; padding: .5em; padding-bottom: 0;color:white; background: #640A0A;">';
		carfaxHtml += '<a href="http://www.carfax.com/VehicleHistory/p/Report.cfx?vin=' + data.Vin + '" target="_blank">';
		carfaxHtml += '<img  src="/Content/images/carfax-large.jpg" alt="CARFAX" />';
		carfaxHtml += '</a>'
		carfaxHtml += '<span style="font-size: 1.8em; font-weight:bold; position: relative; top: -5px; margin-left: 4px;">Summary</span>';
		carfaxHtml += '</div>';
		carfaxHtml += '<h4 style="margin-top: 5px; margin-bottom: 0px;">Owners</h4>';
		carfaxHtml += 'CARFAX 1-Owner';
		carfaxHtml += '<img style="position: absolute; right: 4px; top: 48px;" src="http://www.carfaxonline.com/phoenix/img/one_owner_logo_bw.jpg" alt="CARFAX Online"/>';
		carfaxHtml += '<h4 style="margin-top: 5px; margin-bottom: 0px;">Service Records</h4> ' + serviceRecords + ' Service Records Available<br />';

	} else {

		carfaxHtml += '<div style=" margin-top: 4px; font-size: .75em !important; margin-bottom: 4px; padding: .5em; padding-bottom: 0;color:white; background: #640A0A;">';
		carfaxHtml += '<a href="http://www.carfax.com/VehicleHistory/p/Report.cfx?vin=' + data.Vin + '" target="_blank">';
		carfaxHtml += '<img  src="/Content/images/carfax-large.jpg" alt="CARFAX" />';
		carfaxHtml += '</a>'
		carfaxHtml += '<span style="font-size: 1.8em; font-weight:bold; position: relative; top: -5px; margin-left: 4px;">Summary</span>';
		carfaxHtml += '</div>';
		// carfax_html += '<img style="position: absolute; right: 0px; top: 48px;" src="http://www.carfaxonline.com/phoenix/img/one_owner_logo_bw.jpg" />';
		carfaxHtml += '<h4 style="margin-top: 5px; margin-bottom: 0px;">Service Records</h4> ' + serviceRecords + ' Service Records Available<br />';
		// carfax_html += '<div class="carfax-title">';
		// carfax_html += '<span style="font-size: 1.8em; font-weight: bold; position: relative; top: -5px; margin-left: 4px;">Carfax Vehicle History Report</span>';
		// carfax_html += '</div>';
		// carfax_html += '<div class="carfax-logo">';
		// carfax_html += '<div id="carfax_link_overowner">';
		// carfax_html += '<a href="http://www.carfax.com/VehicleHistory/p/Report.cfx?vin='+data.Vin+'" target="_blank">';
		// carfax_html += '<img alt="" src="/images/carfax-large.jpg">';
		// carfax_html += '</a>';
		// carfax_html += '</div>';
		// carfax_html += '<div class="service-rep-overowner">';
		// carfax_html += '<label class="service-count">'+data.CarFax.ServiceRecords+'</label>';
		// carfax_html += '<div class="service-title">Service Records</div>';
		// carfax_html += '</div></div>';
	}

	$("#carfaxBTN").attr("href", 'http://www.carfax.com/VehicleHistory/p/Report.cfx?vin=' + data.Vin);

	$(".carfax-top").html(carfaxHtml);

	init_view_detail(data, data);
}

function init_view_detail(arrayUrl, afterPrint) {
	var timeSlide;
	var logo_url = [];
	$.each(arrayUrl.logo_url, function(index, item) {
		logo_url.push(item);
	});
	var page = 0;
	loadSlideImg(logo_url, 0);
	var totalPage = Math.floor(logo_url.length / 4);

	if (totalPage > 1) {
		timeSlide = setInterval(function() {
			$("#carousel-nav .right").trigger("click");
		}, 8000);
	}else{
		$("#carousel-nav .left").hide();
		$("#carousel-nav .right").hide();
	}

	$("#carousel-nav .left").click(function() {
		$("#carousel-nav .right").show();
		if (page <= 0) {
			clearInterval(timeSlide);
			timeSlide = setInterval(function() {
				$("#carousel-nav .right").trigger("click");
			}, 8000);

			return;
		} else {
			if (page == 1) {
				$("#carousel-nav .left").hide();
			} else {
				$("#carousel-nav .left").show();
			}

			page--;
			//loadSlideImg(logo_url, page);
			showSlideImg(page);
			$('.slide-images-active').hide('slide', {
				direction : 'right'
			}, 10);
			$('.slide-images-active').show('slide', {
				direction : 'left'
			}, 10);
		}

	});

	$("#carousel-nav .right").click(function() {
		$("#carousel-nav .left").show();
		if (page == totalPage - 1) {
			clearInterval(timeSlide);
			timeSlide = setInterval(function() {
				$("#carousel-nav .left").trigger("click");
			}, 8000);

			return;
		} else {
			if (page == totalPage - 2) {
				$("#carousel-nav .right").hide();
			} else {
				$("#carousel-nav .right").show();
			}

			page++;
			showSlideImg(page);
			$('.slide-images-active').hide('slide', {
				direction : 'left'
			}, 10);
			$('.slide-images-active').show('slide', {
				direction : 'right'
			}, 10);
		}

	});

	$("#option-info").click(function() {
		$(this).addClass("active");
		$("#description-info").removeClass("active");
		$("#estimator-info").removeClass("active");
		if (!arrayUrl.CarsOptions) {
			htmlO = "There is no options added yet.";
		} else {
			var optionsList = arrayUrl.CarsOptions.split(',');

			var htmlO = "";
			htmlO += "<em>* Options listed are factory standard. One or more of these options may have been removed, altered or have expired since its first purchase. Please check with a sales rep for more information. *</em>";
			htmlO += "<ul>";

			$.each(optionsList, function(index, item) {
				htmlO += "<li>" + item + "</li>";
			});

			htmlO += "</ul>";
		}

		$("#dt-middle-content").html(htmlO);
	});

	$("#description-info").click(function() {
		$(this).addClass("active");
		$("#option-info").removeClass("active");
		$("#estimator-info").removeClass("active");
		var html_o = "";
		html_o += '<div class="tab-content">';
		html_o += '<div class="tab-pane active" id="description">';
		html_o += '<div class="well_des">';
		if (!arrayUrl.Description) {
			html_o += "There is no description yet.";
		} else {
			html_o += arrayUrl.Description;
		}
		html_o += '</div></div>';
		$("#dt-middle-content").html(html_o);
	});

	////////////////////////////////////////////
	$("#main-image").off("click");
	$("#main-image").click(function() {
		var id = "#" + $(this).parent().attr("value");
		$(id).trigger("click");
	});

	$(".slide-images").children("a").mouseenter(function() {
		var url = $(this).find("img").attr("src");
		var id = $(this).attr("id");
		$("#main-image").children("img").attr("src", url);
		$("#main-image").parent().attr("value", id);
	});
}

