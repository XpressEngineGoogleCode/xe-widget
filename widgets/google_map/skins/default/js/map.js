/**
* Google Map API V3 + Google Earth API
* xe master 
* ryin005@nhn.com
**/

document.write('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true" charset="UTF-8" ></script>');
document.write('<script type="text/javascript" src="js/jquery-ui-1.8.1.custom.min.js" charset="UTF-8" ></script>');

jQuery(function($){
	var geocoder;
	var map = new Array();
	var myPano;

	//*****initialze variable default value
	var googleMapId = 0;
	var index=0;
	var address = "Beijing";
	var mapType = 'ROADMAP';
	var map_width = 300;
	var map_height = 300;
	//Map controls
	var mapType_Control = true;
	var mapTypeControl_Style = 'HORIZONTAL_BAR';
	var navigation_Control = true;
	var NavigationControlStyle = 'DEFAULT';
	var scale_Control = false;
	var overview_Control = false;
	//other features
	var icon_Display = true;
	var icon_movable = true;
	var zoom_size = 'auto';
	var streetView = 'false';
	var inforwindow_display = 'false';
	var inforwindow_content = 'address_info';
	var informationWindow = '';
	var cicleOverlay = 'false';
	var earth_Control = 'false';
	var route_display = 'false';
	//google earth
	var ge = null;
	var earth_map = null;
	var earth_marker = null;
	var earth_area = null;
	var earth_display = 'simple_level';
	var earth_nav_control = 'auto';
	var ballnoon_display = 'directly_display';
	var ballnoon_content = 'address_info';
	var custom_ballnoon = '';
	var ballnoon_video = '';

	$.fn.initialize = function(opt){
		googleMapId = opt.id;
		index = opt.index;
		loadMap();
	};

	//load the google map 
	function loadMap(){
		address = $(googleMapId).find('#address').attr('value');
		mapType = $(googleMapId).find('#map_type').attr('value');
		zoomSize = $(googleMapId).find('#zoom_size').attr('value');
		streetView = $(googleMapId).find('#street_view').attr('value');
		iconDisplay = $(googleMapId).find('#icon_display').attr('value');
		informationWindow = $(googleMapId).find('#information_window').attr('value');
		cicleOverlay = $(googleMapId).find('#circle_overlay').attr('value');
		mapTypeControl = $(googleMapId).find('#map_type_control').attr('value');
		NavigationControl = $(googleMapId).find('#navigation_control').attr('value');
		ScaleControl = $(googleMapId).find('#scale_control').attr('value');
		OverviewControl = $(googleMapId).find('#overview_control').attr('value');
		earth_Control = $(googleMapId).find('#earth_control').attr('value');
		route_display = $(googleMapId).find('#route_display').attr('value');
		inforwindow_display = $(googleMapId).find('#inforwindow_display').attr('value');
		inforwindow_content = $(googleMapId).find('#inforwindow_content').attr('value');
		
		$(googleMapId).find('#back_to_map').attr("style","display:none");
	
		//Map type ID
		switch(mapType){
			case "ROADMAP": 
				mapType_id = google.maps.MapTypeId.ROADMAP;
				break;
			case "TERRAIN": 
				mapType_id = google.maps.MapTypeId.TERRAIN;
				break;
			case "HYBRID": 
				mapType_id = google.maps.MapTypeId.HYBRID;
				break;
			case "SATELLITE": 
				mapType_id = google.maps.MapTypeId.SATELLITE;
				break;
			default:
				mapType_id = google.maps.MapTypeId.ROADMAP;
		}
		//Zoom size
		switch(zoomSize){
			case "auto": 
				zoom_size = 'auto';
				break;
			case "largest": 
				zoom_size = 19;
				break;
			case "larger": 
				zoom_size = 15;
				break;
			case "normal": 
				zoom_size = 9;
				break;
			case "smaller": 
				zoom_size = 6;
				break;
			case "smallest": 
				zoom_size = 3;
				break;
			default:
				zoom_size = 'auto';
		}	
		//Map type control
		switch(mapTypeControl){
			case "false": 
				mapType_Control = false;
				mapTypeControl_Style = null;
				break;
			case "HORIZONTAL_BAR": 
				mapType_Control = true;
				mapTypeControl_Style = google.maps.MapTypeControlStyle.HORIZONTAL_BAR;
				break;
			case "DROPDOWN_MENU": 
				mapType_Control = true;
				mapTypeControl_Style = google.maps.MapTypeControlStyle.DROPDOWN_MENU;
				break;
			default:
				mapType_Control = true;
				mapTypeControl_Style = google.maps.MapTypeControlStyle.HORIZONTAL_BAR;
		}
		//Navigation control
		switch(NavigationControl){
			case "false": 
				navigation_Control = false;
				navigationControl_Style = null;
				break;
			case "DEFAULT": 
				navigation_Control = true;
				navigationControl_Style = google.maps.NavigationControlStyle.DEFAULT;
				break;
			case "ANDROID": 
				navigation_Control = true;
				navigationControl_Style = google.maps.NavigationControlStyle.ANDROID;
				break;
			case "SMALL": 
				navigation_Control = true;
				navigationControl_Style = google.maps.NavigationControlStyle.SMALL;
				break;
			case "ZOOM_PAN": 
				navigation_Control = true;
				navigationControl_Style = google.maps.NavigationControlStyle.ZOOM_PAN;
				break;
			default:
				navigation_Control = true;
				navigationControl_Style = google.maps.NavigationControlStyle.DEFAULT;
		}
		//Scale control
		switch(ScaleControl){
			case "true": 
				scale_Control = true;
				break;
			case "false": 
				scale_Control = false;
				break;
			default:
				scale_Control = true;
		}
		//Overview control
		switch(OverviewControl){
			case "true": 
				overview_Control = true;
				break;
			case "false": 
				overview_Control = false;
				break;
			default:
				overview_Control = true;
		}
		//Street view control
		switch(streetView){
			case "true": 
				streetViewControl = true;
				break;
			case "false": 
				streetViewControl = false;
				break;
			default:
				streetViewControl = true;
		}
		//Icon Display
		switch(iconDisplay){
			case "false": 
				icon_Display = false;
				icon_movable = false;
				break;
			case "movable_icon": 
				icon_Display = true;
				icon_movable = true;
				break;
			case "unmovable_icon": 
				icon_Display = true;
				icon_movable = false;
				break;
			default:
				icon_Display = true;
				icon_movable = true;
		}

		var option = new Map_Options(mapType_id,zoom_size,streetViewControl,icon_Display,icon_movable,inforwindow_display,inforwindow_content,informationWindow,cicleOverlay,mapType_Control,mapTypeControl_Style,navigation_Control,navigationControl_Style,scale_Control,overview_Control,earth_Control,route_display);
		generateMap(googleMapId,address,option,index);
	}


	function generateMap(googleMapId,address,option,index){
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				latlng = results[0].geometry.location;
				myOptions = {
					zoom: 14,
					center: latlng,
					mapTypeId: option.mapType_id,
					//disableDefaultUI: option.disable_Control,
					mapTypeControl: option.mapType_Control,
					mapTypeControlOptions: {
						style: option.mapTypeControl_Style
					},
					navigationControl: option.navigation_Control,
					navigationControlOptions: {
						style: option.navigationControl_Style,
						position: google.maps.ControlPosition.TOP_LEFT
					},
					scaleControl: option.scale_Control,
					overviewMapControl: option.overview_Control,
					overviewMapControlOptions: {
						opened: true
					},
					streetViewControl: option.streetViewControl
				}
				var mapArea = $(googleMapId).find('#map_canvas');
				map[index] = new google.maps.Map($(mapArea)[0], myOptions);

				//set map zoom
				if(option.zoom_size=='auto') autoSetZoom(map[index],address);
				else map[index].setZoom(option.zoom_size);
				
				map[index].setCenter(results[0].geometry.location);

				//show marker
				var marker = new google.maps.Marker({
					position: results[0].geometry.location, 
					title: results[0].formatted_address,
					draggable: option.icon_movable
				});
				marker.setMap(map[index]);
				if(!option.icon_Display) marker.setVisible(false);

				//show cicle overlay
				if(option.cicleOverlay == 'true'){
					var radius = 300000/map[index].getZoom();
					var circle = new google.maps.Circle({
						radius: radius
					});
					circle.setMap(map[index]);
					circle.bindTo('center', marker, 'position'); 
				}

				//show information window
				if(option.inforwindow_display != "false"){
					var windowContent = "";
					if(option.inforwindow_content == "address_info"){
						windowContent = results[0].formatted_address;
					}else if (option.inforwindow_content == "custom_info"){
						windowContent = option.informationWindow;
					}
					map_width = $(googleMapId).find('#map_width').attr('value');
					map_height = $(googleMapId).find('#map_height').attr('value');
				
					infowindow = new google.maps.InfoWindow({
						content: windowContent
					});

					if(option.inforwindow_display == "directly_display"){
						infowindow.open(map[index],marker);
					}else if(option.inforwindow_display == "marker_display"){
						google.maps.event.addListener(marker, 'click', function() {
							infowindow.close();
							infowindow = new google.maps.InfoWindow({
								content: windowContent
							});
							infowindow.open(map[index],marker);
						});
					}else if(option.inforwindow_display == "map_display"){
						google.maps.event.addListener(map[index], 'click', function(event) {
							infowindow.close();
							infowindow = new google.maps.InfoWindow({
								content: windowContent
							});
							var marker1 = new google.maps.Marker({
								position: event.latLng
							});
							if(option.inforwindow_content == "address_info") codeLatLng(infowindow,event.latLng);
							infowindow.open(map[index],marker1);
						});
					}
				}

				//serach hint
				searchHint(map,marker,googleMapId);

				//google earth
				if(option.earth_Control == 'true'){
					var earthControlDiv = document.createElement('DIV');
					var earthControl = new EarthControl(earthControlDiv, map[index],mapArea,marker,googleMapId);
					earthControlDiv.index = 1;
					map[index].controls[google.maps.ControlPosition.TOP_RIGHT].push(earthControlDiv);
				}

				//direction
				if(option.route_display == 'true'){
					RouteHint(map,marker,googleMapId);
					var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(map[index]);
					var routeDiv=$(googleMapId).find('#route_info')[0];
					directionsDisplay.setPanel(routeDiv);
					
					$(googleMapId).find('#search_route').click(function(){

						var start = $(googleMapId).find("#from").attr("value");
						var end = $(googleMapId).find("#to").attr("value");
						var request = {
							origin:start, 
							destination:end,
							travelMode: google.maps.DirectionsTravelMode.DRIVING
						};
						directionsService.route(request, function(result, status) {
							if (status == google.maps.DirectionsStatus.OK) {
								directionsDisplay.setDirections(result);
								$(googleMapId).find('#route_info').css('width','70%');
								$(googleMapId).find('#route_info').css('display','block');
								$(googleMapId).find('#close_route').css('display','inline');
							}
						});		
					});

					$(googleMapId).find('#close_route').click(function(){
						$(googleMapId).find('#route_info').css('display','none');
						$(googleMapId).find('#close_route').css('display','none');
					});
				}
			
				google.maps.event.addListener(marker, 'dblclick', function() {
					 markerZoomIn(map[index],marker);
				});
				google.maps.event.addListener(marker, 'rightclick', function() {
					 markerZoomOut(map[index],marker);
				});
				google.maps.event.addListener(marker, 'dragend', function() {
					 markerGrag(map[index],marker);
				});

			}else {
				alert("Google map was not successful for the following reason: " + status + ". Back to default map Beijing");
				address = "Beijing";
				geocoder.geocode( { 'address': address}, function(results, status) {
					latlng = results[0].geometry.location;
					myOptions = {
						zoom: 14,
						center: latlng,
						mapTypeId: option.mapType_id,
						//disableDefaultUI: option.disable_Control,
						mapTypeControl: option.mapType_Control,
						mapTypeControlOptions: {
							style: option.mapTypeControl_Style
						},
						navigationControl: option.navigation_Control,
						navigationControlOptions: {
							style: option.navigationControl_Style,
							position: google.maps.ControlPosition.TOP_LEFT
						},
						scaleControl: option.scale_Control,
						overviewMapControl: option.overview_Control,
						overviewMapControlOptions: {
							opened: true
						},
						streetViewControl: option.streetViewControl
					}
					var mapArea = $(googleMapId).find('#map_canvas');
					map[index] = new google.maps.Map($(mapArea)[0], myOptions);

					//set map zoom
					if(option.zoom_size=='auto') autoSetZoom(map[index],address);
					else map[index].setZoom(option.zoom_size);
					
					map[index].setCenter(results[0].geometry.location);

					//show marker
					var marker = new google.maps.Marker({
						position: results[0].geometry.location, 
						title: results[0].formatted_address,
						draggable: option.icon_movable
					});
					marker.setMap(map[index]);
					if(!option.icon_Display) marker.setVisible(false);

					//show cicle overlay
					if(option.cicleOverlay == 'true'){
						var radius = 300000/map[index].getZoom();
						var circle = new google.maps.Circle({
							radius: radius
						});
						circle.setMap(map[index]);
						circle.bindTo('center', marker, 'position'); 
					}

					//show information window
					if(option.inforwindow_display != "false"){
						var windowContent = "";
						if(option.inforwindow_content == "address_info"){
							windowContent = results[0].formatted_address;
						}else if (option.inforwindow_content == "custom_info"){
							windowContent = option.informationWindow;
						}
						map_width = $(googleMapId).find('#map_width').attr('value');
						map_height = $(googleMapId).find('#map_height').attr('value');
					
						infowindow = new google.maps.InfoWindow({
							content: windowContent
						});

						if(option.inforwindow_display == "directly_display"){
							infowindow.open(map[index],marker);
						}else if(option.inforwindow_display == "marker_display"){
							google.maps.event.addListener(marker, 'click', function() {
								infowindow.close();
								infowindow = new google.maps.InfoWindow({
									content: windowContent
								});
								infowindow.open(map[index],marker);
							});
						}else if(option.inforwindow_display == "map_display"){
							google.maps.event.addListener(map[index], 'click', function(event) {
								infowindow.close();
								infowindow = new google.maps.InfoWindow({
									content: windowContent
								});
								var marker1 = new google.maps.Marker({
									position: event.latLng
								});
								if(option.inforwindow_content == "address_info") codeLatLng(infowindow,event.latLng);
								infowindow.open(map[index],marker1);
							});
						}
					}

					//serach hint
					searchHint(map,marker,googleMapId);

					//google earth
					if(option.earth_Control == 'true'){
						var earthControlDiv = document.createElement('DIV');
						var earthControl = new EarthControl(earthControlDiv, map[index],mapArea,marker,googleMapId);
						earthControlDiv.index = 1;
						map[index].controls[google.maps.ControlPosition.TOP_RIGHT].push(earthControlDiv);
					}

					//direction
					if(option.route_display == 'true'){
						RouteHint(map,marker,googleMapId);
						var directionsService = new google.maps.DirectionsService();
						var directionsDisplay = new google.maps.DirectionsRenderer();
						directionsDisplay.setMap(map[index]);
						var routeDiv=$(googleMapId).find('#route_info')[0];
						directionsDisplay.setPanel(routeDiv);
						
						$(googleMapId).find('#search_route').click(function(){
							var start = $(googleMapId).find("#from").attr("value");
							var end = $(googleMapId).find("#to").attr("value");
							var request = {
								origin:start, 
								destination:end,
								travelMode: google.maps.DirectionsTravelMode.DRIVING
							};
							directionsService.route(request, function(result, status) {
								if (status == google.maps.DirectionsStatus.OK) {
									directionsDisplay.setDirections(result);
									$(googleMapId).find('#route_info').css('width','70%');
									$(googleMapId).find('#route_info').css('display','block');
									$(googleMapId).find('#close_route').css('display','inline');
								}
							});
							
						});

						$(googleMapId).find('#close_route').click(function(){
							$(googleMapId).find('#route_info').css('display','none');
							$(googleMapId).find('#close_route').css('display','none');
						});
					}

					google.maps.event.addListener(marker, 'dblclick', function() {
						 markerZoomIn(map[index],marker);
					});
					google.maps.event.addListener(marker, 'rightclick', function() {
						 markerZoomOut(map[index],marker);
					});
					google.maps.event.addListener(marker, 'dragend', function() {
						 markerGrag(map[index],marker);
					});
				});
			}
		});

	}

    //automatically set map zoom size
	function autoSetZoom(map,address) {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address}, function (results, status) { 
			if (status == google.maps.GeocoderStatus.OK) {
				if(results[0].geometry.viewport){
					map.fitBounds(results[0].geometry.viewport);
				}
			}
		});
	}

    //reverse analyze location
	function codeLatLng(infowindow,latlng) {
		geocoder1 = new google.maps.Geocoder();
		if (geocoder1) {
		  geocoder1.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					infowindow.setContent(results[1].formatted_address);
				}
			} else {
				alert("Geocoder failed due to: " + status);
			}
		  });
		}
	}

    //place marker
	function placeMarker(location) {
		var clickedLocation = new google.maps.LatLng(location);
		var marker = new google.maps.Marker({
			position: location, 
			map: map
		});
		map.setCenter(location);
	}

	//zoom in
	function markerZoomIn(map,marker) {
		var large_index = 2;
		var markerLocation = marker.getPosition();
		var currentZoom = map.getZoom();
		map.setZoom(currentZoom+large_index);
		map.setCenter(markerLocation);
	}

	//zoom out
	function markerZoomOut(map,marker) {
		var small_index = 2;
		var markerLocation = marker.getPosition();
		var currentZoom = map.getZoom();
		map.setZoom(currentZoom-small_index);
		map.setCenter(markerLocation);
	}
    
	//gragable marker
	function markerGrag(map,marker) {
		geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					marker.setTitle(results[0].formatted_address)
				}
			}
		});
	}

    //search box hint
	function searchHint(map,marker,googleMapId){
		$(googleMapId).find("#address").autocomplete({
		  //This bit uses the geocoder to fetch address values
		  source: function(request, response) {
			geocoder.geocode( {'address': request.term }, function(results, status) {
			  response($.map(results, function(item) {
				return {
				  label:  item.formatted_address,
				  value: item.formatted_address,
				  latitude: item.geometry.location.lat(),
				  longitude: item.geometry.location.lng()
				}
			  }));
			})
		  },select: function(event, ui) {
				/*var locations = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
				marker.setPosition(locations);
				map.setCenter(locations);*/
		  }
		});
	}

	//route box hint
	function RouteHint(map,marker,googleMapId){
		$(googleMapId).find("#from,#to").autocomplete({
		  //This bit uses the geocoder to fetch address values
		  source: function(request, response) {
			geocoder.geocode( {'address': request.term }, function(results, status) {
			  response($.map(results, function(item) {
				return {
				  label:  item.formatted_address,
				  value: item.formatted_address,
				  latitude: item.geometry.location.lat(),
				  longitude: item.geometry.location.lng()
				}
			  }));
			})
		  },select: function(event, ui) {
		  }
		});
	}

	//Google Earth Div
	function EarthControl(controlDiv, map, mapArea,marker,googleMapId) {
		// Set CSS styles for the DIV containing the control, Setting padding to 5 px will offset the control from the edge of the map
		controlDiv.style.padding = '5px';

		// Set CSS for the control border
		var controlUI = document.createElement('DIV');
		controlUI.style.backgroundColor = 'white';
		controlUI.style.borderStyle = 'solid';
		controlUI.style.borderWidth = '2px';
		controlUI.style.cursor = 'pointer';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'Click to set the map to Home';
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior
		var controlText = document.createElement('DIV');
		controlText.style.fontFamily = 'Arial,sans-serif';
		controlText.style.fontSize = '12px';
		controlText.style.paddingLeft = '4px';
		controlText.style.paddingRight = '4px';
		controlText.innerHTML = 'Earth';
		controlUI.appendChild(controlText);

		google.maps.event.addDomListener(controlUI, 'click', function() {
			earth_display = $(googleMapId).find('#earth_display').attr('value');
			earth_nav_control = $(googleMapId).find('#earth_nav_control').attr('value');
			ballnoon_display = $(googleMapId).find('#ballnoon_display').attr('value');
			ballnoon_content = $(googleMapId).find('#ballnoon_content').attr('value');
			custom_ballnoon  = $(googleMapId).find('#custom_ballnoon').attr('value');
			ballnoon_video = $(googleMapId).find('#ballnoon_video').attr('value');
			map_width = $(googleMapId).find('#map_width').attr('value');
			map_height = $(googleMapId).find('#map_height').attr('value');
			
			generateEarth(map,mapArea,marker);
			$(googleMapId).find('#back_to_map').attr("style","display:inline");
		});
	}

	function generateEarth(map,mapArea,marker){
		earth_map = map;
		earth_marker = marker;
		earth_area = $(mapArea)[0];
		google.earth.createInstance(earth_area, earth_initCB, earth_failureCB);
		google.setOnLoadCallback(earth_init);
	}

	function earth_init() {
         google.earth.createInstance(earth_area, earth_initCB, earth_failureCB);
    }

    function earth_initCB(instance) {
        ge = instance;
        ge.getWindow().setVisibility(true);

		//earth display level
		if (earth_nav_control == 'auto') ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
		else if (earth_nav_control == 'display') ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
		else if (earth_nav_control == 'not_display') ge.getNavigationControl().setVisibility(ge.VISIBILITY_HIDE);
		
		//add some layers
		if(earth_display == 'complex_level'){
			ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
			ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
			ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
			ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS_LOW_RESOLUTION, true);
			ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);
		}
		
		// Create the placemark.
		var placemark = ge.createPlacemark('');
		placemark.setName(earth_marker.getTitle());

		// Define a custom icon.
		var icon = ge.createIcon('');
		icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
		var style = ge.createStyle('');
		style.getIconStyle().setIcon(icon);
		style.getIconStyle().setScale(3.0);
		placemark.setStyleSelector(style);

		//Set the placemark's location.  
		var point = ge.createPoint('');
		point.setLatitude(earth_marker.getPosition().lat());
		point.setLongitude(earth_marker.getPosition().lng());
		placemark.setGeometry(point);

		//add the placemark to Earth.
		ge.getFeatures().appendChild(placemark);

		//show ballnoon window
		if(ballnoon_display != "false"){
			var ballnoonContent = "";
			if(ballnoon_content == "address_info"){
				ballnoonContent = earth_marker.getTitle();
			}else if (ballnoon_content == "custom_info"){
				ballnoonContent = custom_ballnoon;
			}else if (ballnoon_content == "video_info"){
				ballnoonContent = '&nbsp;<object width="'+map_width*0.6+'" height="'+map_height*0.6+'"><param name="movie" value="'+ ballnoon_video + '" />'
				+ '<param name="allowFullScreen" value="true"/> <embed src="' + ballnoon_video + '" type="application/x-shockwave-flash" allowfullscreen="true"'
				+ ' autostart="true" loop="true" width="'+map_width*0.6+'" height="'+map_height*0.6+'"></embed></object>';

			}
		
			var balloon = ge.createHtmlStringBalloon('');
			balloon.setMaxWidth(map_width*0.8);

			if(ballnoon_display == "directly_display"){
				ge.setBalloon(null);
				balloon.setFeature(placemark);
				balloon.setContentString(ballnoonContent);
				ge.setBalloon(balloon);
				google.earth.addEventListener(placemark, 'click', function(event) {
					event.preventDefault();
				});
			}else if(ballnoon_display == "marker_display"){
				google.earth.addEventListener(placemark, 'click', function(event) {
					// prevent the default balloon from popping up
					event.preventDefault();

					ge.setBalloon(null);
					balloon = ge.createHtmlStringBalloon('');
					balloon.setMaxWidth(map_width*0.8);
					balloon.setFeature(placemark);
					balloon.setContentString(ballnoonContent);
					ge.setBalloon(balloon);
				});
			}			
		}else if(ballnoon_display == "false"){
			google.earth.addEventListener(placemark, 'click', function(event) {
					event.preventDefault();
			});
		}

		// Move the camera.
		var camera = ge.getView().copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);
		camera.setLatitude(point.getLatitude() - 0);
		camera.setLongitude(point.getLongitude() - 0);
		camera.setTilt(camera.getTilt());
		camera.setRoll(camera.getRoll());
		camera.setHeading(0);
		camera.setAltitude(10000000*0.75);

		//var camera = ge.createCamera('');
		//camera.set(point.getLatitude(), point.getLongitude(), 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 8.541, 66.213, 20000);
		ge.getView().setAbstractView(camera); 
    }

    function earth_failureCB(errorCode) {
		window.onerror = ResumeError;
	}

	function ResumeError() {
		return true;
	}

	//search for an address
	function codeAddress() {
		var address = $('#address').attr('value');
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map, 
					position: results[0].geometry.location,
					title: results[0].formatted_address
				});
				
				if(autoZoom=='yes') autoSetZoom(map);
				google.maps.event.addListener(marker, 'click', function() {
					 markerZoomIn(map,marker);
				});
			} else {
				alert("Google map was not successful for the following reason: " + status);
			}
		});
	}

});

//Map Options
function Map_Options(mapType_id,zoom_size,streetViewControl,icon_Display,icon_movable,inforwindow_display,inforwindow_content,informationWindow,cicleOverlay,mapType_Control,mapTypeControl_Style,navigation_Control,navigationControl_Style,scale_Control,overview_Control,earth_Control,route_display){  
	var option = new Object;    
	option.mapType_id = mapType_id;
	option.zoom_size = zoom_size;
	option.streetViewControl = streetViewControl;
	option.icon_Display = icon_Display;
	option.icon_movable = icon_movable;
	option.inforwindow_display = inforwindow_display;
	option.inforwindow_content = inforwindow_content;
	option.informationWindow = informationWindow;
	option.cicleOverlay = cicleOverlay;
	option.mapType_Control = mapType_Control;
	option.mapTypeControl_Style = mapTypeControl_Style;
	option.navigation_Control = navigation_Control;
	option.navigationControl_Style = navigationControl_Style;
	option.scale_Control = scale_Control;
	option.overview_Control = overview_Control;
	option.earth_Control = earth_Control;
	option.route_display = route_display;
	return option;
}


