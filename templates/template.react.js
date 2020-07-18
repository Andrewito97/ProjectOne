function template(markup, css) {
	return (
		`<!doctype html>
      <html lang="en">
        <head>
           <meta charset="utf-8">
           <meta name="description" content="Hi! This is the platform for popularization science, social and media content of ukrainian authors and global conjuncture without political point">
           <title>Karambol - Platform with media, social and scientific content</title>
           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
           <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
           <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>  
           <style> 
           a{ 
               text-decoration: none 
            } 
           </style>
           <style id="jss-server-side">${css}</style>
        </head>
        <body style="margin: 0; background: #F3F8EE">
           <div id="root">${markup}</div>
           <script type="text/javascript" src="/build/generated.client.js"></script>      
        </body>
      </html>`
	);
}

export default template;