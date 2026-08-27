<?php
// Hostinger Direct Mail Handler for Qorbit Tech
// Allows direct form submission to info@qorbittech.com without third-party services

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Get input JSON
$input = json_decode(file_get_contents("php://input"), true);
if (!$input) {
    $input = $_POST;
}

// Bot / Spam check (honeypot)
if (!empty($input['botcheck'])) {
    echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
    exit;
}

$name = filter_var($input['name'] ?? $input['first_name'] ?? 'Website Visitor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = filter_var($input['phone'] ?? 'Not provided', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$userMessage = filter_var($input['message'] ?? 'New lead generated from website.', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$subject = filter_var($input['subject'] ?? "New Lead Inquiry - Qorbit Tech", FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if (!$email) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit;
}

$to = "info@qorbittech.com";

// Email Body
$emailBody = "
<html>
<head>
  <title>{$subject}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6f9; padding: 20px; color: #333; }
    .card { background: #ffffff; border-radius: 8px; max-width: 600px; margin: 0 auto; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; }
    .header h2 { color: #2563eb; margin: 0; }
    .row { margin-bottom: 12px; }
    .label { font-weight: bold; color: #555; }
    .value { color: #111; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; margin-top: 15px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>🚀 New Website Submission</h2>
      <p style='color: #777; margin: 4px 0 0;'>Qorbit Tech Lead Notification</p>
    </div>
    <div class='row'><span class='label'>Name:</span> <span class='value'>{$name}</span></div>
    <div class='row'><span class='label'>Email:</span> <span class='value'>{$email}</span></div>
    <div class='row'><span class='label'>Phone:</span> <span class='value'>{$phone}</span></div>
    <div class='row'><span class='label'>Subject:</span> <span class='value'>{$subject}</span></div>
    <div class='message-box'>
      <div class='label' style='margin-bottom: 6px;'>Message:</div>
      <div class='value'>" . nl2br($userMessage) . "</div>
    </div>
    <p style='margin-top: 24px; font-size: 12px; color: #999; text-align: center;'>Delivered directly from Qorbit Tech Website to info@qorbittech.com via Hostinger Mail</p>
  </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Qorbit Tech Website <info@qorbittech.com>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send via Hostinger PHP mail
if (@mail($to, $subject, $emailBody, $headers)) {
    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent directly to info@qorbittech.com!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Mail server could not process the request. Please email info@qorbittech.com directly."
    ]);
}
?>
