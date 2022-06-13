# Observer

#### Default Value

> Contents

- [Setup](#setup)
- [Using](#using)

## Setup

###### UPDATED June 13, 2022

1. First, can specify server port on which application will run. It can do by run of jar application with VM options or
   in `application.yml`. Default server port is `8999`. E.g., if server port is
   1111: `java -Dserver.port=1111 -jar observer.jar`
2. Next in `application.yml` can change the `name` and `type` file from which will read the resources if has selected
   file as data store of resources. Also, can change http client timeouts at your discretion.

## Using

###### UPDATED June 13, 2022

* For now only file as data store of resources is supporting.
* After start the application, resource file will create and can add resource with vertical line as separator.
  E.g., `first resource|http://site.com`
* Or can manage the resources in the Preferences page.

* After reload the home page all resources will reload, and it is take a some time.
* Loader image on each resource will exist during resources loading.
