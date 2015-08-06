$(document).ready( function(){

	var toast = $('.flexi-toast').FlexiToast({ 
	    'type' : 'indeterminate',
		'center' : true
	});

	toast.FlexiToast().show('123123123',true,2000)
		.then(function(){ 
			console.log('olaaa')
		});
})

 