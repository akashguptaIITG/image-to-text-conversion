# image-to-text-conversion

A simple integration of google's cloud vision api for image to text conversion

## Api End point (port 3000)

### POST /api/gcp/imageToText

- request
  body: {
  "image":"your image in base64 or url"
  }
- response:
  {
  data:"array of words detected in the image"
  }

### deployed api endpoint: http://52.73.243.18:3000/api/gcp/imageToText

### POST /api/aws/imageToText

- request
  body: {
  "image":"your image in base64"
  }
- response:
  {
  data:"array of words detected in the image"
  }

### deployed api endpoint: http://52.73.243.18:3000/api/aws/imageToText

- for local testing googles vision and aws api key is required for authentication and must be created in config folder

## PostMan Collection link: https://www.getpostman.com/collections/b6cbcc75b13d38a9e60b
