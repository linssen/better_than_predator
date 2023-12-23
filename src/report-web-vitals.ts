import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry: Function) => {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(<ReportHandler>onPerfEntry);
    getFID(<ReportHandler>onPerfEntry);
    getFCP(<ReportHandler>onPerfEntry);
    getLCP(<ReportHandler>onPerfEntry);
    getTTFB(<ReportHandler>onPerfEntry);
  });
};

export default reportWebVitals;
