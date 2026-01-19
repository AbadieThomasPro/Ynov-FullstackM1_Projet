$body = '{"email":"thomas.abadie@gmail.com","password":"azerty","pseudo":"Thomas"}'
Write-Host "=== TEST REGISTER ===" -ForegroundColor Cyan
Write-Host "URL: http://localhost:3000/user/auth/register" -ForegroundColor Yellow
Write-Host "Body: $body" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri http://localhost:3000/user/auth/register `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing `
        -TimeoutSec 35
    
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    Write-Host $response.Content -ForegroundColor Green
} catch {
    Write-Host "ERREUR!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "Message: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
