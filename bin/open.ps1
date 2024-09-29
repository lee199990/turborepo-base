#用于在浏览器中打开指定的静态文件

param (
    [Parameter(Mandatory = $true)]
    [string]$url
)

$combinedUrl = Join-Path -Path $PWD.Path -ChildPath $url

Start-Process -FilePath "chrome.exe" -ArgumentList $combinedUrl