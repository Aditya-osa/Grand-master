<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Allow CORS so client-side React fetch can communicate seamlessly
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Support JSON payload from fetch or standard application/x-www-form-urlencoded
$raw_input = file_get_contents('php://input');
if (!empty($raw_input)) {
    $json_input = json_decode($raw_input, true);
    if (is_array($json_input)) {
        $_REQUEST = array_merge($_REQUEST, $json_input);
    }
}

$firstName = isset($_REQUEST['firstName']) ? trim($_REQUEST['firstName']) : '';
$lastName  = isset($_REQUEST['lastName']) ? trim($_REQUEST['lastName']) : '';
$name      = isset($_REQUEST['name']) && !empty($_REQUEST['name']) 
              ? trim($_REQUEST['name']) 
              : trim("$firstName $lastName");

$email     = isset($_REQUEST['email']) ? trim($_REQUEST['email']) : '';
$phone     = isset($_REQUEST['phone']) && !empty($_REQUEST['phone']) ? trim($_REQUEST['phone']) : 'N/A';
$company   = isset($_REQUEST['company']) && !empty($_REQUEST['company']) ? trim($_REQUEST['company']) : 'N/A';
$service   = isset($_REQUEST['service']) && !empty($_REQUEST['service']) ? trim($_REQUEST['service']) : 'Grand Master Vodka';
$message   = isset($_REQUEST['message']) && !empty($_REQUEST['message']) 
              ? trim($_REQUEST['message']) 
              : (isset($_REQUEST['comment']) ? trim($_REQUEST['comment']) : '');

// Verify required fields (valid email and name)
if (!empty($email) && (!empty($name) || !empty($firstName) || !empty($phone))) {
    $subject = "Deejay Distilleries - Inquiry From Website";
    $to ='mail@Grandmasters.co';

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= "From: drout@deejays.in\r\n";
    if (!empty($email)) {
        $headers .= "Reply-To: " . $email . "\r\n";
    }
    $headers .= "Cc: krushika@10dumbs.com\r\n";

    $mail_content = '<div>
<div class="HEADER"> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" class="w-resize100" width="520">
      <tbody>   
         <tr>   
            <td align="center" bgcolor="" class="h-resize100" valign="top" width="600">
               <div>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="w-resize100" width="520" style="border: 1px solid #eaeaea;background: #ffffff;">
                     <tbody>
                        <tr>
                           <td align="center" class="h-resize100" height="120"><a href="https://deejaydistilleries.com/" style="color: rgb(122, 185, 222)" target="_blank" rel="noreferrer"><img alt="" border="0" width="100" style="border: none; user-select: none;margin-bottom: 0px;padding: 20px;" src="https://deejaydistilleries.com/assets/images/logo.png"></a></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<div class="MODULE-4-NO-BORDER">
   <table align="center" border="0" cellpadding="0" cellspacing="0" class="w-resize100" width="520">
      <tbody>
         <tr>
            <td bgcolor="#eaeaea">
               <table border="0" cellpadding="0" cellspacing="0" class="w-resize90" width="520">
                  <tbody>
                     <tr>
                        <td class="remove" width="40" style="line-height: 0; font-size: 0">&nbsp;</td>
                        <td align="center" class="stack w-resize100" valign="top" width="460">
                           <table border="0" cellpadding="0" cellspacing="0" class="w-resize90" width="100%">
                              <tbody>
                                 <tr>
                                    <td height="40" style="font-size: 0; line-height: 0">&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="w-resize100 text15" align="left" style="font-family: Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 14px; color: #222222; line-height: 20px; letter-spacing: 0.025em">
                                       <p>Hello Admin, </p>
                                       <p>A visitor left you an inquiry </p>
                                       <p><u>Please find the below details :</u></p>
                                       <p>Name : ' . htmlspecialchars($name) . '</p>
									   <p>Email : ' . htmlspecialchars($email) . '</p>
                                       <p>Phone: ' . htmlspecialchars($phone) . '</p>
                                       <p>Company: ' . htmlspecialchars($company) . '</p>
                                       <p>Service: ' . htmlspecialchars($service) . '</p>
                                       <p>Message: ' . nl2br(htmlspecialchars($message)) . '</p>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
            <td class="remove" width="40" style="line-height: 0; font-size: 0">&nbsp;</td>
         </tr>
      </tbody>
   </table>
   </td>
   </tr></tbody></table>
</div>
<div class="FOOTER">
   <table class="w-resize100" width="520" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="" style="border: 1px solid #eaeaea;background: #ffffff;">
      <tbody>
         <tr>
            <td bgcolor="" align="center" valign="top" style="padding: 10px;"><a href="https://deejaydistilleries.com/" style="color: rgb(122, 185, 222)" target="_blank" rel="noreferrer"><img width="100" height="" border="0" style="border: none; user-select: none;margin-bottom:20px;padding: 20px;" src="https://deejaydistilleries.com/assets/images/logo.png" width="100"></a></td>
         </tr>
         <tr>
            <td bgcolor="#eaeaea" height="18" style="line-height: 0; font-size: 0">&nbsp;</td>
         </tr>
         <tr>
            <td bgcolor="" align="center" style="font-family: Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 14px;color: #000000;background: #eaeaea; letter-spacing: .05em; line-height: 18px; padding: 0px 20px 0px 20px">
               <p style="font-size: 12px">Deejay Distilleries</p>
            </td>
         </tr>
         </tr>
      </tbody>
   </table>
</div>
<div style="display: none; white-space: nowrap; font: 12px courier; line-height: 0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
';

    $mail_sent = @mail($to, $subject, $mail_content, $headers);

    // If client requested JSON via AJAX/fetch
    $is_json_request = (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) ||
                       (!empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false);

    if ($is_json_request) {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'success' => true,
            'message' => "We've received your information"
        ]);
        exit;
    }

    // Default redirect for HTML form submissions
    header("location: thankyou.html");
    exit;
} else {
    $is_json_request = (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);
    if ($is_json_request) {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'Please fill in all required fields.'
        ]);
        exit;
    }

    echo "<script>
		    alert('Your mail is not sent Properly Please Try Again...');
        </script>";
}
?>
