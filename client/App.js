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
const orange = paletteController.orange;

const App = () => {
	// eslint-disable-next-line no-unused-vars
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
			setPalette(userPalette);
		} else {
			setPalette('standart');
		}
   
	}, []);

	paletteController.choosePalette(palette);

	if(palette === 'standart') paletteController.overrideStyles(blue);
	if(palette === 'dark classic') paletteController.overrideStyles(ivory, ivory, ivory);
	if(palette === 'dark blue') paletteController.overrideStyles(ivory, ivory, ivory);
	if(palette === 'orange') paletteController.overrideStyles(orange);
	if(palette === 'lime') paletteController.overrideStyles(lime);
	if(palette === 'metal') paletteController.overrideStyles(metal);

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
	);
};

ReactDOM.render(<App/>, document.getElementById('root'));
