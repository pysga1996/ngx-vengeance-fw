export class VgSoundUtil {
  public static initSound(
    soundCollection: string[],
    label: string,
    path = 'assets/media/sound'
  ): void {
    soundCollection.forEach((sound) => {
      const audioElement = document.createElement('audio');
      audioElement.id = `${label}_${sound}`; //Give it some ID
      const divsParent = document.getElementsByTagName('body')[0]; //get the element where you want to insert the div into
      divsParent.click();
      divsParent.appendChild(audioElement);
      audioElement.setAttribute('muted', 'muted');
      if (navigator.userAgent.match('Firefox/')) {
        audioElement.setAttribute('src', path + '/' + sound + '.ogg');
      } else {
        audioElement.setAttribute('src', path + '/' + sound + '.mp3');
      }
    });
  }

  public static playSound(
    sound = 'default',
    path = 'assets/media/sound'
  ): void {
    let audioElement = document.getElementById(sound) as HTMLAudioElement;
    if (!audioElement) {
      audioElement = document.createElement('audio');
      audioElement.setAttribute('muted', 'muted');
      if (navigator.userAgent.match('Firefox/')) {
        audioElement.setAttribute('src', path + '/' + sound + '.ogg');
      } else {
        audioElement.setAttribute('src', path + '/' + sound + '.mp3');
      }
    }
    // audioElement.addEventListener('load', () => {
    //   audioElement.play().then(() => {
    //     console.debug(`Play ${sound}`);
    //   });
    // }, true);
    // audioElement.pause();
    audioElement.muted = false;
    audioElement
      .play()
      .then(() => {
        console.debug(`Play ${sound} success`);
      })
      .catch((err) => {
        console.error(`Play ${sound} failed`, err);
      });
  }
}
