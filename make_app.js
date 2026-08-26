const fs = require('fs');
const path = require('path');

let indexHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Nanova - Ethiopian University Freshman Exam Hub</title>
  <link rel="manifest" href="manifest.json" />
  <meta name="theme-color" content="#059669" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Nanova" />
  <link rel="icon" type="image/svg+xml" href="icons/favicon.svg" />
  <link rel="apple-touch-icon" href="icons/icon-192.svg" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              emerald: '#10B981',
              development: '#064E3B',
              gold: '#F59E0B',
              darkgold: '#B45309',
              dark: '#090D12',
              card: '#0F172A',
              cardHover: '#1E293B',
              surface: '#131E32',
              red: '#EF4444'
            }
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/lucide@.latest"></script>
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="bg-brand-dark text-slate-100 flex flex-col min-h-screen">
  <div id="offlineBanner" class="hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <i data-lucide="wifi-off" class="w-4 h-4"></i>
      <span id="offlineBannerText">Offline Mode Active: Using IndexedDE cached exams</span>
    </div>
    <span class="bg-amber-900/60 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Zero-Data</span>
  </div>
  <div id="installBanner" class="hidden bg-slate-900/95 border-b border-emerald-500/30 px-4 py-2.5 flex items-center justify-between text-xs z-30">
    <div class="flex items-center space-x-3">
      <img src="icons/favicon.svg" alt="Nanova" class="w-6 h-6 rounded-md" />
      <div>
        <p class="font-bold text-emerald-400" data-i18n="install_title">Install Nanova PWA</p>
        <p class="text-slate-400 text-[11px]" data-i18n="install_subtitle">Fast offline exam access on your home screen</p>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button id="dismissInstallBtn" class="text-slate-400 hover:text-slate-200 px-2 py-1">Later</button>
      <button id="installAppBtn" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Install</button>
    </div>
  </div>
