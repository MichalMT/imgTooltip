/**************************************************

imgTooltip
author: https://github.com/MichalMT

**************************************************/

var imgTooltip = (function(){
	
	"use strict";
	
	var createdTooltips = [];
	
	// initialization
	function init(options){
		
		var N;
		for (N=0; N<options.tooltips.length; N++){
			
			var htmlCollection = document.getElementsByClassName(options.tooltips[N].el);
			if( 
				options.tooltips[N].el  !== undefined &&
				options.tooltips[N].img !== undefined &&
				htmlCollection.length    >  0 
			  )
			{
				Array.prototype.forEach.call(htmlCollection, function(triggerElement){

					createdTooltips.push( new Tooltip(options, triggerElement, N) );
				})
			}
		}
		
		handleResize();
		
		handleTouchScreen();
		
		if(options.custom)
		{
			var ins;
			for(ins=0; ins<createdTooltips.length; ins++){
				options.custom.call(createdTooltips[ins].tooltipA);
			}
		}
		

	}
	
	// constructor
	function Tooltip(options, triggerElement, N){
		
		// set options
		this.height     = options.tooltips[N].height     || options.height     || 80;
		this.width      = options.tooltips[N].width      || options.width      || 80;
		this.radius     = options.tooltips[N].radius     || options.radius     || 15;
		this.boxShadow  = options.tooltips[N].boxShadow  || options.boxShadow  || "0 0 8px #111";
		this.bgSize     = options.tooltips[N].bgSize     || options.bgSize     || "cover";
		this.bgRepeat   = options.tooltips[N].bgRepeat   || options.bgRepeat   || "no-repeat";
		this.bgPosition = options.tooltips[N].bgPosition || options.bgPosition || "center center";
		this.href       = options.tooltips[N].href       || options.href;
		this.imgUrl     = options.tooltips[N].img;
		
		this.triggerElement = triggerElement;
		
		// create tooltip and bind events on tooltip and trigger element
		this.create();
		this.style();
		this.setPosition();
		this.addEvents();
		
		// call custom function (if exists)
		// "this" is pontinting at <a> element (tooltip)
		if(options.tooltips[N].custom)
		{
			options.tooltips[N].custom.call(this.tooltipA);
		}
	}
	
	// remove all tooltips
	function remove(){
		
		var ins;
		for(ins=0; ins<createdTooltips.length; ins++){
			document.body.removeChild(createdTooltips[ins].tooltipA);
		}
		createdTooltips = [];
	}
	
	// update position of tooltips on resize
	function handleResize(){
		
		function onResize(){
			
			var ins;
			for(ins=0; ins<createdTooltips.length; ins++){
				createdTooltips[ins].setPosition();
			}
		}
		
		if(window.addEventListener)
		{
			window.addEventListener("resize", onResize, false);
		}
		else if(window.attachEvent)
		{
			window.attachEvent("onresize", onResize);
		}
		else
		{
			window.onresize = onResize;
		}
	}
	
	function handleTouchScreen(){
		
		function touchFadeOut(e){
			
			var ins;
			for(ins=0; ins<createdTooltips.length; ins++){
				if(createdTooltips[ins].triggerElement !== e.target)
				{
					createdTooltips[ins].tooltipA.style.transition = "opacity .5s, visibility .5s linear";
					createdTooltips[ins].tooltipA.style.opacity = 0;
					createdTooltips[ins].tooltipA.style.visibility = "hidden";
					createdTooltips[ins].triggerElement.style.textDecoration = "none";
				}
			}
		}
		
		document.body.addEventListener("touchstart", touchFadeOut, false);
	}
	
	// methods for creating tooltip
	Tooltip.prototype = {

		create: function(){
			
			this.tooltipA= document.createElement('a');
			if( this.href )
			{
				this.tooltipA.setAttribute("href", this.href);
				this.tooltipA.setAttribute("target", "_blank");
			}
			else if( this.triggerElement.hasAttribute("href") )
			{
				this.tooltipA.setAttribute("href", this.triggerElement.getAttribute("href") );
				this.tooltipA.setAttribute("target", "_blank");
			}
			document.body.appendChild(this.tooltipA);
		},

		style: function(){
			
			var s = this.tooltipA.style;
			
			s.position           = "absolute";
			s.height             = this.height + "px";
			s.width              = this.width + "px";
			s.borderRadius       = this.radius + "px";
			s.boxShadow          = this.boxShadow;
			s.opacity            = 0;
			s.visibility         = "hidden";
			s.backgroundImage    = 'url('+this.imgUrl+')';
			s.backgroundSize     = this.bgSize;
			s.backgroundRepeat   = this.bgRepeat;
			s.backgroundPosition = this.bgPosition;
		},

		setPosition: function(){
			
			var positionTop  = this.triggerElement.offsetTop - this.height - 5 + "px";
			var positionLeft = this.triggerElement.offsetLeft + this.triggerElement.offsetWidth/2 - this.width/2 + "px";
			
			// put tooltip below trigger element if there is not enough space above trigger element
			if(
			   this.triggerElement.offsetTop-positionTop<2 &&
			   window.innerHeight-this.triggerElement.offsetTop-this.triggerElement.height-5-this.height>0
			  )
			{
				positionTop = this.triggerElement.offsetTop + this.triggerElement.height + 5 + "px";
			}
			
			this.tooltipA.style.top  = positionTop;
			this.tooltipA.style.left = positionLeft;
		},

		addEvents: function(){

			var self = this;

			function fadeIn(e){
				self.tooltipA.style.transition = "opacity .5s, visibility 0s linear";
				self.tooltipA.style.visibility = "visible";
				self.tooltipA.style.opacity = 1;
			}

			function fadeOut(){
				self.tooltipA.style.transition = "opacity .5s, visibility .5s linear";
				self.tooltipA.style.opacity = 0;
				self.tooltipA.style.visibility = "hidden";
			}
			
			function touchFadeIn(e){
				
				if(self.tooltipA.style.visibility == "hidden")
				{
					e.preventDefault();
					self.tooltipA.style.transition = "opacity .5s, visibility 0s linear";
					self.tooltipA.style.visibility = "visible";
					self.tooltipA.style.opacity = 1;
					self.triggerElement.style.textDecoration = "underline";
				}
				else
				{
					self.triggerElement.style.textDecoration = "none";
				}
			}

			if (document.addEventListener)
			{
				this.triggerElement.addEventListener("touchstart", touchFadeIn, false);
				this.triggerElement.addEventListener("mouseover", fadeIn , false);
				this.tooltipA.addEventListener("mouseover", fadeIn , false);
				this.triggerElement.addEventListener("mouseleave", fadeOut , false);
				this.tooltipA.addEventListener("mouseleave", fadeOut , false);				
			}
			else if (document.attachEvent)
			{
				this.triggerElement.attachEvent("onmouseover", fadeIn);
				this.tooltipA.attachEvent("onmouseover", fadeIn);
				this.triggerElement.attachEvent("onmouseleave", fadeOut);
				this.tooltipA.attachEvent("onmouseleave", fadeOut);
			} 
			else
			{
				this.triggerElement.onmouseover = fadeIn;
				this.tooltipA.onmouseover = fadeIn;
				this.triggerElement.onmouseout = fadeOut;
				this.tooltipA.onmouseout = fadeOut;
			}
		}

	};
	
	return {
		init: init,
		remove: remove
	}
	
})();
