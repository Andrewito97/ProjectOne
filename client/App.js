import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import RootComponent from './RootComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styleController from './StyleController';

const blue = styleController.blue;
const ivory = styleController.ivory;
const metal = styleController.metal;
const lime = styleController.lime;

const customStyles = styleController.muiInputStyles;

const App = () => {
    const [ cookies, setCookie ] = useCookies(['OneProjectPalette']);
    const [ palette, setPalette ] = React.useState(cookies.OneProjectPalette);

    React.useEffect(() => {

      //remove server side injected css
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
   
    }, []);

    styleController.choosePalette(palette);

    if(palette === 'standart') styleController.overrideInput(blue);
    if(palette === 'dark') styleController.overrideInput(ivory, ivory, ivory);
    if(palette === 'metal') styleController.overrideInput(metal);
    if(palette === 'lime') styleController.overrideInput(lime);

    const customTheme = createMuiTheme({
        overrides: customStyles
    });

    return (
      <CookiesProvider>
          <BrowserRouter>
              <ThemeProvider theme={customTheme}>
                  <RootComponent palette={palette} setPalette={setPalette}/>
              </ThemeProvider> 
          </BrowserRouter>
      </CookiesProvider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
