Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\src\assets\images\qorbit-logo-new.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$publicDir = Join-Path $PSScriptRoot "..\public"

# Pure black background color
$blackBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 0, 0))

# -------------------------------------------------------------
# 1. Generate Favicon (512 x 512) with glowing Q mark on pure black
# -------------------------------------------------------------
Write-Host "Generating favicon.png (512x512)..."
$favBmp = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$favG = [System.Drawing.Graphics]::FromImage($favBmp)
$favG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$favG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$favG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$favG.FillRectangle($blackBrush, 0, 0, 512, 512)

# Crop Q emblem: X: 100 to 425 (width 325), Y: 175 to 470 (height 295)
$srcRect = New-Object System.Drawing.Rectangle(100, 175, 325, 295)
# Draw Q emblem centered in 512x512 (target width ~400, height ~363)
$destW = 400
$destH = [int](295 * ($destW / 325.0))
$destX = [int]((512 - $destW) / 2)
$destY = [int]((512 - $destH) / 2)
$destRect = New-Object System.Drawing.Rectangle($destX, $destY, $destW, $destH)
$favG.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$favPath = Join-Path $publicDir "favicon.png"
$favBmp.Save($favPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $favPath"

# Apple touch icon (180x180)
$appleBmp = New-Object System.Drawing.Bitmap(180, 180, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$appleG = [System.Drawing.Graphics]::FromImage($appleBmp)
$appleG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$appleG.DrawImage($favBmp, (New-Object System.Drawing.Rectangle(0, 0, 180, 180)))
$applePath = Join-Path $publicDir "apple-touch-icon.png"
$appleBmp.Save($applePath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $applePath"

# 192x192 icon
$icon192Bmp = New-Object System.Drawing.Bitmap(192, 192, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$icon192G = [System.Drawing.Graphics]::FromImage($icon192Bmp)
$icon192G.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$icon192G.DrawImage($favBmp, (New-Object System.Drawing.Rectangle(0, 0, 192, 192)))
$icon192Path = Join-Path $publicDir "icon-192.png"
$icon192Bmp.Save($icon192Path, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $icon192Path"

# Favicon.ico (32x32)
$ico32 = New-Object System.Drawing.Bitmap(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$icoG = [System.Drawing.Graphics]::FromImage($ico32)
$icoG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$icoG.DrawImage($favBmp, (New-Object System.Drawing.Rectangle(0, 0, 32, 32)))
$icoHandle = $ico32.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($icoHandle)
$icoPath = Join-Path $publicDir "favicon.ico"
$stream = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$icon.Save($stream)
$stream.Close()
Write-Host "Saved $icoPath"

# -------------------------------------------------------------
# 2. Generate Open Graph Banner (1200 x 630) with seamless pure black
# -------------------------------------------------------------
Write-Host "Generating og-image.png (1200x630)..."
$ogBmp = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ogG = [System.Drawing.Graphics]::FromImage($ogBmp)
$ogG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$ogG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Pure black background so source image blends 100% seamlessly
$ogG.FillRectangle($blackBrush, 0, 0, 1200, 630)

# Source logo box: X: 100 to 975 (width 875), Y: 180 to 470 (height 290)
$logoSrcRect = New-Object System.Drawing.Rectangle(100, 180, 875, 290)
# Target size on 1200x630 canvas (width 1000, height ~331)
$ogTargetW = 1000
$ogTargetH = [int](290 * ($ogTargetW / 875.0))
$ogTargetX = [int]((1200 - $ogTargetW) / 2)
$ogTargetY = [int]((630 - $ogTargetH) / 2)
$ogDestRect = New-Object System.Drawing.Rectangle($ogTargetX, $ogTargetY, $ogTargetW, $ogTargetH)
$ogG.DrawImage($bmp, $ogDestRect, $logoSrcRect, [System.Drawing.GraphicsUnit]::Pixel)

$ogImgPath = Join-Path $publicDir "og-image.png"
$ogBmp.Save($ogImgPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $ogImgPath"

# Clean up
$favG.Dispose()
$favBmp.Dispose()
$appleG.Dispose()
$appleBmp.Dispose()
$icon192G.Dispose()
$icon192Bmp.Dispose()
$icoG.Dispose()
$ico32.Dispose()
$ogG.Dispose()
$ogBmp.Dispose()
$bmp.Dispose()
Write-Host "All assets generated flawlessly!"
