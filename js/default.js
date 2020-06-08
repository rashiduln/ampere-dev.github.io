var NULL      = null,
	TRUE      = true,
	FALSE     = false,
	UNDEFINED = 'undefined',
	WINDOW    = window;

/***
 * Frameweld Website module. This module will have all the global vars used throughout the site.
 */
FWTK.modules.fws = function(fw) {
	var	FWS       = this,
		BODY_TAG  = NULL,
		PAGE_KEY  = NULL,
		PAGES     = {};
		
	function _init() {
		BODY_TAG = $('body');
		PAGE_KEY = BODY_TAG.attr('data-page-key');	
	};
	/**
	 * BEGIN GLOBAL HANDLERS
	 */
	function _handlerAccessibility() {
		$('input[role="button"], button[role="button"]').click(function(e) {
			var btn = $(this);
			
			btn.attr('aria-pressed', TRUE);
			
			if(btn.attr('data-url')) {
				if(btn.attr('data-target')) {
					_openWindow($(this).attr('data-url'));
				} else {
					WINDOW.location = btn.attr('data-url');
				}
			}
		});
		
		$('input[role="checkbox"]').click(function(e) {
			var me = this;
			
			$(me).attr('aria-checked', me.checked);
		});		
	};
	
	function _handlerScroll() {
		var HTML_BODY = $('html, body'),
			SCROLL    = $("#scrollto");
		
		$("#scroll").click(function() { 
			HTML_BODY.animate({ scrollTop: SCROLL.offset().top - 55}, 1000); 
		});
		
		$('.scroll').click(function (e) {
			e.preventDefault();
			
			var ELEMENT = $(this);
			
			HTML_BODY.animate({scrollTop: $(ELEMENT.attr('href')).offset().top - 55}, 1000);
		});
	};
	
	function _handlerNav() {
		var HEADER = $('#fw-header'),
			checkDistance = function() {
	            var distanceY = WINDOW.pageYOffset || document.documentElement.scrollTop,
	                shrinkOn  = 300;
	
	            if (distanceY > shrinkOn) {
	                HEADER.addClass('smaller');
	            } else {
	            	HEADER.removeClass('smaller');
	            }			
			};
		
		checkDistance();
		
		WINDOW.onload = function() {
	        WINDOW.addEventListener('scroll', function(e){
	        	checkDistance();
	        });
	    };
	    
	    var mobile_menu      = $('#menu-toggle-inner'),
	    	mobile_menu_link = $('#mobile-menu-link');
	    
	    mobile_menu_link.click(function(e){
	    	_prevent(e);

	    	mobile_menu.slideToggle();
	    	mobile_menu_link.toggleClass('active');
	    });
	};
	/**
	 * END GLOBAL HANDLERS
	 */
	
	/**
	 * This method will prevent the default bubble of an event from occuring. Only used 
	 * as a utility for minification purpose.
	 * @private
	 */
	function _prevent(e){
		e.preventDefault();
	};
	/**
	 * Aborts with a custom error message.
	 * @private
	 * @throws Error
	 */
	function _abort(message) {
	   throw new Error(message);
	};	
	/**
	 * Checks if an element exists on the page.
	 * @param elem The element to lookup.
	 * @private
	 */
	function _exists(elem) {
		return ($(elem).length > 0 ? TRUE : FALSE);
	};	
	/**
	 * This method will parse a JSON string into a JSON object.
	 * @param string Parse a valid JSON string into an object.
	 * @private
	 * @returns {JSON}
	 */
	function _parseJson(string) { 
		if (_typeOf(string, 'object')) { 
			return string;
		}
		
		return $.parseJSON(string);
	};
	/**
	 * This method will return if the obj is the same type of requested object. Only used
	 * as a utility for minification purpose.
	 * @param obj The object to check t's type.
	 * @param type The type to check for.
	 * @private
	 * @returns {Boolean}
	 */
	function _typeOf(obj, type) {
		return (typeof obj === type);
	};
	/**
	 * Get a random string with numbers, lower/upper case alphabets.
	 * @param L The smount of characters the string should be.
	 * @returns {string}
	 */
	function _getRandomID(L) {
		var _rand = function(l,s) {
			if(l < 1) {
				return s;
			}
	    	var n = Math.floor(Math.random()*62);	    	
	    	if(n<10) s+=n; //1-10
	    	else if(n<36) s+=String.fromCharCode(n+55); //A-Z
	    	else s+=String.fromCharCode(n+61);
	    	return _rand(--l,s);
		};
    	return _rand(L,'');
	};	
		/**
	 * This method will parse a JSON string into a JSON object.
	 * @param string Parse a valid JSON string into an object.
	 * @private
	 * @returns {JSON}
	 */
	function _parseJson(string) { 
		if (_typeOf(string, 'object')) { 
			return string;
		}
		
		return $.parseJSON(string);
	};
	/**
	 * This method will open a window. Only a helper for minification.
	 * @param url The url to open up.
	 * @param name The name of the window being opened.
	 * @param args The arguments to pass to the opener.
	 * @private
	 */
	function _openWindow(url, name, args) {
		window.open(url,(!_typeOf(name,UNDEFINED)?name:""),(!_typeOf(args,UNDEFINED)?args:""));
	}	
	/**
	 * This method will show the main message that floats on top of the page.
	 * @private
	 * @param $msg The message to show.
	 */
	function _showMessage($msg) {
		var container     = (arguments.length > 1) ? arguments[1] : '#message-success',
			msg_container = $(container), 
		    para          = msg_container.find('p');
		
		if($msg) {
			para.html($msg);
		}
		
		msg_container.fadeIn('fast',function(){
			setTimeout(function() {
				msg_container.fadeOut('fast');
			},10000);
		});		
	};	
	/**
	 * NOTE: All public properties and methods go below.
	 */	
	FWS.init        = _init;
	FWS.PAGE_KEY    = function() { return PAGE_KEY; };
	FWS.PAGES       = function() { return PAGES; };
	FWS.BODY_TAG    = function() { return BODY_TAG; };	
	FWS.exists      = _exists;
	FWS.typeOf      = _typeOf;
	FWS.prevent     = _prevent
	FWS.abort       = _abort;
	FWS.parseJson   = _parseJson;
	FWS.showMessage = _showMessage;
	FWS.load        = function() {
		_init();		
		_handlerNav();
		_handlerScroll();
		_handlerAccessibility();
		
		if(FWS.PAGES.hasOwnProperty(PAGE_KEY)) {
			var id  = _getRandomID(16);
			FWS[id] = eval(FWS.PAGES[PAGE_KEY]);
			FWS[id]();
	    }		
	};
	
	fw.fws = FWS;
};

