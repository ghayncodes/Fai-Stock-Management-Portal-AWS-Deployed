import * as React from "react";
import Moment from "react-moment";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../assets/animations/Spinner/spinner";
import { OrderButton } from '../../Styles/ButtonsStyle'
import { ConfirmCell } from '../../Styles/RadioButtonStyle';

import { 
    OrderContainer, 
    ButtonContainer,
    Table, 
    TableHeader,
    TableBody,
    TableData2, 
    TableHead, 
    TableRow,
    TableHeadRow
} from '../../Styles/TableStyle';

const CACHE = {};

const IncomingOrderSection:React.FC<any> = (props) => {

    const {
        url,
        urlUpdate,
        recText,
        recColor,
        hoverRecColor,
        notText,
        notColor,
        hoverNotColor,
    } = props;

    const [ordersList, setOrdersList] = React.useState([]) ;
    const [isCheckOrders, setIsCheckOrders] = React.useState([]);

    const [isCheckAll, setIsCheckAll] = React.useState(false);
    const [isLoading, setLoaded] = React.useState(false);

    const[CacheKey, setCacheKey] = React.useState(0);

    React.useEffect(() => {
        const ac = new AbortController();
        if (CACHE[CacheKey] !== undefined) {
            setOrdersList(CACHE[CacheKey]);
            setLoaded(false);
        }
        else {
            setLoaded(true);
        }
        
        // GET request to /getCompletedOrders
        let request = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        }

        // Send request to get list of completed orders
        fetch(url , request).then( res => res.json() )
        .then( data => {
            console.log(data.result);

            setCacheKey(data.result._id)
            CACHE[CacheKey] = data.result;

            setOrdersList(data.result);
            setLoaded(false);
        })
        .catch( err => {
            setLoaded(false);
            console.log(err) 
        })

        return () => {
            ac.abort(); // Abort both fetches on unmount
        }
    }, [CacheKey]);
    
    const onSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheckOrders(ordersList.map(order => order));
        if (isCheckAll) {
            setIsCheckOrders([]);
        }
    };

    const onSelect = e => {
        const { id, checked } = e.target;
        setIsCheckOrders([...isCheckOrders, ordersList.find(order => order._id == id)]);
        if (!checked) {
            setIsCheckOrders(isCheckOrders.filter(order => order._id !== id));
        }
    };

    const tableList = ordersList.map((order, index)=>{
        return (
            <TableRow key={index}>
                <TableData2>{order._id}</TableData2>
                <TableData2>{order.item}</TableData2>
                <TableData2>{order.quantity}</TableData2>
                <TableData2> 
                        <Moment format="DD/MM/YYYY">{order.orderIssueDate}</Moment>
                </TableData2>
                <TableData2 style={{textAlign: 'center'}}>
                    <ConfirmCell  
                        id={order._id}
                        type="checkbox" 
                        onChange={onSelect}
                        checked={isCheckOrders.includes(order)}
                    />
                </TableData2>
            </TableRow>
        )
    });

    const updateSelectedRows = async (status: string) => {
        // PUT request to /updateOrderStatus       
        let request = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status,
                list: isCheckOrders
            })
        }
        // Send request to update selected order states
        await fetch(urlUpdate, request).then( res => res.json() )
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

    return( 
        <>
            <OrderContainer>
                <Table>
                    <TableHeader style={{height: '100px'}}>
                        <TableHeadRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Item ID</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Expected Date</TableHead>
                            { ordersList.length ? 
                                <TableHead style={{ textAlign: 'center', paddingBottom: '0'}}>
                                    <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <h4>Confirm Status</h4>
                                        <ConfirmCell 
                                            type="checkbox"
                                            name="Select All"
                                            id="selectAll"
                                            onChange={onSelectAll}
                                            checked={isCheckAll}                                    
                                            />
                                        <h4>Select All</h4>
                                    </div>
                                </TableHead> : null }
                        </TableHeadRow>
                    </TableHeader>
                    <TableBody>
                    {isLoading ? 
                        <tr>
                            <td>
                                <Spinner />
                            </td>
                        </tr> 
                        : !ordersList.length ? 
                        <tr style={{textAlign: 'center', justifyContent: 'center', width:'100%'}}>
                            <td style={{fontSize: '1.8rem', width: '100%'}}>
                                Nothing to show. Come back later!
                            </td>
                        </tr> 
                        : tableList}
                    </TableBody>
                </Table>
                <ButtonContainer>
                    <OrderButton onClick={ e => updateSelectedRows('Confirmed')} buttonColor={recColor} buttonHoverColor={hoverRecColor}>
                        {recText}
                    </OrderButton> 
                    <OrderButton onClick={ e => updateSelectedRows('Delayed')} buttonColor={notColor} buttonHoverColor={hoverNotColor}>
                        {notText}
                    </OrderButton> 
                </ButtonContainer>
            </OrderContainer>
        </>
    );
}
export default IncomingOrderSection;


