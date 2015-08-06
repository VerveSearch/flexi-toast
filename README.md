# flexi-toast 

A Toast element, optionally allows a preloader visualisation, message update, and duration setting.

## Dependencies and Libraries 

1. jquery.min.js 
2. materialize.css


## Usage

Instantiate the plugin.
type - to set the proogress bar type; can be 'indeterminate', 'determinate' or 'circular' by default.
center - to position the element in the screen center, default value - false;
functions:
	show(text,disposable,duration), returns a promise;
	hide(resolverPromise);
	FlexiToast('bar').setProgress(progressBarValue); 




```javascript

	var toast = $('.flexi-toast').FlexiToast({ 
	    'type' : 'indeterminate',
		'center' : true
	});

	toast.FlexiToast().show('This is my message for the user',true,2000)
		.then(function(){ 
			//any code goes here
		});

	toast.FlexiToast('bar').setProgressBar(40);
	 
	
```