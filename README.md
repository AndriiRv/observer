# Observer

#### Default Value

> Contents

- [Setup](#setup)
- [Using](#using)
  - [Test mode](#test-mode)

## Setup

###### UPDATED Jan 14, 2023

* For now only file as data store of resources is supporting.

1. First, can specify server port on which application will run. It can do by run of jar application with VM options or
   in `application.yml`. Default server port is `8999`. E.g., if server port is
   1111: `java -Dserver.port=1111 -jar observer.jar`.
2. Next in `application.yml` can change the `filename` and `filetype` file from which will read the resources if has selected
   file as data store of resources. Also, can change `separate-character` and `comment-character`
   to convenient manual work with resource file and can change http client timeouts at your discretion.

## Using

###### UPDATED Jan 14, 2023

* After start the application, resource file will create and can add resource with vertical line as separator.
  E.g., `name of resource|http://site.com`
* Or can manage the resources in the Preferences page.

* After reload the home page all resources will reload.

### Test mode

* Can use test mode for specific functional test cases.
E.g.,: add `spring.profiles.active=test` to environment variables in IDE or 
