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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ParentFormPage extends React.Component{

constructor(props) {
  super(props);
  this.state = {
    dialogShow: false,
    dialogMessage: '',
    children: [],
    selected:[],
    Ids: [],
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  this.getParentsMeta = this.getParentsMeta.bind(this);
  this.handleRowSelection = this.handleRowSelection.bind(this);
  this.isSelected = this.isSelected.bind(this);
  this.getChilrenids = this.getChilrenids.bind(this);
   this.submitParent = this.submitParent.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.dialogShow = this.dialogShow.bind(this);
}

getTableRows(data) {
  return data.map((element,index) => {
    return (
      <TableRow key={index} selected={this.isSelected(index)}>
        <TableRowColumn>{element.firstname}</TableRowColumn>
        <TableRowColumn>{element.lastname}</TableRowColumn>
      </TableRow>
    );
  });
}

getParentsMeta() {
  apiparentsMeta().then((result) => {
    console.log(result.data);
    this.setState({children: result.data});
  },(err) => {
   console.log(err);
  });
}

getChilrenids(arr) {
  return arr.map((element,index) => {
    return this.state.children[element]._id;
  });
}

isSelected(index) {
  return this.state.selected.indexOf(index) !== -1;
}

handleRowSelection(selectedRows) {
  console.log(selectedRows);
  const ids = this.getChilrenids(selectedRows);
  console.log(ids);
  this.setState({
    selected: selectedRows,
    Ids: ids,
  });
}

 submitParent(form) {
    console.log(this.state.Ids);
    form.preventDefault();
    const packet = form.target;

    if(this.state.email){
    console.log(this.state.Ids);

    const promise = apiRegisterParent({
      "firstname": packet.firstname.value,
      "lastname": packet.lastname.value,
      "email": packet.email.value,
      "password": packet.password.value,
      "children": this.state.Ids,
    });

    promise.then((result) => {

      this.setState({
      dialogShow: true,
      dialogMessage: 'Parent Registration Successfull',
      email: '',firstname: '',
      lastname: '',
      password: '',
      Ids: [],
      children: [],
      selected: []});

    },(err) => {
      this.setState({dialogShow: true,
      dialogMessage: 'Error In Registration'});
    });
   }
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

render() {
  console.log(this.state.Ids);
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

  {!this.state.children.length? this.getParentsMeta():null}

  return (
    <PageBase title="Parent Registration Form"
              navigation="Application / Parent Registration Form">
              {this.dialogShow()}
      <form onSubmit={this.submitParent} >
        <TextField
          hintText="Email"
          name="email"
          value={this.state.email}
          floatingLabelText="Enter Email"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({email: value})
          }}
        />
        <TextField
          hintText="Password"
          name="password"
          type="password"
          value={this.state.password}
          floatingLabelText="Enter Password"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({password: value})
          }}
        />

        <TextField
          hintText="First Name"
          name="firstname"
          value={this.state.firstname}
          floatingLabelText="Enter First name"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({firstname: value})
          }}
        />

        <TextField
          hintText="Last Name"
          name="lastname"
          value={this.state.lastname}
          floatingLabelText="Enter Last name"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({lastname: value})
          }}
        />
        <Paper style={{marginTop: 30}} zDepth={1}>
        <h1 style= {{textAlign: 'center'}}>Select Childrens</h1>
        {this.state.children.length?
          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>FirstName</TableHeaderColumn>
              <TableHeaderColumn>LastName</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.getTableRows(this.state.children)}
          </TableBody>
        </Table>
        : null
        }
        </Paper>
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

export default ParentFormPage;
