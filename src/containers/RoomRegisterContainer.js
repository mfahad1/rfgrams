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
import { apiRegisterRoom, apiGetFields } from '../source/roomSource';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class StudentFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShow: false,
      dialogMessage: '',
      floor: 0,
      roomType: 0,
      name: '',
      roomTypes : {},
      floors: {},
    };

    this.submitRoom = this.submitRoom.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.dialogShow = this.dialogShow.bind(this);
  } 

  submitRoom(form) {

    form.preventDefault();
    const packet = form.target;

    if(this.state.name){
    const promise = apiRegisterRoom({
      "name": packet.name.value,
      "floor": this.state.floor,
      "roomType": this.state.roomType,
    });

    promise.then((result) => {

      this.setState({
      dialogShow: true,
      dialogMessage: 'Room Registration Successfull',
      name: '',
      floor: 0,
      roomType: 0});

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

  loadSelectData(){
    apiGetFields().then((result) => {
      this.setState({
        floors: result.data.floors,
        roomTypes: result.data.roomType,
      });
      console.log(result);
    },(err) => {
      console.log(err);
    }); 
  }


  getMenuItems(data){
    let arr = [];
    let count = 1;
    let item;
    for(item in data) {
      arr.push(<MenuItem value={data[item]} key={count} primaryText={item}/>)
      count++;
    }
    return arr;
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

  {if(!this.state.roomTypes.ROOM){
    console.log('getting Select data');
    this.loadSelectData()
  }}

   return (
    <PageBase title="Room Registration Form"
              navigation="Application / Room Registration Form">
      {this.dialogShow()}
      <form onSubmit={this.submitRoom} >

        <TextField
          hintText="Name"
          name='name'
          value={this.state.name}
          floatingLabelText="Enter Room Name"
          fullWidth={true}
          onChange={(e,value) => {
            this.setState({name: value})
          }}
        />

        <SelectField
          floatingLabelText="Floor"
          value={this.state.floor}
          name="floor"
          onChange={(e,i,value) => {
            this.setState({floor: value})
          }}
          fullWidth={true}>
          <MenuItem value={0} key={0} primaryText="Select Floor"/>
          {this.getMenuItems(this.state.floors)}
        </SelectField>

        <SelectField
          floatingLabelText="Room Type"
          value={this.state.roomType}
          name="roomType"
          onChange={(e,i,value) => {
            this.setState({roomType: value})
          }}
          fullWidth={true}>
          <MenuItem value={0} key={0} primaryText="Select Room Type"/>
          {this.getMenuItems(this.state.roomTypes)}
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
