/*
 * freeCodeCamp Front End Libraries Certification
 * Project 3: Drum Machine
 * Alex Kozlov, 2020
 *
 * Plays audio drum samples when keys are pressed or the buttons are clicked.
 * Has two drum sample banks that can be switched between, as well as a power
 * switch and a volume slider.
 * 
 * Implemented in React in combination with Redux for state management. Although
 * using Redux isn't really necessary for a small app like this, I primarily wanted
 * to do it as an exercise to get a better understanding of Redux and its applicability.
 */

/*****************
 ***   Redux   ***
 *****************/

/*
 * Action types
 */

const UPDATE_DRUM_PAD = 'UPDATE_DRUM_PAD';
const TOGGLE_POWER = 'TOGGLE_POWER';
const TOGGLE_BANK = 'TOGGLE_BANK';
const UPDATE_VOLUME = 'UPDATE_VOLUME';

/*
 * Action creators
 */

const updateDrumPad = drumPadName => ({
  type: UPDATE_DRUM_PAD,
  drumPadName
});

const togglePower = () => ({
  type: TOGGLE_POWER
});

const toggleBank = () => ({
  type: TOGGLE_BANK
});

const updateVolume = volume => ({
  type: UPDATE_VOLUME,
  volume
});

/*
 * Reducers
 */

/*
 * String name of the last played drum pad.
 */
const playedDrumPad = (state = '', action) => {
  switch(action.type) {
    case UPDATE_DRUM_PAD:
      return action.drumPadName;
    default:
      return state;
  }
}

/*
 * Toggles the power on state (0 or 1).
 */
const powerOn = (state = 1, action) => {
  switch(action.type) {
    case TOGGLE_POWER:
      return Number(!state);
    default:
      return state;
  }
}

/*
 * Toggles the drum sample bank index (0 or 1).
 */
const bankIndex = (state = 0, action) => {
  switch(action.type) {
    case TOGGLE_BANK:
      return Number(!state);
    default:
      return state;
  }
}

/*
 * Sets the volume for playing the audio samples.
 */
const volume = (state = 50, action) => {
  switch(action.type) {
    case UPDATE_VOLUME:
      return action.volume;
    default:
      return state;
  }
}

/*
 * The combined reducer and the Redux store.
 */
const drumAppReducer = Redux.combineReducers({
  playedDrumPad,
  powerOn,
  bankIndex,
  volume
});

const reduxStore = Redux.createStore(drumAppReducer);

/*****************
 ***   React   ***
 *****************/

/*
 * A mapping of keyboard keys to key codes.
 */
const KEY_CODES = {
  Q: 81, 
  W: 87, 
  E: 69, 
  A: 65, 
  S: 83, 
  D: 68, 
  Z: 90, 
  X: 88, 
  C: 67
};

/*
 * A Drum Pad button that plays a drum sample audio.
 */

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    /* keep local "pressed" state, this is used for styling */
    this.state = {
      pressed: false
    };
    this.pressButton = this.pressButton.bind(this);
    this.releaseButton = this.releaseButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }
  
  pressButton() {
    // do nothing if the app is powered off
    if (!this.props.powerOn) {
      return;
    }
    
    // set the local state to "pressed"
    this.setState({
      pressed: true
    });
    
    // dispatch action to update the played drum pad name
    this.props.onDrumPlay(this.props.name);
    
    // play the audio
    const audio = document.getElementById(this.props.keyboardKey);
    audio.currentTime = 0;
    audio.volume = this.props.volume / 100;
    audio.play();
  }
  
  releaseButton() {
    this.setState({
      pressed: false
    });
  }
  
  handleKeyPress(event) {
    if (event.keyCode === KEY_CODES[this.props.keyboardKey]) {
      this.pressButton();
    }
  }
  
  handleKeyRelease(event) {
    if (event.keyCode === KEY_CODES[this.props.keyboardKey]) {
      this.releaseButton();
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyRelease);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyRelease);
  }
  
  render() {
    /* style the button if it's "pressed" */
    let style = {};
    if (this.state.pressed) {
      style = {
        backgroundColor: "crimson",
        borderStyle: "inset"
      };
    }
    
    const id = this.props.name.toLowerCase().replace(/\s/g, '-');
    return (    
      <button id={id} style={style}
        disabled={this.props.powerOn ? '' : 'disabled'}
        className="drum-pad"
        onMouseDown={this.pressButton}
        onMouseUp={this.releaseButton}>
        <audio id={this.props.keyboardKey} className="clip"
          src={this.props.audioFile} />
        {this.props.keyboardKey}
      </button>
    );
  }
}

