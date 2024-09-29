#使用方式说明：
#脚本放在与切片输出文件夹同一个盘符下
#在powershell中运行脚本，并提供切片文件夹路径
#全局安装gltf-pipeline可以使用 npm install -g gltf-pipeline 进行安装
#template: D:\ compress_glb ".\data\tile"


param (
    [Parameter(Mandatory = $true)]
    [ValidateScript({ Test-Path $_ -PathType 'Container' })]
    [string]$Path
)

$Tool = "gltf-pipeline"
$command = Get-Command $Tool -ErrorAction SilentlyContinue
if (-not$command)
{
    Write-Host "此程序依赖 $Tool 工具，请先全局安装！即将退出" -ForegroundColor Red
    exit
}

$fullPath = Join-Path -Path $PWD.Path -ChildPath $Path
$items = Get-ChildItem -Path $fullPath -Filter "*.glb" | Select-Object -ExpandProperty FullName
$max = $items.Count
for ($index = 0; $index -lt $max; $index++) {
    $item = $items[$index]

    # 调用 gltf-pipeline 工具进行处理
    $command = "gltf-pipeline -i `"$item`" -d --draco.compressionLevel 6 -o `"$item`" --draco.quantizePositionBits 16"
    Invoke-Expression $command

    Write-Host "[$( $index + 1 ) / $max] Finished processing $item."
}