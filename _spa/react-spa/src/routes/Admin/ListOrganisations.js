import React, {useEffect, useState} from 'react';
import ApiConnector from "../../services/ApiConnector";
import {Box, Button, IconButton} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


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
        {
            field: 'name',
            flex: 1,
            headerName: 'Organisation name',
            editable: true,
        },
        {
            field: 'logo',
            flex: 1,
            headerName: 'Logo Name',
            editable: false,
        },
        {
            field: 'facilityName',
            flex: 1,
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
        navigate("/listUsers", {state: {orgId: row.id}})
    };

    const processRowUpdate = (newRow) => {
        let api = new ApiConnector();
        api.setOrganisation(newRow)
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error);
        return;
    }, []);

    return (
        <div style={{display: "flex", height:"100%", justifyContent: "center", alignItems: "center"}}>
            <Box style={{background: "white"}} sx={{height: 400, width: '40%'}}>
                <Button variant="contained" onClick={() => {
                    navigate("/createOrganisation")
                }} startIcon={<AddIcon/>}>
                    Add organisation
                </Button>
                <DataGrid style={{background: "white"}}
                          getRowId={(row) => {
                              let uuid = crypto.randomUUID();
                              // console.log(uuid)
                              return row.id
                          }}
                          rows={organisations}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          processRowUpdate={processRowUpdate}
                          onProcessRowUpdateError={handleProcessRowUpdateError}
                          disableSelectionOnClick
                          experimentalFeatures={{newEditingApi: true}}
                />
            </Box>
        </div>
    );
};
export default ListOrganisations;
