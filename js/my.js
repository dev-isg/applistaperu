var gatewayURL ='http://listaperu.com/servicio_json';
//'http://192.168.1.50:8082/servicio_rest/agentes/format/json'; 
//'http://192.168.1.50:8080/plato/restaurante/restaurante?callback=true&id=2033';
//'http://192.168.1.50:8082/servicio_rest/agentes/format/json'; 
//'http://listaperu.my.phpcloud.com/listaperuservice/customer';
//url : gatewayURL+'/customers',
var customers = [ {
	'name' : 'Static Joe',
	'location' : 'San Francisco',
	'activity' : 'coding',
	'phone' : '123'
} ];

/**
 * Sends GET /customers to API gateway.
 * 
 * This method is automatically generated. Don't modify it. Application logic
 * for handling the AJAX response should be placed in
 * <code>onGetCustomers</code>.
 */
function getCustomers() {
	// This method is automatically generated. Don't modify it.
	jQuery.mobile.showPageLoadingMsg('Loading');
	$.ajax({
		url : gatewayURL+'/agentes',
		dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
		cache : false,
		type : 'GET',
		success : function(data, status, xhr) {
			jQuery.mobile.hidePageLoadingMsg();
			onGetCustomers(data);
		}
	});
}
/**
 * Handle response from GET /customers
 * 
 * @param response
 * @returns
 */
function onGetCustomers(response) {
	customers = response;

	var newCustomers = '';
	$.each(customers, function(index, item) {
		newCustomers += '<li data-theme="">' + '<a href="#page2?empId=' + index
				+ '" data-transition="none">' + item.va_nombre + '</a>' + '</li>';//item.name
	});
	$('#customers li[role!=heading]').remove();
	$('#customers').append(newCustomers).listview('refresh');
}
/*
 * Realiza busqueda de Agentes
 * 
 */
function getAgentesBusqueda(idbanco,iddistrito){
	jQuery.mobile.showPageLoadingMsg('Loading');
	$.ajax({
		url : gatewayURL+'/buscaragente'+'?id='+iddistrito + '&idbank=' + idbanco,
		dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
		cache : false,
		type : 'GET',
		success : function(data, status, xhr) {
			jQuery.mobile.hidePageLoadingMsg();
			onGetAgentes(data);
		}
	});
}

function onGetAgentes(response) {
	agentes = response;
	$('#errorMessageSearch p').remove();
	if (agentes.code == 1) {
		var newAgentes = '<li id="item-id" data-theme="">Lista de agentes</li>';
		$.each(agentes.result, function(index, item) {
			newAgentes += '<li id="item-id" data-theme="">' + '<h3>' + item.va_nombre
					+ '</h3>' + '<p>' + item.va_direccion + '</p>' + '</li>';
		});
		$('#agentesearch li[role!=heading]').remove();
		$('#agentesearch').append(newAgentes).listview('refresh');
	} else {
		$('#agentesearch li[role!=heading]').remove();
		$('#errorMessageSearch').append('<p>No se encontraron resultados</p>');
//		$('#agentesearch').append(
//				'<li data-theme=""><p>No se encontraron resultados</p></li>')
//				.listview('refresh');
	}
}
/**
 * Realiza busqueda de instituciones
 * 
 * @param response
 * @returns
 */
function getInstituBusqueda(idinst,iddistrito){
	jQuery.mobile.showPageLoadingMsg('Loading');
	$.ajax({
		url : gatewayURL+'/buscarinstitucion'+'?iddis='+iddistrito + '&idinst=' + idinst,
		dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
		cache : false,
		type : 'GET',
		success : function(data, status, xhr) {
			jQuery.mobile.hidePageLoadingMsg();
			onGetInstitu(data);
		}
	});
}

function onGetInstitu(response) {

	institu = response;
	$('#errorMessageSearchInst p').remove();
	if (institu.code == 1) {
		var newInstitu = '';
		$.each(institu.result, function(index, item) {
			newInstitu += '<li data-theme="">' + '<h3>' + item.va_nombre
					+ '</h3>' + '<p>' + item.va_direccion + '</p>' + '</li>';
		});
		$('#institusearch li[role!=heading]').remove();
		$('#institusearch').append(newInstitu).listview('refresh');
	} else {
		$('#institusearch li[role!=heading]').remove();
		$('#errorMessageSearchInst').append('<p>No se encontraron resultados</p>');
	}
}

/**
 * Carga de distritos en combo
 * 
 * @param response
 * @returns
 */
