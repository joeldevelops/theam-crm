# CRM API

This app is the backend for a CRM service that allows users to view customers

## High Level Design and APIs

This project was designed with the following considerations and assumptions:

* The codebase should be as decoupled and scalable as possible.
* To promote decoupling, services will not call each other directly.
* All users will belong to a company. However company APIs may be outside the scope of this project. I will add APIs for creating/updating companies if time allows.
* All users and admin users belonging to a company have permissions see all of their customers.
* The APIs will be humanly readable and useable as possible.
* The design included here may change slightly as an auth system is implemented, I am currently reviewing OAuth providers.

### APIs
![Apis and Entities](./docs/apis.jpg)

Above are the initial designs for the entities and available APIs, the entities may undergo some change but the APIs will stay the same. 

Please note that I have not included any Auth APIs at this time.

### Design
![Initial high level design](./docs/design.jpg)

The design for this application should generally be straightforward. All CRUD operations for Users and Customers will go through their respective services. However I would like to call attention to the photo upload flow.

There are two possibilities for implementing the photo upload/management flow.

First, this is the rough draft of the API for uploading a photo
```
uploadPhoto(imageData, customerId=null)
```

**Option 1**: The frontend application will call into the `uploadPhoto` API with the image data and no `customerId`. In this case the photo will be uploaded to the image store and the path to it will be returned to the frontend. From there the FE can call out to `updateCustomer` with the new image path.

**Option 2**: The frontend application will call into the `uploadPhoto` API with the image data and a `customerId`. Upon seeing the `customerId` the Photo Service will upload the image to the image store and add a message to RMQ to update the customer. The Customer Service will grab the message and add the photo path to the given customer document

There will only be photo uploads for customer documents at this time. However, should this requirement change we will only need to add a optional `photo` property to user documents.

## Getting Started

TBD

### Prerequisites

TBD

```
TBD
```

### Installing

TBD

```
TBD
```

## Running the tests

TBD

## Deployment

TBD

## Built With

* [Nest.js](https://docs.nestjs.com/) - The web framework used

## Authors

* **Joel Milligan** - [Joelsalt](https://github.com/joelsalt)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details