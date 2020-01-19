function template() {
    return (
     `<!doctype html>
      <html lang="en">
        <head>
           <meta charset="utf-8">
           <title>Project One</title>
           <style> 
           a{ 
               text-decoration: none 
            } 
           </style>
        </head>
        <body style="margin: 0">
           <div id="root"><h1>Hello Andrew!!!</h1></div>
           <script type="text/javascript" src="/build/generated.client.js"></script>
        </body>
      </html>`
    )
}

export default template