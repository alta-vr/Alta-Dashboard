import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';



export const PlayerDropdown = ({label, server, connection, value, onChange, ...props}) =>
{
    var players = usePlayers(server, connection);

    return <FormControl {...props}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={e => onChange(e.target.value)}>
            {players.map(item => <MenuItem value={item.id}>{item.username}</MenuItem>)}
        </Select> 
    </FormControl>;
}

export function usePlayers(server, connection)
{
    function sort(list)
    {
        return list.sort((a, b) => a.username.localeCompare(b.username));
    }

    var [players, setPlayers] = React.useState(undefined);

    //Get live player list, and update it whenever a user joins or leaves
    connection.useCommand('player list', result => setPlayers(sort(result.data.Result)));
    connection.useSubscription('PlayerJoined', result => setPlayers(old => sort([...old, result.data.user])));
    connection.useSubscription('PlayerLeft', result => setPlayers(old => old.filter(item => item.id != result.data.user.id)));
    
    return  players || sort(server.online_players);
};