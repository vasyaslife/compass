$(function(){

  $('i.fa-bars').click(function(){
      $('.nav-ham').toggleClass('nav-ham_show');
    })
 
	$('i.scrollto').click(function(){
		var elementClick = '#' +$(this).attr('data-scroll').split('#')[1];
		var destination = $(elementClick).offset().top;
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
		return false;
	})

	$('.review-slick').slick({
		dots: true,
  		infinite: false,
  		autoplay: true,
  		autoplaySpeed: 2000,
  		arrows: true,
  		speed: 300,
  		slidesToShow: 1,
  		adaptiveHeight: true,
  		edgeFriction: 0.25,
  		responsive: [
			{
			breakpoint: 860,
				settings: {
					arrows: false,
				}
			},
			{
			breakpoint: 480,
				settings: {
					arrows: false,
				}
			}
		],
		prevArrow: '<i class="fas fa-angle-left review-field__arrow review-field__arrow_left"></i>',
		nextArrow: '<i class="fas fa-angle-right review-field__arrow review-field__arrow_right"></i>'
	});

	$('i.fa-phone-volume').click(function(){
		 $('#modalForm').arcticmodal();
	})

	$('[data-submit]').click (function(e){
	    e.preventDefault();
		$(this).parent('form').submit();
	})
	$.validator.addMethod(
	    "regex",
	    function(value, element, regexp) {
	        var re = new RegExp(regexp);
	        return this.optional(element) || re.test(value);
	    },
	    "Please check your input."
	);
	function valEl(el){
		 
          el.validate({
        rules:{
          tel:{
            required:true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name:{
            required:true
          },
          email:{
          	required:true,
            email:true
          }
        },
          messages:{
            tel:{
              	required:'Поле обязательно для заполнения',
              	regex:'Телефон может содержать символы + - ()'
            },
            name:{
              	required:'Поле обязательно для заполнения',
            },
            email:{
            	required:'Поле обязательно для заполнения',	
            	email:'Неверный формат E-mail'
            }
        },            
        submitHandler: function (form) {
        	$('#loader').fadeIn();
	        var $form = $(form);
	        var $formId = $(form).attr('id');
	        switch($formId){
	          case'goToNewPage':
	            $.ajax({
	                  type: 'POST',
	                  url: $form.attr('action'),
	                  data: $form.serialize(),
	                })
	                .always(function (response) {  
	                    //ссылка на страницу "спасибо" - редирект
	                    location.href='https://wayup.in/lm/landing-page-marathon/success';
	                    //отправка целей в Я.Метрику и Google Analytics
	                    ga('send', 'event', 'masterklass7', 'register');
			    yaCounter27714603.reachGoal('lm17lead');
	            });
	        break;        
	        case'popupResultModal':
	        $('#modalForm').arcticmodal('close');
            $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize(),
                })
                .always(function (response) { 
                setTimeout(function (){
                 $('#loader').fadeOut();
                },800);
                setTimeout(function (){
                  $('#overlay').fadeIn();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                },1100);
                $('#overlay').on('click', function(e) {
  					$('#overlay').fadeOut();
				});    
            });
            case'popupResult':
            $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize(),
                })
                .always(function (response) { 
                setTimeout(function (){
                 $('#loader').fadeOut();
                },800);
                setTimeout(function (){
                  $('#overlay').fadeIn();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                },1100);
                $('#overlay').on('click', function(e) {
  					$('#overlay').fadeOut();
				});    
            });
        break;          
        }       
return false; 
    }                           
  });
        }                        
     
              $('.js-form').each(function() {
                valEl($(this)); 
              });
		// $('[data-scroll]').on('click', function(){
		// 	$('html, body').animate({
		//         scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
		//     }, 2000);
		//     event.preventDefault();
		// }) 
});
