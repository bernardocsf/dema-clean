import { useEffect } from 'react'

function addScriptOnce(id, src, inlineCode) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true

  if (src) script.src = src
  if (inlineCode) script.text = inlineCode

  document.head.appendChild(script)
}

export default function IntegrationScripts() {
  const gaId = import.meta.env.VITE_GA_ID
  const gtmId = import.meta.env.VITE_GTM_ID
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID
  const clarityId = import.meta.env.VITE_CLARITY_ID
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (gaId) {
      addScriptOnce('ga4-script', `https://www.googletagmanager.com/gtag/js?id=${gaId}`)
      addScriptOnce(
        'ga4-inline',
        '',
        `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
      )
    }

    if (gtmId) {
      addScriptOnce(
        'gtm-inline',
        '',
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      )
    }

    if (metaPixelId) {
      addScriptOnce(
        'meta-pixel-inline',
        '',
        `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
      )
    }

    if (clarityId) {
      addScriptOnce(
        'clarity-inline',
        '',
        `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`,
      )
    }

    if (turnstileSiteKey) {
      addScriptOnce('turnstile-script', 'https://challenges.cloudflare.com/turnstile/v0/api.js')
    }
  }, [gaId, gtmId, metaPixelId, clarityId, turnstileSiteKey])

  return null
}
