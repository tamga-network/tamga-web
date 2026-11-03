# Akademik çalışmaların PDF'lerini üretir: publications/*.typ → public/files/publications/*.pdf
# Önce Markdown kaynağından .typ üret:  node publications/md2typ.mjs <yazı.md>  (şekiller: node publications/figures/<numara>.mjs)
# Kullanım:  powershell -File publications/build.ps1 [-Name evolution-of-digital-identity-tr]
param([string[]]$Name)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$web  = Split-Path -Parent $here
$out  = Join-Path $web 'public/files/publications'
$typst = (Get-ChildItem -Path (Join-Path $web 'tools') -Recurse -Filter 'typst.exe' | Select-Object -First 1).FullName

$fontArgs = @()
foreach ($f in @((Join-Path $web 'tools/fonts'), (Join-Path $web '../../marketing/shared/fonts'))) {
  if (Test-Path $f) { $fontArgs += @('--font-path', (Resolve-Path $f).Path) }
}
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }

$files = Get-ChildItem -Path $here -Filter '*.typ' | Where-Object { $_.Name -ne 'template.typ' }
if ($Name) { $files = $files | Where-Object { $Name -contains $_.BaseName } }
foreach ($f in $files) {
  $pdf = Join-Path $out ($f.BaseName + '.pdf')
  & $typst compile --root $web @fontArgs $f.FullName $pdf
  if ($?) { Write-Output "built $($f.BaseName).pdf" }
}
