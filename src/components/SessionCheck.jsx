import React from 'react';
import { withRouter, Redirect } from 'react-router';
import { Sessions } from "alta-jsapi";

export function withLogin(Component)
{
    return withRouter((props) =>
    {
        return <CheckLogin {...props}><Component {...props}/></CheckLogin>;
    });
}

export function CheckLogin({children, location})
{
    const [loggedIn, setLoggedIn] = React.useState(undefined);
    
    React.useEffect(() =>
    {
        Sessions.ensureLoggedIn()
        .then(() => setLoggedIn(true))
        .catch(() => setLoggedIn(false));
    },
    [location.pathname]);

    if (loggedIn === undefined)
    {
        return null;
    }

    if (!loggedIn)
    {
        return <Redirect to={'/auth/login-page?redirect=' + location.pathname}/>;
    }
    
    return <>
        {children}
    </>;
}

export function withPolicies(...policies)
{
    return (Component) =>
    {
        return withLogin((props) =>
        {
            if (policies.every(item => Sessions.getPolicies().includes(item)))
            {
                return <Component {...props}/>;
            }

            return <Redirect to={'/denied'}/>
        }); 
    }
}