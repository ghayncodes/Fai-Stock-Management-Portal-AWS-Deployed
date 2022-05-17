import * as React from "react";

import Spinner from '../../assets/animations/Spinner/spinner';

import { 
    Container, 
    Table, 
    TableHeader,
    TableBody,
    TableData, 
    TableHead, 
    TableRow,
    TableHeadRow
} from '../../Styles/TableStyle';

const CACHE = {};

const StockTableSection:React.FC<any> = () => {
    const url = "http://localhost:3000/getStockLevels";

    const [itemsList, setItemsList] = React.useState ([]) ;
    const[CacheKey, setCacheKey] = React.useState(0);
    const [isLoading, setLoaded] = React.useState(false);

    React.useEffect(()=>{
        const ac = new AbortController();
        if (CACHE[CacheKey] !== undefined) {
            setItemsList(CACHE[CacheKey]);
            setLoaded(false);
        }
        else {
            setLoaded(true);
        }

        // GET request to /getStockLevels
        let request = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        }

        // Send request to get list of items
        fetch(url , request).then( res => res.json() )
        .then( data => {
            console.log(data.result);

            setCacheKey(data.result._id)
            CACHE[CacheKey] = data.result;

            setItemsList(data.result);
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

    const tableList = itemsList.slice(0, 5).map((item, index)=>{
        return (
        <TableRow key={index}>
            <TableData stockLevel={"null"}>{item._id}</TableData>
            <TableData stockLevel={"null"}>{item.name}</TableData>
            <TableData stockLevel={item.shelfStatus}>{item.shelfStatus}</TableData>
            <TableData stockLevel={item.shelfStatus}>{item.warehouseStatus}</TableData>
            <TableData stockLevel={"null"}>{item.quantitySold}</TableData>
        </TableRow>
        ) 
    });

    return( 
        <>
            <Container>
                <Table>
                    <TableHeader>
                        <TableHeadRow>
                            <TableHead>Item ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Shelf Status</TableHead>
                            <TableHead>Warehouse Status</TableHead>
                            <TableHead>Quantity Sold</TableHead>
                        </TableHeadRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? 
                            <tr>
                                <td>
                                    <Spinner />
                                </td>
                            </tr> 
                             : !itemsList.length ? 
                             <tr>
                                 <td style={{fontSize: 32, fontFamily: 'ManifaPro2'}}>
                                     No stock data available. Come back later!
                                 </td>
                             </tr> 
                            : tableList}
                    </TableBody>
                </Table>
            </Container>
        </>
    );
}
export default StockTableSection


