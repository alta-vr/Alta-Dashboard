import React from 'react';
import { withRouter, Redirect } from 'react-router';
import { Sessions } from "alta-jsapi";

export function withLogin(Component)
{
    return withRouter((props) =>
    {
        if (!!Sessions.getUserId())
        {
            return <Component {...props}/>;
        }
        
        var path = props.location.pathname;

        return <Redirect to={'/auth/login-page?redirect=' + path}/>;
    });
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