/*
 * A container for the <DrumPad> component to connect it to 
 * the Redux store.
 */

const mapStateToDrumPadProps = state => ({
  powerOn: state.powerOn,
  volume: state.volume
});

const mapDispatchToDrumPadProps = dispatch => ({
  onDrumPlay: drumPadName => dispatch(updateDrumPad(drumPadName))
});

const DrumPadContainer = ReactRedux.connect(
  mapStateToDrumPadProps,
  mapDispatchToDrumPadProps
)(DrumPad);

/*
 * A 3x3 grid of <DrumPadContainer> components.
 */

const DrumGrid = ({ drumBank, playedDrumPad }) => (
  <section id="drum-grid-section">
    <div id="display">
      <p>{playedDrumPad}</p>
    </div>
    <div id="drum-grid">
      {drumBank.map(drumPad => (
        <DrumPadContainer key={drumPad.key}
          keyboardKey={drumPad.key}
          name={drumPad.name} 
          audioFile={drumPad.audioFile} />
      ))}
    </div>
  </section>
);

/* 
 * A generic Switch input which has two values (0 or 1).
 * Toggled with a mouse down press.
 */

const Switch = ({ desc, stateDesc, value, onMouseDown }) => (
  <div className="switch">
    <p>{desc}: 
      <span className="state-desc">{' ' + stateDesc}</span>
    </p>
    <input type="range" min="0" max="1" className="range-input"
      value={value}
      onMouseDown={onMouseDown} />
  </div>
);

/*
 * Power switch that toggles the power state.
 * We could access the "powerOn" state here as well,
 * but I decided to pass it from the main App together 
 * with the state description.
 */

const mapDispatchToPowerSwitchProps = dispatch => ({
  onMouseDown: () => dispatch(togglePower())
});

const PowerSwitch = ReactRedux.connect(
  null,
  mapDispatchToPowerSwitchProps
)(Switch);

/* 
 * Bank switch that toggles the audio sample bank.
 */

const mapDispatchToBankSwitchProps = dispatch => ({
  onMouseDown: () => dispatch(toggleBank())
});

const BankSwitch = ReactRedux.connect(
  null,
  mapDispatchToBankSwitchProps
)(Switch);

/*
 * A generic Slider input in the range 0 - 100.
 * Can be clicked or dragged to set.
 */

const Slider = ({ desc, stateDesc, value, onChange }) => (
  <div className="slider">
    <p>{desc}: 
      <span className="state-desc">{' ' + stateDesc}</span>
    </p>
    <input type="range" min="0" max="100" className="range-input"
      value={value} 
      onChange={e => onChange(e.target.value)} />
  </div>
);

/*
 * The Volume slider.
 */

const mapDispatchToVolumeSliderProps = dispatch => ({
  onChange: volume => dispatch(updateVolume(volume))
});

const VolumeSlider = ReactRedux.connect(
  null,
  mapDispatchToVolumeSliderProps
)(Slider);

/* 
 * The main Drum App.
 */

