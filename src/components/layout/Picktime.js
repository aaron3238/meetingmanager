import React, {Component} from 'react';
import TimeKeeper from 'react-timekeeper';


export default class Picktime extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);
    }



    render(){
        const [time, setTime] = '12:34pm';
    
        return (
            <div>
                <TimeKeeper
                    time={time}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    doneButton={(newTime) => (
                        <div
                            style={{ textAlign: 'center', padding: '10px 0' }}
                            onClick={() => alert('new time is now', newTime.formatted12)}
                        >
                            Close
                        </div>
                    )}
                />
                <span>Time is {time}</span>
            </div>
        )
        
    }
}