function getDistritos(){

	/*
	$.getJSON(distritoURL,function(data){ 
        $.each(data,function(index,item){
          var option = $(document.createElement('option'));
          option.text(item);
          option.val(index);
          $("#cbxdistritosearch").append(option);
        });
	});*/
	$.ajax({
		url:gatewayURL+'/distrito',
		dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
		cache: false,
		type:'GET',
		success:function(data, status, xhr){
		var datos =data;// $.parseJSON(data.d);
			$.each(datos,function(index,item){
                var option = $(document.createElement('option'));
                option.text(item.ch_distrito);
                option.val(item.in_id);
               $("#cbxdistritosearch").append(option);

                var optionIns = $(document.createElement('option'));
                optionIns.text(item.ch_distrito);
                optionIns.val(item.in_id);
               $("#cbxdistritosearchInst").append(optionIns);
			});
			
		}
	});
}

/**
 * Obtine ids de aganetes de index
 * 
 * @param response
 * @returns
 */
function getBusqueda(){
	var idbanco;
	$('.listasearch').click(function(){
		$('#agentesearch li[role!=heading]').remove();
		idbanco=$(this).attr('id');
		var namebanco=$(this).find('a').text();
		var sbtrbanco=namebanco.replace('Agentes','').trim();
		$('#agentename').html(sbtrbanco);
	});
	
	$('#idagentesearch').bind('click',function(event) {getAgentesBusqueda(idbanco,$("#cbxdistritosearch").val());});
}

function getBusquedaInst(){
	var idinst;
	$('.listasearch').click(function(){
		$('#institusearch li[role!=heading]').remove();
		idinst=$(this).attr('id');
		var nameinst=$(this).find('a').text();
		//var sbtrinst=namebanco.replace('Agentes','').trim();
		$('#instituname').html(nameinst);
	});

	$('#idinstitusearch').bind('click',function(event) {getInstituBusqueda(idinst,$("#cbxdistritosearchInst").val());});
}


function ajaxErrorHandler(xhr, ajaxOptions, thrownError) {
	jQuery.mobile.hidePageLoadingMsg();
	var _this = this;
	var msg = 'Ajax error. ';
	if (ajaxOptions.statusText != null && ajaxOptions.statusText != '')
		msg = msg + '<br/>' + ajaxOptions.statusText + '<br/>';
	msg = msg + 'Trying static data!';
	$(this).html(msg).show('slow', function() {
		onGetCustomers(customers);
		setTimeout(function() {
			$(_this).hide('slow');
		}, 1000);
	});
}

$(document).ready(function() {
	$('#getListBtn').bind('click', getCustomers);
	$('#errorMessage').ajaxError(ajaxErrorHandler);
	jQuery.support.cors = true;
//	$('#agentesearch li[role!=heading]').remove();
	getDistritos();
	getBusqueda();
	getBusquedaInst();
	
});

$(document).bind(
		'pagebeforechange',
		function(e, data) {
			if (typeof data.toPage === 'string') {
				var r = data.toPage.match(/page2\?empId=(.*)/);
				if (r) {
					var customer = customers[r[1]];
					if (customer) {
						$("#customername").html(customer.name);
						$("#customeractivity").html(
								'Is currently ' + (customer.activity || '') + ' in:');
						if (customer.phone) {
							$("#customercall").attr('href', 'tel:' + customer.phone)
									.show().trigger('enhance');
						} else {
							$("#customercall").hide();
						}
						var location = customer.location;
						$("#locationMap").attr(
								"src",
								"https://maps.googleapis.com/maps/api/staticmap?center="
										+ location
										+ "&zoom=14&size=288x200&markers="
										+ location + "&sensor=false");
					}
				}
			}
		});

// TabBar support

