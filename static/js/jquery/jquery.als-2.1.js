;(function($) {
	/**********************************************************
	 * Variables: als (contains data of the current instance),
	 * instance (number of the current instance),
	 * methods (methods of als plugin)
	 *********************************************************/
	var als = [],
		instance = 0,
		methods = {
		/******************************************************
		 * plugin inizialization
		 * @param {Object} settings: configuration settings
		 ******************************************************/
		init: function(options) {
			var defaults = {
					visible_items: "auto",
					scrolling_items: 1,
					orientation: "horizontal",
					circular: "no",
					autoscroll: "no",
					interval: 4000,
					speed: 300,
					easing: "swing",
					direction: "left",
					start_from: 0
				},
				settings = $.extend({}, defaults, options);
			
			als[instance] = {
				container : $(),
				instance : instance,
				settings : settings,
				viewport : $(),
				wrapper : $(),
				prev : $(),
				next : $(),
				item : $(),
				num_items : 0,
				init_visible_items : 0,
				init_scrolling_items : 0,
				initial_movement : 0,
				wrapper_width : 0,
				wrapper_height : 0,
				viewport_width : 0,
				viewport_height : 0,
				max_viewport_dimension : 0,
				max_item_dimension: 0,
				max_height: 0,
				max_width: 0,
				current : 0,
				timer : 0,
				mm : {
					swipeTreshold: 30,
					allowedTime: 1000
				}
			};
				
			this.each(function() {
				als[instance].container = $(this);
				
				/*******************************************************
				 * configuration controls: autoscroll option implies
				 * infinite circular scrolling
				 *******************************************************/
				if(als[instance].settings.circular == "no" && als[instance].settings.autoscroll == "yes") {
					als[instance].settings.circular = "yes";
				}
				
				/***************************
				 * checking easing option
				 ***************************/
				if(als[instance].settings.easing != "linear" || als[instance].settings.easing != "swing") {
					als[instance].settings.easing = "swing";
				}
				
				/***************************************************
				 * define data-id for the different plugin sections 
				 * to name them directly
				 ***************************************************/
				if(!als[instance].container.attr("id") || als[instance].container.attr("id") === "") {
					als[instance].container.attr("id","als-container_" + instance);
				}
				
				als[instance].container.attr("data-id","als-container_" + instance);
				als[instance].viewport = als[instance].container.find(".als-viewport").attr("data-id","als-viewport_" + instance);
				als[instance].wrapper = als[instance].container.find(".als-wrapper").attr("data-id","als-wrapper_" + instance);
				als[instance].item = als[instance].container.find(".als-item");
				als[instance].num_items = als[instance].item.length;
				
				/*****************************************************************************
				 * configuration controls: number of visible element can not be higher than 
				 * total number of list element
				 * scrolling items can not be more than visible items
				 * start_from number can not be higher than total number of list elements
				 *****************************************************************************/
				if(typeof(als[instance].settings.visible_items) == "number") {
					if(als[instance].settings.visible_items > als[instance].num_items) {
						als[instance].settings.visible_items = als[instance].num_items - 1;
					}
					
					/*******************************************
					 * changing value to the initial settings
					 * for responsive purposes
					 *******************************************/
					als[instance].init_visible_items = als[instance].settings.visible_items;
					
					if(als[instance].settings.scrolling_items > als[instance].settings.visible_items) {
						als[instance].settings.scrolling_items = als[instance].settings.visible_items - 1;
					}
					
				}
				
				als[instance].init_scrolling_items = als[instance].settings.scrolling_items;			
				
				if(als[instance].settings.start_from > als[instance].num_items - als[instance].settings.visible_items) {
					als[instance].settings.start_from = 0;
				}
				
				/*****************************************************
				 * prev and next button inizialization (if present)
				 *****************************************************/
				als[instance].prev = als[instance].container.find(".als-prev").attr("data-id","als-prev_" + instance);
				als[instance].next = als[instance].container.find(".als-next").attr("data-id","als-next_" + instance);
				
				if(als[instance].settings.start_from > 0 && als[instance].settings.start_from < als[instance].num_items) {
					als[instance].current = als[instance].settings.start_from; 
				}
				
				als[instance].item.each(function(index) {
					/***************************************************************
					 * give an ID to every ALS item based on instance and its index 
					 **************************************************************/
					$(this).attr("data-id","als-item_" + instance + "_" + index);
					
					/*********************************************************************
					 * calculate wrapper and max dimensions based on orientation settings
					 ********************************************************************/
					if(als[instance].settings.orientation == "horizontal") {
						als[instance].wrapper_width += $(this).outerWidth(true);
						if(als[instance].current > 0 && index < als[instance].current) {
							als[instance].initial_movement += $(this).outerWidth(true);
						}
					
						if($(this).outerHeight(true) > als[instance].max_height) {
							als[instance].max_height = $(this).outerHeight(true);
						}
					}
					else if(als[instance].settings.orientation == "vertical") {
						als[instance].wrapper_height += $(this).outerHeight(true);
						if(als[instance].current > 0 && index < als[instance].current) {
							als[instance].initial_movement += $(this).outerHeight(true);
						}
							
						if($(this).outerWidth(true) > als[instance].max_width) {
							als[instance].max_width = $(this).outerWidth(true);
						}
					}
				});
				
				
				
				/*******************************************************************
				 * relative to chosen orientation calculate/resize width and height
				 * of the list wrapper (wrapper) and of the list viewport
				 * (viewport)
				 ******************************************************************/
				$.fn.als("resize",instance);
				
				/**************************************************
				 * set initial values for $wrapper and $viewport
				 * and initial movement for $item
				 **************************************************/
				if(als[instance].settings.orientation == "horizontal") {
					als[instance].wrapper.css("width", als[instance].wrapper_width);
					als[instance].item.css("left", -als[instance].initial_movement);
					
					als[instance].wrapper.css("height", als[instance].max_height);
					als[instance].viewport.css("height", als[instance].max_height);
					
					// infos for the instance data
					als[instance].viewport_height = als[instance].max_height;
					als[instance].wrapper_height = als[instance].max_height;
					
					
					if(als[instance].settings.circular == "yes" && als[instance].settings.start_from !== 0) {
						/*******************************************************
						 * must reset the hidden elements if start_from != 0
						 ******************************************************/
						var right_repos = als[instance].item.last().position().left + als[instance].item.last().outerWidth(true);
						for (var r = 0; r < als[instance].settings.start_from; r++) {
							als[instance].item.eq(r).css("left", right_repos);
						}
					}
				}
				else if(als[instance].settings.orientation == "vertical") {
					als[instance].wrapper.css("height", als[instance].wrapper_height);
					als[instance].item.css("top", -als[instance].initial_movement);
					
					als[instance].wrapper.css("width", als[instance].max_width);
					als[instance].viewport.css("width", als[instance].max_width);
					
					// infos for the instance data
					als[instance].viewport_width = als[instance].max_width;
					als[instance].wrapper_width = als[instance].max_width;
					
					if(als[instance].settings.circular == "yes" && als[instance].settings.start_from !== 0) {
						/******************************************************
						 * must reset the hidden elements if start_from != 0
						 ******************************************************/
						var bottom_repos = als[instance].item.last().position().top + als[instance].item.last().outerHeight(true);
						for (var s = 0; s < als[instance].settings.start_from; s++) {
							als[instance].item.eq(s).css("top", bottom_repos);
						}	
					}
				}
				
				
				/***********************************************
				 * if circular == no don't show prev button
				 * at the beginning but only if start_from == 0
				 ***********************************************/
				if(als[instance].settings.circular == "no") {
					if(als[instance].settings.start_from === 0) {
						als[instance].prev.css("display","none");
					}
					
					if(als[instance].settings.visible_items + als[instance].settings.start_from == als[instance].num_items) {
						als[instance].next.css("display","none");
					}
				}
				
				/***************************************
				 * prev and next buttons inizialization
				 ***************************************/
				als[instance].next.on("click touchstart touchend", nextHandle);
				als[instance].prev.on("click touchstart touchend", prevHandle);
				
				/***********************************
				 * initializing swipe-touch control
				 ***********************************/
				als[instance].viewport.on("touchstart", touchstartHandle);
				als[instance].viewport.on("touchend", touchendHandle);
								
				/***********************************************
				 * automatic scrolling function inizialization
				 * if it is the case
				 ***********************************************/
				if(settings.autoscroll == "yes") {
					$.fn.als("start", instance);
					als[instance].wrapper.hover(function() {
						$.fn.als("stop", $(this).attr("data-id"));
					},function() {
						$.fn.als("start", $(this).attr("data-id"));
					});
				}
				else if(settings.autoscroll == "no") {
					$.fn.als("stop", instance);
				}
				
				/**********************************************
				 * increasing instance number and
				 * returning als variable now inizialized
				 **********************************************/
				instance++;
				return als;
			});
		},
		/******************************************************
		 * step function for lists elements
		 * @param {Object} id: instance or ID of the element
		 * that calls the function;
		 * direction ("next" or "prev")
		 ******************************************************/
		step: function(id, direction) {
			id = find_instance(id);
			
			var	//data = als[id],
				shift_amount = 0, // pixel amount for elements shifting
				shift = {}, // object for css parameter-value call
				viewport_dimension = 0, // new pixel dimension for the viewport
				dimension = {}, // object for css parameter-value call
				operation = "", // add or subtract + or -
				// circular variables for elements repositioning
				memo = 0, memo_index = [],
				last_position = 0, reposition = {}, reposition_amount = 0;
			
			if(direction == "prev") {
				/****************************************************************
				 * edit the current item index as a function of the elements to 
				 * slide in a single step: edit right away so that you can do 
				 * the next steps "forward"
				 ****************************************************************/
				als[id].current -= als[id].settings.scrolling_items;
				operation = "+=";
				if(als[id].settings.circular == "yes") {
					/**************************************************
					 * check if the current element has not index < 0
					 **************************************************/
					if(als[id].current < 0) {
						als[id].current += als[id].num_items;
					}
				}
			}
			
			/*******************************************************************
			 * calculating the displacement of the elements according to the 
			 * number of elements to slide in a single step
			 *******************************************************************/
			for(var k1 = als[id].current; k1 < als[id].current + als[id].settings.scrolling_items; k1++) {
				if(als[id].settings.circular == "yes") {
					var k3 = k1;
					/********************************************************
					 * control if the total number of elements are exceeded
					 ********************************************************/
					if(k1 >= als[id].num_items) {
						k3 = k1 - als[id].num_items;
					}
					
					if(als[id].settings.orientation == "horizontal") {
						shift_amount += als[id].item.eq(k3).outerWidth(true);
					}
					else if(als[id].settings.orientation == "vertical") {
						shift_amount += als[id].item.eq(k3).outerHeight(true);	
					}
					
					memo_index[memo]= k3;
					memo ++;
				}
				else {
					if(als[id].settings.orientation == "horizontal") {
						shift_amount += als[id].item.eq(k1).outerWidth(true);
					}
					else if(als[id].settings.orientation == "vertical") {
						shift_amount += als[id].item.eq(k1).outerHeight(true);	
					}
				}
			}
			
			if(direction == "next") {
				/**************************************************************
				 * edit current element on the basis of the number of elements 
				 * to slide in a single step
				 **************************************************************/
				als[id].current += als[id].settings.scrolling_items;
				operation = "-=";
				if(als[id].settings.circular == "yes") {
					/*******************************************************
					 * control if the total number of elements are exceeded
					 *******************************************************/
					if(als[id].current >= als[id].num_items) {
						als[id].current -= als[id].num_items;
					}
				}
			}
			
			/***************************************************************************
			 * calculation of the viewport width on the basis of the visible elements 
			 * AFTER the scrolling (on the basis of their width)
			 ***************************************************************************/
			for (var k2 = als[id].current; k2 < als[id].current + als[id].settings.visible_items; k2++) {
				/****************************************************
				 * if circular == "yes" we have to take special care
				 * to the recurring elements 
				 ****************************************************/
				if(als[id].settings.circular == "yes") {
					var k4 = k2;
					/********************************************************
					 * control if the total number of elements are exceeded
					 ********************************************************/
					if(k2 >= als[id].num_items) {
						k4 = k2 - als[id].num_items;
					}
					
					
					if(als[id].settings.orientation == "horizontal") {
						if(viewport_dimension + als[id].item.eq(k4).outerWidth(true) < als[id].max_viewport_dimension) {
							viewport_dimension += als[id].item.eq(k4).outerWidth(true);
						}
					}
					else if(als[id].settings.orientation == "vertical") {
						if(viewport_dimension + als[id].item.eq(k4).outerHeight(true) < als[id].max_viewport_dimension) {
							viewport_dimension += als[id].item.eq(k4).outerHeight(true);
						}
					}
					
				}
				else {
					if(als[id].settings.orientation == "horizontal") {
						if(viewport_dimension + als[id].item.eq(k2).outerWidth(true) < als[id].max_viewport_dimension) {
							viewport_dimension += als[id].item.eq(k2).outerWidth(true);
						}
					}
					else if(als[id].settings.orientation == "vertical") {
						if(viewport_dimension + als[id].item.eq(k2).outerHeight(true) < als[id].max_viewport_dimension) {
							viewport_dimension += als[id].item.eq(k2).outerHeight(true);
						}
					}
					
				}		
			}
			
			/***********************************************************************
			 * based on the orientation set the correct dimension (width or height)
			 * for the animation and the correct shift (left or top) and
			 * shift amount 
			 ***********************************************************************/
			if(als[id].settings.orientation == "horizontal") {
				dimension.width = viewport_dimension;
				shift.left = operation + shift_amount;
			}
			else if(als[id].settings.orientation == "vertical") {
				dimension.height = viewport_dimension;
				shift.top = operation + shift_amount;
			}
			
			/***************************************************************
			 * if direction == "prev" repositioning has to be done BEFORE
			 * any animation movement otherwise there could be no element
			 * to show after the animation has finished
			 ***************************************************************/
			if(als[id].settings.circular == "yes" && direction == "prev") {
				/************************************************************************
				 * repositioning is calculated based on the location of the first element 
				 * of the list. Special care to the repositioning of the last element 
				 * that needs to be recalculated AFTER the first was eventually relocated
				 ************************************************************************/
				last_position = als[id].item.first().position();
				if(als[id].settings.orientation == "horizontal") {
					reposition_amount = last_position.left - als[id].wrapper_width;
					reposition.left = reposition_amount;
				}
				else if(als[id].settings.orientation == "vertical") {
					reposition_amount = last_position.top - als[id].wrapper_height;
					reposition.top = reposition_amount;
				}
					
				for(var k5 = 0; k5 < memo_index.length; k5++) {
					als[id].item.eq(memo_index[k5]).css(reposition);
					
					if(memo_index[k5] === 0) {
						var last_position_eq0 = als[id].item.eq(0).position(),
							reposition_amount_eq0 = 0, reposition_eq0 = {};
						if(als[id].settings.orientation == "horizontal") {
							reposition_amount_eq0 = last_position_eq0.left - als[id].wrapper_width;
							reposition_eq0.left = reposition_amount_eq0;
						}
						else if(als[id].settings.orientation == "vertical") {
							reposition_amount_eq0 = last_position_eq0.top - als[id].wrapper_height;
							reposition_eq0.top = reposition_amount_eq0;
						}
						
						for(var k6 = 0; k6 < k5; k6++) {
							als[id].item.eq(memo_index[k6]).css(reposition_eq0);
						}	
					}
				}
			}
				
			/*******************************
			 * animating the viewport width
			 *******************************/
			als[id].viewport.animate(dimension, als[id].settings.speed, als[id].settings.easing);
			/********************************
			 * animating elements scrolling
			 ********************************/
			als[id].item.animate(shift, als[id].settings.speed, als[id].settings.easing);
					
			if(als[id].settings.circular == "yes" && direction == "next") { // we are going forward, thus we do not need to wait for repositioning that can be done next
				/**************************************
				 * once all animations have finished
				 * (deferred object)
				 **************************************/
				als[id].item.promise().done(function() {
					/****************************************************************************
					 * repositioning is calculated based on the location of the last element of 
					 * the list, double check if I have to move the first element
					 ****************************************************************************/
					last_position = als[id].item.last().position();
					if(als[id].settings.orientation == "horizontal") {
						reposition_amount = last_position.left + als[id].item.last().outerWidth(true);
						reposition.left = reposition_amount;
					}
					else if(als[id].settings.orientation == "vertical") {
						reposition_amount = last_position.top + als[id].item.last().outerHeight(true);
						reposition.top = reposition_amount;
					}
					
					for(var k5 = 0; k5 < memo_index.length; k5++) {
						if(memo_index[k5] === 0) {
							last_position = als[id].item.last().position();
							if(als[id].settings.orientation == "horizontal") {
								reposition_amount = last_position.left + als[id].item.last().outerWidth(true);
								reposition.left = reposition_amount;
							}
							else if(als[id].settings.orientation == "vertical") {
								reposition_amount = last_position.top + als[id].item.last().outerHeight(true);
								reposition.top = reposition_amount;
							}
						}
						als[id].item.eq(memo_index[k5]).css(reposition);
					}
					
					
				});
			}	

			if(als[id].settings.circular == "no") {
				/**************************************************
				 * visibility control of the prev and next buttons
				 **************************************************/
				if(als[id].current > 0) {
					als[id].prev.show();
				}
				else {
					als[id].prev.hide();
				}
				
				if (als[id].current + als[id].settings.visible_items >= als[id].num_items) {
					als[id].next.hide();
				}
				else {
					als[id].next.show();
				}
			}
			
			/**************************************
			 * once all animations have finished
			 * (deferred object)
			 **************************************/
			als[id].item.promise().done(function() {
				/****************************************************
				 * I bind again the "click" action to the prev
				 * and next buttons (unbinded to prevent undesirable
				 * behaviour during the scrolling animation)
				 ***************************************************/
				als[id].next.on("click touchstart touchend",nextHandle);
				als[id].prev.on("click touchstart touchend",prevHandle);
				als[id].viewport.on("touchend", touchendHandle);
			});
			
		},
		/**************************************************************
		 * start function for automatic scrolling
		 * @param {Object} id: instance or ID of the element that has
		 * called the function
		 **************************************************************/ 
		start: function(id) {
			id = find_instance(id);
			var data = als[id];
				
			/**********************************************************
			 * stopping any previous automatic scrolling
			 *********************************************************/
			if(data.timer !== 0) {
				clearInterval(data.timer);
			}
			/************************************
			 * depending on the direction you 
			 * choose automatic scrolling begins
			 ***********************************/
			switch(data.settings.direction) {
				/************************************************
				 * if left or up (that means "forward")
				 ************************************************/
				//case "left":
				//case "up":
				default:
					/************************************
					 * detachment from the handler buttons 
					 * and the animation forward start 
					 * (step function, next direction)
					 ************************************/
					data.timer = setInterval(function() {
						data.next.off();
						data.prev.off();
						data.viewport.off("touchend");
						$.fn.als("step", id, "next");
						}, data.settings.interval);
				break;
				/***************************************************
				 * if right or down (that means "backward")
				 ***************************************************/
				case "right":
				case "down":
					/************************************
					 * detachment from the handler buttons 
					 * and the animation forward start 
					 * (step function, prev direction)
					 ************************************/
					data.timer = setInterval(function() {
						data.prev.off();
						data.next.off();
						data.viewport.off("touchend");
						$.fn.als("step", id, "prev");
						}, data.settings.interval);
				break;
			}
			
			/************************************
			 * saving als instance data and
			 * returning als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/**************************************************************
		 * stop function for automatic scrolling
		 * @param {Object} id: instance or ID of the element that
		 * called the function
		 **************************************************************/ 
		stop: function(id) {
			id = find_instance(id);  
			var data = als[id];
			/********************************
			 * stop autoscrolling
			 *******************************/
			clearInterval(data.timer);
			/************************************
			 * saving data into als instance
			 * and returning als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/*******************************************************
		 * function for resizing als viewport and visible_items 
		 * relative to the $(window).width()
		 * for responsive purposes 
		 *******************************************************/
		resize: function(id) {
			id = find_instance(id);  
			var i = 0,
				prev_position = 0,
				out = false,
				$item = $(),
				$first_items = $(),
				viewport_dimension = 0, // new pixel dimension for the viewport
				max_viewport_dimension = 0,
				dimension = {}; // object for css parameter-value call
			
			/***********************************************
			 * rearrange items based on the current
			 * item, so that we do all calculations right 
			 ***********************************************/
			if(als[id].current > 0) {
				$item = als[id].item.slice(als[id].current);
				$first_items = als[id].item.slice(0,als[id].current);
				$.merge($item,$first_items);
			}
			else {
				$item = als[id].item;
			}
			
			/********************************************************	
			 * if there is the prev button, check out its position
			 * (to center the viewport supposing that prev and
			 * 	next buttons are symmetrical) 
			 ********************************************************/
			if(als[id].prev.length  > 0) {
				prev_position = als[id].prev.position();
				if(als[id].settings.orientation == "horizontal") {
					prev_position = prev_position.left + als[id].prev.outerWidth(true);
				}	
				else if(als[id].settings.orientation == "vertical") {
					prev_position = prev_position.top + als[id].prev.outerHeight(true);
				}		
			}
			
			/************************************************************
			 * calculate max viewport dimension (width or height)
			 * based on the container dimension and 2* the prev position 
			 *************************************************************/
			if(als[id].settings.orientation == "horizontal") {
				max_viewport_dimension = parseInt(als[id].container.width() - 2*prev_position);
			}
			else if(als[id].settings.orientation == "vertical") {
				max_viewport_dimension = parseInt(als[id].container.height() - 2*prev_position);
			}
			
			als[id].max_viewport_dimension = max_viewport_dimension;
			als[id].max_item_dimension = max_viewport_dimension;
			
			/*********************************************************************
			 * calculate how many elements we can have in the max viewport width 
			 *********************************************************************/
			$item.each(function(index) {
				if(als[id].settings.orientation == "horizontal") {
					$(this).css("max-width", max_viewport_dimension);
				}
				else if(als[id].settings.orientation == "vertical") {
					$(this).css("max-height", max_viewport_dimension);
				}
				
				/***********************************************************
				 * do we have an initial value for visible_items?
				 * we try to satisfy this condition if we have enough space
				 ***********************************************************/
				if(als[id].init_visible_items > 0) {
					if(out === false) {
						if(als[id].settings.orientation == "horizontal") {
							if(i < als[id].init_visible_items && (viewport_dimension + $(this).outerWidth(true)) < max_viewport_dimension) {	
								viewport_dimension += $(this).outerWidth(true);
								i++;
							}
							else {
								out = true;
							}
						}
						else if(als[id].settings.orientation == "vertical") {
							if(i < als[id].init_visible_items && (viewport_dimension + $(this).outerHeight(true)) < max_viewport_dimension) {	
								viewport_dimension += $(this).outerHeight(true);
								i++;
							}
							else {
								out = true;
							}
						}
					}
				}
				else {
					/******************************************
					 * we have to fill the viewport width with
					 * the max number of items we can 
					 ******************************************/
					if(als[id].settings.orientation == "horizontal") {
						if((viewport_dimension + $(this).outerWidth(true)) < max_viewport_dimension) {	
							viewport_dimension += $(this).outerWidth(true);
							i++;
						}
					}
					else if(als[id].settings.orientation == "vertical") {
						if((viewport_dimension + $(this).outerHeight(true)) < max_viewport_dimension) {	
							viewport_dimension += $(this).outerHeight(true);
							i++;
						}
					}
				}
			});
			
			/****************************************************
			 * based on the orientation set the dimension object 
			 ****************************************************/
			if(als[id].settings.orientation == "horizontal") {
				dimension.width = viewport_dimension;
			}
			else if(als[id].settings.orientation == "vertical") {
				dimension.height = viewport_dimension;
			}
			
			/*********************************
			 * set the new viewport dimension 
			 *********************************/
			als[id].viewport.css(dimension);
			
			/**************************************
			 * set the new value for visible items 
			 **************************************/
			als[id].settings.visible_items = i;
			
			/***********************************************************
			 * do we have an initial value for scrolling items?
			 * we try to satisfy this condition if we have enough space
			 ***********************************************************/
			if(als[id].init_scrolling_items > 0 && als[id].init_scrolling_items <= als[id].settings.visible_items) {
				als[id].settings.scrolling_items = als[id].init_scrolling_items; 
			}
			else { 
				if(als[id].settings.visible_items > 1) {
					als[id].settings.scrolling_items = als[id].settings.visible_items -1;
				}
				else {
					als[id].settings.scrolling_items = 1;
				}
			}
			
			return als;
		},
		/**************************************
		 * function that destroys als instance
		 **************************************/
		destroy: function() {
			var id = find_instance($(this).attr("data-id")),
				data = als[id];
			data.prev.off();
			data.next.off();
			data.viewport.off();
			$.fn.als("stop",id);
         	//$.removeData(data, "als");
		    this.unbind();
		    this.element = null;
        }    
	};
	
	/*******************************
	 * service functions
	 *******************************/
	
	/*****************************************************************
	 * function to find the current plugin instance
	 * @param {Object} id: plugin instance od ID of the element that
	 * called the plugin
	 *****************************************************************/
	function find_instance(id) {
		if(typeof(id) === "string") {
			var position = id.indexOf("_");	
			if(position != -1) {
				id = id.substr(position+1);  
			}
		}
		return id;
	}
	
	/*******************************************************************
	 * bind function resize to window resize for any instance of ALS
	 * that scrolls horizontally
	 *******************************************************************/
	$(window).resize(function() {
		for(var i=0; i<instance; i++) {
			$.fn.als("resize",i);
		}
	});
	
	/****************************************************
	 * function that manages "click" action on next button
	 * @param e event, $obj object
	 ***************************************************/
	function nextHandle(e, $obj) {
		e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		var id = find_instance($obj.attr("data-id")),
			data = als[id];
			
		/*********************************************
		 * unbinding next and prev buttons so that
		 * they don't interfere with current animation
		 ********************************************/
		data.next.off();
		data.prev.off();
		data.viewport.off("touchend");
		if(data.settings.autoscroll === "yes") {
			$.fn.als("stop", id);
		}
		/********************************************
		 * calling step function on this instance
		 * with next direction
		 ********************************************/
		$.fn.als("step", id, "next");
		if(data.settings.autoscroll === "yes") {
			$.fn.als("start", id);
		}
	}
	
	/******************************************************
	 * function that manages "click" action on prev button
	 * @param e event, $obj object
	 ******************************************************/
	function prevHandle(e, $obj) {
		e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		var id = find_instance($obj.attr("data-id")),
			data = als[id];
		/***********************************************
		 * unbinding next and prev buttons so that
		 * they don't interfere with current animation
		 **********************************************/	
		data.prev.off();
		data.next.off();
		data.viewport.off("touchend");
		if(data.settings.autoscroll === "yes") {
			$.fn.als("stop", id);
		}
		/*********************************************
		 * calling step function on this instance
		 * with prev direction
		 *********************************************/
		$.fn.als("step", id, "prev");
		if(data.settings.autoscroll === "yes") {
			$.fn.als("start", id);
		}
	}
	
	/*****************************************************
	 * function that manages "touchstart" action on viewport
	 * @param e event, $obj object 
	 *****************************************************/
	function touchstartHandle(e, $obj) {
		e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		
		var id = find_instance($obj.attr("data-id")),
			data = als[id],
			mm = data.mm,
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		
		if (e.originalEvent.touches === undefined) {
			touch = e;
		}
		
		mm.ox = touch.pageX;
		mm.oy = touch.pageY;
		mm.startTime = new Date().getTime();
	}
	
	/*****************************************************
	 * function that manages "touchend" action on viewport
	 * @param e event, $obj object 
	 *****************************************************/
	function touchendHandle(e, $obj) {
		e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		
		var id = find_instance($obj.attr("data-id")),
			data = als[id],
			mm = data.mm,
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			move = 0;
		
		if (e.originalEvent.touches === undefined) {
			touch = e;
		}
		
		mm.dx = touch.pageX - mm.ox;
		mm.dy = touch.pageY - mm.oy;
		mm.endTime = new Date().getTime() - mm.startTime;
		
		if(data.settings.orientation == "horizontal") {
			move = mm.dx;
		}
		else {
			move = mm.dy;
		}
		
		if(move < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
			// can scroll forth on swipe only if circular or if start_from < num_items
			if(data.settings.circular == "yes" || data.current + data.settings.visible_items < data.settings.num_items) {
				nextHandle(e, $obj);
			}	
		}
		else if(move > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
			// can scroll back on swipe only if circular or if start_from > 0
			if(data.settings.circular == "yes" || data.current > 0) {
				prevHandle(e, $obj);
			}
		}
	}
	
	/********************************************************************
	 * function that generates the plugin and instantiates its methods
	 * @param {Object} method
	 *******************************************************************/
	$.fn.als = function(method) {
	    if(methods[method]) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } 
		else if(typeof method === 'object' || !method) {
	    	return methods.init.apply( this, arguments );
	    } 
		else {
	    	$.error('Method ' +  method + ' does not exist on jQuery.als');
	    }
  	};
		
})(jQuery);