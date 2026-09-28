# Build all whitepaper PDFs into ../public/
# Usage:  powershell -File whitepaper/build.ps1
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$pub  = Join-Path (Split-Path -Parent $here) 'public'
$typst = (Get-ChildItem -Path (Join-Path (Split-Path -Parent $here) 'tools') -Recurse -Filter 'typst.exe' | Select-Object -First 1).FullName

foreach ($lang in 'en','tr','tk') {
  $src = Join-Path $here "tamga-whitepaper-$lang.typ"
  $out = Join-Path $pub "whitepaper-$lang.pdf"
  & $typst compile --root $here $src $out
  if ($?) { Write-Output "built whitepaper-$lang.pdf" }
}
