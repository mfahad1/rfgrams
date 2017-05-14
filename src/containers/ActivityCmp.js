import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import { apiGetActivityLog } from '../source/studentSource';
import Paper from 'material-ui/Paper';


class ActivityComp extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      studentId: props.params.id,
    };
  }




getChildren() {
   apiGetActivityLog(this.state.studentId).then((result) => {
     console.log("in apiGetStudentDetail",result.data);
     this.setState({detail: result.data})
   },(err) => {
      console.log(err);
   });
  }


  componentDidMount() {
  	this.getChildren();
  }




  render() {
  	return(

  		<PageBase title="Activity Log"
              navigation="Application / Activity Log">
	     	<div>here</div>
	    </PageBase>
  	)
   
  }	

}

  export default ActivityComp;