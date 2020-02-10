import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import MusicList from './components/MusicList'
import MoviesList from './components/MoviesList'
import NewsFeed from './components/NewsFeed'
import RightSidebar from './components/RightSidebar'

const styles = {
    container: {
        display: 'flex', 
        marginTop: 30, 
        marginLeft: 150, 
        marginRight: 150
    },
    list: {
        flexGrow: 2, 
        backgroundColor: '#F9F9F9', 
        margin: 40, 
        padding: 40
    },
    aside: {
        flexGrow: 1, 
        backgroundColor: '#F9F9F9', 
        margin: 40, 
        minHeight: 600, 
        padding: 40, 
        maxWidth: '20%'
    }
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Topbar/>
                <div style={styles.container}>
                    <div style={styles.list}>
                        <Switch >    
                            <Route exact path='/' component={NewsFeed} />
                            <Route path='/music' component={MusicList} />  
                            <Route path='/movies' component={MoviesList} />  
                        </Switch>
                    </div>
                    <div style={styles.aside}>
                        <RightSidebar/>
                    </div>

                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))