import AudioManager from './AudioManager';

const sounds = {
  "bell": require("./src/bell.mp3"),
  "btn": require("./src/btn.mp3"),
  "switch": require("./src/switch.mp3")
}
const SoundManager = new AudioManager(sounds);

export const loadSounds = () => { console.log("loading sound"); return SoundManager.loadAudio() };
export default SoundManager;