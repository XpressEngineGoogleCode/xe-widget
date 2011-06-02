<?php
    /**
     * @class google_map
     * @author ryin005@nhn.com
     * @version 0.1
     **/

    class google_map extends WidgetHandler {

        /**
         * @brief
         * ./widgets/google_map/conf/info.xml read extra_vars's args         
		 **/

        function proc($args) {

            // (skin, colorset)						
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            $colorset = $args->colorset;

            //template file
            $tpl_file = 'map_demo';

            $clock_width = $args->clock_width;
            if(!$clock_width) $clock_width = 300;
            $clock_height = $args->clock_height;
            if(!$clock_height) $clock_height = 300;

			$map_location = $args->map_location;
            if(!$map_location) $map_location = 'Beijing';

			$search_display = $args->search_display;
            if(!$search_display) $search_display = 'true';

			$map_type = $args->map_type;
            if(!$map_type) $map_type = 'ROADMAP';

			$zoom_size = $args->zoom_size;
            if(!$zoom_size) $zoom_size = 'auto';

			$street_view = $args->street_view;
            if(!$street_view) $street_view = 'false';

			$icon_display = $args->icon_display;
            if(!$icon_display) $icon_display = 'movable_icon';

			$information_window = $args->information_window;
            if(!$information_window) $information_window = '';

			$circle_overlay = $args->circle_overlay;
            if(!$circle_overlay) $circle_overlay = 'false';

			$map_type_control = $args->map_type_control;
            if(!$map_type_control) $map_type_control = 'HORIZONTAL_BAR';

			$navigation_control = $args->navigation_control;
            if(!$navigation_control) $navigation_control = 'DEFAULT';

			$scale_control = $args->scale_control;
            if(!$scale_control) $scale_control = 'false';

			$overview_control = $args->overview_control;
            if(!$overview_control) $overview_control = 'false';

			$earth_control = $args->earth_control;
            if(!$earth_control) $earth_control = 'false';

			$earth_key = $args->earth_key;
            if(!$earth_key) $earth_key = 'ABQIAAAATt-nKqDB98woiDkzoJdaxhT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSGm8CrL8uUTiYCcNPhyrsM-GDhTA';

			$route_display = $args->route_display;
            if(!$route_display) $route_display = 'false';

			$inforwindow_display = $args->inforwindow_display;
            if(!$inforwindow_display) $inforwindow_display = 'false';

			$inforwindow_content = $args->inforwindow_content;
            if(!$inforwindow_content) $inforwindow_content = 'address_info';

			$earth_display = $args->earth_display;
            if(!$earth_display) $earth_display = 'simple_level';

			$earth_nav_control = $args->earth_nav_control;
            if(!$earth_nav_control) $earth_nav_control = 'auto';

			$ballnoon_display = $args->ballnoon_display;
            if(!$ballnoon_display) $ballnoon_display = 'directly_display';

			$ballnoon_content = $args->ballnoon_content;
            if(!$ballnoon_content) $ballnoon_content = 'address_info';

			$custom_ballnoon = $args->custom_ballnoon;
            if(!$custom_ballnoon) $custom_ballnoon = '';

			$ballnoon_video = $args->ballnoon_video;
            if(!$ballnoon_video) $ballnoon_video = '';

            $widget_info->clock_width = $clock_width;
            $widget_info->clock_height = $clock_height;
			$widget_info->map_location = $map_location;
			$widget_info->search_display = $search_display;
			$widget_info->map_type = $map_type;
			$widget_info->zoom_size = $zoom_size;
			$widget_info->street_view = $street_view;
			$widget_info->icon_display = $icon_display;
			$widget_info->information_window = $information_window;
			$widget_info->circle_overlay = $circle_overlay;
			$widget_info->map_type_control = $map_type_control;
			$widget_info->navigation_control = $navigation_control;
			$widget_info->scale_control = $scale_control;
			$widget_info->overview_control = $overview_control;
			$widget_info->earth_control = $earth_control;
			$widget_info->earth_key = $earth_key;
			$widget_info->route_display = $route_display;
			$widget_info->inforwindow_display = $inforwindow_display;
			$widget_info->inforwindow_content = $inforwindow_content;
			$widget_info->earth_display = $earth_display;
			$widget_info->earth_nav_control = $earth_nav_control;
			$widget_info->ballnoon_display = $ballnoon_display;
			$widget_info->ballnoon_content = $ballnoon_content;
			$widget_info->custom_ballnoon = $custom_ballnoon;
			$widget_info->ballnoon_video = $ballnoon_video;

            //$widget_info->src = sprintf("%s%s/%s/clock.swf", Context::getRequestUri(), $tpl_path, $colorset);

            Context::set('widget_info', $widget_info);

			//Compile
            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>
