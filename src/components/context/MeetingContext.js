import React from 'react';

export const MeetingContext = React.createContext({
    user: {},
    meetings: [],
    editMeeting: () => {},
    addMeeting: () => {},
    deleteMeeting: () => {},
    updateMeetings: () => {}
    
})


