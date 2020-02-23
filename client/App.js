import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import RootComponent from './RootComponent'

const App = () => (
    <BrowserRouter>
        <RootComponent/>
    </BrowserRouter>
)

ReactDOM.render(<App/>, document.getElementById('root'))
