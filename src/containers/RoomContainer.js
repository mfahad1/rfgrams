import React from 'react';
import RoomTable from '../components/dashboard/RoomTable';
import globalStyles from '../styles';
import Data from '../data';

const DashboardPage = () => {

  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Rooms</h3>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
            <RoomTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
