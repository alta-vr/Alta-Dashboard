import { request, requestPaged } from 'alta-jsapi';

export const Forms =
{
    getForm: (id) =>
    {
        return request('GET', `forms/${id}`);
    },

    submit: (id, pages) =>
    {
        return request('POST', `forms/${id}/responses`, false, pages);
    },
    
    getResponses: (id, isDetailed = false) =>
    {
        return requestPaged('GET', `forms/${id}/responses?isDetailed=${isDetailed}`, 100);
    },
    
    getResponse: (id, responseId) =>
    {
        return request('GET', `forms/${id}/responses/${responseId}`);
    },

    getUserResponses : (userId, formId = 0) =>
    {
        return request('GET', `forms/user/${userId}?formId=${formId}`);
    },

    comment : (formId, responseId, comment, hidden) =>
    {
        return request('POST', `forms/${formId}/responses/${responseId}/comments`, false, {comment, hidden});
    },

    resolve : (formId, responseId, resolved, comment) =>
    {
        return request('POST', `forms/${formId}/responses/${responseId}/resolve`, false, { resolved, comment });
    }
}