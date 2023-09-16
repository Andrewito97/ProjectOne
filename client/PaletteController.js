class PaletteController {

  constructor() {

    this.white = '#FFFFFF';
    this.black = '#000000';
    this.ivory = '#D8D8D8';
    this.grey = '#A0A0A0';
    this.silver = '#C7C7C7';
    this.blue = '#1976D2';
    this.brown = '#62411F';
    this.lightBlue = '#3B8AD9';
    this.darkBlue = '#132462';
    this.lime = '#00B87B';
    this.lightGreen = '#5BD0A1';
    this.metal = '#6F8888';
    this.lightMetal = '#95B8B8';
    this.lightSeaBlue = '#88DDFF';
    this.paleLime = '#C7FFD4';
    this.paleMetal = '#EAEAEA';
    this.paleSeaBlue = '#C7EFFF';
    this.blackBlue = '#05192F';
    this.highBlackBlue = '#041324';
    this.middleGrey = '#1E1E1E';
    this.paleGrey = '#333333';
    this.lightGrey = '#252526';
    this.orange = '#FF7900';
    this.paleOrange = '#FFCE8E';
    this.lightOrange = '#FF9D47';

    //set default colors for initial page loading until palette has been chosen

    // standart:
    // this.mainColor = this.blue;
    // this.additionalColor = this.lightBlue;
    // this.textColor = this.black;
    // this.tabsTextColor = this.ivory;
    // this.backgroundColor = this.paleSeaBlue;
    // this.cardColor = this.white;
    // this.tagsColor = this.blue;

    // dark blue
    this.mainColor = this.black;
    this.additionalColor = this.highBlackBlue;
    this.textColor = this.ivory;
    this.tabsTextColor = this.silver;
    this.backgroundColor = this.blackBlue;
    this.cardColor = this.highBlackBlue;
    this.tagsColor = this.white;

    //overriding default mui-styles
    this.muiStyles = {
      MuiOutlinedInput: {
        root: { '&$focused $notchedOutline': { borderColor: this.blue, borderWidth: 4 } },
        notchedOutline: { borderColor: this.grey },
        focused: {},
        input: { '&::placeholder': { color: this.grey }, color: this.black } 
      },
      MuiInputLabel: {
        root: { '&$focused': { color: this.blue }, color: this.grey }
      },
      MuiLinearProgress:{
        determinate: {
          backgroundColor: this.backgroundColor,
        },
        bar1Determinate: {
          backgroundColor: this.mainColor
        }
                
      },
      MuiTabs: {
        indicator: {
          backgroundColor: 'white', 
          height: 3
        }
      },
      MuiCardHeader: {
        subheader: {
          color: this.grey
        }
      }
    };
  }

  overrideStyles( borderColor, placeholderColor = this.grey, textColor = this.black ) {
    this.muiStyles.MuiOutlinedInput.root['&$focused $notchedOutline'].borderColor = borderColor;
    this.muiStyles.MuiOutlinedInput.input['&::placeholder'].color = placeholderColor;
    this.muiStyles.MuiOutlinedInput.notchedOutline.borderColor = placeholderColor;
    this.muiStyles.MuiOutlinedInput.input.color = textColor;
    this.muiStyles.MuiInputLabel.root['&$focused'].color = borderColor;
    this.muiStyles.MuiInputLabel.root.color = placeholderColor;
    this.muiStyles.MuiLinearProgress.determinate.backgroundColor = this.backgroundColor;
    this.muiStyles.MuiLinearProgress.bar1Determinate.backgroundColor = this.mainColor;
  }

  choosePalette(value) {
    switch(value) {
    case 'standart': 
      this.mainColor = this.blue;
      this.additionalColor = this.lightBlue;
      this.textColor = this.black;
      this.tabsTextColor = this.ivory;
      this.backgroundColor = this.paleSeaBlue;
      this.cardColor = this.white;
      this.tagsColor = this.blue;
      break;
    case 'dark classic': 
      this.mainColor = this.paleGrey;
      this.additionalColor = this.middleGrey;
      this.textColor = this.ivory;
      this.tabsTextColor = this.silver;
      this.backgroundColor = this.lightGrey;
      this.cardColor = this.middleGrey;
      this.tagsColor = this.white;
      break;  
    case 'dark blue': 
      this.mainColor = this.black;
      this.additionalColor = this.highBlackBlue;
      this.textColor = this.ivory;
      this.tabsTextColor = this.silver;
      this.backgroundColor = this.blackBlue;
      this.cardColor = this.highBlackBlue;
      this.tagsColor = this.white;
      break;
    case 'orange': 
      this.mainColor = this.orange;
      this.additionalColor = this.lightOrange;
      this.textColor = this.black;
      this.tabsTextColor = this.ivory;
      this.backgroundColor = this.paleOrange;
      this.cardColor = this.white;
      this.tagsColor = this.orange;
      break; 
    case 'lime': 
      this.mainColor = this.lime;
      this.additionalColor = this.lightGreen;
      this.textColor = this.black;
      this.tabsTextColor = this.ivory;
      this.backgroundColor = this.paleLime;
      this.cardColor = this.white;
      this.tagsColor = this.lime;
      break;         
    case 'metal':
      this.mainColor = this.metal;
      this.additionalColor = this.lightMetal;
      this.textColor = this.black;
      this.tabsTextColor = this.ivory;
      this.backgroundColor = this.silver;
      this.cardColor = this.paleMetal;
      this.tagsColor = this.metal;
      break;
    default: 
    }
  }
}

const paletteController = new PaletteController();

export default paletteController;
