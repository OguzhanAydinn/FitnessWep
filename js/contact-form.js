/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
    $("#reg-btn").click(function(){
        
        //get input field values
        var user_name = $('input[name=username]').val();
        var user_email = $('input[name=email]').val();
        var user_password = $('input[name=password]').val();
        var user_repassword = $('input[name=re-password]').val();
		pred(user_repassword);
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (user_password == "") {
            $('input[name=password]').css('border-color', '#e41919');
            proceed = false;
        }
        if(user_password!=user_repassword){
			$('input[name=password]').css('border-color', '#e41919');
			$('input[name=re-password]').css('border-color', '#e41919');
			proceed = false;
		}
        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'user_password': user_password,
				'user_repassword':user_repassword
            };
            
            //Ajax post data to server
            $.post('index.php?p=1&a=2&', post_data, function(response){
            
                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                }
                else {
                
                    output = '<div class="success">' + response.text + '</div>';
                    
                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }
                
                $("#result").hide().html(output).slideDown();
            }, 'json');
            
        }
        
        return false;
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function(){
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });
    
});
