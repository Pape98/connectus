import React, { useState } from 'react';

import BackToEmployeesLink from './BackToEmployeesLink';
import { Agenda, Employee } from '../../components';
import './style.scss';

const DataTypes = {
  EMPLOYEES: 'EMPLOYEES',
  MEETINGS: 'MEETINGS',
};

const History = () => {
  const [dataType, setDataType] = useState(DataTypes.EMPLOYEES);

  const isManager = true;

  const MenuData = () => {
    // Determine what menu to show based on user role
    return <Employee.List employees={[]} />;
  };

  const Header = () => {
    return (
      <div className='history__header'>
        <h3>Meeting Title</h3>
        <h3>12/22/1998</h3>
      </div>
    );
  };

  return (
    <div id='history-container'>
      <div id='history-grid'>
        <section className='history__section left-section'>
          {/* <Search /> */}
          {isManager && (
            <BackToEmployeesLink
              dataType={dataType}
              setDataType={setDataType}
            />
          )}
          <div className='history__dataList'>
            <MenuData />
          </div>
        </section>
        <section className='history__section right-section'>
          <div id='history__dataContainer'>
            <Header />
            <Agenda.Data readOnly={true} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;
