import * as React from 'react';
import QRCode from 'qrcode';

import { 
    ItemContainer,
    ItemColumn,
    ItemName,
    ImageWrapper, 
    QRCodeWrapper
 } from '../../Styles/ItemStyle';
import Spinner from '../../assets/animations/Spinner/spinner';

 const CACHE = {};

 const ItemStatSection:React.FC<any> = (props) => {

    const {
        url,
        setMostPurchasedItem
    } = props;

    const[items, setItems] = React.useState([]);
    const [itemQRCode, setItemQRCode] = React.useState("");

    const[CacheKey, setCacheKey] = React.useState(0);
    const [isLoading, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const ac = new AbortController();
        if (CACHE[CacheKey] !== undefined) {
            setItems(CACHE[CacheKey]);
            setLoaded(false);
        }
        else {
            setLoaded(true);
        }

        // GET request to /getMostPurchased
        let request = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        }

        // Send request to get list of items
        fetch(url , request).then( res => res.json() )
        .then( data => {
            console.log(data.item);

            setCacheKey(data.item._id)
            CACHE[CacheKey] = data.item;

            setItems(data.item);
            QRCode.toDataURL(data.item[0]._id).then(data => setItemQRCode(data));
            setLoaded(false);
            setMostPurchasedItem(data.item[0]._id);
        })
        .catch( err => {
            setLoaded(false);
            console.log(err) 
        })

        return () => {
            ac.abort(); // Abort fetch on unmount
        }
    }, [CacheKey]);

    const resItem = items.map((item, index)=>{
        return (
            <ItemContainer key={index}>
                <ImageWrapper>
                    <img src={item.imageURL} alt="Image of the most purchased item" height={'80%'} width={'80%'}/>
                </ImageWrapper>
                <ItemColumn>
                    <ItemName>
                        {item.name}
                    </ItemName>
                    <QRCodeWrapper>
                        <img src={itemQRCode} alt="A QRCode for the most purchased item ID"/>
                    </QRCodeWrapper>
                </ItemColumn>
            </ItemContainer>
        ) 
    });

    return( 
        <>
            { isLoading ? <Spinner /> : resItem }
        </>
    );
}
export default ItemStatSection




