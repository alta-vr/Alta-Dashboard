import React, { useState, useEffect } from "react";

export default function FormattedDate(props) {
  var { date, local } = props;
  var currentDate = new Date(Date.parse(date));

  // format using non-javascript ways
  return <>{currentDate.toDateString()}</>;
}
