import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import RootComponent from './RootComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import paletteController from './PaletteController';

const blue = paletteController.blue;
const ivory = paletteController.ivory;
const metal = paletteController.metal;
const lime = paletteController.lime;

const App = () => {
    const [ cookies, setCookie ] = useCookies(['OneProjectPalette']);
    const [ palette, setPalette ] = React.useState('standart');

    React.useEffect(() => {

        //remove server side injected css
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        //initialize palette
        const userPalette = cookies.OneProjectPalette;
        if(userPalette) {
            setPalette(userPalette)
        } else {
            setPalette('standart')
        }
   
    }, []);

    paletteController.choosePalette(palette);

    if(palette === 'standart') paletteController.overrideInput(blue);
    if(palette === 'dark') paletteController.overrideInput(ivory, ivory, ivory);
    if(palette === 'metal') paletteController.overrideInput(metal);
    if(palette === 'lime') paletteController.overrideInput(lime);

    const customTheme = createMuiTheme({
        overrides: paletteController.muiStyles,
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
