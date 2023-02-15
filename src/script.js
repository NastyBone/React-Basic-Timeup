class Pomodoro extends React.Component {
 constructor(props){
   super(props)
   
   this.state = {
     stop: true,
     initialized: false,
     sessionM: 25,
     breakM:5,
     seconds: '',
     intervalID: '',
     onScreen: '',
     pausedAt: '',
     enable:true,
     isSession: true,
     status: 'Session',
     beep: ''
   }
 }
  
 componentDidMount(){
    $('.control').click( (e)=> {
      if(this.state.enable){
      this.timeSetter(e.target.id)
      }
      
      })
    $('.fa-redo').click(()=>{
      this.state.beep.currentTime = 0;
      this.state.beep.pause();
      clearInterval(this.state.intervalID);
        this.setState({
                stop: true,
     initialized: false,
     sessionM: 25,
     breakM: 5,
     seconds: '',
     intervalID: '',
     onScreen: '',
     pausedAt: '',
     enable:true,
     isSession: true,
     status: 'Session',
    });
    })  
    $('#start_stop').click(()=> {
     
   this.timeMaster(this.state.sessionM*60)
   })
    this.setState({beep:document.getElementById('beep')})
   
  }
 
 controlTime(){ 
   clearInterval(this.state.intervalID);
 
   if(this.state.isSession){
     this.setState({
       isSession: !this.state.isSession,
       stop: true,
       initialized: false,
       pausedAt: '',
       status: 'Break'
     });
     this.timeMaster(this.state.breakM*60);
     
   } else {
     this.setState({
       isSession: !this.state.isSession,
       stop: true,
       initialized: false,
       pausedAt: '',
       status: 'Session'
     });
     this.timeMaster(this.state.sessionM*60)
     
     
   }
   
   
 }
  
 timeHandler(func,time){
    this.setState({intervalID: setInterval(func,time)}
                 )
  
  }
  
 timeMaster(ms){
this.setState({enable:false})
 if(!this.state.initialized && this.state.stop){
   this.setState({seconds: ms,
                 onScreen: ms})
   this.timeHandler(()=>{
     if (this.state.seconds !== 0){
        this.setState({
          seconds: this.state.seconds-1,
          onScreen: this.state.seconds-1,
          })
         } else {
           this.controlTime()
         }
   },1000)
   
  this.setState({initialized: !this.state.initialized,
                 stop: !this.state.stop})
    }else{
   
  if(!this.state.stop){
     
     clearInterval(this.state.intervalID)
     this.setState({stop: !this.state.stop,
                    pausedAt: this.state.seconds,
                    onScreen: this.state.seconds })
   
   }else{
     this.setState({stop: !this.state.stop})
     this.timeHandler(()=> {
       if (this.state.pausedAt !== 0){
     this.setState({seconds: this.state.pausedAt-1,
                    pausedAt: this.state.pausedAt-1,
                    onScreen: this.state.pausedAt-1,
        
                   })
  } else {this.controlTime()}
   
   
   },1000)}

     }
     
  }
  
 timeSetter(str){
    
   if (str == "session-decrement" && this.state.sessionM>1) {this.setState({sessionM : this.state.sessionM-1})
   }
   if (str == "session-increment" && this.state.sessionM<60){this.setState({sessionM : this.state.sessionM+1})
  }   
   if (str == "break-increment" && this.state.breakM<60 ){this.setState({breakM : this.state.breakM+1})
   } 
   if (str == "break-decrement" && this.state.breakM>1 ){this.setState({breakM : this.state.breakM-1})
   } 
    
  }
  
 timeChamber(){
     
    if (!this.state.initialized){
      
    if(this.state.sessionM < 10) {
          return '0' + this.state.sessionM + ":00"}
    
    else {
      return this.state.sessionM + ":00"}
    }
    
    else {
     var min = 0;
     var sec = this.state.onScreen;
      while(sec>=60){min++; sec-= 60}
      
      if(sec==0 && min==0){this.state.beep.play();
       }
      
      if(min < 10) {
        if(sec<10 ){
           return '0' + min + ':0' + sec
        }else {
          return '0' + min + ':' + sec}
      }else {
        if(sec<10){
           return   min + ':0' + sec
        }else {
      return   min + ':' + sec }
      
      }
    }
 
 }
 
  
 render() {
   
  
   
   return (
   <div id ='container'>
       <div id = 'menu'>
       <div id='session-label'>
        <span 
          className = 'fas fa-caret-up fa-4x control' 
                  id = 'session-increment'></span>
          <span>Session</span>
<span id = 'session-length'>{this.state.sessionM}</span>
         <span className = 'fas fa-caret-down fa-4x control'
                id = 'session-decrement'
           ></span>
       </div>
         <div id='break-label'>
         <span className = 'fas fa-caret-up fa-4x control'  
           id = 'break-increment'
           ></span>
       <span>Break</span>
         <span id = 'break-length'>{this.state.breakM}</span>
         <span className = 'fas fa-caret-down fa-4x control'
           id = 'break-decrement'
           ></span>
         </div>
       </div>
       
       <div id = 'timer-label'>
         <h5>{this.state.status}</h5>
         <h2 id= 'time-left'>{this.timeChamber()}</h2> 
         
       
       </div>
       
       <div id = 'controls'>
         <span className = 'fas fa-play fa-pause'
                id = 'start_stop'></span>
         <audio id='beep' src= 'https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/409[kb]nice-round-siren.wav.mp3'></audio>
         <span className = 'fas fa-redo'
           id = 'reset'></span>
       </div>
       
     </div>
   
   
   )
 }
  
}

ReactDOM.render(<Pomodoro/>, document.getElementById('clock'))


/*

if(!this.state.initialized){
     
     function cronoKeeper (callback,delay){
   var timerId, start, remaining = delay;

    this.pause = function() {
      
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
        
    };

    this.resume = function() {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
        return remaining
    };

    this.resume();

     }
    var timeTool  = new cronoKeeper ( 
() => console.log(Date.now()),1000) 
    this.setState({initialized: !this.state.initialized,
                          stop: !this.state.stop});
     
   }
    else{
      this.setState({stop: !this.state.stop})
      if(!this.state.stop){
       console.log('paused');
     timeTool.pause();
        
      }
      else {
        console.log('resumed');
          timeTool.resume();
     
      }
      
    }

*/
/*

<!--
User Story #1: I can see an element with id="break-label" that contains a string (e.g. "Break Length").
User Story #2: I can see an element with id="session-label" that contains a string (e.g. "Session Length").
User Story #3: I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".
User Story #4: I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment".
User Story #5: I can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5.
User Story #6: I can see an element with a corresponding id="session-length", which by default displays a value of 25.
User Story #7: I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session").
User Story #8: I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).
User Story #9: I can see a clickable element with a corresponding id="start_stop".
User Story #10: I can see a clickable element with a corresponding id="reset".
User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state.
User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.
User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.
User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.
User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.
User Story #16: I should not be able to set a session or break length to <= 0.
User Story #17: I should not be able to set a session or break length to > 60.
User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.
User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).
User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.
User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.
User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break has begun.
User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length" element.
User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a session has begun.
User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length" element.
User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".
User Story #27: The audio element with id="beep" must be 1 second or longer.
User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.
-->

*/