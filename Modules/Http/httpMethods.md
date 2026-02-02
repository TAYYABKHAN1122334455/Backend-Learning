````md
# HTTP Methods — Top 1% Backend Engineer Guide

---

## 1️⃣ Concept Overview

- **What it is:** HTTP methods (GET, POST, PUT, DELETE, etc.) define the **action** a client wants the server to perform on a resource.  
- **Problem it solves:** Provides **clear communication** about intent — reading, creating, updating, or deleting data — rather than just sending a request.  
- **What existed before:** Raw TCP connections without standardized verbs; developers used query parameters or custom payloads to indicate actions.  
- **Why backend engineers need it:** Enables RESTful API design, predictable behavior, caching, security policies, and clear client-server contracts.

---

## 2️⃣ Mental Model

- **Real-world analogy:** HTTP methods are verbs in a sentence.  
  - `GET /users` → “Fetch all users”  
  - `POST /users` → “Create a new user”  
  - `DELETE /users/123` → “Remove user 123”  
- **Data flow:** Client sends a method + URL → Server interprets method → Executes appropriate logic → Responds.  
- **Engineer visualization:** Request = (method, URL, headers, body); handler selects action based on method.

---

## 3️⃣ Internal Working

- **Step-by-step:**
  1. Client opens TCP connection → sends HTTP request  
  2. Request line parsed (`METHOD URL HTTP/VERSION`)  
  3. Node or server framework routes request based on **method + path**  
  4. Server executes handler → optionally reads body  
  5. Server returns status code + headers + response body  

- **Memory/CPU/I/O:**
  - CPU: parsing method, routing, executing logic  
  - Memory: request body + response buffering  
  - I/O: network transmission  

- **Hidden complexities:**
  - GET requests can be cached; POST cannot  
  - PUT vs PATCH distinction matters in partial updates  
  - Some browsers preflight OPTIONS for CORS

---

## 4️⃣ Beginner Example

```js
import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('You sent a GET request');
  } else if (req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('You sent a POST request');
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

server.listen(3000);
````

* `req.method`: identifies the HTTP verb
* `res.writeHead`: sets status code and headers
* `res.end`: sends response
* **Client/server behavior:** Browser or client sends method → server checks → responds accordingly.

---

## 5️⃣ Intermediate Example

**Scenario: REST API for User Management**

```js
import http from 'http';

const users = [];

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const user = JSON.parse(body);
        if (!user.name) throw new Error('Name required');
        user.id = users.length + 1;
        users.push(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.url.startsWith('/users') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);
```

* **Design choices:**

  * `POST` for creating users
  * `GET` for reading users
  * Async streaming for request body
  * Validation ensures data integrity
* **Trade-offs:** Full control vs framework convenience; small boilerplate for clarity.

---

## 6️⃣ Advanced / Production Design

* **Company usage:** RESTful APIs using methods to define resource actions, combined with HTTP status codes.
* **Scalability:** Route methods to handlers efficiently; separate read/write workloads; rate-limit destructive methods (DELETE/PUT).
* **Performance:** GET requests can be cached (browser/CDN); POST, PUT, PATCH often write to DB → need async queue for high load.
* **Security:** Restrict sensitive methods; validate inputs; log destructive actions.
* **Trade-offs:** Strict adherence to method semantics improves maintainability; ignoring semantics leads to ambiguous APIs.

---

## 7️⃣ Common Mistakes

* **Beginner:** Using POST for everything → breaks caching and idempotency.
* **Intermediate:** PUT vs PATCH confusion → overwriting data unintentionally.
* **Experienced:** Ignoring OPTIONS or preflight CORS handling → API inaccessible from browsers.
* **Danger:** Incorrect method usage can break clients, proxies, and caching.
* **Avoidance:** Follow HTTP semantics; document API contracts.

---

## 8️⃣ Do’s vs Don’ts Table

| ✅ Best Practices                      | ❌ Anti-patterns            | 🚨 Red Flags                      |
| ------------------------------------- | -------------------------- | --------------------------------- |
| Use GET for read-only requests        | POST for all actions       | Ignoring idempotency              |
| POST for create, PUT/PATCH for update | GET for deleting resources | Missing status codes              |
| DELETE for remove operations          | Overloading query params   | No CORS/preflight handling        |
| Validate request method & payload     | Ignore method in routing   | No logging of destructive methods |

---

## 9️⃣ Interview Perspective

* **Questions:** Difference between GET/POST/PUT/PATCH/DELETE, idempotency, caching rules.
* **Bad answer:** “They are types of requests.”
* **Excellent answer:** “HTTP methods define the intended action on resources; GET is safe/idempotent, POST creates, PUT replaces, PATCH modifies partially, DELETE removes; correct use enables caching, security, and predictable APIs.”
* **Confidence tip:** Explain impact on caching, idempotency, and API design.

---

## 🔟 Debugging & Troubleshooting

* **Common bugs:** Wrong method → 405 errors, unexpected cache behavior, CORS preflight failures.
* **Debug approach:** Log `req.method` and URL; inspect browser network tab; check server routing logic.
* **Senior approach:** Analyze method usage patterns; monitor destructive methods; enforce API contracts.

---

## 1️⃣1️⃣ Performance & Optimization

* GET requests → cacheable, reduce DB hits
* POST/PUT/DELETE → async queue if high volume
* Bottlenecks: Large payloads, DB writes, repeated validation
* Measure: API latency, cache hit/miss, request distribution per method

---

## 1️⃣2️⃣ Security Considerations

* Restrict DELETE/PUT to authorized users
* Validate all payloads to avoid injection
* Rate-limit dangerous operations
* Log destructive method calls for auditing

---

## 1️⃣3️⃣ When NOT to Use

* Using methods incorrectly for a small internal tool → simpler RPC calls may suffice
* Overengineering simple scripts with full REST semantics
* When caching is unnecessary, strict semantics may slow dev

---

## 1️⃣4️⃣ System Perspective

* **Databases:** Method dictates CRUD operations
* **APIs:** Endpoint + method = action
* **Auth:** Methods restrict access (e.g., DELETE only for admins)
* **Frontend:** Methods map to UI actions (e.g., clicking “Delete”)
* **DevOps / CI-CD:** Log destructive actions, monitor method usage patterns

---

## 1️⃣5️⃣ Learning Path

* **Before:** HTTP basics, Node.js HTTP module, JSON
* **After:** RESTful API design, GraphQL differences, caching strategies, idempotency
* **Projects:** REST API for blog posts, e-commerce product API, file management API
* **Practice:** Map CRUD actions to proper HTTP methods, implement validation, monitor method-specific metrics

```
```

