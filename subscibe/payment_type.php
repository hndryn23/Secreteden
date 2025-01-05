<?php
// Include Composer's autoloader
require 'vendor/autoload.php'; // Ensure this points to your Composer autoload file

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Database Configuration
$host = 'localhost';
$dbname = 'flower_shop';
$username = 'root';
$password = '';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Capture form data
    $date = $_POST['date'];
    $amount = $_POST['amount'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    $paymentMethod = $_POST['paymentMethod'];
    $email = $_POST['email']; // Assuming the customer's email is also captured in the form
    
    // Format the date to dd.mm.yy
    $formattedDate = (new DateTime($date))->format('d.m.y');
    
    // Insert data into the database
    $stmt = $pdo->prepare("INSERT INTO payments (date, amount, category, description, payment_method) 
                           VALUES (:date, :amount, :category, :description, :paymentMethod)");
    $stmt->execute([
        ':date' => $formattedDate,
        ':amount' => $amount,
        ':category' => $category,
        ':description' => $description,
        ':paymentMethod' => $paymentMethod,
    ]);

    echo "Payment successfully recorded!";

    // Prepare email content with an external image
    $subject = "Payment Confirmation";
    $message = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #ddd;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 200px;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #555;
            }
            .details-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .details-table th, .details-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            .details-table th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <img src='https://drive.google.com/uc?export=view&id=1c_Mt4PMtBTkxkJB3oE_dKlj0oOba-OzL' alt='Secret Eden Logo'>
                <h2>Thank You!</h2>
                <p>Your payment was successful.</p>
            </div>
            <div class='content'>
                <h3>Payment Details</h3>
                <table class='details-table'>
                    <tr>
                        <th>Payment Date</th>
                        <td>$formattedDate</td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>RM$amount</td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>$category</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>$description</td>
                    </tr>
                    <tr>
                        <th>Payment Method</th>
                        <td>$paymentMethod</td>
                    </tr>
                </table>
            </div>
            <div class='footer'>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best Regards,<br>Secret Eden</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Send confirmation email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();                                         // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                           // Set SMTP server to Gmail
        $mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $mail->Username = 'hndriyan27@gmail.com';                 // Your Gmail address
        $mail->Password = 'yieh adck mrlu ulkn';                  // Gmail app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       // Enable STARTTLS encryption
        $mail->Port = 587;                                        // TCP port 587 for STARTTLS

        // Recipients
        $mail->setFrom('SecretEden@gmail.com', 'Secret Eden');    // Sender's email address and name
        $mail->addAddress($email, 'Customer');                    // Recipient's email address

        // Content
        $mail->isHTML(true);                                      // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Send email
        $mail->send();
        echo "Confirmation email sent successfully to $email.";
    } catch (Exception $e) {
        echo "Failed to send confirmation email. Error: {$mail->ErrorInfo}";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
