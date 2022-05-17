import * as React from 'react';

import ItemStatSection from './ItemStatSection';
import ConfirmButton from '../ConfirmButton';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { 
    mostPurchasedObj, 
    reorderButtonObj
} from '../Dashboard/MainData';

import { StatWrapper } from '../../Styles/StatStyle/StatStyles';
import { QuantityInput } from '../../Styles/StatStyle/QuantityInput'

const StatSection:React.FC<any> = (props) => {

    const[quantity, setQuantity] = React.useState(0);
    const[mostPurchasedItem, setItem] = React.useState({});


    const {
        url,
        urlCreate
    } = props;

    const handleChange = e => {
        setQuantity(e.target.value);
    }

    const handleState = (item) => {
        setItem(item);
    }
    
    const reorderItem = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // POST request to /reorderItem       
        let request = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: mostPurchasedItem,
                quantity: quantity
            })
        }

        // Send request to reorder an item with specified quantity
        await fetch(urlCreate, request).then( res => res.json() )
        .then( data => {
            console.log(data.message);
            toast(() => <div><h2>{ data.message }</h2></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch( err => console.log(err) )
    }

    return ( 
        <>
            <ItemStatSection {...mostPurchasedObj} setMostPurchasedItem={handleState}/>
            <StatWrapper>
                <form onSubmit={reorderItem} style={{marginTop: '20%'}}>
                    <QuantityInput 
                        type="number"
                        autoComplete='on'
                        placeholder='Enter warehouse quantity to reorder'
                        required
                        onChange={handleChange}
                    />
                    <ConfirmButton type='submit' {...reorderButtonObj}/>
                </form>
            </StatWrapper>
        </>
    );
}

export default StatSection;




