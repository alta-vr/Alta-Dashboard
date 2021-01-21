// import * as React from 'react';
// import styled, { css } from 'styled-components';
// import * as _ from 'lodash';

// import { BodyRow, Column } from './';

// // import ResizeObserver from 'react-resize-observer';

// // import Responsive from 'react-responsive';

// const MobileRow = styled.div`

//     display: flex;
//     flex-direction: row;
// `;

// const MobileHeader = styled.div`

//     flex 0 0 85px;

//     font-weight: bold;
// `;

// const MobileValue = styled.div`

//     width: 0px;
//     min-width: 0px;

//     flex 1 0 0;

//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
// `;

// const Selected = css`

//     ${MobileHeader}
//     {
//         flex 0 0 19px;
//     }

//     ${MobileValue}
//     {
//         width: 100%;

//         flex unset;

//         overflow: auto;
//         text-overflow: initial;
//         white-space: pre;
//     }

//     >${MobileRow}
//     {
//         flex-direction: column;
//     }
// `;

// const MobileSupportedWrapper = styled.div`

//     ${props => props.selected ? Selected : null};

//     display: flex;
// 	flex-direction: ${props => props.desktop ? 'row' : 'column'};
//     width: 100%;
// `;

// export default function MessageRow({
//   id,
//   style,
//   messageId,
//   message,
//   setSelected,
//   selected,
//   onResize,
//   desktop
// }) 
// {  
//   var item = fitToTable(message);

//   return (<BodyRow 
//         key={item.id}
//         selected={selected}
//         color={item.color}
//         onClick={() => setSelected(item.id)}
//         style={style}
//         >       
//         <MobileSupportedWrapper selected={selected} desktop={desktop} >
//             {desktop ? <>
//                 <Column>{item.type}</Column>
//                 <Column>{item.timeStamp && item.timeStamp.toLocaleTimeString()}</Column>
//                 <Column>{item.eventType}</Column>
//                 <Column>{item.logger}</Column>
//                 <Column>{item.message}</Column>
//             </> :
//             <>
//                 <MobileRow><MobileHeader>Type</MobileHeader><MobileValue>{item.type}</MobileValue></MobileRow>
//                 <MobileRow><MobileHeader>Time</MobileHeader><MobileValue>{item.timeStamp && item.timeStamp.toLocaleTimeString()}</MobileValue></MobileRow>
//                 <MobileRow><MobileHeader>Event</MobileHeader><MobileValue>{item.eventType}</MobileValue></MobileRow>
//                 <MobileRow><MobileHeader>Logger</MobileHeader><MobileValue>{item.logger}</MobileValue></MobileRow>
//                 <MobileRow><MobileHeader>Message</MobileHeader><MobileValue>{item.message}</MobileValue></MobileRow> 
//             </>}
//             {/* <ResizeObserver onResize={onResize}/>  */}
//         </MobileSupportedWrapper>
//     </BodyRow>
//   );
// }


// const allLogs = [
//     'TraceLog',
//     'DebugLog',
//     'InfoLog',
//     'WarnLog',
//     'ErrorLog',
//     'FatalLog',
// ];

// function fitToTable(item)
// {
//     if (!item)
//     {
//         console.error("Item undefined!");
//         return { id: -1};
//     }

//   var result = { id: item.id };

//   result.color = 'normal';
//   result.type = item.type;
//   result.timeStamp = new Date(item.data.timeStamp || item.timeStamp);
//   result.eventType = item.eventType;
//   result.logger = item.data.logger;

//   if (item.eventType == 'WarnLog')
//   {
//     result.color = 'warning';
//   }
//   else if (item.eventType == 'ErrorLog' || item.eventType == 'FatalLog')
//   {
//     result.color = 'error';
//   }
//   else if (!allLogs.includes(item.eventType))
//   {
//     result.color = 'success';
//   }

  
//   if (typeof item.data == 'string')
//   {
//     result.message = item.data;
//   }
//   else if (!!item.data.message)
//   {
//     result.message = item.data.message;
//   }
//   else if (!!item.data.Result)
//   {
//     result.message = JSON.stringify(item.data.Result, null, 4);
//   }
//   else if (!!item.data.StringResult)
//   {
//     result.message = item.data.StringResult;
//   }

//   if (!!item.data.Exception)
//   {
//     result.color = 'error';
//     result.message = item.data.Exception.Message;
//   }

//   return result;
// }