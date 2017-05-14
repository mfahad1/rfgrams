import React from 'react';
import globalStyles from '../../styles';
import Data from '../../data';
import DataTables from 'material-ui-datatables';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import {apiGetAllStudent} from '../../source/studentSource';

class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  iconButtonElement() {
    return (
    <IconButton
      touch={true}
      style={{margin:0}}
      tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={"black"} />
    </IconButton>
    );  
  }

  getrightIconMenu(id) {
  return(
    <IconMenu iconButtonElement={this.iconButtonElement()}>
      <MenuItem 
      containerElement={<Link to={'/detail/'+id}/>}
       >Details</MenuItem>
    </IconMenu>
  );
  }

  getNormalizeData(arr){
    return arr.map((element,value) => {
      return {
      firstName: element.firstname,
      lastName: element.lastname,
      age: element.age,
      class: element.class,
      button: this.getrightIconMenu(element._id),
     }; 
    });
  }
  
  getChildren() {
   apiGetAllStudent().then((result) => {
     this.setState({students: this.getNormalizeData(result.data)})
   },(err) => {
      console.log(err);
   });
  }

render(){
  {if(!this.state.students.length){
    console.log("getting children");
    this.getChildren()
  }}
  return (
    <Paper zDepth={3}>
      <DataTables
        tableBodyStyle={{borderRadius:2}}
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={Data.TABLE_COLUMNS}
        data={this.state.students}
        showCheckboxes={false}
        page={1}
        count={this.state.students.length}
      />
    </Paper>
  );
}
};

export default StudentTable;
