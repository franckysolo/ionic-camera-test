import {
  Plugins,
  CameraResultType,
  CameraSource
} from '@capacitor/core'

import { ref } from 'vue';


export function useCamera() {
  const { Camera } = Plugins;
  const source = ref(null)
  const filename = ref('')

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      direction: CameraSource.REAR,
      correctOrientation: false,
      quality: 75
    });

    let blob = await fetch(cameraPhoto.webPath).then(r => r.blob())
    // convert to file
    let file = new File([blob], `image.jpg`, {
      lastModified: new Date().getTime(),
      type: blob.type
    })

    source.value = file
    filename.value = cameraPhoto.webPath
  }

  return {
    source,
    filename,
    takePhoto
  }
}
