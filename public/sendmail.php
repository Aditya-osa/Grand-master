<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Allow CORS so client-side React fetch can communicate seamlessly
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Support FormData ($_POST), JSON payload from fetch, or application/x-www-form-urlencoded
if (!empty($_POST)) {
    $_REQUEST = array_merge($_REQUEST, $_POST);
}
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
$phone     = isset($_REQUEST['phone']) && !empty($_REQUEST['phone']) ? trim($_REQUEST['phone']) : 'Website Inquiry';
$company   = isset($_REQUEST['company']) && !empty($_REQUEST['company']) ? trim($_REQUEST['company']) : 'Grand Master Vodka';
$service   = isset($_REQUEST['service']) && !empty($_REQUEST['service']) ? trim($_REQUEST['service']) : 'General Inquiry';
$message   = isset($_REQUEST['message']) && !empty($_REQUEST['message']) 
              ? trim($_REQUEST['message']) 
              : (isset($_REQUEST['comment']) ? trim($_REQUEST['comment']) : '');

// Set response header to JSON always for modern AJAX
header('Content-Type: application/json; charset=utf-8');

// Verify required fields (valid email format and name)
$valid_email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($valid_email && (!empty($name) || !empty($firstName))) {
    $subject = "Grand Master Vodka - Inquiry From Website (" . $name . ")";
    
    // Official recipient (Sends to both your business and personal email)
    $to = 'mail@grandmasters.co, adityasahu15571@gmail.com';

    // IMPORTANT: The "From" & Envelope sender (-f) MUST use your domain email (@grandmasters.co)
    // NEVER put @gmail.com in the From or -f envelope, or Gmail/SPF/DMARC will reject it instantly!
    $from_email = 'mail@grandmasters.co';
    $from_name  = 'Grand Master Vodka';

    $headers   = array();
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = "From: {$from_name} <{$from_email}>";
    if (!empty($email)) {
        $headers[] = "Reply-To: {$name} <{$email}>";
    }
    $headers[] = "Date: " . date("r");
    $headers[] = "Message-ID: <" . time() . "." . md5(uniqid(rand(), true)) . "@grandmasters.co>";
    $headers[] = "X-Mailer: PHP/" . phpversion();

    $headers_str = implode("\r\n", $headers);

    $mail_content = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Grand Master Vodka - Website Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 24px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 28px 20px; background-color: #111111; border-bottom: 2px solid #b85d19;">
        <a href="https://www.grandmasters.co/" target="_blank" style="text-decoration: none; color: #ffffff;">
          <img src="https://www.grandmasters.co/logo.png" alt="Grand Master Vodka" width="130" style="display: block; border: 0; max-width: 130px; height: auto;" />
          <div style="margin-top: 8px; font-size: 13px; letter-spacing: 0.15em; color: #d4a373; text-transform: uppercase; font-weight: 600;">Grand Master Vodka</div>
        </a>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 32px 24px 32px; color: #222222;">
        <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #111111; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">New Website Inquiry</h2>
        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #555555;">
          A visitor has submitted an inquiry through the contact form on <a href="https://www.grandmasters.co/" target="_blank" style="color: #b85d19; text-decoration: none; font-weight: 600;">grandmasters.co</a>:
        </p>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #444444; background-color: #fafafa; border: 1px solid #eeeeee; width: 30%;">Name</td>
            <td style="padding: 10px 12px; color: #111111; border: 1px solid #eeeeee;">' . htmlspecialchars($name) . '</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #444444; background-color: #fafafa; border: 1px solid #eeeeee;">Email</td>
            <td style="padding: 10px 12px; color: #111111; border: 1px solid #eeeeee;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #b85d19; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #444444; background-color: #fafafa; border: 1px solid #eeeeee;">Date & Time</td>
            <td style="padding: 10px 12px; color: #111111; border: 1px solid #eeeeee;">' . date('d M Y, h:i A') . ' (IST)</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #444444; background-color: #fafafa; border: 1px solid #eeeeee; vertical-align: top;">Message</td>
            <td style="padding: 10px 12px; color: #111111; border: 1px solid #eeeeee; line-height: 1.6;">' . nl2br(htmlspecialchars($message)) . '</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:' . htmlspecialchars($email) . '" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;">Reply Directly to Visitor</a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #f7f7f7; border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #777777; line-height: 1.6;">
        <strong style="color: #333333;">Grand Master Vodka</strong><br />
        B1, Daffodil Building, Hiranandani Gardens, Powai, Mumbai - 400076<br />
        Website: <a href="https://www.grandmasters.co/" target="_blank" style="color: #b85d19; text-decoration: none;">grandmasters.co</a> &bull; Customer Care: 022-25709440 &bull; <a href="mailto:mail@grandmasters.co" style="color: #b85d19; text-decoration: none;">mail@grandmasters.co</a>
      </td>
    </tr>
  </table>
</body>
</html>';

    // 1. Send using mail() with domain envelope sender
    $mail_sent = mail($to, $subject, $mail_content, $headers_str, "-f" . $from_email);
    if (!$mail_sent) {
        $mail_sent = mail($to, $subject, $mail_content, $headers_str);
    }

    // 2. Also log submission locally as backup so inquiries are never lost
    $log_entry = sprintf(
        "[%s] Name: %s | Email: %s | Sent: %s | Message: %s\n",
        date('Y-m-d H:i:s'),
        $name,
        $email,
        $mail_sent ? 'YES' : 'NO',
        str_replace(array("\r", "\n"), ' ', $message)
    );
    @file_put_contents(__DIR__ . '/contact_submissions.log', $log_entry, FILE_APPEND);

    if ($mail_sent) {
        echo json_encode([
            'status' => 'success',
            'success' => true,
            'message' => "Your message has been sent to $to."
        ]);
        exit;
    } else {
        // Mail failed on server level
        $last_err = error_get_last();
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'The server mailer could not deliver the email. Please check your cPanel Exim service or email settings.',
            'debug' => $last_err ? $last_err['message'] : 'PHP mail() returned false.'
        ]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'success' => false,
        'message' => 'Please provide a valid email and name.'
    ]);
    exit;
}
?>
