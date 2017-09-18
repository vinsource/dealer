///////////////////////////
// ----- FUNCTIONS ----- //
///////////////////////////

// trim whitespace and special characters
function trim(s) { s = s.replace(whitespace, ''); s = s.replace(specialChar, ''); return s;}
// check if string is numbers only
function numonly(s) {var r = !isNaN(s); return r;}
// test for specific patterns such as email, phone, SSN, and ZIP
function validate(v, e) {return !e.test(v);}
// check for symbols, if found return true
function nosymbol(s) {var r = s.search(specialChar); if (r >= 0) {r = true;} else {r = false;} return r;}
// field error
function error($change){$change.addClass('error').removeClass('success').find('.help-inline').remove().end();}
// correct field
function complete($change) {$change.removeClass('error').addClass('success').find('.help-inline').fadeOut('slow');}
// form completed improperly
function improper($change, $element_id) {event.preventDefault(); $change.append('<div class="alert alert-error"><a class="close" data-dismiss="alert" href="">x</a>' + $element_id.charAt(0).toUpperCase() + $element_id.slice(1) +' has not been filled out correctly! </div>');}
// empty field  
function empty($change) {$change.removeClass('error').removeClass('success').find('.help-inline').fadeOut('slow');}
// required field 
function required ($change, $element_id) {event.preventDefault(); $change.append('<div class="alert alert-error"><a class="close" data-dismiss="alert" href="">x</a>'+ $element_id.charAt(0).toUpperCase() + $element_id.slice(1)+' is a required field!</div>');}

///////////////////////////////////////////////
// VALIDATION SCRIPT
///////////////////////////////////////////////
$(document).ready(function(e) {
  // initialize variables
  var numOnlyCheck = /^\d+$/; var emailCheck =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; var whitespace = / /g; var specialChar = /[^0-9a-zA-Z]/; var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/; var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;


  //////////////////////////////////////
  // ------- Active Validation ------- /
  /////////////////////////////////////
  $('input').change(function(){
    // initialize variables
    var $input  = $(this), 
        $val    = $input.val(), 
        $status = $input.parent(), 
        $id     = $input.attr('id'); 

      //////////////////////////
      // If has no value and
      // has required class
      // then add error, else
      // remove all errors.
      /////////////////////////
      if (!$val) {
        if ($input.hasClass('required')) {
          error($status);
          $status.append('<span class="help-inline">This field is required!</span>')
        } else {
          empty($status); 
        }
      

      ////////////////////////
      // If it is not empty
      // validate based on id
      ////////////////////////
      } else {
      
      if ($id == 'VIN') {

        if ($val.length != 17 || !validate($val, specialChar)) {
          error($status); 
          $status.append('<span class="help-inline">Invalid VIN Number!</span>');
        } else { 
          complete($status); 
        }
        
      } else if ($id == 'email') {
        
        if (validate($val, emailCheck)) {
          error($status);
          $status.append('<span class="help-inline">Invalid email!</span>');  
        } else {
          complete($status);  
        }
        
      } else if ($input.hasClass('number')) {
        if (validate($val, numOnlyCheck)) {
          if ($id == 'year') {
        error($status);
        $status.append('<span class="help-inline">Invalid year!</span>');
      } else if ($id == 'phone') {
      error($status);
      $status.append('<span class="help-inline">Invalid phone number!</span>')
      } else if ($id == 'zip') {
      error($status);
      $status.append('<span class="help-inline">Invalid zip!</span>')
        } else {
        error($status);
            $status.append('<span class="help-inline">Not a number!</span>'); 
      }
        } else {
     if ($id == 'year') {
      if ($val.length != 4) {
        error($status);
        $status.append('<span class="help-inline">Invalid year!</span>');   
      } else {
        complete($status);
      }
      } else if ($id == 'phone') {
        if (validate($val, phoneNumber)) {
        error($status);
        $status.append('<span class="help-inline">Invalid phone number!</span>');  
        } else {
        complete($status);
        }
      } else if ($id == 'zip') {
        if (validate($val, zipCode)) {
        error($status);
        $status.append('<span class="help-inline">Invalid zip!</span>');  
        } else {
        complete($status);
        }
      } else {
      complete($status);
      }
    } 
      } else {
        complete($status);
      }
    }
  });
});
