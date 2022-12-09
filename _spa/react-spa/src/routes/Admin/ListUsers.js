import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import ApiConnector from '../../services/ApiConnector';
import {DataGrid} from '@mui/x-data-grid';
import {useLocation} from 'react-router-dom';

const ListUsers = (props) => {
    const location = useLocation();

    const columns = [
        {field: 'id', headerName: 'ID'},
        {
            field: 'name',
            headerName: 'Name',
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
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
                        Edit
                    </Button>
                );
            }
        }
    ];

    const onButtonClick = (e, row) => {
        e.stopPropagation();
    };

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

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box style={{background: "white"}} sx={{height: 400, width: '40%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                />
            </Box>
        </div>
    );
};

export default ListUsers;
