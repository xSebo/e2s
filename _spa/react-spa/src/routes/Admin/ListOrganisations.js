import React, {useEffect, useState} from 'react';
import ApiConnector from "../../services/ApiConnector";
import {ListItem, ListItemText} from "@mui/material";


const ListOrganisations = () => {
    const [organisations, setOrganisations] = useState(["",""])

    async function loadData() {
        let apiConnector = new ApiConnector();
        let promise = apiConnector.getOrganisations()
        let dataReturn;
        await promise.then(data => {
            dataReturn = data;
        })
        let dataList = []
        let size = dataReturn.length
        for(let i=0;i<size;i++){
            dataList.push(dataReturn[i].name)
        }
        console.log(dataList)
        return dataList
    }

    return (
        <div>
            {loadData().map((organisation) => {
                <ListItem>
                    <ListItemText
                        primary={organisation}
                    />
                </ListItem>
            })}
        </div>
    )
}
export default ListOrganisations;
