  (function(W,$){
  	W.vs =  W.vs || {};


  	W.vs.FlexiToast = function(el, args){ 
  		var opts = args || {};
  		this.element = (el) ? el.addClass('flexi-toast animated bounceIn') : $('<div class="flexi-toast">').appendTo('body'); 
  		console.log(this.element)
  		this.text = opts.text || (el) ? el.html() : '';
  		this.center = opts.center || false;
  		this.type = opts.type || ''; 
  		this.def = null;
  	};

  	W.vs.FlexiToast.boot = function(){
		$('.flexi-toast[data-flexi-toast]').each(function(k,o){
			if(!$(this).data('__FLEXI_TOAST__')){
				$(this).data('__FLEXI_TOAST__', new W.vs.FlexiToast(this));
			}
		});
	};

	W.vs.FlexiToast.prototype = {
		onSwipeOut: function(e){
			if (e.which !== 1){
				return false;
			}
			var self = this, className = (self.element[0].offsetLeft < e.pageX) ? "fadeOutRight" : "fadeOutLeft"; 
		        self.element.addClass('animated ' + className);
		},
		render: function(){
			var self= this, preloader = (this.type != '') ? '<div class="progress"><div class="'+this.type+'"></div></div>' :  '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"> <div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div>';
			this.textEL = (this.element.find('.toast-text').length != 0) ? (this.element.find('.toast-text').html(this.text)) : $('<div class="toast-text"></div>').appendTo(this.element).html(this.text);
			this.element.append(preloader);
			if(this.center){ 
				$(window).on('resize', $.proxy(this.onResize, this));
				$(window).trigger('resize');
			}
			this.element.hide();
		},
		onTimeout:function(def){
			this.element.addClass('animated fadeOutUp');
			this.def.resolve({});
		},
		onResize:function(){
			this.element.css({
				'top': $(window).height()/2 - (this.element.height()/2),
				'left' : $(window).width()/2 - (this.element.width()/2)
			}); 
		},
		hide:function(noResolve){ 
			if (!noResolve){
				this.def.resolve();
			}
		},
		show:function(text,disposable,duration){
			this.textEL.html(text);
			this.element.show(); 
			this.def=$.Deferred(); 
			if (duration){
				setTimeout($.proxy(this.onTimeout,this,this.def),duration); 
			}
			if(disposable){
				this.element.on('mousemove', $.proxy(this.onSwipeOut, this));
			}
			return this.def.promise(); 
		},
		setProgress: function(val){  
			var self = this, bar = this.element.find('.progress').children('.determinate');
			if(val ==100){ 
				bar.css('width', val+'%');
				setTimeout(function(){ 
				  	self.element.addClass('animated fadeOutUp');
				},500);
				return;
			} 
			bar.css('width', val+'%'); 
		}
	};

	$.fn.FlexiToast = function(options){ 
		if ((options === 'bar'|| options === undefined) && $(this).data('__FLEXI_TOAST__') ){
			return $(this).data('__FLEXI_TOAST__');
		} 
		return this.each(function(){
			var e;
			$(this).data('__FLEXI_TOAST__', e = new W.vs.FlexiToast($(this), options));
			e.render();
		});
	};

	$(document).ready(function(){
		W.vs.FlexiToast.boot(); 
	});
	W.vs = W.vs || {};
})(window,jQuery);