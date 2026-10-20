# Build all manifesto PDFs into ../public/
# Usage:  powershell -File manifesto/build.ps1 [-Lang az]
param([string[]]$Lang)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$pub  = Join-Path (Split-Path -Parent $here) 'public'
$web  = Split-Path -Parent $here
$typst = (Get-ChildItem -Path (Join-Path $web 'tools') -Recurse -Filter 'typst.exe' | Select-Object -First 1).FullName

# Brand fonts (IBM Plex Sans / Mono; Onest when added): tools/fonts (gitignored) or the workspace font folder.
# Missing fonts fall back to Typst's built-in fonts.
$fontArgs = @()
foreach ($f in @((Join-Path $web 'tools/fonts'), (Join-Path $web '../../marketing/shared/fonts'))) {
  if (Test-Path $f) { $fontArgs += @('--font-path', (Resolve-Path $f).Path) }
}

$site  = @('en','tr','tk','az')
if (-not $Lang) { $Lang = $site }
foreach ($lang in $Lang) {
  $src = Join-Path $here "tamga-manifesto-$lang.typ"
  $dir = $pub
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $out = Join-Path $dir "manifesto-$lang.pdf"
  & $typst compile --root $here @fontArgs $src $out
  if ($?) { Write-Output "built manifesto-$lang.pdf" }
}
