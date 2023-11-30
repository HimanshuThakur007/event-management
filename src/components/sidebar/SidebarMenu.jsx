import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import 'react-pro-sidebar/dist/css/styles.css'; 
import {
  BiAward,
  BiBarChartAlt2,
  BiCalendarAlt,
  BiClipboard,
  BiBookContent,
  BiCog,
  BiCoinStack,
  BiCommand,
  BiCube,
  BiUserPin,
  BiData,
  BiDockLeft,
  BiDockTop,
  BiEnvelope,
  BiError,
  BiGridAlt,
  BiHomeAlt,
  BiMenu,
  BiMobileAlt,
  BiCalendarEvent,
  BiPodcast,
  BiSearchAlt2,
  BiStation,
  BiTask,
  BiUser,
} from "react-icons/bi";
import { SiMastercomfig } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import {MdOutlineReviews} from "react-icons/md";
import { VscGraph } from "react-icons/vsc";

const SidebarMenu = ({ menuItems }) => {
  const icons = {
    "<BiHomeAlt />": <BiHomeAlt />,
    "<BiCog />": <BiCog />,
    "<SiMastercomfig />": <SiMastercomfig />,
    "<FiUserPlus />": <FiUserPlus />,
    "<BiBookContent />": <BiBookContent />,
    "<BiUserPin />": <BiUserPin />,
    "<BiUser />":<BiUser />,
    "<BiData />":<BiData />,
    "<BiCalendarAlt />": <BiCalendarAlt />,
    "<BiBarChartAlt2 />":<BiBarChartAlt2 />,
    "<BiMobileAlt />":<BiMobileAlt/>,
    "<BiCalendarEvent />":<BiCalendarEvent />,
    "<BiTask />":<BiTask />,
    "<MdOutlineReviews />":<MdOutlineReviews />,
    "<VscGraph />":<VscGraph />
  };
  const renderMenu = (items) => {
    return items.map((item) => (
      <React.Fragment key={item.value}>
        {item.children && item.children.length > 0 ? (
          // console.log('items444',item.label)
          <SubMenu icon={icons[item["imgPath"]]} label={item.label}>
            {renderMenu(item.children)}
          </SubMenu>
        ) : (
          <MenuItem icon={icons[item["imgPath"]]} component={<Link to={item.address} />}>
           {item.label}
          </MenuItem>
        )}
      </React.Fragment>
    ));
  };
  // #fff

  return (
    <div style={{ display: 'flex', height: '100%'}}>
    <Sidebar
    width='230px'
    backgroundColor="#fff"
    border='0px'
    >
      <Menu iconShape="square">
        {renderMenu(menuItems)}
      </Menu>
      </Sidebar>
      </div>
  );
};

export default SidebarMenu;
