# PanExtractionService

Web application for uploading PAN card details.

## Running the app
A working GCP account with ![Vision API](https://cloud.google.com/vision/) enabled is required. The app will require a service account to work. The instruction for setting up one can be found here: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances. The service account details need to be placed in the project root.

A firebase project with a realitme database and firebase service account is also required. Instructions can be found here: https://firebase.google.com/docs/admin/setup

## Functionalities

* Upload image of PAN card
* Take picture of PAN card through webcam
* Validation of the image being of a PAN card
* Extraction of PAN card details
* Validaton of PAN card details.
* Persistent storage
* Admin UI for reviewing details
* Image preprocessing (sharpening)

## Tech Stack

|Component   |Tech   |
|---|---|
|API Server   |NodeJS   |
|Front End   |HTML, CSS, Vanilla JS   |
|Image recognition and extraction   |Google Vision APIS   |
|Image processing | ![sharp](https://github.com/lovell/sharp) |
|Data storage | Firebase |
