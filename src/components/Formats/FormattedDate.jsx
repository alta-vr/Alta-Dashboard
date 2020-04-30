import React, { useState, useEffect } from "react";

export default function FormattedDate(props) {
  var { date } = props;
  var currentDate = new Date(Date.parse(date));

  return <div>{currentDate.toDateString()}</div>;
}
