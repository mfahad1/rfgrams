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
import { apiparentsMeta, apiRegisterParent } from '../source/parentSource';
import Paper from 'material-ui/Paper';


import { apiGetStudentDetail } from '../source/studentSource';


class StudentDetail extends React.Component{

constructor(props) {
  super(props);
  this.state = {
    studentid: this.props.params.id,
    
  };


  console.log("here",apiGetStudentDetail(this.props.params.id));

  

}


getChildren() {
   apiGetStudentDetail(this.state.studentid).then((result) => {
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


  const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    }
  };

  
  return (
    <PageBase title="Student Detail"
              navigation="Application / Student Detail">
      <b>First Name: </b> {this.state.detail.firstname} <br/>
      <b>Last Name: </b> {this.state.detail.lastname}<br/>
      <b>Age: </b> {this.state.detail.age}<br/>
      <b>Class: </b> {this.state.detail.class}<br/ >
      <b>Parent: </b> {this.state.detail.parentId.firstname} {this.state.detail.parentId.lastname} <br />
      <Link to={'/activity/'+this.state.studentid}>
        <RaisedButton label="View Activity Log"
                                type="submit"
                                primary={true}
                                />
      </Link>                        
    </PageBase>
  );
}
  
};

export default StudentDetail;
