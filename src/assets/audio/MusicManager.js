import AudioManager from './AudioManager';
//"main": require("./musicSrc/main.mp3")
const sounds = {
  "main": require("./musicSrc/main.mp3")
}
class _MusicManager extends AudioManager {
    constructor(sounds) {
        super(sounds);
        
        this._playingSound = null;
    }
    
    async play(name, repeat=false) {
        if (!this._isActive) return;
        if (!this.sounds.hasOwnProperty(name)) throw `no song with name ${name} was found`;
        
        this._playingSound = name;
        let sound = this.sounds[name];
        // sound.setOnPlaybackStatusUpdate((status) => this.checkStatus(status, repeat));
        
        try {
          await sound.setPositionAsync(0);
          await sound.playAsync();
          await sound.setIsLoopingAsync(true);
          
          return new Promise((res, rej) => res());
        }
        catch (error) {
         console.log('play sound error: ', error);
        }
    }
    
    // checkStatus(status, replay) {
    //     if (status.didJustFinish) {
            
    //     }
    //     if (replay && status.didJustFinish) { this.play(this._playingSound, true) }
    // }
    
    async setActive(isActive) {
        super.setActive(isActive);
        let playing = this._playingSound;
        if (isActive && playing) {
            //continue
            await this.sounds[playing].playAsync();
        } else {
            //pause
            await this.sounds[playing].pauseAsync();
        }
    }
    
}
const MusicManager = new _MusicManager(sounds);

export const loadMusic = () => { console.log("loading music"); return MusicManager.loadAudio() };
export default MusicManager;