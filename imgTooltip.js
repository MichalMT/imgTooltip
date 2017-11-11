/**************************************************

imgTooltip
version: 1.0.0
author: https://github.com/MichalMT

**************************************************/

var imgTooltip = (function(){
	
	"use strict";
	
	// array for storing all objects (tooltips) 
	var createdTooltips = [];
	
	var ins;
	
	// initialization
	function init(options){
		
		var N;
		for (N=0; N<options.tooltips.length; N++){
			
			var htmlCollection = document.getElementsByClassName(options.tooltips[N].el);
			if( 
				options.tooltips[N].el !== undefined &&
				options.tooltips[N].img !== undefined &&
				htmlCollection.length > 0 
			  )
			{
				Array.prototype.forEach.call(htmlCollection, function(triggerElement){

					createdTooltips.push( new Tooltip(options, triggerElement, N) );
				})
			}
		}
		
		handleResize();
		
		if(options.custom)
		{
			for(ins=0; ins<createdTooltips.length; ins++){
				options.custom.call(createdTooltips[ins].tooltipA);
			}
		}
	}
	
	// constructor
	function Tooltip(options, triggerElement, N){
		
		// set options
		this.height = options.tooltips[N].height || options.height || 80;
		this.width = options.tooltips[N].width || options.width || 80;
		this.radius = options.tooltips[N].radius || options.radius || 15;
		this.href = options.tooltips[N].href;
		this.imgUrl = options.tooltips[N].img;
		
		this.triggerElement = triggerElement;
		
		// create tooltip and bind events on tooltip and trigger element
		this.createElements();
		this.styleElements();
		this.setPosition();
		this.addEvents();
		
		// call custom function (if exists)
		// "this" is pontinting at <a> (root element of tooltip)
		if(options.tooltips[N].custom)
		{
			options.tooltips[N].custom.call(this.tooltipA);
		}
	}
	
	// update position of tooltips on resize
	function handleResize(){
		
		function onResize(){
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
	
	// remove all tooltips
	function remove(){
		for(ins=0; ins<createdTooltips.length; ins++){
			document.body.removeChild(createdTooltips[ins].tooltipA);
		}
		createdTooltips = [];
	}
	
	// methods for creating tooltip
	Tooltip.prototype = {

		createElements: function(){
			this.tooltipA= document.createElement('a');
			this.tooltipA.innerHTML= "<img src='"+this.imgUrl+"'>";
			this.tooltipIMG = this.tooltipA.firstChild;
			if( this.href )
			{
				this.tooltipA.setAttribute("href", this.href);
			}
			else if( this.triggerElement.hasAttribute("href") )
			{
				this.tooltipA.setAttribute("href", this.triggerElement.getAttribute("href") );
			}
			document.body.appendChild(this.tooltipA);
		},

		styleElements: function(){
			this.tooltipA.style.position = "absolute";
			this.tooltipA.style.height = this.height + "px";
			this.tooltipA.style.width = this.width + "px";
			this.tooltipA.style.borderRadius = this.radius + "px";
			this.tooltipA.style.boxShadow = '0 0 8px #111';
			this.tooltipA.style.opacity = 0;
			this.tooltipA.style.visibility = "hidden";

			this.tooltipIMG.style.boxSizing = "borderBox";
			this.tooltipIMG.style.height = this.height + "px";
			this.tooltipIMG.style.width = this.width + "px";
			this.tooltipIMG.style.borderRadius = this.radius + "px";
		},

		setPosition: function(){
			var positionTop = this.triggerElement.offsetTop - this.height - 5 + "px";
			var positionLeft = this.triggerElement.offsetLeft + this.triggerElement.offsetWidth/2 - this.width/2 + "px";
			
			// put tooltip below trigger element if there is not enough space above trigger element
			if(this.triggerElement.offsetTop-positionTop<2 && 
			   window.innerHeight-this.triggerElement.offsetTop-this.triggerElement.height-5-this.height>0
			  )
			{
				positionTop = this.triggerElement.offsetTop + this.triggerElement.height + 5 + "px";
			}
			
			this.tooltipA.style.top = positionTop;
			this.tooltipA.style.left = positionLeft;
		},

		addEvents: function(){

			var self = this;

			function fadeIn(){
				self.tooltipA.style.transition = "opacity .5s, visibility 0s linear";
				self.tooltipA.style.visibility = "visible";
				self.tooltipA.style.opacity = 1;
			}

			var fadeOut = function(){
				self.tooltipA.style.transition = "opacity .5s, visibility .5s linear";
				self.tooltipA.style.opacity = 0;
				self.tooltipA.style.visibility = "hidden";
			}


			if (document.addEventListener)
			{
				this.triggerElement.addEventListener("mouseover", fadeIn , false);
				this.tooltipIMG.addEventListener("mouseover", fadeIn , false);
				this.triggerElement.addEventListener("mouseleave", fadeOut , false);
				this.tooltipIMG.addEventListener("mouseleave", fadeOut , false);
			}
			else if (document.attachEvent)
			{
				this.triggerElement.attachEvent("onmouseover", fadeIn);
				this.tooltipIMG.attachEvent("onmouseover", fadeIn);
				this.triggerElement.attachEvent("onmouseleave", fadeOut);
				this.tooltipIMG.attachEvent("onmouseleave", fadeOut);
			} 
			else
			{
				this.triggerElement.onmouseover = fadeIn;
				this.tooltipIMG.onmouseover = fadeIn;
				this.triggerElement.onmouseout = fadeOut;
				this.tooltipIMG.onmouseout = fadeOut;
			}
			
		}

	};
	
	return {
		init: init,
		remove: remove
	}
	
})();