(function($) {
	$.widget('mobile.tabbar', $.mobile.navbar, {
		_create : function() {
			// Set the theme before we call the prototype, which will
			// ensure buttonMarkup() correctly grabs the inheritied theme.
			// We default to the "a" swatch if none is found
			var theme = this.element.jqmData('theme') || "a";
			this.element.addClass('ui-footer ui-footer-fixed ui-bar-' + theme);

			// Make sure the page has padding added to it to account for the
			// fixed
			// bar
			this.element.closest('[data-role="page"]').addClass(
					'ui-page-footer-fixed');

			// Call the NavBar _create prototype
			$.mobile.navbar.prototype._create.call(this);
		},

		// Set the active URL for the Tab Bar, and highlight that button on the
		// bar
		setActive : function(url) {
			// Sometimes the active state isn't properly cleared, so we reset it
			// ourselves
			this.element.find('a')
					.removeClass('ui-btn-active ui-state-persist');
			this.element.find('a[href="' + url + '"]').addClass(
					'ui-btn-active ui-state-persist');
		}
	});

	$(document).bind('pagecreate create', function(e) {
		return $(e.target).find(":jqmData(role='tabbar')").tabbar();
	});

	$(":jqmData(role='page')").live('pageshow', function(e) {
		// Grab the id of the page that's showing, and select it on the Tab Bar
		// on
		// the page
		var tabBar, id = $(e.target).attr('id');

		tabBar = $.mobile.activePage.find(':jqmData(role="tabbar")');
		if (tabBar.length) {
			tabBar.tabbar('setActive', '#' + id);
		}
	});

	var attachEvents = function() {
		var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

		$(document)
				.bind(
						{
							"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart" : function(
									event) {
								var theme, $btn = $(closestEnabledButton(event.target)), evt = event.type;

								if ($btn.length) {
									theme = $btn.attr("data-" + $.mobile.ns
											+ "theme");

									if (evt === "vmousedown") {
										if ($.support.touch) {
											hov = setTimeout(
													function() {
														$btn
																.removeClass(
																		"ui-btn-up-"
																				+ theme)
																.addClass(
																		"ui-btn-down-"
																				+ theme);
													}, hoverDelay);
										} else {
											$btn.removeClass(
													"ui-btn-up-" + theme)
													.addClass(
															"ui-btn-down-"
																	+ theme);
										}
									} else if (evt === "vmousecancel"
											|| evt === "vmouseup") {
										$btn
												.removeClass(
														"ui-btn-down-" + theme)
												.addClass("ui-btn-up-" + theme);
									} else if (evt === "vmouseover"
											|| evt === "focus") {
										if ($.support.touch) {
											foc = setTimeout(
													function() {
														$btn
																.removeClass(
																		"ui-btn-up-"
																				+ theme)
																.addClass(
																		"ui-btn-hover-"
																				+ theme);
													}, hoverDelay);
										} else {
											$btn.removeClass(
													"ui-btn-up-" + theme)
													.addClass(
															"ui-btn-hover-"
																	+ theme);
										}
									} else if (evt === "vmouseout"
											|| evt === "blur"
											|| evt === "scrollstart") {
										$btn.removeClass(
												"ui-btn-hover-" + theme
														+ " ui-btn-down-"
														+ theme).addClass(
												"ui-btn-up-" + theme);
										if (hov) {
											clearTimeout(hov);
										}
										if (foc) {
											clearTimeout(foc);
										}
									}
								}
							},
							"focusin focus" : function(event) {
								$(closestEnabledButton(event.target)).addClass(
										$.mobile.focusClass);
							},
							"focusout blur" : function(event) {
								$(closestEnabledButton(event.target))
										.removeClass($.mobile.focusClass);
							}
						});

		attachEvents = null;
	};

	$.fn.buttonMarkup = function(options) {
		var $workingSet = this;

		// Enforce options to be of type string
		options = (options && ($.type(options) == "object")) ? options : {};
		for ( var i = 0; i < $workingSet.length; i++) {
			var el = $workingSet.eq(i), e = el[0], o = $
					.extend(
							{},
							$.fn.buttonMarkup.defaults,
							{
								icon : options.icon !== undefined ? options.icon
										: el.jqmData("icon"),
								iconpos : options.iconpos !== undefined ? options.iconpos
										: el.jqmData("iconpos"),
								theme : options.theme !== undefined ? options.theme
										: el.jqmData("theme")
												|| $.mobile.getInheritedTheme(
														el, "c"),
								inline : options.inline !== undefined ? options.inline
										: el.jqmData("inline"),
								shadow : options.shadow !== undefined ? options.shadow
										: el.jqmData("shadow"),
								corners : options.corners !== undefined ? options.corners
										: el.jqmData("corners"),
								iconshadow : options.iconshadow !== undefined ? options.iconshadow
										: el.jqmData("iconshadow"),
								iconsize : options.iconsize !== undefined ? options.iconsize
										: el.jqmData("iconsize"),
								mini : options.mini !== undefined ? options.mini
										: el.jqmData("mini")
							}, options),

			// Classes Defined
			innerClass = "ui-btn-inner", textClass = "ui-btn-text", buttonClass, iconClass,
			// Button inner markup
			buttonInner, buttonText, buttonIcon, buttonElements;

			$.each(o, function(key, value) {
				e.setAttribute("data-" + $.mobile.ns + key, value);
				el.jqmData(key, value);
			});

			// Check if this element is already enhanced
			buttonElements = $
					.data(
							((e.tagName === "INPUT" || e.tagName === "BUTTON") ? e.parentNode
									: e), "buttonElements");

			if (buttonElements) {
				e = buttonElements.outer;
				el = $(e);
				buttonInner = buttonElements.inner;
				buttonText = buttonElements.text;
				// We will recreate this icon below
				$(buttonElements.icon).remove();
				buttonElements.icon = null;
			} else {
				buttonInner = document.createElement(o.wrapperEls);
				buttonText = document.createElement(o.wrapperEls);
			}
			buttonIcon = o.icon ? document.createElement("span") : null;

			if (attachEvents && !buttonElements) {
				attachEvents();
			}

			// if not, try to find closest theme container
			if (!o.theme) {
				o.theme = $.mobile.getInheritedTheme(el, "c");
			}

			buttonClass = "ui-btn ui-btn-up-" + o.theme;
			buttonClass += o.inline ? " ui-btn-inline" : "";
			buttonClass += o.shadow ? " ui-shadow" : "";
			buttonClass += o.corners ? " ui-btn-corner-all" : "";

			if (o.mini !== undefined) {
				// Used to control styling in headers/footers, where buttons
				// default
				// to `mini` style.
				buttonClass += o.mini ? " ui-mini" : " ui-fullsize";
			}

			if (o.inline !== undefined) {
				// Used to control styling in headers/footers, where buttons
				// default
				// to `mini` style.
				buttonClass += o.inline === false ? " ui-btn-block"
						: " ui-btn-inline";
			}

			if (o.icon) {
				o.icon = "ui-icon-" + o.icon;
				o.iconpos = o.iconpos || "left";

				iconClass = "ui-icon " + o.icon;

				if (o.iconshadow) {
					iconClass += " ui-icon-shadow";
				}

				if (o.iconsize) {
					iconClass += " ui-iconsize-" + o.iconsize;
				}
			}

			if (o.iconpos) {
				buttonClass += " ui-btn-icon-" + o.iconpos;

				if (o.iconpos == "notext" && !el.attr("title")) {
					el.attr("title", el.getEncodedText());
				}
			}

			innerClass += o.corners ? " ui-btn-corner-all" : "";

			if (o.iconpos && o.iconpos === "notext" && !el.attr("title")) {
				el.attr("title", el.getEncodedText());
			}

			if (buttonElements) {
				el.removeClass(buttonElements.bcls || "");
			}
			el.removeClass("ui-link").addClass(buttonClass);

			buttonInner.className = innerClass;

			buttonText.className = textClass;
			if (!buttonElements) {
				buttonInner.appendChild(buttonText);
			}
			if (buttonIcon) {
				buttonIcon.className = iconClass;
				if (!(buttonElements && buttonElements.icon)) {
					buttonIcon.appendChild(document.createTextNode("\u00a0"));
					buttonInner.appendChild(buttonIcon);
				}
			}

			while (e.firstChild && !buttonElements) {
				buttonText.appendChild(e.firstChild);
			}

			if (!buttonElements) {
				e.appendChild(buttonInner);
			}

			// Assign a structure containing the elements of this button to the
			// elements of this button. This
			// will allow us to recognize this as an already-enhanced button in
			// future calls to buttonMarkup().
			buttonElements = {
				bcls : buttonClass,
				outer : e,
				inner : buttonInner,
				text : buttonText,
				icon : buttonIcon
			};

			$.data(e, 'buttonElements', buttonElements);
			$.data(buttonInner, 'buttonElements', buttonElements);
			$.data(buttonText, 'buttonElements', buttonElements);
			if (buttonIcon) {
				$.data(buttonIcon, 'buttonElements', buttonElements);
			}
		}

		return this;
	};

	$.fn.buttonMarkup.defaults = {
		corners : true,
		shadow : true,
		iconshadow : true,
		iconsize : 18,
		wrapperEls : "span"
	};

	function closestEnabledButton(element) {
		var cname;

		while (element) {
			// Note that we check for typeof className below because the element
			// we
			// handed could be in an SVG DOM where className on SVG elements is
			// defined to
			// be of a different type (SVGAnimatedString). We only operate on
			// HTML
			// DOM
			// elements, so we look for plain "string".
			cname = (typeof element.className === 'string')
					&& (element.className + ' ');
			if (cname && cname.indexOf("ui-btn ") > -1
					&& cname.indexOf("ui-disabled ") < 0) {
				break;
			}

			element = element.parentNode;
		}

		return element;
	}

})(jQuery);