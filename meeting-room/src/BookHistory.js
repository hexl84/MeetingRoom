import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BookHistoryTable from './BookHistoryTable';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createData(id, date, room, period, title, participants) {
  return { id, date, room, period, title, participants};
}

const ongoingBookings = [
  createData(1, '2025-02-10', 'Room 1', '14:00-15:00', 'code review', '张三，李四'),
  createData(2, '2025-02-11', 'Room 2', '15:00-16:00', 'sprint plan', '关羽，张飞'),
  createData(3, '2025-02-12', 'Room 3', '09:00-10:00', 'demo', '郭靖，杨过'),
];

const completeBookings = [
  createData(4, '2025-02-5', 'Room 1', '14:00-15:00', 'test 1', '张三，李四'),
  createData(5, '2025-02-6', 'Room 2', '15:00-16:00', 'test 2', '关羽，张飞'),
  createData(6, '2025-02-7', 'Room 3', '9:00-10:00', 'test3', '郭靖，杨过'),
];

const cancelledBookings = [
  createData(7, '2025-02-10', 'Room 1', '10:00-11:00', 'cancel 1', '张三，李四'),
  createData(8, '2025-02-11', 'Room 2', '14:00-15:00', 'cancel 2', '关羽，张飞'),
  createData(9, '2025-02-12', 'Room 3', '10:00-11:00', 'cancel 3', '郭靖，杨过'),
];

export default function BookingHistoriesTabs() {
  const [value, setValue] = useState(0);
  const [histories, setHistories] = useState(ongoingBookings);

  // const setDefaultHistories = () => {
  //   setHistories(ongoingBookings);
  // }
  // setDefaultHistories();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch(newValue){
      case 0:
        setHistories(ongoingBookings);
        break;
      case 1:
        setHistories(completeBookings);
        break;
      case 2:
        setHistories(cancelledBookings);
        break;
      default:
        setHistories(ongoingBookings);
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ongoing" {...a11yProps(0)} />
          <Tab label="Complete" {...a11yProps(1)} />
          <Tab label="Cancelled" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <BookHistoryTable histories={histories} />
      {/* <CustomTabPanel value={value} index={0}>
        {value}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {value}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {value}
      </CustomTabPanel> */}
    </Box>
  );
}