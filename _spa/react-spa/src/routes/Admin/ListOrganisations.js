import React, {useEffect, useState} from 'react';
import ApiConnector from "../../services/ApiConnector";
import {Box, Button, List, ListItem, ListItemText} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate, useNavigation} from 'react-router-dom';

const ListOrganisations = () => {
    const navigate = useNavigate();
    const [organisations, setOrganisations] = useState([]);

    useEffect(() => {
        let mounted = true;
        let apiConnector = new ApiConnector();
        let promise = apiConnector.getOrganisations()
        promise.then(dataPromise => {
            let dataList = dataPromise.data.map(each => each);
            if (mounted) {
                setOrganisations(dataList)
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID' },
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
        },
        {
            field: 'userButton',
            headerName: '',
            renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => onButtonClick(e, params.row)}
                        variant="outlined"
                    >
                        Users
                    </Button>
                );
            }
        }
    ];

    const onButtonClick = (e, row) => {
        e.stopPropagation();
        navigate("/listUsers", {state:{orgId:row.id}})
    };

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Box style={{background:"white"}} sx={{ height: 400, width: '40%' }}>
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
    );
};

export default ListOrganisations;
