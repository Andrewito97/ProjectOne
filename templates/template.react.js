function template(markup, css, linkTags, scriptTags, deviceCheck, trackingId) {
	return (
		`<!doctype html>
      <html lang="en">
        <head>
           <meta charset="utf-8">
           <meta name="viewport" content="height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1">
           <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
           <meta name="description" content="Hi! This is the platform for popularization science, social and media content of ukrainian authors and global conjuncture without political point">
           <title>Karambol - Platform with media, social and scientific content</title>
           <link rel="shortcut icon" href="../client/assets/ukraine.png" type="image/png">
           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
           <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            ${linkTags}      
           <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
           <!-- Global site tag (gtag.js) - Google Analytics -->
           <script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
           <script>
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', ${trackingId});
           </script>
           <style> 
           a{ 
               text-decoration: none 
            } 
           </style>
           <style id="jss-server-side">${css}</style>
        </head>
        <body style="margin: 0; background: #F3F8EE">
           <div id="root" mobile="${deviceCheck}">${markup}</div>
           ${scriptTags}
        </body>
      </html>`
	);
}

export default template;