import React from 'react';
import { Avatar, Card, CardHeader, IconButton, MenuItem, Menu } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';

import memoizee from 'memoizee';
import { Friends, Servers, Users } from 'alta-jsapi';

const getProfilePicture = (name) => `https://storage.googleapis.com/alta-launcher/profile-pictures/${name}.png`;

const imageExists = memoizee(src =>
{
    return new Promise(setResult =>
    {
        var image = new global.Image();
        
        image.src = src;

        image.onload = function () {

            setResult(true);
        };

        image.onerror = function () {
            
            setResult(false);
        };
    });
});

export function useImageFallback(items, loadingImage)
{
    var [result, setResult] = React.useState(loadingImage);

    React.useEffect(() =>
    {
        setResult(loadingImage);
        
        var active = true;

        function attempt(index)
        {
            var src = items[index];

            if (src == undefined)
            {
                return;
            }

            imageExists(src).then(success => !active ? null : (success ? setResult(src) : attempt(index + 1)));
        }

        attempt(0);

        return () =>
        {
            active = false;
        }
    },
    items);

    return result;
}


export function useProfilePicture(userId, userIcon)
{
    var fixedIcon = userIcon || ('Preset_' + ((userId % 3) + 1));

    return useImageFallback([getProfilePicture(userId), getProfilePicture(fixedIcon)]);
}


const getUserInfo = memoizee(id => Users.getInfo(id));
export const useUserCache = (id) =>
{
    var [info, setInfo] = React.useState();

    React.useEffect(() =>
    {
        var active = true;

        getUserInfo(id)
        .then(newInfo =>
        {
            if (active)
            {
                setInfo(newInfo);
            }
        });

        return () => active = false;
    }, [id]);

    return info;
}

export function ProfileCard({userId, username})
{
    var [anchor, setAnchor] = React.useState();
    var info = useUserCache(userId);

    var pfp = useProfilePicture(userId);

    var name = !!info ? info.username : username;

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const addFriend = () =>
    {
        handleClose();

        Friends.addFriend(userId);
    }

    return <Card>
        <CardHeader
        avatar={<Avatar src={pfp}/>   }
        action={
            <IconButton onClick={handleClick}>
            <MoreVertIcon />
            </IconButton>
        }
        title={name}
        subheader={userId}
        />
        <Menu
            anchorEl={anchor}
            keepMounted
            open={!!anchor}
            onClose={handleClose}
        >
        <MenuItem onClick={addFriend}>Add Friend</MenuItem>
      </Menu>
    </Card>;
}

const getServerInfo = memoizee(id => Servers.getDetails(id));
export const useServerCache = (id) =>
{
    var [info, setInfo] = React.useState();

    React.useEffect(() =>
    {
        var active = true;

        getServerInfo(id)
        .then(info =>
        {
            if (active)
            {
                setInfo(info);
            }
        });

        return () => active = false;
    }, [id]);

    return info;
}

export function ServerCard({serverId})
{
    var [anchor, setAnchor] = React.useState();

    var info = useServerCache(serverId);

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };


    return <Card>
        <CardHeader
        avatar={<Avatar />   }
        action={
            <IconButton onClick={handleClick}>
            <MoreVertIcon />
            </IconButton>
        }
        title={!!info ? info.name : "Loading..."}
        subheader={serverId}
        />
        <Menu
            anchorEl={anchor}
            keepMounted
            open={!!anchor}
            onClose={handleClose}
        >
        {/* <MenuItem onClick={addFriend}>Add Friend</MenuItem> */}
      </Menu>
    </Card>;
}