import * as React from "react";
import Moment from "react-moment";

import Spinner from '../../assets/animations/Spinner/spinner';

import { 
    Container, 
    Table, 
    TableHeader,
    TableBody,
    TableHead, 
    TableRow, 
    TableHeadRow,
    TableData2
} from '../../Styles/TableStyle';

const CACHE = {};

const OrderTableSection:React.FC<any> = ({ url }) => {

    const [ordersList, setOrdersList] = React.useState([]);
    const[CacheKey, setCacheKey] = React.useState(0);
    const [isLoading, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const ac = new AbortController();
        if (CACHE[CacheKey] !== undefined) {
            setOrdersList(CACHE[CacheKey]);
            setLoaded(false);
        }
        else {
            setLoaded(true);
        }

        // GET request to orders
        let request = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        }

        // Send request to get list of orders
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

    const tableList = ordersList.map((order, index)=>{
        return (
            <TableRow key={index}>
                <TableData2>{order._id}</TableData2>
                <TableData2>{order.item}</TableData2>
                <TableData2>{order.quantity}</TableData2>
                <TableData2> 
                    <Moment format="DD/MM/YYYY">{order.orderIssueDate}</Moment>
                </TableData2>
            </TableRow>
        )
    });

    return( 
        <>
        <Container>
            <Table>
                <TableHeader>
                {isLoading  || !ordersList.length ? '' :
                    <TableHeadRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Expected Date</TableHead>
                    </TableHeadRow>}
                </TableHeader>
                <TableBody>
                {isLoading ? 
                    <tr>
                        <td>
                            <Spinner />
                        </td>
                    </tr> 
                    : !ordersList.length ? 
                    <tr style={{textAlign: 'center', justifyContent: 'center'}}>
                        <td style={{fontSize: '1.8rem', width: '100%'}}>
                            Nothing orders to display. Come back later!
                        </td>
                    </tr> 
                    : tableList}
                </TableBody>
            </Table>
        </Container>
        </>
    );
} 

export default OrderTableSection



