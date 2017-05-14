import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 60,
    color: "#209e91",  
  },
  drawer: {
    width: 280,
    color: '#4A4A4A' 
  },
  raisedButton: {
    primaryColor: blue600,
  }
});


export default themeDefault;