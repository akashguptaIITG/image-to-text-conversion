# image-to-text-conversion

A simple api integrating google's cloud vision api for image to text conversion

# Api End point (port 3000)

## POST /api/image

request
body: {
"image":"your image in base64"
}
response:
{
data:"text detected in the image"
}
