$(function() {
    
    $(".marcador_linha").change(function() {
       if($(this).is(':checked')) {
           $(this).parents("tr").addClass("linha-marcada");
       } else {
           $(this).parents("tr").removeClass("linha-marcada");
       }    
    });
	
	// Confirmação quando Vai fechar o App
	document.addEventListener("backbutton", function(){
		if(confirm("Tem certeza que deseja fechar o programa?")){
			navigator.app.exitApp();
		}
	},false);
	
	// Colori o select quando existe valor
	$('select').on('change', function(e){
		if($(this).val())
		{
			$(this).css('background', 'green');
			$(this).css('color', 'white');
		} else {
			$(this).css('background', 'initial');
			$(this).css('color', 'initial');
		}
	})
	;
});