const DrumApp = ({ drumBanks, playedDrumPad, powerOn, bankIndex, volume }) => (
  <div id="background">
    <header id="header">
      <h1>Drum Machine App</h1>
      <p>Press keys or click on the buttons to play drum samples.</p>
      <p>Try listening to a slow to mid tempo heavy metal or hard rock track, and keeping the beat. It's a lot of fun!</p>
      <p>All credit goes to the awesome&nbsp; 
        <a href="https://www.youtube.com/watch?v=IKIDbeTGkd0" target="_blank">
          metal drum samples pack
        </a>.
      </p>
    </header>
    <main id="drum-machine">
      <PowerSwitch desc="Power"
        value={powerOn}
        stateDesc={powerOn ? "ON" : "OFF"} />
      <BankSwitch desc="Bank" 
        value={bankIndex} 
        stateDesc={drumBanks[bankIndex].bankName} />
      <VolumeSlider desc="Volume"
        value={volume} 
        stateDesc={volume} />
      <DrumGrid drumBank={drumBanks[bankIndex].bankArray}
        playedDrumPad={playedDrumPad} />
    </main>
  </div>
);

/*
 * The <DrumAppContainer> that connects to the Redux store.
 * I decided to access the state values here and pass them to the
 * other components, together with descriptions which are derived
 * from the state values.
 */

const mapStateToDrumAppProps = state => ({
  playedDrumPad: state.playedDrumPad,
  powerOn: state.powerOn,
  bankIndex: state.bankIndex,
  volume: state.volume
});

const DrumAppContainer = ReactRedux.connect(
  mapStateToDrumAppProps
)(DrumApp);

/* 
 * Create the drum bank arrays and render the Drum App.
 */

const drumBankOneArray = [
  { 
    key: 'Q', 
    name: 'Closed Hat', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/1_closed_hat.wav'
  },
  { 
    key: 'W', 
    name: 'Ride Cymbal', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/2_ride_cymbal.wav'
  },
  { 
    key: 'E', 
    name: 'Rack Tom 1', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/3_rack_tom_1.wav'
  },
  { 
    key: 'A', 
    name: 'Rack Tom 2', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/4_rack_tom_2.wav'
  },
  { 
    key: 'S', 
    name: 'Rack Tom 3', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/5_rack_tom_3.wav'
  },
  { 
    key: 'D', 
    name: 'Snare', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/6_snare.wav'
  },
  { 
    key: 'Z', 
    name: 'Floor Tom 1', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/7_floor_tom_1.wav'
  },
  { 
    key: 'X', 
    name: 'Floor Tom 2', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/8_floor_tom_2.wav'
  },
  { 
    key: 'C', 
    name: 'Bass', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/9_bass.wav'
  }
];

const drumBankTwoArray = [
  { 
    key: 'Q', 
    name: 'Splash Cymbal', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/1_splash_cymbal.wav'
  },
  { 
    key: 'W', 
    name: 'Crash Cymbal', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/2_crash_cymbal.wav'
  },
  { 
    key: 'E', 
    name: 'Rack Tom 1', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/3_rack_tom_1.wav'
  },
  { 
    key: 'A', 
    name: 'Rack Tom 2', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/4_rack_tom_2.wav'
  },
  { 
    key: 'S', 
    name: 'Rack Tom 3', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/5_rack_tom_3.wav'
  },
  { 
    key: 'D', 
    name: 'Snare', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/6_snare.wav'
  },
  { 
    key: 'Z', 
    name: 'Floor Tom 1', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/7_floor_tom_1.wav'
  },
  { 
    key: 'X', 
    name: 'Floor Tom 2', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/8_floor_tom_2.wav'
  },
  { 
    key: 'C', 
    name: 'Bass', 
    audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/9_bass.wav'
  }
];

const drumBanks = [
  {
    bankName: "Metal Drum Kit 1",
    bankArray: drumBankOneArray
  },
  {
    bankName: "Metal Drum Kit 2",
    bankArray: drumBankTwoArray
  }
];

ReactDOM.render(
  <ReactRedux.Provider store={reduxStore}>
    <DrumAppContainer drumBanks={drumBanks} />
  </ReactRedux.Provider>,
  document.getElementById('root')
);