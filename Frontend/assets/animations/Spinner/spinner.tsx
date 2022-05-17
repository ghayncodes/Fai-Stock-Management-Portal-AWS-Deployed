import * as React from 'react'
import './spinner.css';

// CODE FROM: https://loading.io/css/
const Spinner:React.FC<any> = () =>
    <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
export default Spinner