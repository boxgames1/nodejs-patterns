To run it:

- You need to have installed `forever` as global dependency
- Start the service registry: `yarn consul`
- Spawn some instances of the services:
    - `forever start app.js api-service`
    - `forever start app.js api-service`
    - `forever start app.js api-service`
    - `forever start app.js webapp-service`
    - `forever start app.js webapp-service`


If we run `curl localhost:8080/api` several time we should be receiving messages from different servers. It means that the balancer is distributing the load correctly.