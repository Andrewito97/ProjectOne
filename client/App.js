import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import RootComponent from './RootComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import paletteController from './PaletteController';
import cookieHelper from './helpers/cookie.helper';

const blue = paletteController.blue;
const ivory = paletteController.ivory;
const metal = paletteController.metal;
const lime = paletteController.lime;
const orange = paletteController.orange;

const App = () => {
	const [ palette, setPalette ] = React.useState(cookieHelper.getCookie('OneProjectPalette'));

	let isMobile;

	React.useEffect(() => {

		isMobile = document.querySelector('#root').getAttribute('mobile');

		//initialize palette
		const userPalette = cookieHelper.getCookie('OneProjectPalette');
		if(userPalette) {
			setPalette(userPalette);
		} else {
			setPalette('standart');
		}

		//remove server side injected css
		const jssStyles = document.querySelector('#jss-server-side');
		if(jssStyles) jssStyles.parentElement.removeChild(jssStyles);

		//remove server side injected chunk scripts
		const chunkScripts = document.querySelector('#__LOADABLE_REQUIRED_CHUNKS__');
		const chunkScriptsExt = document.querySelector('#__LOADABLE_REQUIRED_CHUNKS___ext');
		if(chunkScripts) document.body.removeChild(chunkScripts);
		if(chunkScriptsExt) document.body.removeChild(chunkScriptsExt);
   
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
		<BrowserRouter>
			<ThemeProvider theme={customTheme}>
				<RootComponent palette={palette} setPalette={setPalette} isMobile={isMobile}/>
			</ThemeProvider> 
		</BrowserRouter>
	);
};

loadableReady(() => {
	ReactDOM.render(<App/>, document.getElementById('root'));
});
