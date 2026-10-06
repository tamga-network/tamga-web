# Build all whitepaper PDFs into ../public/
# Usage:  powershell -File whitepaper/build.ps1
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

foreach ($lang in 'en','tr','tk') {
  $src = Join-Path $here "tamga-whitepaper-$lang.typ"
  $out = Join-Path $pub "whitepaper-$lang.pdf"
  & $typst compile --root $here @fontArgs $src $out
  if ($?) { Write-Output "built whitepaper-$lang.pdf" }
}
