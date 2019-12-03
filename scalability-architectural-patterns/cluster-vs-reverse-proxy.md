For a Node.js application, there are many reasons to choose this approach in place of the cluster module:

- A reverse proxy can distribute the load across several machines, not just several processes
- The most popular reverse proxies on the market support sticky load balancing
- A reverse proxy can route a request to any available server, regardless of its programming language or platform
- We can choose more powerful load balancing algorithms
- Many reverse proxies also offer other services such as URL rewrites, caching, SSL termination point, or even the functionality of fully-fledged web servers that can be used, for example, to serve static files

That said, the *cluster module could also be easily combined with a reverse proxy* if necessary; for example, using * cluster to scale vertically * inside a single machine and then using the *reverse proxy to scale horizontally* across different nodes.

_Pattern_
Use a reverse proxy to balance the load of an application across multiple instances running on different ports or machines.