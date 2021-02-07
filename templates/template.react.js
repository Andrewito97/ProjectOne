function template(markup, css, deviceCheck, trackingId) {
	return (
		`<!doctype html>
      <html lang="en">
        <head>
           <meta charset="utf-8">
           <meta name="viewport" content="height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1">
           <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
           <meta name="description" content="Karambol is free educational platform.
           Also it contains elements of social media.
           The main goal - to share basic knowledge which everyone should know in modern world.
           We hope our platform will help you to make right conclusions for the future.">
           <title>Karambol - things you need to know</title>
           <link rel="shortcut icon" href="../client/assets/carambola.png" type="image/png">
           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
           <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
           <script type="text/plain" cookie-consent="targeting" src="https://apis.google.com/js/platform.js?onload=init" async defer></script>

           <!-- Global site tag (gtag.js) - Google Analytics -->
           <script type="text/plain" cookie-consent="strictly-necessary" async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
           <script>
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${trackingId}');
           </script>

           <!-- Cookie Consent by https://www.CookieConsent.com -->
           <script type="text/javascript" src="//www.cookieconsent.com/releases/3.1.0/cookie-consent.js"></script>
           <script type="text/javascript">
               document.addEventListener('DOMContentLoaded', function () {
               cookieconsent.run({"notice_banner_type":"interstitial","consent_type":"express","palette":"dark","language":"en","website_name":"Karambol"});
           });
           </script>
           <!-- End Cookie Consent by https://www.CookieConsent.com -->

           <style> 
           a{ 
               text-decoration: none 
            } 
           </style>
           <style id="jss-server-side">${css}</style>
        </head>
        <body style="margin: 0; background: #F3F8EE">
           <div id="root" mobile="${deviceCheck}">${markup}</div>
           <script type="text/plain" cookie-consent="strictly-necessary" src="/build/generated.client.js"></script>   
        </body>
      </html>`
	);
}

export default template;