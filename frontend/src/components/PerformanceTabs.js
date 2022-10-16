import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PerformanceTable from './PerformanceTables';
import BarChartFundamentals from './BarChartFundamentals';
import ReturnBarChart from './AnnualReturnBarChart';

// function PerformanceTabs({ returnData, fundamentalData }) {
//   const [key, setKey] = useState('Performance');
//   const annualReturn = returnData.chart_data.annual_return;
//   const performanceMetric = returnData.performance_metric;
//   // setAnnualReturn(data.data.chart_data.annual_return);
//   const fundemantalTab = (fundamentalData) => {
//     console.log(fundamentalData.error.length);
//     if (fundamentalData.error) {
//       return <></>;
//     } else {
//       return (
//         <Tab eventKey="Fundamental" title="Fundamental">
//           <BarChartFundamentals data={fundamentalData} />
//         </Tab>
//       );
//     }
//   };
//   return (
//     <Tabs
//       id="controlled-tab-example"
//       activeKey={key}
//       onSelect={(k) => setKey(k)}
//       className="mb-3"
//     >
//       <Tab eventKey="Performance" title="Performance">
//         <ReturnBarChart data={annualReturn} />
//       </Tab>
//       {fundemantalTab}
//       <Tab eventKey="Risk Measure" title="Risk Measure">
//         <PerformanceTable performanceMetric={performanceMetric} />
//       </Tab>
//     </Tabs>
//   );
// }

export class PerformanceTabs extends React.Component {
  constructor({ returnData, fundamentalData }) {
    super();
    this.state = {
      key: 'Performance',
      annualReturn: returnData.chart_data.annual_return,
      performanceMetric: returnData.performance_metric,
      fundamentalData: fundamentalData,
    };
  }

  renderFundamentalTab() {
    if (this.state.fundamentalData.length) {
      return (
        <Tab eventKey="Fundamental" title="Fundamental">
          <BarChartFundamentals data={this.state.fundamentalData} />
        </Tab>
      );
    }
  }

  render() {
    var FundamentalTab = this.renderFundamentalTab();

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={(k) => this.setState({ key: k })}
        className="mb-3"
      >
        <Tab eventKey="Performance" title="Performance">
          <ReturnBarChart data={this.state.annualReturn} />
        </Tab>
        {FundamentalTab}
        <Tab eventKey="Risk Measure" title="Risk Measure">
          <PerformanceTable performanceMetric={this.state.performanceMetric} />
        </Tab>
      </Tabs>
    );
  }
}

export default PerformanceTabs;
