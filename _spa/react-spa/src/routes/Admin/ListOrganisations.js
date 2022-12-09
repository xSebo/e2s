import React, {useEffect, useState} from 'react';
import ApiConnector from "../../services/ApiConnector";
import {Box, List, ListItem, ListItemText} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


const ListOrganisations = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Organisation name',
            editable: true,
        },
        {
            field: 'logo',
            headerName: 'Logo Name',
            editable: true,
        },
        {
            field: 'facilityName',
            headerName: 'Facility Name',
            editable: true,
        }]

    const [organisations, setOrganisations] = useState([]);

    function loadData() {
        let apiConnector = new ApiConnector();
        let promise = apiConnector.getOrganisations()
        return (promise.then(dataPromise => {
            let data = dataPromise.data
            let dataList = []
            data.forEach(each => dataList.push(each))
            return dataList
        }))
    }

    useEffect(() => {
        let mounted = true;
        loadData()
            .then(items => {
                setOrganisations(items)
            })
        return () => mounted = false;
    }, [])

    console.log(organisations)


    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Box style={{background:"white"}} sx={{ height: 400, width: '30%' }}>
                <DataGrid
                    rows={organisations}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
)
}

export default ListOrganisations;
