/**
* Baidu Map API
* xe developer
* ryin005@nhn.com
**/
document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3" charset="UTF-8" ></script>');


jQuery(function($){

	var map = new Array();

	//*****initialze variable default value
	var googleMapId = 0;
	var index=0;
	var address = "北京";
	var mapType = 'BMAP_NORMAL_MAP';
	var map_width = 300;
	var map_height = 300;
	//other features
	var zoom_size = 12;
	var mapTypeControl_Style = null;
	var navigationControl_Style = null;
	var overview_Control = false;
	var scale_Control = false;
	var icon_Display = false;
	var route_display = false;

	$.fn.binitialize = function(opt){
		baiduMapId = opt.id;
		index = opt.index;
		loadMap();
	};

    //load the baidu map 
	function loadMap(){
		address = $(baiduMapId).find('#address').attr('value');
		if(!address) address = $(baiduMapId).find('#old_address').attr('value');
		mapType = $(baiduMapId).find('#map_type').attr('value');
		zoomSize = $(baiduMapId).find('#zoom_size').attr('value');
		mapTypeControl = $(baiduMapId).find('#map_type_control').attr('value');
		NavigationControl = $(baiduMapId).find('#navigation_control').attr('value');
		OverviewControl = $(baiduMapId).find('#overview_control').attr('value');
		ScaleControl = $(baiduMapId).find('#scale_control').attr('value');
		iconDisplay = $(baiduMapId).find('#icon_display').attr('value');
		route_display = $(baiduMapId).find('#route_display').attr('value');
		inforwindow_display = $(baiduMapId).find('#inforwindow_display').attr('value');
		inforwindow_content = $(baiduMapId).find('#inforwindow_content').attr('value');
		informationWindow = $(baiduMapId).find('#information_window').attr('value');
		local_search = $(baiduMapId).find('#local_search').attr('value');
		
		//Map type ID
		switch(mapType){
			case "ROADMAP": 
				mapType_id = BMAP_NORMAL_MAP;
				break;
			case "HYBRID": 
				mapType_id = BMAP_HYBRID_MAP;
				break;
			case "SATELLITE": 
				mapType_id = BMAP_SATELLITE_MAP;
				break;
			default:
				mapType_id = BMAP_NORMAL_MAP;
		}
		//Zoom size
		switch(zoomSize){
			case "largest": 
				zoom_size = 19;
				break;
			case "larger": 
				zoom_size = 15;
				break;
			case "normal": 
				zoom_size = 12;
				break;
			case "smaller": 
				zoom_size = 9;
				break;
			case "smallest": 
				zoom_size = 6;
				break;
			default:
				zoom_size = 12;
		}	

		//Map type control
		switch(mapTypeControl){
			case "false": 
				mapTypeControl_Style = null;
				break;
			case "HORIZONTAL_BAR": 
				mapTypeControl_Style = 'BMAP_MAPTYPE_CONTROL_HORIZONTAL';
				break;
			case "DROPDOWN_MENU": 
				mapTypeControl_Style = 'BMAP_MAPTYPE_CONTROL_DROPDOWN';
				break;
			default:
				mapTypeControl_Style = null;
		}
		//Navigation control
		switch(NavigationControl){
			case "false": 
				navigationControl_Style = null;
				break;
			case "DEFAULT": 
				navigationControl_Style = 'BMAP_NAVIGATION_CONTROL_LARGE';
				break;
			case "SMALL": 
				navigationControl_Style = 'BMAP_NAVIGATION_CONTROL_SMALL';
				break;
			case "ZOOM_PAN": 
				navigationControl_Style = 'BMAP_NAVIGATION_CONTROL_PAN';
				break;
			default:
				navigationControl_Style = null;
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
				overview_Control = false;
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
				scale_Control = false;
		}
		//Route Display
		switch(iconDisplay){
			case "false": 
				icon_Display = false;
				break;
			case "movable_icon": 
				icon_Display = 'movable';
				break;
			case "unmovable_icon": 
				icon_Display = 'unmovable';
				break;
			default:
				icon_Display = false;
		}

		var option =  new BaiduMap_Options(mapType_id,zoom_size,mapTypeControl_Style, navigationControl_Style,overview_Control,scale_Control,
			              icon_Display,route_display,inforwindow_display,inforwindow_content,informationWindow,local_search);

		generateMap(baiduMapId,address,option,index);

	}

	function generateMap(baiduMapId,address,option,index){
		var mapArea = $(baiduMapId).find('#baidu_map_canvas');
		map[index] = new BMap.Map(mapArea[0]);  
	

		var ac = new BMap.Autocomplete(
			{input: 'address', location: map[index]}
		);

		if(option.route_display != 'false'){
			var bc = new BMap.Autocomplete(
				{input: 'from', location: map[index]}
			);
			if(option.route_display != 'fixed'){
				var cc = new BMap.Autocomplete(
					{input: 'to', location: map[index]}
				);
			}
		}


		myGeo = new BMap.Geocoder();

		myGeo.getPoint(address, function(point){
			if (point) {
				map[index].centerAndZoom(point,12);
			}else{
				map[index].centerAndZoom('北京');
		
		    }
			
		    map[index].enableScrollWheelZoom(); 			
			map[index].setMapType(option.mapType_id);
			map[index].setZoom(option.zoom_size);

			if(option.mapTypeControl_Style == 'BMAP_MAPTYPE_CONTROL_HORIZONTAL')
				map[index].addControl(new BMap.MapTypeControl({type:BMAP_MAPTYPE_CONTROL_HORIZONTAL}));  
			else if(option.mapTypeControl_Style == 'BMAP_MAPTYPE_CONTROL_DROPDOWN')
				map[index].addControl(new BMap.MapTypeControl({type:BMAP_MAPTYPE_CONTROL_DROPDOWN}));  

			if(option.navigationControl_Style){
				var nav_controller = new BMap.NavigationControl();
				if(option.navigationControl_Style == 'BMAP_NAVIGATION_CONTROL_LARGE')
					nav_controller.setType(BMAP_NAVIGATION_CONTROL_LARGE);
				else if(option.navigationControl_Style == 'BMAP_NAVIGATION_CONTROL_SMALL')
					nav_controller.setType(BMAP_NAVIGATION_CONTROL_SMALL);
				else if(option.navigationControl_Style == 'BMAP_NAVIGATION_CONTROL_PAN')
					nav_controller.setType(BMAP_NAVIGATION_CONTROL_PAN);

				map[index].addControl(nav_controller); 
			}

			if(option.overview_Control)
				map[index].addControl(new BMap.OverviewMapControl()); 

			if(option.scale_Control)
				map[index].addControl(new BMap.ScaleControl()); 

			if(option.icon_Display){
				var marker = new BMap.Marker(point);
				if(option.icon_Display == 'movable')
					marker.enableDragging();  
				map[index].addOverlay(marker);

				/*marker.addEventListener("dragend", function(e){  
					alert("当前位置：" + e.point.lng + ", " + e.point.lat);  
				}) */ 
			}
			

			if(option.inforwindow_display != 'false'){
				var windowContent = '';

				var opts = {  
					width : 250,     
					height: 100,     
				}  

				if(option.inforwindow_content == "address_info"){
					myGeo.getLocation(point, function(rs){
						windowContent = rs.address;
						var infoWindow = new BMap.InfoWindow(windowContent, opts);  
						map[index].openInfoWindow(infoWindow, map[index].getCenter());  
					});        
				}else if (option.inforwindow_content == "custom_info"){
					windowContent = option.informationWindow;
					var infoWindow = new BMap.InfoWindow(windowContent, opts);  
					map[index].openInfoWindow(infoWindow, map[index].getCenter()); 
				}
		
			}


			if(option.route_display){				
				$(baiduMapId).find('#search_route').click(function(){
					var start = $(baiduMapId).find("#from").attr("value");
					var end = $(baiduMapId).find("#to").attr("value");
					var routeDiv = $(baiduMapId).find('#route_info');

					var route_type = $('#route_type').val();
					
					if(route_type == 'transit'){
						var transit = new BMap.TransitRoute(map[index], {  
							renderOptions: {map: map[index], panel: "route_info"}  
						});  
						transit.search(start, end);

						transit.setSearchCompleteCallback(function(result){ 			
							if(transit.getStatus() != BMAP_STATUS_SUCCESS){
								alert("Can not search the route，please input the valid locations!");
								$(baiduMapId).find("#from").focus();
							}
						})
					}
					else if(route_type == 'driving')
					{
						var driving  = new BMap.DrivingRoute(map[index], {  
							renderOptions: {map: map[index], panel: "route_info", autoViewport: true }  
						});  
						driving.search(start, end);

						driving.setSearchCompleteCallback(function(result){
							if(driving.getStatus() != BMAP_STATUS_SUCCESS){
								alert("Can not search the route，please input the valid locations!");
								$(baiduMapId).find("#from").focus();
							}else{
								$(baiduMapId).find('#route_info').css('display','block');
								$(baiduMapId).find('#close_route').css('display','inline');
							}
						})	
					}
				});

				$(baiduMapId).find('#close_route').click(function(){
					$(baiduMapId).find('#route_info').css('display','none');
					$(baiduMapId).find('#close_route').css('display','none');
				});
			}

			if(option.local_search == 'true'){
				var local = new BMap.LocalSearch(map[index], {  
					renderOptions:{map: map[index]}  
				});  
				$(baiduMapId).find('#local_srh').find('#restaurant').click(function(){
					local.searchNearby("餐厅", point);  
				});
				$(baiduMapId).find('#local_srh').find('#subway').click(function(){
					local.searchNearby("地铁站", point);  
				});
				$(baiduMapId).find('#local_srh').find('#bus').click(function(){
					local.searchNearby("公车站", point);  
				});
				$(baiduMapId).find('#local_srh').find('#shop').click(function(){
					local.searchNearby("商场", point);  
				});
				$(baiduMapId).find('#local_srh').find('#park').click(function(){
					local.searchNearby("公园", point);  
				});
				$(baiduMapId).find('#local_srh').find('#bank').click(function(){
					local.searchNearby("银行", point);  
				});
				$(baiduMapId).find('#local_srh').find('#hotel').click(function(){
					local.searchNearby("酒店", point);  
				});
						
			}


		});
	}
});


//Map Options
function BaiduMap_Options(mapType_id,zoom_size,mapTypeControl_Style,navigationControl_Style,overview_Control,scale_Control,icon_Display,route_display,inforwindow_display,inforwindow_content,informationWindow,local_search){  
	var option = new Object;    
	option.mapType_id = mapType_id;
	option.zoom_size = zoom_size;
	option.mapTypeControl_Style = mapTypeControl_Style;
	option.navigationControl_Style = navigationControl_Style;
	option.overview_Control = overview_Control;
	option.scale_Control = scale_Control;
	option.icon_Display = icon_Display;
	option.route_display = route_display;
	option.inforwindow_display = inforwindow_display;
	option.inforwindow_content = inforwindow_content;
	option.informationWindow = informationWindow;
	option.local_search = local_search;

	

	return option;
}




