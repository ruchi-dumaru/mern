## Client - Server Architecture

- TCP/IP Protocol based REST service
- 4 operations
- **Create**
- method: post
- **Read**
- method: get
- **Update**
- method: put/patch
- **Delete**
- method: delete

## SOLID Principle of Software Development

- Single Responsibility Principle
  - single block of code/function/class for a single operation
- Open Close Principle
  - open for change/scaleup but closed for modification
- Liskov Substitution Principle
  - feature if you replace the existing feature by another servuce it should not break the current implementation
- Interface Segragation Principle
  - Should be able to break and group the srvice/feature/module/function
- Dependency inversion principle:
  - High level modules should not be dependent on low level module

## MVC Pattern (Model-View-Controller)

- Model
- Database or data source
- Business logic implementation
- View
- HTML,CSS,Design
- Controller
- Data flow and router handling

## 3-Tire Architecture(Data layer,Logical/controlling/business layer,View layer)

## Response Code (HTTP Response code)

- 1xx
  - Informational HTTP Respond code
- 2xx
  - Successful response code
    - 200 - success (default response)
    - 201 - create success (created)
    - 204 - no response (no content)
- 3xx
  - Redirectional
    - 301/308 Permanent redirect
    - 307 Temporary redirect
- 4xx
  - Client Error response(404)
    - 400 Bad request
    - 401 UnAunthenticated/Unauthorized
    - 403 Access Denied
    - 404 Not found
    - 405 Method not allowed
    - 408 Request Timeout
    - 422 Unprocessable Entity
    - 429 Too many Request (Throttle-limitation)
- 5xx
  - Server Error response
    - 500 Internal Server Error
    - 502 Bad gateway
    - 503 Service Unavailable
    - 504 Gateway Timeout

## Features(Requirement)

### Authentication and Authorization (auth) router

- Register
- Acitvate
- Login
- Fetch Profile
- Update Profile
- Logout
- Forget Password
- Reset Password

### Banners/Sliders

    - CRUD operations
     - Create Banner (Post)
     - Read
      - List All Banner (Get)
      - View Detail of Banner By Id (Get)
     - Update Banner By Id (Put)
     - Delete Banner By Id (Delete)

### Brands

    - CRUD operations
      - Create category (Post)
      - Read (Get)
        - Read All Data
        - Read single data By Id
        - Details with products (/category/:slug/by-slug)
      - Update Brand By Id (Put)
      - Delete Brand By Id (Delete)
