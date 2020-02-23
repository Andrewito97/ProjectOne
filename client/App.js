import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RootComponent from './RootComponent'

const App = () => {
    //remove server side rendered css
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      }, [])

    return (
    <BrowserRouter>
        <RootComponent/>
    </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
