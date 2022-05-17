import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row:
    flex: 1;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`
export const OrderContainer = styled.div`
    display: flex;
    flex-direction: column:
    flex: 1;
    width: 100%;
    height: 100%;
`

export const Table = styled.table`
    flex: 1;
    border-collapse: collapse; 
`

export const TableHeader = styled.thead`
    font-size: 1rem;
    color: #5F6369;
    text-align: left;
    border-bottom: 1px solid #D5D5D5;
`

export const TableBody = styled.tbody`
    overflow-y: auto; 
`
export const TableHeadRow = styled.tr`
    border-bottom: 1px solid #D5D5D5;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #D5D5D5;
    cursor: pointer;
    &:hover {
        background-color: #ECECEC;
    }
`

export const TableHead = styled.th`
    padding-bottom: 2%;
`

export const TableData = styled.td<{stockLevel: String}>`
    font-size: 1rem;
    color: ${({stockLevel}) => stockLevel === "Full Stock" ? '#84BD00': stockLevel === "Low Stock" ? '#FFC846' : stockLevel === "Out of Stock" ? '#F05F41' : '#5F6369'};
    text-align: left;
    padding-bottom: 5%;
`

export const TableData2 = styled.td`
    font-size: 1rem;
    color: #5F6369;
    text-align: left;
    padding: 2% 0;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

`