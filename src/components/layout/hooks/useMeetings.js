import React, {useState} from 'react';
import { v4 as uuid } from 'uuid'

const getMeetings = () => {
    const meetings = window.localStorage.getItem('meetings'); // attempt to retrieve meetings

    if(!meetings){ // if falsy return empty array
        return [];
    }
    //All data in local storage are strings, so we have to parse what comes out into a js object.
    return JSON.parse(meetings);
}

const useMeetings = () => {
    const [meetings, setMeetings] = useState(getMeetings());

    const updateMeetings = (newMeetings) => {
        const stringifiedMeetings = JSON.stringify(newMeetings);
        window.localStorage.setItem('meetings', stringifiedMeetings);
        setMeetings(newMeetings);
    };

    const editMeeting = (meetingName, meetingLink, presenterName, mon, tue, wed, thurs, fri, sat, sun, startTime, endTime) => {
        const newMeeting = {meetingName, meetingLink, presenterName,  mon, tue, wed, thurs, fri, sat, sun, startTime, endTime, id: uuid()};
        updateMeetings([...meetings, newMeeting]);
        //updateMeetings(meetings);

        // const filtered = meetings.filter(function(item){
        //     return item.id !== id;
            
        // })
        // console.log(filtered);
        // updateMeetings(filtered);
    };

    const addMeeting = (meetingName, meetingLink, presenterName, mon, tue, wed, thurs, fri, sat, sun, startTime, endTime) => {
        const newMeeting = {meetingName, meetingLink, presenterName,  mon, tue, wed, thurs, fri, sat, sun, startTime, endTime, id: uuid()};
        updateMeetings([...meetings, newMeeting]);
    };

    const deleteMeeting = (id) => {
        const meetingIdx = meetings.findIndex(meeting => meeting.id===id);
        // console.log(meetings[meetingIdx]);
        // console.log("meetingid: " + meetings[meetingIdx].id + " id:" + id);
        // console.log(meetings)
        const filtered = meetings.filter(function(item){
            return item.id !== id;
        })
        // console.log(filtered);
        updateMeetings(filtered);
    }

    return [meetings, addMeeting, editMeeting, deleteMeeting];


};

export default useMeetings;