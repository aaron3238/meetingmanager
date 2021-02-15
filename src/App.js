/*global chrome*/
import React from "react";
import "./App.css";
import Topbarnav from "./components/layout/Topbarnav.js"
import Body from "./components/layout/Body.js"
import Newmeetingform from "./components/layout/Newmeetingform";

const handleSaveToPC = (jsonData,filename) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};




function App() {


  const MEETINGS = [
    {
      name: "CSC252",
      link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
      presenter: "Dr. Carelli",
      weekdays: "T, TH",
      starttime: "3:00 PM",
      endtime: "4:20 PM",
    },
    {
      name: "CSC464",
      link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
      presenter: "Dr. Carelli",
      weekdays: "T, TH",
      starttime: "3:00 PM",
      endtime: "4:20 PM",
    },
    {
      name: "CSC320",
      link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
      presenter: "Dr. Carelli",
      weekdays: "T, TH",
      starttime: "3:00 PM",
      endtime: "4:20 PM",
    },
  ];
  return (
    <div className="App">
      <Topbarnav/>
      <Newmeetingform/>
      <Body meetings={MEETINGS}/>
    </div>
  );
}
export default App;