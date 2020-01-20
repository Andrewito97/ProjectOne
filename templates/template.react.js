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
           <h1>Template markup is here!</h1>
           <div id="root"></div>
           <script type="text/javascript" src="/build/generated.client.js"></script>
        </body>
      </html>`
    )
}

export default template