FWTK('ajax', 'fws', 'components', function(fw) {
	var FWS    = fw.fws;

	fw.components('modal');
	modals = fw.modal();
	
	
	FWS.PAGES = {
		index : function() {
			
			var THUMBS = $('.thumb'),
			    SLIDER = $('.client-slider').royalSlider({
						autoPlay : {
				    		enabled: TRUE,
				    		pauseOnHover: TRUE,
				    		delay: 5000
				    	},
				    	navigateByClick: TRUE,		    	
					    arrowsNav:FALSE,
					    arrowsNavAutoHide: TRUE,
					    arrowsNavHideOnTouch: TRUE,
					    keyboardNavEnabled: TRUE
				  })
				  .data('royalSlider');				

			SLIDER.ev.on('rsAfterSlideChange', function(event) {
				THUMBS.removeClass('on');
				$(".thumb:eq("+SLIDER.currSlideId+")").addClass("on");
			});

			THUMBS.click(function(e) {
				var thumb = $(this);
				$('.thumb').removeClass('on');
				
				SLIDER.goTo(thumb.attr('data-slideId'));
				thumb.addClass('on');
				
			}).css({'pointer' : 'cursor'});
		},
		whyUs : function() {
			$('#unfold-all-papers').click(function(e) {
				e.preventDefault();
				
				$('.paperfold:not(:visible)').each(function(e){
					$('#' + this.id).slideToggle();					
				});
			});
			
			$('.paper-fold-container').each(function(e) {
				var me    = $(this),
					btn   = me.find('.paperfold-toggle'),
					paper = me.find('.paperfold'),
					folds = me.find('.items li').length;
				
				btn.click(function(e){
					paper.slideToggle();
				});
			});
		},
		contact : function() {
		
		},
		events: function() {
			var links    = $('a[id^=link-]'),
				sections = $('div[id^=section-]');
			
			links.click(function(e){
				FWS.prevent(e);
				
				links.removeClass('on');
				$(this).addClass('on');
				
				var section = this.id.split('-')[1];
				
				if(section == 'all') {
					sections.show();
				} else {
					sections.hide();
					sections.each(function(){
						if(this.id == 'section-' + section) {
							$(this).show();
							return false;
						}
					});
				}
			});
			backToTop();
		},
		gsaannouncement: function() {
			_handlerContactUs();
		},
		acceleratinginnovation: function() {
			_handlerContactUs();
		},
		learningcommunities: function() {
			_handlerContactUs();
		},
		resourcelibraries : function() {
			_handlerContactUs();
		},
		machinelearning : function() {
			_handlerContactUs();
		},
		cme: function() {
			_handlerContactUs();
		},
		caseStudiesWestat: function () {
			var WINDOW = $(window);
			
			function revealOnScroll() {
				var scrolled = WINDOW.scrollTop(), win_height_padded = WINDOW.height() * 1.1;
			
				$('.revealOnScroll:not(.animated)').each(function () {
					var $this = $(this), offsetTop = $this.offset().top;
					
					if (scrolled + win_height_padded > offsetTop) {
						if ($this.data('timeout')) {
							setTimeout(function () {
								$this.addClass('animated ' + $this.data('animation'));
								//	start all the timers
								$('.timer').countTo(); 
							}, parseInt($this.data('timeout'), 10));
						} else {
							$this.addClass('animated ' + $this.data('animation'));
														  
							//	start all the timers
							$('.timer').countTo();  
						}
					}
				});
				
				$('.revealOnScroll.animated').each(function (index) {
					var $this = $(this), offsetTop = $this.offset().top;
					
					if (scrolled + win_height_padded < offsetTop) {
						$(this).removeClass('animated');
					}
				});
			}
			
			$.fn.countTo = function (options) {
				options = options || {};
				
				return $(this).each(function () {
					// set options for current element
					var settings = $.extend({}, $.fn.countTo.defaults, {
						from:            $(this).data('from'),
						to:              $(this).data('to'),
						speed:           $(this).data('speed'),
						refreshInterval: $(this).data('refresh-interval'),
						decimals:        $(this).data('decimals')
					}, options);
					
					// how many times to update the value, and how much to increment the value on each update
					var loops = Math.ceil(settings.speed / settings.refreshInterval),
						increment = (settings.to - settings.from) / loops;
					
					// references & variables that will change with each update
					var self = this,
						$self = $(this),
						loopCount = 0,
						value = settings.from,
						data = $self.data('countTo') || {};
					
					$self.data('countTo', data);
					
					// if an existing interval can be found, clear it first
					if (data.interval) {
						clearInterval(data.interval);
					}
					data.interval = setInterval(updateTimer, settings.refreshInterval);
					
					// initialize the element with the starting value
					render(value);
					
					function updateTimer() {
						value += increment;
						loopCount++;
						
						render(value);
						
						if (typeof(settings.onUpdate) == 'function') {
							settings.onUpdate.call(self, value);
						}
						
						if (loopCount >= loops) {
							// remove the interval
							$self.removeData('countTo');
							clearInterval(data.interval);
							value = settings.to;
							
							if (typeof(settings.onComplete) == 'function') {
								settings.onComplete.call(self, value);
							}
						}
					}
					
					function render(value) {
						var formattedValue = settings.formatter.call(self, value, settings);
						$self.html(formattedValue);
					}
				});
			};
			
			$.fn.countTo.defaults = {
				from: 0,               // the number the element should start at
				to: 0,                 // the number the element should end at
				speed: 1000,           // how long it should take to count between the target numbers
				refreshInterval: 100,  // how often the element should be updated
				decimals: 2,           // the number of decimal places to show
				formatter: formatter,  // handler for formatting the value before rendering
				onUpdate: null,        // callback method for every time the element is updated
				onComplete: null       // callback method for when the element finishes updating
			};
			
			function formatter(value, settings) {
				return value.toFixed(settings.decimals);
			}

			revealOnScroll();
			WINDOW.on('scroll', revealOnScroll);
		}
    };

	function _handlerContactUs() {
		$('#contact-us').submit(function (e) {
			e.preventDefault();
			
			var form       = $(this),
				container  = form.parents('div'),
				successmsg = container.find('#message-success');
			    errormsg   = container.find('#message-error');
			
		    successmsg.hide();
		    errormsg.hide();

		    form.find('.input-error').removeClass('input-error');
		    
			fw.makeRequest(
				{
					url: location.pathname.replace('.html','') + '/contact/',
					method: 'POST',
					data: form.serializeArray(),
					dataType: 'json'
				},
				function (response) {
					if (response.success) { 
						successmsg.text('Thanks for getting in touch with us.').fadeIn();
						
						form[0].reset();
						form.find('textarea').val('');
					} else {
						errormsg.text(response.data ? response.data : 'Internal error. Plese refresh and try again.' ).fadeIn();
						if(response.fields) {
							var fields = response.fields.split(',');
							for(var i in fields) {
								form.find('input[name="'+fields[i]+'"], textarea[name="'+fields[i]+'"]').addClass('input-error');
							}
						}
					}
					
					form.find('[name="is_submitted"]').val(response.key);
				}
		);
		});		
	};
	
	function backToTop() { 
		// hide .back-to-top first
		$('.back-to-top').hide();

		// fade in .back-to-top
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('.back-to-top a').click(function () {
			$('body,html').animate({scrollTop: 0}, 1000);
			return false;
		});
	};
	
	FWS.load();
});
