import React from 'react';

export const MeetingContext = React.createContext({
    meetings: [],
    editMeeting: () => {},
    addMeeting: () => {},
    deleteMeeting: () => {},
    updateMeetings: () => {}
    
})

