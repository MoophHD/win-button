import Expo from 'expo';

class AudioManager {
    constructor(sounds) {
        // { name: source };
        if (typeof sounds != "object") throw "Wrong prop 'sounds' supplied to SoundManagerClass, expected Object";
        this.sounds = {};
        
        let toLoad = {};
        Object.keys(sounds).forEach((key) => {
            toLoad[key] = Expo.Audio.Sound.create(sounds[key]);
        });
        this._toLoad = toLoad;
        this._isActive = true;
    }
    
    loadAudio() {
        let toLoad = this._toLoad;
        let keys = Object.keys(toLoad);
        let promises = Object.values(toLoad);
        
        return Promise.all(promises)
            .then((res) => res.forEach(
                ({ sound }, i) => {
                    let key = keys[i];
                    this.sounds[key] = sound;
                }
            ));
    }
    
    async play(name) {
        if (!this._isActive) return;
        
        if (!this.sounds.hasOwnProperty(name)) throw `no song with name ${name} was found`;
        let sound = this.sounds[name];
        try {
          await sound.setPositionAsync(0);
          await sound.playAsync();
          
          return new Promise((res, rej) => res());
        }
        catch (error) {
         console.log('play sound error: ', error);
        }
    }
    
    setActive(isActive) {
        this._isActive = isActive;
    }
    
    toggleVolume() {
        this.setActive(!this._isActive);
    }
    
    getActive() {
        return this._isActive;
    }
}

export default AudioManager;