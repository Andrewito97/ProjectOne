class StyleController {

    constructor() {

        this.white = '#FFFFFF';
        this.black = '#000000';
        this.ivory = '#D8D8D8';
        this.grey = '#A0A0A0';
        this.silver = '#C7C7C7';
        this.blue = '#1976D2';
        this.lightBlue = '#3B8AD9';
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

        this.mainColor = this.blue
        this.additionalColor = this.lightBlue
        this.textColor = this.black
        this.tabsTextColor = this.silver
        this.backgroundColor = this.paleSeaBlue
        this.cardColor = this.white

        //overriding default mui-outlined-input
        this.muiInputStyles = {
            MuiOutlinedInput: {
                root: { '&$focused $notchedOutline': { borderColor: this.blue, borderWidth: 4 } },
                notchedOutline: { borderColor: this.grey },
                focused: {},
                input: { '&::placeholder': { color: this.grey }, color: this.black } 
            },
            MuiInputLabel: {
                root: { '&$focused': { color: this.blue }, color: this.grey }
            }
        };
    };

    overrideInput( borderColor, placeholderColor = this.grey, textColor = this.black ) {
            this.muiInputStyles.MuiOutlinedInput.root['&$focused $notchedOutline'].borderColor = borderColor;
            this.muiInputStyles.MuiOutlinedInput.input['&::placeholder'].color = placeholderColor;
            this.muiInputStyles.MuiOutlinedInput.notchedOutline.borderColor = placeholderColor;
            this.muiInputStyles.MuiOutlinedInput.input.color = textColor;
            this.muiInputStyles.MuiInputLabel.root['&$focused'].color = borderColor;
            this.muiInputStyles.MuiInputLabel.root.color = placeholderColor;
    };

    choosePalette(value) {
        switch(value) {
            case 'standart': 
                this.mainColor = this.blue
                this.additionalColor = this.lightBlue
                this.textColor = this.black
                this.tabsTextColor = this.silver
                this.backgroundColor = this.paleSeaBlue
                this.cardColor = this.white
                    break;
            case 'dark': 
                this.mainColor = this.black
                this.additionalColor = this.highBlackBlue
                this.textColor = this.ivory
                this.tabsTextColor = this.silver
                this.backgroundColor = this.blackBlue
                this.cardColor = this.highBlackBlue
                    break;                 
            case 'metal':
                this.mainColor = this.metal
                this.additionalColor = this.lightMetal
                this.textColor = this.black
                this.tabsTextColor = this.ivory
                this.backgroundColor = this.silver
                this.cardColor = this.paleMetal
                    break;
            case 'lime': 
                this.mainColor = this.lime
                this.additionalColor = this.lightGreen
                this.textColor = this.black
                this.tabsTextColor = this.silver
                this.backgroundColor = this.paleLime
                this.cardColor = this.white
                    break;
            default: 
        }
    };
};

const styleController = new StyleController();

export default styleController;
