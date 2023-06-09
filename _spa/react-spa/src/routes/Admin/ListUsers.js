import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import ApiConnector from '../../services/ApiConnector';
import {DataGrid} from '@mui/x-data-grid';
import {useLocation, useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListUsers = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            editable: true,
        },
        {
            field: 'password',
            headerName: 'Password',
            flex: 1,
            editable: true,
        }

    ];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        let mounted = true;
        let apiConnector = new ApiConnector();
        let promise = apiConnector.getUsers(location.state.orgId);
        promise.then(dataPromise => {
            let dataList = dataPromise.data.map(each => each);
            if (mounted) {
                setUsers(dataList)
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const processRowUpdate = React.useCallback(
        (newRow) => {
            let api = new ApiConnector();
            api.setUser(newRow);
        },
        [],
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error)
    }, []);

    return (
        <div style={{display: "flex", height:"100%", justifyContent: "center", alignItems: "center"}}>
            <Box style={{background: "white"}} sx={{height: 400, width: '40%'}}>
                <Button variant="contained" onClick={() => {
                    navigate("/listOrganisations")
                }} startIcon={<ArrowBackIcon/>}>
                    Back
                </Button>
                <DataGrid style={{background:"white"}}
                    rows={users}
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

export default ListUsers;
