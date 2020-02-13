import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import MusicList from './components/MusicList'
import MoviesList from './components/MoviesList'
import NewsFeed from './components/NewsFeed'
import RightSidebar from './components/RightSidebar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

const styles = {
    container: {
        display: 'flex', 
        marginTop: '2.5%', 
        marginLeft: '12%', 
        marginRight: '12%'
    },
    list: {
        width: '60%', 
        backgroundColor: '#F9F9F9', 
        margin: '3%', 
        padding: '3%'
    },
    aside: {
        width: '20%', 
        backgroundColor: '#F9F9F9', 
        margin: '3%', 
        minHeight: 600, 
        minWidth: 180,
        padding: '3%', 
        maxWidth: '20%'
    }
}

const App = () => (
    <BrowserRouter>
        <Topbar/>
        <div style={styles.container}>
            <div style={styles.list}>
                <Switch >    
                    <Route exact path='/' component={NewsFeed} />
                    <Route path='/music' component={MusicList} />  
                    <Route path='/movies' component={MoviesList} />  
                    <Route path='/signup' component={SignUpForm} />
                    <Route path='/login' component={LoginForm} />
                </Switch>
            </div>
            <div style={styles.aside}>
                <RightSidebar/>
            </div>
        </div>
    </BrowserRouter>
)

ReactDOM.render(<App/>, document.getElementById('root'))
