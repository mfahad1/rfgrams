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
import { apiRegisterStudent } from '../source/studentSource';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class StudentFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectvalue: 0,
      dialogShow: false,
      dialogMessage: '',
      firstName: '',
      lastName: '',
      age: '',
    };

    this.submitStudent = this.submitStudent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.dialogShow = this.dialogShow.bind(this);
  } 

  submitStudent(form) {

    form.preventDefault();
    const packet = form.target;

    if(this.state.selectvalue){
    const promise = apiRegisterStudent({
      "firstname": packet.firstName.value,
      "lastname": packet.lastName.value,
      "age": packet.age.value,
      "class": this.state.selectvalue,
    });

    promise.then((result) => {

      this.setState({
      dialogShow: true,
      dialogMessage: 'Child Registration Successfull',
      selectvalue: 0,firstName: '',
      lastName: '',
      age: ''});

    },(err) => {
      this.setState({dialogShow: true,
      dialogMessage: 'Error In Registration'});
    });
   }

  }

  handleChange(event, index, value){
    this.setState({selectvalue: value});
  }

  handleDialogClose() {
    this.setState({
      dialogShow: false,
      dialogMessage: ''
    });
  }

  dialogShow() {
    return (
      <Dialog
          actions={
            <FlatButton
              label="Ok"
              primary={true}
              onTouchTap={this.handleDialogClose}
            />}
          modal={false}
          open={this.state.dialogShow}
          onRequestClose={this.handleDialogClose}
        >
          {this.state.dialogMessage}
        </Dialog>
      );
  } 

render(){
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
    <PageBase title="Student Registration Form"
              navigation="Application / Student Registration Form">
      {this.dialogShow()}
      <form onSubmit={this.submitStudent} >

        <TextField
          hintText="First Name"
          name='firstName'
          value={this.state.firstName}
          floatingLabelText="First name"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({firstName: value})
          }}
        />
        <TextField
          hintText="Last Name"
          name='lastName'
          value={this.state.lastName}
          floatingLabelText="Last name"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({lastName: value})
          }}
        />
        <TextField
          hintText="Age"
          name='age'
          value={this.state.age}
          floatingLabelText="age"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({age: value})
          }}
        />
        <SelectField
          floatingLabelText="Class"
          value={this.state.selectvalue}
          name="class"
          onChange={this.handleChange}
          fullWidth={true}>
          <MenuItem value={0} key={0} primaryText="Select Class"/>
          <MenuItem value={'first'} key={1} primaryText="First"/>
          <MenuItem value={'second'} key={2} primaryText="Second"/>
          <MenuItem value={'third'} key={3} primaryText="Third"/>
          <MenuItem value={'fourth'} key={4} primaryText="Fourth"/>
          <MenuItem value={'five'} key={5} primaryText="Fifth"/>
          <MenuItem value={'six'} key={6} primaryText="Six"/>
          <MenuItem value={'seven'} key={7} primaryText="Seven"/>
          <MenuItem value={'eight'} key={8} primaryText="Eight"/>
          <MenuItem value={'nine'} key={9} primaryText="Nine"/>
          <MenuItem value={'ten'} key={10} primaryText="Matric"/>
        </SelectField>

        <div style={styles.buttons}>
          
          <RaisedButton label="Register"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
      </form>
    </PageBase>
  );
}
 
};

export default StudentFormPage;
