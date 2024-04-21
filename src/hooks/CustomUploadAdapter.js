export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          const formData = new FormData()
          formData.append('file', file)
          try {
            const response = await fetch(`http://localhost:8000/upload-file`, {
              method: 'POST',
              body: formData,
            })
            const image = await response.json()
            resolve({ default: image.secure_url })
          } catch (error) {
            reject(err)
          }
        })
    )
  }
}
