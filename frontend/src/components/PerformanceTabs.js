import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PerformanceTable from './PerformanceTables';

function PerformanceTabs() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Performance" title="Performance">
        Graph
      </Tab>
      <Tab eventKey="Risk Measure" title="Risk Measure">
        <PerformanceTable />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Other
      </Tab>
    </Tabs>
  );
}

export default PerformanceTabs;
