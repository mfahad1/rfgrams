import React from 'react';
import globalStyles from '../../styles';
import Data from '../../data';
import DataTables from 'material-ui-datatables';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {apiGetAllRooms} from '../../source/roomSource';

class RoomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  getNormalizeData(arr){
    return arr.map((element,value) => {
      return {
      floor: element.floor,
      roomType: element.roomType,
      name: element.name,
     }; 
    });
  }
  
  getRooms() {
   apiGetAllRooms().then((result) => {
     this.setState({rooms: this.getNormalizeData(result.data)})
   },(err) => {
      console.log(err);
   });
  }

render(){
  {if(!this.state.rooms.length){
    console.log("getting rooms");
    this.getRooms()
  }}
  return (
    <Paper zDepth={3}>
      <DataTables
        tableBodyStyle={{borderRadius:2}}
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={Data.ROOMS_COLUMNS}
        data={this.state.rooms}
        showCheckboxes={false}
        page={1}
        count={this.state.rooms.length}
      />
    </Paper>
  );
}
};

export default RoomTable;
