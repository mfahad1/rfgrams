import React,  { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, black} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import GlobalStyles from "../styles";
import PersonPin from 'material-ui/svg-icons/maps/person-pin';
import ParentPin from 'material-ui/svg-icons/action/assignment-turned-in';
import {List, ListItem} from 'material-ui/List';
import FocusStrong from 'material-ui/svg-icons/image/center-focus-strong';


const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    drawer: {
      backgroundColor: GlobalStyles.appColors.grey,
    },
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: GlobalStyles.appColors.grey,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    link: {
      paddingLeft: 50,
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundColor: '#209e91',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        fontSize: 20,
        marginLeft: 10,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer
      docked={true}
      style = {styles.drawer}
      open={navDrawerOpen}>
        <div style={styles.logo}>
          RFGRAMS PANEL
        </div>
        <div style={styles.avatar.div}>
          <Avatar src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/8/005/0b0/1b2/1040945.jpg"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.username}</span>
        </div>
        <div style= {styles.MenuItemContainer}>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              className={'drawer-options'}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
          <List style={{padding:0}}>
            <ListItem
              primaryText="Rooms"
              className={'drawer-options'}
              style={styles.menuItem}
              leftIcon={<FocusStrong />}
              initiallyOpen={false}
              primaryTogglesNestedList={false}
              containerElement={<Link to={'/rooms'}/>}
              nestedItems={[
                <ListItem
                  key={1}
                  style={styles.menuItem}
                  primaryText="Add Rooms"
                  leftIcon={<PersonPin />}
                  containerElement={<Link to={'/rooms-register'}/>}
                />,
              ]}
            />
          </List>
          <List style={{padding:0}}>
            <ListItem
              primaryText="Registration"
              className={'drawer-options'}
              style={styles.menuItem}
              leftIcon={<ParentPin />}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  style={styles.menuItem}
                  primaryText="Parent Registration"
                  leftIcon={<PersonPin />}
                  containerElement={<Link to={'/parent-register'}/>}
                />,
                <ListItem
                  key={2}
                  style={styles.menuItem}
                  primaryText="Student Registration"
                  leftIcon={<PersonPin />}
                  containerElement={<Link to={'/student-register'}/>}
                />,
              ]}
            />
          </List>
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
